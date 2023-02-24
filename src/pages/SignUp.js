
import { useSignUp } from "../hooks/useSignUp";
import RegisterForm from "../components/auth/signup/RegisterForm";
import { useHistory } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";


const SignUp = () => {

  const {signUp,isLoading,error} = useSignUp()
  const history = useHistory()
  const {user} = useAuthContext()

  if(user){
      history.replace('/')
  }

  const signingUpHandler = async (userData) =>{

    const {firstname,lastname,email,password} = userData

    await signUp(firstname,lastname,email,password)

  }


    return (
      <RegisterForm onRegister={signingUpHandler} state={{isLoading,error}}  />
    )
}

export default SignUp