import Channel from "./Channel";
import Response from "./Response";

export interface Parameters {
    [key: string]: string | number | boolean;
}

export default class Controller
{
    protected static class_name : string;

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