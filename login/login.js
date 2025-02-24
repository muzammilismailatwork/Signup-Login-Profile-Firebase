import {login} from "../main.js"

let loginBtn = document.querySelector("#loginBtn")
let email = document.querySelector("#email")
let password = document.querySelector("#password")

function loginHandler(){
    login(email.value, password.value)
}
loginBtn.addEventListener("click", loginHandler)
