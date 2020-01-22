import Encryptor from "./Encryptor";

export enum ResponseType {
    ERROR = "error",
    SUCCESS = "success"
}

export default class Response 
{

    private type : ResponseType;
    private msg : string;

    constructor(response = "") 
    {
        if(response.startsWith("{")) {
            this.json_decode(response);
        } else if(response.length > 0){
            if (Encryptor.is_loaded()) {
                //this.json_decode(Encryptor.decrypt(""; response));
            } else {
                throw "Invalid response";
            }
        } 
    }

    json_decode(data : string) : void 
    {
        try {
            let json = JSON.parse(data);
            if(typeof json.type === "undefined" || typeof json.msg === "undefined") {
                this.type = ResponseType.ERROR;
                this.msg = "Invalid response";
            } else {
                this.type = json.type === "success" ? ResponseType.SUCCESS : ResponseType.ERROR;
                this.msg = json.msg;
            }

        } catch(err) {
            this.type = ResponseType.ERROR;
            this.msg = "Invalid response";
        }
    }

    set_type(type : ResponseType) : void 
    {
        this.type = type;
    }

    set_msg(msg : string) : void 
    {
        this.msg = msg;
    }

}