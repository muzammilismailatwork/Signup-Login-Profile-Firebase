

import { LoggedInUser, getSingleDocument, updateProfile } from "../main.js"

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
function closeHandler() {
    window.location.href = "../profile/profile.html"
}
closeBtn.addEventListener("click", closeHandler)

async function logInUser() {
    loggedInUserUid = await LoggedInUser()
    console.log(loggedInUserUid)
    const { firstName, lastName, description, photoURL, email, userName } = await getSingleDocument(loggedInUserUid)
    loggedInUserDetails = { firstName, lastName, description, photoURL, email, userName }
    console.log(loggedInUserDetails)
    firstNameHtml.value = firstName ?? ".";
    lastNameHtml.value = lastName ?? ".";
    descriptionHtml.value = description ?? "";
    photoURLSrc.src = photoURL ?? "../assets/picture.jfif";

    image = photoURLSrc.src;
}
logInUser()

// function saveChanges(){
const cloudName = 'dvl2izdr6'; // Replace with your Cloudinary cloud name
const uploadPreset = 'SignUp-SignIn-Firebase'; // Replace with your Cloudinary upload preset

// Form submission event handler
saveChangesBtn.addEventListener('click', function (e) {
    e.preventDefault();

    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];

    // Check if a file is selected
    if (file) {  // **(Changed part)** Only upload if a new file is selected
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
                if (imageUrl) {
                    photoURLSrc.src = imageUrl;
                } else {
                    photoURLSrc.src = image;  // **(Changed part)** Keep the old image if no new image is uploaded
                }
                updateProfile(
                    descriptionHtml.value,
                    loggedInUserUid,
                    photoURLSrc.src,  // **(Changed part)** Update with new or old image
                    firstNameHtml.value,
                    lastNameHtml.value,
                    loggedInUserDetails
                )
            })
            .catch(error => {
                console.error('Error uploading image:', error);
            });
    } else {  // **(Added part)** If no new file is selected, keep the old image
        updateProfile(
            descriptionHtml.value,
            loggedInUserUid,
            photoURLSrc.src,  // **(Changed part)** Retain the current image if no new image
            firstNameHtml.value,
            lastNameHtml.value,
            loggedInUserDetails
        );
    }
});
