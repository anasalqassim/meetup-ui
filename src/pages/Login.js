import 'bootstrap/dist/css/bootstrap.min.css';
import { useLogin } from "../hooks/useLogin";
import LoginForm from "../components/auth/login/LoginForm";
import { useHistory } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';




const Login = () => {
    const {user} = useAuthContext()
    const {login,isLoading,error} = useLogin()
    const history = useHistory()

    if(user){
      history.replace('/')
    }
    


    const loginHandler = (userData) =>{
      const {email,password} = userData

      login(email,password)
      
   }


    return (
     <LoginForm onLogin={loginHandler} state={{isLoading,error}}/>
    )
}

export default Login