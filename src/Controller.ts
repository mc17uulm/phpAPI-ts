import Channel from "./Channel";
import Response from "./Response";

export interface Parameters {
    name : string;
    value: string | number | boolean;
}

export default class Controller
{

    private class_name : string;

    constructor(class_name : string = "none") {
        this.class_name = class_name;
    }

    async get() {

    }

    async set(new_object : object) {
        return await Channel.send_request({
            resource: this.class_name,
            request: "set",
            object: new_object
        });
    }

    async update(id : Number, new_object : object) : Promise<Response>
    {
        return await Channel.send_request({
            resource: this.class_name,
            request: "update",
            id: id,
            object: new_object
        });
    }

    async delete(id : Number) 
    {
        return await Channel.send_request({
            resource: this.class_name,
            request: "delete",
            id: id
        });
    }

    async execute(function_name : string, params: Parameters[]) {
        return await Channel.send_request({
            resource: this.class_name,
            request: "execute",
            function: {
                name: function_name,
                params: params
            }
        })
    }

}