// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword, signOut, onAuthStateChanged, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-auth.js";
import { doc, setDoc, getFirestore, getDoc } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAkX9SeEeLRflLfYjM27-4TDP9TajqMXpo",
    authDomain: "signup-signin-e35bc.firebaseapp.com",
    projectId: "signup-signin-e35bc",
    storageBucket: "signup-signin-e35bc.firebasestorage.app",
    messagingSenderId: "386555238402",
    appId: "1:386555238402:web:80889762b8bad9d26f6f1b",
    measurementId: "G-ZN8CN3L5MV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

// Signup User 
const auth = getAuth(app);


export async function signUpUser(userDetails) {
    try {
        const { firstName, lastName, userName, email, password } = userDetails;
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        // Signed up 
        const user = userCredential.user;
        console.log(user);
        const { password: myPassword, ...userDetailsWithOutPassword } = userDetails;

        await setDoc(doc(db, "users", userCredential?.user?.uid), {
            userDetailsWithOutPassword,
        });
        console.log("User created succesfully")
        setTimeout(() => {
            window.location.href = "../profile/profile.html"
        }, 2000)

    }
    catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
    }
}

// Sign in with Google 
export async function signInWithGoogle() {
    try {
        const provider = new GoogleAuthProvider();
        const result = await signInWithPopup(auth, provider)
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // IdP data available using getAdditionalUserInfo(result)
        console.log(token)
        console.log(user)
        // ...
        const displayName = user.displayName;
        const fullName = user.displayName.trim().split(" ")
        const firstName = fullName[0];
        const lastName = fullName[1];
        const userName = displayName.replace(" ", "").toLowerCase();
        const userDetailsWithOutPassword = {
            firstName: firstName,
            lastName: lastName,
            userName: userName,
            email: user.email,
            photoURL: user.photoURL
        }
        await setDoc(doc(db, "users", user?.uid), {
            userDetailsWithOutPassword
        });
        console.log("User created succesfully")
        setTimeout(() => {
            window.location.href = "../profile/profile.html"
        }, 2000)
    }
    catch (error) {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        //  const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
        console.log(errorCode)
        console.log(errorMessage)
        // console.log(email)
        console.log(credential)
    }

}
//********* */ http://localhost:5500/index.html  must change link **************


// login 
export async function login(email, password) {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password)
        // Signed in
        const user = userCredential.user;
        console.log("login successfully");
        setTimeout(() => {
            window.location.href = "../profile/profile.html";
        }, 2000);
    }
    catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, "===>> errorCode");
        console.log(errorMessage, "===>> errorMessage");
    }
    // ...
}

//   Sign Out 

export function signOutUser() {
    signOut(auth).then(() => {
        // Sign-out successful.
        console.log("User SignOut successfully")
        setTimeout(() => {
            window.location.href = "../index.html"
        }, 2000)
    }).catch((error) => {
        // An error happened.
        console.log(error)
    });
}

// Logged In User 

export function LoggedInUser() {
    return new Promise((resolve, reject) => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/auth.user
                const uid = user.uid;
                console.log(uid)
                resolve(uid)
                // ...
            } else {
                // User is signed out
                // ...
                console.log("No user found")
                reject("No user found")
                setTimeout(() => {
                    window.location.href = "../index.html";
                }, 2000);
            }
        });
    })
}

// get single logged In user details 
export async function getSingleDocument(uid) {

    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        const {userDetailsWithOutPassword} = docSnap.data();
        console.log(userDetailsWithOutPassword);
        return userDetailsWithOutPassword;
    } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
    }
} 

// forgot password 
export function forgotPass(email){

    sendPasswordResetEmail(auth, email)
    .then(() => {
        // Password reset email sent!
        // ..
        console.log("email sent successfully")
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
        console.log(errorMessage)
    });
}

// Edit Profile  
export async function updateProfile(
    description,
    uid,
    photoURL,
    firstName,
    lastName,
    userDetails,
){
    await setDoc(doc(db, "users", uid),{
        userDetailsWithOutPassword: {
            ...userDetails,
            firstName,
            lastName,
            description,
            photoURL,
        }
    })
    console.log("user profile updated successfully")
    console.log(userDetails)
    setTimeout(() => {
        window.location.href = "../profile/profile.html";
    }, 2000);

}


