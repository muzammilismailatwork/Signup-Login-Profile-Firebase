import {signUpUser, signInWithGoogle} from "../main.js"
let firstName = document.querySelector("#firstName")
let lastName = document.querySelector("#lastName")
let userName = document.querySelector("#userName")
let email = document.querySelector("#email")
let password = document.querySelector("#password")
let signUpBtn = document.querySelector("#signUpBtn")
let googleSignin = document.querySelector("#googleSignin")


function registrationHandler(){
signUpUser({
    firstName: firstName.value,
    lastName: lastName.value,
    userName: userName.value,
    email: email.value,
    password: password.value,
})
}
function googleSignInHandler(){
signInWithGoogle()
}

signUpBtn.addEventListener("click", registrationHandler)
googleSignin.addEventListener("click", googleSignInHandler)