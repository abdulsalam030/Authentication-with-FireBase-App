import React from 'react'
import { useNavigate,Link  } from 'react-router-dom';



function Home() {
    const navigate = useNavigate()
  return (
    
    <div>
     <h2>Welcome Back</h2> 
        <button className='btn-success' onClick={() => {navigate("/profile")}}>
            Profile
        </button>
    </div>
  )
}

export default Home