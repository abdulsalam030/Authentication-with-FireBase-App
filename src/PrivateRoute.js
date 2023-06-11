import React from 'react'
import {Navigate,Outlet} from 'react-router-dom'
import useAuthStatus from './hooks/useAuthStatus'
import Spinner from './components/Spinner'

function PrivateRoute() {
    const {loggedIn, checkingStatus} = useAuthStatus()

    if(checkingStatus) {
        return <Spinner/>
    }

  return loggedIn ? <Outlet/> : <Navigate to='/' />
}

export default PrivateRoute