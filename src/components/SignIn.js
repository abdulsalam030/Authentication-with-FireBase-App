import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Form, Button, Card } from "react-bootstrap";
import visibilityIcon from "../assets/visibilityIcon.svg";
import { toast } from "react-toastify";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import Spinner from "./Spinner";
import GoogleAuth from "./GoogleAuth";

function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;
  const navigate = useNavigate();

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const auth = getAuth();
      setLoading(true);
      const userCredentials = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      //   const user = userCredentials.user
      setLoading(false);

      if (userCredentials.user) {
        navigate("/home");
      }
    } catch (error) {
      setLoading(false)
      console.log(error);
      const errorMessage = error.message;
      toast.error(errorMessage);
    }
  };

  if (loading) {
    return <Spinner />;
  }
  
  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">SignIn</h2>
          <Form onSubmit={onSubmit}>
            <Form.Group className="mb-3" id="email">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter email"
                id="email"
                value={email}
                onChange={onChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                id="password"
                value={password}
                onChange={onChange}
                className="passwordInput"
                required
              />
              <img
                src={visibilityIcon}
                alt="showpassword"
                className="showPassword"
                onClick={() => setShowPassword((prevState) => !prevState)}
              />
            </Form.Group>

            <Button className="w-100" type="submit">
              Login
            </Button>
          </Form>
        </Card.Body>
      </Card>

      <Link to="/sign-up" className="w-100 text-left mt-2 text-decoration-none">
        Don't have an account? Signup
      </Link>

      <Link to="/forgot-password" className="forgotPasswordLink">
        Forgot Password
      </Link>

      {/* Google Auth  */}
      <GoogleAuth />
    </>
  );
}

export default SignIn;
