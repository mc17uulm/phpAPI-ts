import Response from "./Response";
import XMLHttpRequest from "xhr2";

export enum RequestType {
    GET = "GET",
    POST = "POST",
    PUT = "PUT",
    DELETE = "DELETE",
    OPTION = "OPTION"
}

export default class Channel
{

    private static api_url : string = "http://localhost:8000/";

    static initialize(base_url : string = "http://localhost:8000/") : void
    {
        this.api_url = base_url;
    }

    static async send_request(body : object, headers : object = {}) : Promise<Response>
    {
        headers["Content-Type"] = "application/json";
        return await this.post(this.api_url, body, headers);
    }

    static async get(url : string, headers : object = {}) : Promise<Response>
    {
        const response_body = await this.request(RequestType.GET, url, headers);
        return new Response(response_body);
    }

    static async post(url : string, data : object, headers : object = {}) : Promise<Response>
    {
        const response_body = await this.request(RequestType.POST, url, headers, JSON.stringify(data));
        return new Response(response_body);
    }

    static async put(url : string, data : object, headers : object = {}) : Promise<Response>
    {
        const response_body = await this.request(RequestType.PUT, url, headers, JSON.stringify(data));
        return new Response(response_body);
    }

    static async delete(url : string, data : object = {}, headers : object = {}) : Promise<Response>
    {
        const response_body = await this.request(RequestType.DELETE, url, headers, JSON.stringify(data));
        return new Response(response_body);
    }

    static async option(url : string, headers : object = {}) : Promise<Response>
    {
        const response_body = await this.request(RequestType.OPTION, url, headers);
        return new Response(response_body);
    }

    static async request(type : RequestType, url : string, headers : object, body : string = "") : Promise<string> {
        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();
            xhr.open(type, url);
            Object.keys(headers).forEach(key => {
                xhr.setRequestHeader(key, headers[key]);
            });
            xhr.onload = () => {
                if(xhr.status >= 200 && xhr.status < 300) {
                    resolve(xhr.response);
                } else if(xhr.status === 403) {
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

}