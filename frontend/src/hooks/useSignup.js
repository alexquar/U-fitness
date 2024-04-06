import { useState } from "react";
import {useAuthContext} from './useAuthContext'

export const useSignup = ()=>{
    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const { dispatch } = useAuthContext()

    const signup = async (email, password) => {
        setError(null)
        setIsPending(true)
      
        try {
          const res = await fetch('api/user/signup', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ email, password })
          }) 

          const json = await res.json()
    
          if (!res.ok) {
            setIsPending(false)
            setError(json.error)
          } else {
            localStorage.setItem('user',JSON.stringify(json))
            
          dispatch({ type: 'LOGIN', payload: json })
    
            setIsPending(false)
            setError(null)
          }
        } 
        catch(err) {
            setError(err.message)
            setIsPending(false)
        }
      }
    
      return { signup, error, isPending }
    }