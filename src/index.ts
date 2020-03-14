import "@babel/polyfill";
import Channel from "./Channel";
import UserController from "./example/UserController";

(async () => {

    Channel.initialize("http://localhost:8000/");

    let resp = await UserController.login("test", "123");
    console.log(resp);

})();