import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useAuthContext } from "./useAuthContext";


export const useLogin = () =>{
    const [error,setError] = useState(null)
    const [isLoading,setLoading] = useState(null)
    const {dispatch} = useAuthContext()
    const history = useHistory()


    const login  = async (email,password) => {
        setLoading(true)
        setError(null)
        
        try{
            
            const response = await fetch('http://localhost:8080/api/v1/auth/authenticate',{
                method:'POST',
                headers:{'Content-Type':'application/json'},
                body: JSON.stringify({email,password})
            }) 

            const json = await response.json()

            if(!response.ok){
               
                setLoading(false)
                setError(json.message)
               
            }
            if(response.ok){
                localStorage.setItem("user",JSON.stringify(json))
                
                dispatch({type:'LOGIN',payload:json})
    
                setLoading(false)
                history.replace('/');
            }
        }catch(e){
            setLoading(false)
            setError("error")
        }
    

        
    }


    return {login,isLoading,error}
}