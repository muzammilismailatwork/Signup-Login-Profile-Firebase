import {forgotPass} from "../main.js"

let email = document.querySelector("#email")

let forgotBtn = document.querySelector("#forgotBtn")

function forgotPassHandler(){
    forgotPass(email.value)
    setTimeout(() => {
        window.location.href = "../login/login.html";
    }, 2000);
}

forgotBtn.addEventListener("click", forgotPassHandler)