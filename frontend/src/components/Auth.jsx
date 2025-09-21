import React from 'react'
import { Navigate } from 'react-router-dom'

const Auth = ({Children}) => {
   const token =localStorage.getItem("token")
  return (
    <>
      {token ? Children : <Navigate to="userForm"/>}
    </>
  )
}

export default Auth
