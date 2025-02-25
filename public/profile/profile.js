import {signOutUser, LoggedInUser, getSingleDocument} from "../main.js"
let editBtn = document.querySelector("#editBtn")
let logOutBtn = document.querySelector("#logOutBtn")
let firstNameHtml = document.querySelector("#firstName")
let lastNameHtml = document.querySelector("#lastName")
let userNameHtml = document.querySelector("#userName")
let emailHtml = document.querySelector("#email")
let descriptionHtml = document.querySelector("#description")
let profileImg = document.querySelector("#profileImg")

let loggedInUserDetails;
let loggedInUserUid;

function editHandler(){
    window.location.href = "../editProfile/editprofile.html"
}
function logOutHandler(){
    signOutUser()
}
async function logInUser(){
loggedInUserUid = await LoggedInUser()
console.log(loggedInUserUid)
const {firstName, lastName, userName, email, description, photoURL} = await getSingleDocument(loggedInUserUid)
loggedInUserDetails ={firstName, lastName, userName, email, description, photoURL}
console.log(loggedInUserDetails)
firstNameHtml.innerHTML = firstName ?? ".";
lastNameHtml.innerHTML = lastName ?? ".";
userNameHtml.innerHTML = userName ?? "No username";
emailHtml.innerHTML = email ?? "No email found";
descriptionHtml.innerHTML = description ?? "No description found";
profileImg.src = photoURL ?? "../assets/picture.jfif";
}
logInUser()

editBtn.addEventListener("click", editHandler)
logOutBtn.addEventListener("click", logOutHandler)