import "@babel/polyfill";
import _sodium from "libsodium-wrappers";
import Encryptor from "./src/Encryptor";
import phpAPI from "./src/phpAPI";


(async () => {

    await _sodium.ready;
    let key = _sodium.randombytes_buf(_sodium.crypto_secretbox_KEYBYTES);
    
    await Encryptor.create("server_keys");
    
    await Encryptor.save(key);
    await Encryptor.load(key);

    phpAPI.init("http://localhost:8000");
    let response = await phpAPI.secure_post("/", {});

    console.log(response);

})();
