import Response, { ResponseType } from "./Response";
import Encryptor from "./Encryptor";

export enum RequestType {
    GET = "GET",
    POST = "POST"
}

export default class phpAPI {

    private static url : string;

    static init(url : string) : void
    {
        this.url = url;
    }

    static async get(res : string, headers = {}) : Promise<Response>
    {
        const resp = await this.request(RequestType.GET, this.url + res, headers);
        return new Response(resp);
    }

    static async post(res : string, data : object, headers = {}) : Promise<Response> 
    {
        const resp = await this.request(RequestType.POST, this.url + res, headers, JSON.stringify(data));
        return new Response(resp);
    }

    static async secure_post(res : string, data : object, headers = {}) : Promise<Response>
    {
        try {
            this.load_encryptor();

            let ciphertext : Uint8Array = await Encryptor.encrypt(JSON.stringify(data));
            const resp = await this.request(
                RequestType.POST,
                this.url + res,
                headers,
                ciphertext
            );
            return new Response(resp);

        } catch(err) {
            let r = new Response();
            r.set_type(ResponseType.ERROR);
            r.set_msg(err);
            return r;
        }
    }

    static async request(type : RequestType, url : string, headers : object, body : string | Uint8Array = "") : Promise<string> {
        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();
            xhr.open(type, url);
            Object.keys(headers).forEach(key => {
                xhr.setRequestHeader(key, headers[key]);
            });
            xhr.onload = () => {
                if(xhr.status >= 200 && xhr.status < 300) {
                    resolve(xhr.response);
                } else {
                    reject({status: xhr.status, statusText: xhr.statusText});
                }
            };
            xhr.onerror = () => {
                reject({status: xhr.status, statusText: xhr.statusText});
            };
            xhr.send(body);
        });
    }

    static get_token() : string 
    {
        return document.querySelector("meta[name='csrf-token']").getAttribute("content");
    }

    static load_encryptor() : void
    {
        if(!Encryptor.was_created()) {
            throw "Encryptor not created";
        }
        if(!Encryptor.is_loaded()) {
            try {
                Encryptor.load(this.get_token());
            } catch(err) {
                throw "Encryptor failed to load: " + err;
            }
        }
    }

}