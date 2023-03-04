import React, { useState, useEffect, useReducer } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";

//Note : this reducer function can be created outside the scope of component function
  //It does not required any thing from component and values will be passed by react if required
  //NOTE:  react  also garaenty that state is always latest
  const emailReducer = (state, action) => {
    if(action.type==='USER_INPUT'){
      return { value: action.val, isValid: action.val.includes("@") };
    }
    if(action.val === 'INPUt_BLUR'){
      return { value: state.val, isValid: state.val.includes("@") };
    }
    return { value: "", isValid: false };
  };

  const passwordReducer = (state, action) => {
    if(action.type==='USER_INPUT'){
      return { value: action.val, isValid: action.val.trim().length>6) };
    }
    if(action.val === 'INPUt_BLUR'){
      return { value: state.val, isValid: state.val.trim().length>6 };
    }
    return { value: "", isValid: false };
  };


const Login = (props) => {
  const [formIsValid, setFormIsValid] = useState(false);

  //Note : To manage both email value and validity in on state using reducer
  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: "",
    isValid: null,
  });

  //Note : To manage both password value and validity in on state using reducer
  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: "",
    isValid: null,
  });

  const {isValid : emailIsVaild } = emailState;
  const {isValid : passwordIsValid} = passwordState;

  useEffect(() => {
    const identifier = setTimeout(() => {
      console.log("Checking validating ");
      setFormIsValid(
        emailIsVaild && passwordIsValid
      );
    }, 500);

    return () => {
      console.log("Cleanup");
      clearTimeout(identifier);
    };
  }, [emailIsVaild, passwordIsValid]);


  const emailChangeHandler = (event) => {
    dispatchEmail({type: 'USER_INPUT', val:event.target.value})

    //this is Still not optimal as passwordState may give not latest value Shduled update in react 
    // setFormIsValid(
    //   event.target.value.includes("@") && passwordState.isValid
    // );
  };

  
  const passwordChangeHandler = (event) => {
    dispatchPassword({type: 'USER_INPUT', val:event.target.value})

    //this is Still not optimal as passwordState may give not latest value Shduled update in react 
    // setFormIsValid(
    //   event.target.value.trim().length > 6 && emailState.isValid
    // );
  };

  const validateEmailHandler = () => {
    dispatchEmail({type : 'INPUT_BLUR'})
  };

  const validatePasswordHandler = () => {
    dispatchPassword({type : 'INPUT_BLUR'})
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailState.value, emailState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailState.isValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordState.isValid ? classes.invalid : ""
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
