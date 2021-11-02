import React, {Component,useRef, useState, useEffect} from "react";
import { useTranslation } from "react-i18next";

import backIcon from './assets/backicon.svg'
import logoPiyion from './assets/logoPiyion.svg'

import './afterRecoverPassword.css'
function AfterRecoverPassword(props){
    //traducciónes
    const [t,i18n] = useTranslation("global");

    return(
        <div className="container-gen-afterRecoverPassword">

        <div className="container-tag-afterRecoverPassword">
          <img onClick={()=>{props.chageStateLoguin("singin")}} className="icon-tag-back-afterRecoverPassword" src={backIcon}></img>  
          <div onClick={()=>{props.chageStateLoguin("singin")}}  className="tag-afterRecoverPassword" >{t("login.back")}</div>
        </div>

        <div className="container-logo-afterRecoverPassword">
              <img className="logo-img-afterRecoverPassword" src={logoPiyion}></img>
        </div>

        <div className="title-afterRecoverPassword">
            {t("login.title-recover-pass")}
        </div>

        <div className="zone-inputs-afterRecoverPassword">
            <div className="text-description-afterRecoverPassword">
              {t("login.p-recover-pass")}
            </div>
        </div>  

    </div>
    )
}

export default AfterRecoverPassword