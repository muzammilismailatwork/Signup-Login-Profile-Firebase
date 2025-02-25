let signupBtn = document.querySelector("#signupBtn")
let loginBtn = document.querySelector("#loginBtn")

function signup(){
    window.location.href = "./signup/signup.html"
}
function login(){
    window.location.href = "./login/login.html"
}

signupBtn.addEventListener("click", signup)
loginBtn.addEventListener("click", login)