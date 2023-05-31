import firebase from 'firebase/app'
import 'firebase/auth'

const app = firebase.initializeApp({
    apiKey: process.env.REACT_FIREBASE_API_KEY,
    authDomain: process.env.REACT_FIREBASE_AUTHDOMAIN,
    projectId: process.env.REACT_FIREBASE_PROJECTID,
    storageBucket: process.env.REACT_FIREBASE_STORAGEBUCKET,
    messagingSenderId: process.env.REACT_FIREBASE_MESSAGINGSENDERID,
    appId: process.env.REACT_FIREBASE_APPID
})

export const auth = app.auth();
export default app;