import React, { useState } from 'react'
import { Form, Button, Card } from "react-bootstrap";
import { useNavigate,Link  } from 'react-router-dom';
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import {toast} from 'react-toastify'




function ForgotPassword() {
    const [email,setEmail] = useState('')

    const onSubmit = async (e) => {
        e.preventDefault()
        try {
            const auth = getAuth()
            await sendPasswordResetEmail(auth,email)
            toast.success("Email was Sent Succesfully")
        } catch (error) {
            toast.error("Email not Sent")
            
        }

    }

    const onChange = (e) => setEmail(e.target.value)



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