import React, {Component,useRef, useState, useEffect, version} from "react";
import './buttonLoginGoogle.css'
import {singInWhitGoogle} from "../../firebaseHandler/authFirebase";
import { useTranslation } from "react-i18next";

import googleIcon from './assets/googleicon.svg';


function ButtonLoginGoogle(props) {

    //traducciónes
    const [t,i18n] = useTranslation("global");

    const clickHandler = () =>{
      singInWhitGoogle().then((user)=>{
        props.setUser(user)
      }).catch((error)=>{

        if(error.code=="auth/account-exists-with-different-credential"){
          props.setMsgError("Error con el correo electrónico")
        }

        if(error.code=="auth/auth-domain-config-required"){
          props.setMsgError("Dominio no configurado")
        }

        if(error.code=="auth/cancelled-popup-request"){
          props.setMsgError("Multiples intentos a la vez")
        }

        if(error.code=="auth/operation-not-allowed"){
          props.setMsgError("Tipo de cuenta no permitida")
        }

        if(error.code=="auth/popup-blocked"){
          props.setMsgError("El explorador bloqueó la ventana emergente")
        }

        if(error.code=="auth/popup-closed-by-user"){
          props.setMsgError("Por favor no cierres la ventana emergente !")
        }

        if(error.code=="auth/unauthorized-domain"){
          props.setMsgError("Dominio actual no autorizado para login ")
        }
        else{
          props.setMsgError(error.message)
        }
  
      })
    }

    return(
        <div onClick={clickHandler} className="container-gen-buttonlogingoogle"  onClick={clickHandler}>
            <img className="icon-buttonlogingoogle" src={googleIcon} ></img>
              {t("login.other-login")} google
            <div></div>
        </div>
    )
}

export default ButtonLoginGoogle