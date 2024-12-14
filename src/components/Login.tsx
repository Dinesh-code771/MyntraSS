import React, {useEffect} from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { useNavigate } from 'react-router-dom'

export default function Login() {

const { loginWithRedirect, isAuthenticated }= useAuth0();
const navigate = useNavigate();

useEffect(()=>{
    if (isAuthenticated){
        navigate("/");
    }
},[isAuthenticated])

  return (
    <div className='h-screen w-full flex justify-center items-center'>
    <button
    onClick={()=> loginWithRedirect()}
     className='px-5 py-3 rounded-md border-none bg-cyan-400'>
        Login
     </button>
    </div>
  )
}
