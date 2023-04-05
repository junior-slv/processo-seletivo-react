import React from 'react'
import { isAuth} from '../pages/Login/Login'

import { Navigate } from 'react-router-dom'
const PrivateRoutes = ({children}:any) => {
  return isAuth ? children : <Navigate to='/'/>
}

export default PrivateRoutes