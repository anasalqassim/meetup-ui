import { AuthContext } from "../authContext/AuthContext";
import { useContext } from "react";

export const useAuthContext = () =>{
    const context = useContext(AuthContext)

    if(!context){
        throw Error('useAuthContext should be used inside AuthContextProvider')
    }

    return context
}