import { useRef } from 'react';
import { Alert } from 'react-bootstrap';

import Card from '../../ui/Card';
import classes from '../../auth/login/LoginForm.module.css';


function LoginForm(props) {
  const emailRef = useRef();
  const passwordRef = useRef();
  const {isLoading,error} = props.state

  function submitHandler(event) {
    event.preventDefault();

    const enteredEmail = emailRef.current.value;
    const enteredPassword = passwordRef.current.value;

    const UserData = {
      email: enteredEmail,
      password: enteredPassword,
    };


    props.onLogin(UserData);
  }

  return (
    <Card>
      {error && <Alert variant='danger'>{error}</Alert>}
      <form className={classes.form} onSubmit={submitHandler}>
        
        <div className={classes.control}>
          <label htmlFor='email'>Email Address</label>
          <input type='email' required id='email' ref={emailRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Password</label>
          <input type='password' required id='password' ref={passwordRef} />
        </div>
      
        <div className={classes.actions}>
          <button disabled={isLoading}>Submit</button>
        </div>
      </form>
    </Card>
  );
}

export default LoginForm;
