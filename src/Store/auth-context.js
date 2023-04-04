import { useState,useEffect} from "react";
import React from 'react';
const AuthContext=React.createContext({
token : '',
isLoggedIn : false,
login : (token) =>{},
logout : ()=>{}
});

 export const AuthContextProvider=(props)=>{
    const initialToken=localStorage.getItem('token');
const [token, setToken]=useState(initialToken);

const userIsLoggedIn=!!token;

const loginHandler=(token)=>{

    setToken(token);
    localStorage.setItem('token',token);
};

const logoutHandler=()=>{
  setToken(null);
  localStorage.removeItem('token');
};

useEffect(() => {
    let logoutTimer;
    if (token) {
      const expirationTime = 5000000;
      logoutTimer = setTimeout(() => {
        logoutHandler();
      }, expirationTime);
    }
    return () => {
      clearTimeout(logoutTimer);
    };
  }, [token]);


const contextValue={
    token : token,
    isLoggedIn : userIsLoggedIn,
    login : loginHandler,
    logout : logoutHandler
}

return <AuthContext.Provider value={contextValue}>
    {props.children}
</AuthContext.Provider>
};


export default AuthContext;