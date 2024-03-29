import { useState } from 'react';
import { useNavigate,Link  } from 'react-router-dom';
import { Form, Button, Card } from "react-bootstrap";
import {toast} from 'react-toastify'
import { getAuth, createUserWithEmailAndPassword,updateProfile } from "firebase/auth";
import {setDoc,doc,serverTimestamp} from 'firebase/firestore'
import {db} from '../firebase'
import GoogleAuth from './GoogleAuth';
import visibilityIcon from '../assets/visibilityIcon.svg'
import Spinner from "./Spinner";



function SignUp() {
    const [showPassword,setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formData,setFormData] = useState({
        name: "",
        email: "",
        password: ""
    })
    const {name,email,password} = formData
    const navigate = useNavigate()

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.id] : e.target.value
        }) )
    }

    const onSubmit = async (e) => {
      e.preventDefault();
      try {
        setLoading(true);
        const auth = getAuth();
        const userCredentials = await createUserWithEmailAndPassword(auth,email,password)
        const user = userCredentials.user
        setLoading(false);
        updateProfile(auth.currentUser, {
          displayName:name
        })
        toast.success("Sign Up Succesfull")
        navigate('/')

       const formDataCopy = {...formData}
       delete formDataCopy.password
       formDataCopy.timestamp = serverTimestamp()

       await setDoc(doc(db,'users', user.uid),formDataCopy)
        
      } catch (error) {
        console.log(error)
        setLoading(false)
        toast.error("Something went wrong with registration")
        const errorMessage = error.message;
        toast.error(errorMessage);
        
      }

    }
   
    if (loading) {
      return <Spinner />;
    }

  return (
    <>
    <Card>
      <Card.Body>
        <h2 className="text-center mb-4" >SignUp</h2>
    <Form onSubmit={onSubmit} >
    <Form.Group className="mb-3" id="email">
        <Form.Label>Name</Form.Label>
        <Form.Control type="text"  placeholder="Enter name" id="name" value={name} onChange={onChange} required />
      </Form.Group>

      <Form.Group className="mb-3" id="email">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="text"  placeholder="Enter email" id="email" value={email} onChange={onChange} required />
      </Form.Group>

      <Form.Group className="mb-3" id="password">
        <Form.Label>Password</Form.Label>
        <Form.Control type={showPassword ? 'text': 'password'}  placeholder="Enter password"
         id='password' value={password} onChange={onChange} className='passwordInput' required />
          <img src={visibilityIcon} alt="showpassword" className='showPasswordUp' 
          onClick={() => setShowPassword((prevState)=> !prevState)}
          />
      </Form.Group>
      

      <Button className="w-100" type="submit">
        Submit
      </Button>
    </Form>
    </Card.Body>
    </Card>

    <Link to='/' className="w-100 text-left mt-2 text-decoration-none" > 
      SignIn
    </Link>

    <Link to='/forgot-password' className='forgotPasswordLink' >
    Forgot Password
    </Link>

     {/* Google Auth  */}
     <GoogleAuth/>
    </>
  )
}

export default SignUp