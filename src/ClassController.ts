import Controller, {Parameters} from "./Controller";
import Channel from "./Channel";
import Response from "./Response";

export default class ClassController extends Controller
{
    public static async get(params : Parameters[] | Parameters, values : "*" | string | string[] = "*") : Promise<Response>
    {
        return await Channel.send_request({
            resource: this.class_name,
            request: "get",
            parameters: params,
            values: values
        });
    }

    public static async set(new_object : object) : Promise<Response>
    {
        return await Channel.send_request({
            resource: this.class_name,
            request: "set",
            object: new_object
        });
    }

    public static async update(id : Number, new_object : object) : Promise<Response>
    {
        return await Channel.send_request({
            resource: this.class_name,
            request: "update",
            id: id,
            object: new_object
        });
    }

    public static async delete(id : Number) : Promise<Response> 
    {
        return await Channel.send_request({
            resource: this.class_name,
            request: "delete",
            id: id
        });
    }
}