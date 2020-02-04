export enum ResponseType {
    ERROR = "error",
    SUCCESS = "success"
}

export default class Response 
{

    private type : ResponseType;
    private msg : object | string;

    constructor(response = "") 
    {
        this.json_decode(response);
    }

    json_decode(data : string) : void 
    {
        try {
            let json = JSON.parse(data);
            if(typeof json.type === "undefined" || typeof json.message === "undefined") {
                this.type = ResponseType.ERROR;
                this.msg = "Invalid response";
            } else {
                this.type = json.type === "success" ? ResponseType.SUCCESS : ResponseType.ERROR;
                this.msg = json.message;
            }

        } catch(err) {
            this.type = ResponseType.ERROR;
            this.msg = "Invalid response";
        }
    }

    get_type() : ResponseType
    {
        return this.type;
    }

    was_success() : boolean
    {
        return this.type === ResponseType.SUCCESS;
    }

    get_msg() : object | string
    {
        return this.msg;
    }

}