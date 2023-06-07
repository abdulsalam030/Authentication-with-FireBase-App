// import firebase from 'firebase/app'
// import 'firebase/auth'

// const app = firebase.initializeApp({
//     apiKey: process.env.REACT_FIREBASE_API_KEY,
//     authDomain: process.env.REACT_FIREBASE_AUTHDOMAIN,
//     projectId: process.env.REACT_FIREBASE_PROJECTID,
//     storageBucket: process.env.REACT_FIREBASE_STORAGEBUCKET,
//     messagingSenderId: process.env.REACT_FIREBASE_MESSAGINGSENDERID,
//     appId: process.env.REACT_FIREBASE_APPID
// })

// export const auth = app.auth();
// export default app;



import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
     apiKey: "AIzaSyBxt5nA4xwa_EjgL4W8O75foZcdjX5DidQ",
    authDomain: "authentication-developme-7a601.firebaseapp.com",
     projectId: "authentication-developme-7a601",
     storageBucket: "authentication-developme-7a601.appspot.com",
     messagingSenderId: "288429065056",
     appId: "1:288429065056:web:266e788f6a969742d01405"
}

// Initialize Firebase
//  const app = initializeApp(firebaseConfig)
//  export default app;
initializeApp(firebaseConfig)
 export const db = getFirestore()