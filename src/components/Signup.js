import React, {useRef} from "react";
import { Form, Button, Card } from "react-bootstrap";

function Signup() {
const emailRef = useRef()
const passwordRef = useRef()
const confirmPasswordRef = useRef()



  return (
    <>
    <Card>
      <Card.Body>
        <h2 className="text-center mb-4" >Signup</h2>
    <Form>
      <Form.Group className="mb-3" id="email">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" ref={emailRef} placeholder="Enter email" required />
      </Form.Group>

      <Form.Group className="mb-3" id="password">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" ref={passwordRef} placeholder="Enter password" required />
      </Form.Group>

      <Form.Group className="mb-3" id="confirm-password">
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control type="password" ref={confirmPasswordRef} placeholder="Enter Password" required />
      </Form.Group>

      <Button className="w-100" type="submit">
        Submit
      </Button>
    </Form>
    </Card.Body>
    </Card>

    <div className="w-100 text-center mt-2" > 
      Already have an account? Log In
    </div>



    </>
    
  );
}

export default Signup;
