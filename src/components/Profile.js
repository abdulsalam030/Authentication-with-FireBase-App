import { useEffect, useState } from 'react';
import { getAuth,updateProfile } from "firebase/auth";
import { Form, Button, Card } from "react-bootstrap";
import { useNavigate,Link  } from 'react-router-dom';
import {db} from '../firebase'
import {toast} from 'react-toastify'
import {updateDoc,doc} from 'firebase/firestore'



function Profile() {
    const auth = getAuth()
    const [changeDetails,setChangeDetails] = useState(false)
    const [formData,setFormData] = useState({
        name : auth.currentUser.displayName,
        email : auth.currentUser.email,
    })

    const {name,email} = formData

    const navigate = useNavigate()


    const onLogout =  () => {
        auth.signOut();
        navigate("/")
    }

    const onSubmit = async () => {
        try {
            if(auth.currentUser.displayName !== name ) {
                //Update User
                await updateProfile(auth.currentUser, {
                    displayName : name
                })
            }

            // Update in FireStore
            const userRef = doc(db, 'users', auth.currentUser.uid)
            await updateDoc(userRef, {
                name 
            })

            
        } catch (error) {
            console.log(error)
            toast.error("Could not Update Details ")
            const errorMessage = error.message;
            toast.error(errorMessage)
            
        }

    }

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.id] : e.target.value
        } ) )

    }
   


  return (
    <>
      <Card>
      <Card.Body>
        <h2 className="text-center mb-4" >My Profile</h2>
        <h6 className='text-center'>Personal Details</h6>
        
        
    <Form >
      <Form.Group className="mb-3">
         <Form.Control type="text" id='name' className={!changeDetails ? 'profileName' : 'profileNameActive' } 
          disabled={!changeDetails} value={name}
          onChange={onChange}
         /> 
      </Form.Group>

      <Form.Group className="mb-3" >
         <Form.Control type="text" id='email' className={!changeDetails ? 'profileName' : 'profileEmailActive' } 
          disabled={!changeDetails} value={email}
          onChange={onChange}
         /> 
      </Form.Group>
      <h6 className='changePersonalDetails' onClick={() => {
            changeDetails && onSubmit() 
            setChangeDetails((prevState) => !prevState )
        } } >
            {changeDetails ? 'done' : 'change' }
        </h6>

     
      <Button className="w-100" type="submit" onClick={onLogout} >
        Logout
      </Button>
    </Form>
    </Card.Body>
    </Card>
    
    
    </>
        
  ) 
}

export default Profile