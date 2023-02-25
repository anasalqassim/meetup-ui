import { useRef, useState } from 'react';

import Card from '../../ui/Card';
import classes from '../../auth/signup/RegisterForm.module.css';
import { Alert } from 'react-bootstrap';


function RegisterForm(props) {
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const [inputError,setInputError] = useState(null)

  const {isLoading,error} = props.state

  function submitHandler(event) {
    event.preventDefault();

    const enteredFirstName = firstNameRef.current.value;
    const enteredLastName = lastNameRef.current.value;
    const enteredEmail = emailRef.current.value;
    const enteredPassword = passwordRef.current.value;
    const enteredConfirmPassword = confirmPasswordRef.current.value;

    if(enteredPassword !== enteredConfirmPassword){
      setInputError("Password and confirm password dose not match")
    }else{
      setInputError(null)
      const UserData = {
        firstname: enteredFirstName,
        lastname: enteredLastName,
        email: enteredEmail,
        password: enteredPassword,
      };

      props.onRegister(UserData);
    }

    
  }

  return (
    <Card>
      {error && <Alert variant='danger'>{error}</Alert>}
      <form className={classes.form} onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor='firstName'>First Name</label>
          <input type='text' required id='firstName' ref={firstNameRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor='lastName'>Last Name</label>
          <input type='text' required id='lastName' ref={lastNameRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor='email'>Email Address</label>
          <input type='email' required id='email' ref={emailRef} />
        </div>
        {inputError && <Alert variant='danger'>{inputError}</Alert>}
        <div className={classes.control}>
          <label htmlFor='password'>Password</label>
          <input type='password' required id='password' ref={passwordRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor='confirmPassword'>Confirm Password</label>
          <input type='password' required id='confirmPassword' ref={confirmPasswordRef} />
        </div>
        <div className={classes.actions}>
          <button disabled={isLoading}>Submit</button>
        </div>
      </form>
    </Card>
  );
}

export default RegisterForm;
