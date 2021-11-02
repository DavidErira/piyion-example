import React, {Component,useRef, useState, useEffect} from "react";
import movElementAdmin from './assets/mov-element-admin.svg'
import movElementAdviser from './assets/mov-element-adviser.svg'

import "./backgroundLogin.css"
function BackgroundLogin(props) {

  const[movElementActual , setMovElementActual] = useState();
  const [backGroundColorActual , setBackGroundColorActual] = useState();

  useEffect(()=>{
    if(props.roleSelect == "ADMIN"){
      setMovElementActual(movElementAdmin)
      setBackGroundColorActual("var(--color-background-login-administrador)");
    }
    if(props.roleSelect == "ADVISER"){
      setMovElementActual(movElementAdviser)
      setBackGroundColorActual("var(--color-background-login-asesor)");
    }

  },[props.roleSelect])

  return(
    <div style={{backgroundColor:backGroundColorActual}} className="container-gen-backgroundlogin">
      <img className="elements-mov-backgroundlogin" src={movElementActual}></img>
    </div>
  )
}

export default BackgroundLogin;