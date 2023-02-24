import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { useHistory } from "react-router-dom";


export const useSignUp = () =>{
    const [error,setError] = useState(null)
    const [isLoading,setLoading] = useState(null)
    const {dispatch} = useAuthContext()
    const history = useHistory()

    const signUp  = async (firstname,lastname,email,password) => {
        setLoading(true)
        setError(null)
        
        try{
            
            const response = await fetch('http://localhost:8080/api/v1/auth/register',{
                method:'POST',
                headers:{'Content-Type':'application/json'},
                body: JSON.stringify({firstname,lastname,email,password})
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


    return {signUp,isLoading,error}
}