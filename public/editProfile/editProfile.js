import { LoggedInUser, getSingleDocument, updateProfile} from "../main.js"

let firstNameHtml = document.querySelector("#firstName")
let lastNameHtml = document.querySelector("#lastName")
let descriptionHtml = document.querySelector("#description")
let photoURLSrc = document.querySelector("#photoURL")
let saveChangesBtn = document.querySelector("#saveChangesBtn")
let fileInput = document.querySelector("#fileInput")
let loggedInUserDetails;
let loggedInUserUid;
let image;

let closeBtn = document.querySelector("#closeBtn")
function closeHandler(){
    window.location.href = "../profile/profile.html"
}
closeBtn.addEventListener("click", closeHandler)

async function logInUser(){
loggedInUserUid = await LoggedInUser()
console.log(loggedInUserUid)
const {firstName, lastName, description, photoURL, email, userName} = await getSingleDocument(loggedInUserUid)
loggedInUserDetails ={firstName, lastName, description, photoURL, email, userName}
console.log(loggedInUserDetails)
firstNameHtml.value = firstName ?? ".";
lastNameHtml.value = lastName ?? ".";
descriptionHtml.value = description ?? "";
photoURLSrc.src = photoURL ?? "../assets/picture.jfif";

image = photoURLSrc.src;
}
logInUser()

// function saveChanges(){
// Cloudinary image section 
const cloudName = 'dvl2izdr6'; // Replace with your Cloudinary cloud name
const uploadPreset = 'SignUp-SignIn-Firebase'; // Replace with your Cloudinary upload preset

// Form submission event handler
saveChangesBtn.addEventListener('click', function(e) {
    e.preventDefault();

    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];

    // Check if a file is selected
    if (file) {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', uploadPreset); // Upload preset

        // Call Cloudinary API using Fetch
        fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
            method: 'POST',
            body: formData,
        })
        .then(response => response.json())
        .then(data => {
            // Display uploaded image
            const imageUrl = data.secure_url;
            console.log(imageUrl)
            if(imageUrl){
                photoURL.src = imageUrl;
            }
            else{
                photoURL.src = image;
            }
            updateProfile(
                descriptionHtml.value,
                loggedInUserUid,
                photoURL.src,
                firstNameHtml.value,
                lastNameHtml.value,
                loggedInUserDetails
            )
            // const imageContainer = document.getElementById('uploaded-image-container');
            // imageContainer.innerHTML = `<img src="${imageUrl}" alt="Uploaded Image">`;
        })
        .catch(error => {
            console.error('Error uploading image:', error);
        });
    }
});
// }
// saveChangesBtn.addEventListener("click", saveChanges)