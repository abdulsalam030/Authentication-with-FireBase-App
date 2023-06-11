import React from 'react'
import Signup from './Signup'
import SignIn from './SignIn'
import ForgotPassword from './ForgotPassword'
import {Container} from 'react-bootstrap'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import {BrowserRouter as Router,Routes, Route} from 'react-router-dom'
import Profile from './Profile'
import Home from './Home'
import PrivateRoute from '../PrivateRoute'
import './App.css';

function App() {
  return (
    <Container className='d-flex align-items-center justify-content-center'
    style={{minHeight:"100vh"}}>
      <div className='w-100' style={{maxWidth:"400px"}} >
        <Router>
          <Routes>
          <Route path='/'  element={<SignIn/>}/>
          <Route path="/sign-up" element= { <Signup/> } />
          <Route path="/forgot-password" element= { <ForgotPassword/> } />
          <Route path='/profile' element={<PrivateRoute/>}  >
          <Route path="/profile" element= { <Profile/> } />
          </Route>
          <Route path="/home" element= { <Home/> } />
          </Routes>
        </Router>
        <ToastContainer/>
      </div>
    </Container>
  )
}

export default App;
