import Controller from "./../Controller";
import Response from "./../Response";

export default class UserController extends Controller
{

    protected static class_name : string = "user";

    static async login(username : string, password : string) : Promise<Response>
    {
        return await super.execute("login", {username: username, password: password});
    }

}