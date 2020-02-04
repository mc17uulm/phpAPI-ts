import "@babel/polyfill";
import UserController from "./controllers/UserController";

(async () => {

    let response = await UserController.get({id: 2});
    
    if(response.was_success()) {
        console.log("Success: ");
        console.log(response.get_msg());
    } else {
        console.log("Error: " + response.get_msg());
    }

    response = await UserController.login("max.mustermann@mail.de", "123");
    if(response.was_success()) {
        console.log("Success: ");
        console.log(response.get_msg());
    } else {
        console.log("Error: " + response.get_msg());
    }

})();