import _sodium from "libsodium-wrappers";
import concatTypedArray from "concat-typed-array";
import base64js from "base64-js";

class Encryptor
{

    private static loaded : boolean = false;
    private static created : boolean = false;
    private static secret_key : Uint8Array;
    private static public_key : Uint8Array;
    private static server_public_key : Uint8Array;

    static async create(server_public_key : Uint8Array) : Promise<void>
    {
        await _sodium.ready;
        let box : _sodium.KeyPair = _sodium.crypto_box_keypair();
        this.secret_key = box.privateKey;
        this.public_key = box.publicKey;
        this.server_public_key = server_public_key;
        this.created = true;
    }

    static async save_key(key : Uint8Array, name : string, token : Uint8Array) : Promise<void>
    {
        await _sodium.ready;

        let nonce : Uint8Array = _sodium.randombytes_buf(_sodium.crypto_secretbox_NONCEBYTES);
        let result : Uint8Array = concatTypedArray(Uint8Array, nonce, _sodium.crypto_secretbox_easy(key, nonce, token));
        sessionStorage.setItem(name, base64js.fromByteArray(result));
    }

    static async load_key(name : string, token : Uint8Array) : Promise<Uint8Array>
    {
        await _sodium.ready;

        let storage : string = sessionStorage.getItem(name);
        if(storage === null) {
            throw "Key not set";
        }
        let data : Uint8Array= base64js.toByteArray(storage);
        if(data.length < _sodium.crypto_secretbox_NONCEBYTES + _sodium.crypto_secretbox_MACBYTES) {
            throw "Invalid data";
        }

        let nonce : Uint8Array = data.slice(0, _sodium.crypto_secretbox_NONCEBYTES);
        let ciphertext : Uint8Array = data.slice(_sodium.crypto_secretbox_NONCEBYTES, data.length);
        let key : Uint8Array = _sodium.crypto_secretbox_open_easy(ciphertext, nonce, token);

        return key;
    }

    static async save(token : Uint8Array) : Promise<void>
    {
        await this.save_key(this.secret_key, 'phpAPIKeys_secret', token);
        await this.save_key(this.public_key, 'phpAPIKeys_public', token);
        await this.save_key(this.server_public_key, 'phpAPIKeys_server', token);
    }

    static async load(str_token : string) : Promise<void> 
    {
        let token : Uint8Array = base64js.toByteArray(str_token);
        this.secret_key = await this.load_key('phpAPIKeys_secret', token);
        this.public_key = await this.load_key('phpAPIKeys_public', token);
        this.server_public_key = await this.load_key('phpAPIKeys_server', token);
        this.loaded = true;
    }

    static async encrypt(data : string) : Promise<Uint8Array>
    {
        await _sodium.ready;
        let nonce : Uint8Array = _sodium.randombytes_buf(_sodium.crypto_box_NONCEBYTES);
        let ciphertext : Uint8Array = _sodium.crypto_box_easy(
            data,
            nonce,
            this.public_key,
            this.secret_key
        );

        return ciphertext;
    }

    static async decrypt(data : string, nonce : Uint8Array) : Promise<Uint8Array>
    {
        await _sodium.ready;
        let plaintext : Uint8Array | boolean = _sodium.crypto_box_open_easy(
            data,
            nonce,
            this.public_key,
            this.secret_key
        );
        if(!plaintext) {
            throw "Malformed message or invalid MAC";
        }

        return plaintext;
    }

    static was_created() : boolean 
    {
        return this.created;
    }

    static is_loaded() : boolean
    {
        return this.loaded;
    }

}

export default Encryptor;