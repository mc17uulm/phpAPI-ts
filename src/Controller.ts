import Channel from "./Channel";
import Response from "./Response";

export interface Parameters {
    [key: string]: string | number | boolean;
}

export default class Controller
{

    protected static class_name : string = "none";

    static async get(params : Parameters[] | Parameters, values : "*" | string | string[] = "*") : Promise<Response>
    {
        return await Channel.send_request({
            resource: this.class_name,
            request: "get",
            parameters: params,
            values: values
        });
    }

    static async set(new_object : object) : Promise<Response>
    {
        return await Channel.send_request({
            resource: this.class_name,
            request: "set",
            object: new_object
        });
    }

    static async update(id : Number, new_object : object) : Promise<Response>
    {
        return await Channel.send_request({
            resource: this.class_name,
            request: "update",
            id: id,
            object: new_object
        });
    }

    static async delete(id : Number) : Promise<Response> 
    {
        return await Channel.send_request({
            resource: this.class_name,
            request: "delete",
            id: id
        });
    }

    static async execute(function_name : string, params: Parameters) : Promise<Response>
    {
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