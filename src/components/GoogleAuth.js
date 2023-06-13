import React from 'react'
import { useNavigate,useLocation  } from 'react-router-dom';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import {setDoc,doc,serverTimestamp,getDoc} from 'firebase/firestore'
 import {db} from '../firebase'
 import {toast} from 'react-toastify'
 import googleIcon from '../assets/googleIcon.svg'
 
function GoogleAuth() {
    const navigate = useNavigate()
    const location = useLocation()

    const onGoogleClick = async() => {
        try {
            const auth = getAuth()
            const provider = new GoogleAuthProvider()
            const result = await signInWithPopup(auth,provider)
            const user = result.user
    
            // check for user
            const docRef = doc(db, 'users', user.uid )
            const docSnap = await getDoc(docRef)
            // if user does not exist create user
            if (!docSnap) {
                await setDoc( doc(db,'users', user.uid), {
                    name : user.displayName,
                    email : user.email,
                    timestamp : serverTimestamp()
                } )
            }
            navigate('/home')
        } catch (error) {
            toast.error('Could not authorize with Google')
            const errorMessage = error.message;
            toast.error(errorMessage)
            
        }
       

    }
  return (
    <div className='socialLogin' >
        <p>
            Sign {location.pathname === '/sign-up' ? 'Up' : 'In' } with
        </p>

        <button className='socialIconDiv' onClick={onGoogleClick} >
            <img className='socialIconImg' src={googleIcon}  alt = "GoogleIcon"    />
        </button>
    </div>
  )
}

export default GoogleAuth