import Controller from "./../Controller";
import Response from "./../Response";

export default class UserController extends Controller
{

    constructor(class_name : string = "user") {
        super(class_name);
    }

    async update(id : Number, new_object : object) : Promise<Response>
    {
        return await super.update(id, new_object);
    }

}