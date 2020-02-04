import "@babel/polyfill";
import UserController from "./controllers/UserController";

(async () => {

    let controller = new UserController();

    let response = await controller.execute(
        "login",
        [
            {name: "username", value: "marco"},
            {name: "password", value: "123"}
        ]
    )
    
    if(response.was_success()) {
        console.log("Success: ");
        console.log(response.get_msg());
    } else {
        console.log("Error: " + response.get_msg());
    }

})();