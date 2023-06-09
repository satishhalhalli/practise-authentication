import { useState,useRef, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import classes from './AuthForm.module.css';
import AuthContext from '../../Store/auth-context';

const AuthForm = () => {
  const history=useHistory();
  const [isLogin, setIsLogin] = useState(true);
  const [loading,Setloading]=useState(false);
  const emailInput=useRef();
  const passwordInput=useRef();


  const authCtx=useContext(AuthContext);
  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };
  const submitHandler=(e)=>{
    e.preventDefault();
    const enteredEmail=emailInput.current.value;
    const enteredPassword=passwordInput.current.value;

   

    if(isLogin){ 
       Setloading(true);
      
       fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBUvqi5PJyduweg6GBYJ3g3FtdVS_qvIGA' 

       ,{
        method:"POST",
        body:JSON.stringify({
          email:enteredEmail,
          password:enteredPassword,
          returnSecureToken:true,
        }),
        headers:{
          'Content-Type':'application/json'
        }
      }).then(res=>{
        if(res.ok){
           Setloading(false);
          return res.json();
          
       
        }
        else{
          Setloading(false);
            res.json().then(data=>{
           
            console.log("ELSE",data)
            alert(data.error.message)
          })
        }
      }).then((data)=> {
        authCtx.login(data.idToken);
      }).catch((err)=>alert(err))
    
    }else{
        Setloading(true);
        
        fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBUvqi5PJyduweg6GBYJ3g3FtdVS_qvIGA',{
        method:"POST",
        body:JSON.stringify({
          email:enteredEmail,
          password:enteredPassword,
          returnSecureToken:true,
        }),
        headers:{
          'Content-Type':'application/json'
        }
      }).then(res=>{
        if(res.ok){
           console.log(res)
        Setloading(false);



        }
        else{
          Setloading(false);
            res.json().then(data=>{
           
            console.log("ELSE",data)
            alert(data.error.message)
          })
        }
      })
    }
    }
      
    


   

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' required  ref={emailInput}/>
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input type='password' id='password' required ref={passwordInput} />
        </div>
        <div className={classes.actions}>
          <button>{isLogin ? 'Login' : 'Create Account'}</button>
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
           {loading && <p>LOADING PLZ wait...</p>}
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
         
        </div>
      </form>
    </section>
  );
};

export default AuthForm;