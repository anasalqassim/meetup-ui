import { useHistory } from "react-router-dom"
import { useAuthContext } from "./useAuthContext"



export const useLogout = () => {
    const {dispatch} = useAuthContext()
    const history = useHistory()
    const logout = () =>{

        localStorage.removeItem('user')
    
        dispatch({type:'LOGOUT'})

        history.replace('/')

    }
    
    return {logout}

}