import { useState } from 'react';
import { useContext } from 'react';
import classes from './ProfileForm.module.css';
import AuthContext from '../../Store/auth-context';
import { useHistory } from 'react-router-dom';
const ProfileForm = () => {

  const history=useHistory();
  const [password,setpassword]=useState();
  const ctx=useContext(AuthContext)

  const PasswordHandler=(e)=>{
    
    setpassword(e.target.value)
  }

  const updatePossword=(e)=>{
    e.preventDefault();
     fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyBUvqi5PJyduweg6GBYJ3g3FtdVS_qvIGA' 
     ,
     { method:'POST',
    body:JSON.stringify({
      idToken:ctx.token ,
      password:password,
      returnSecureToken: true ,

    }),
    headers :{
      'Content-type':'application/json'
    }


  }).then(res=>{
        
        if(res.ok){
          
          return res.json()
       
}
        else{
        
          return res.json().then(data=>{
           alert(data.error.message)
          })
        }
      }).then((data)=>{ 
        console.log(data)
       history.replace('/');
      }).catch((err)=>console.log('Error',err.message))
    }



  
  

 
  return (
    <form className={classes.form}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' onChange={PasswordHandler} />
      </div>
      <div className={classes.action}>
        <button onClick={updatePossword}>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
