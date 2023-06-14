import React, { useState } from 'react'
import { Form, Button, Card } from "react-bootstrap";
import { useNavigate,Link  } from 'react-router-dom';
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import {toast} from 'react-toastify'
import Spinner from "./Spinner";





function ForgotPassword() {
    const [email,setEmail] = useState('')
    const [loading, setLoading] = useState(false);


    const onSubmit = async (e) => {
        e.preventDefault()
        try {
          setLoading(true);
            const auth = getAuth()
            await sendPasswordResetEmail(auth,email)
            setLoading(false)
            toast.success("Email was Sent Succesfully")
        } catch (error) {
          setLoading(false);
            toast.error("Email not Sent")
            const errorMessage = error.message;
            toast.error(errorMessage);
            
        }

    }

    const onChange = (e) => setEmail(e.target.value)

    if (loading) {
      return <Spinner />;
    }


  return (
    <>
    <Card>
    <Card.Body>
      <h2 className="text-center mb-4" >Forgot Password</h2>
      
  <Form onSubmit={onSubmit} >
    <Form.Group className="mb-3">
       <Form.Control type="text" id='email'
       value={email} placeholder='Enter Email' onChange={onChange} /> 
    </Form.Group>

    
   

   
    <Button className="w-100" type="submit">
      Send Reset Link
    </Button>

    <Link to='/' className="w-100 text-left mt-2 text-decoration-none" > 
      SignIn
    </Link>
  </Form>
  </Card.Body>
  </Card>
  
  
  </>
  )
}

export default ForgotPassword