import React, {Component,useRef, useState, useEffect} from "react";
import { useTranslation } from "react-i18next";

import './reSendEmailVerification.css'
import InputNinus from "../../inputNinus/inputNinus";
import emailIcon from './assets/emailicon.svg'
import backIcon from './assets/backicon.svg'
import logoPiyion from './assets/logoPiyion.svg'

import {userVerificationWhitEmail} from "../../../firebaseHandler/authFirebase"
import CustomButton from "../../customButton/customButton";

function ReSendEmailVerification(props){

    //traducciónes
    const [t,i18n] = useTranslation("global");

    const [errorresendemailveri,setErrorresendemailveri] = useState("");


    function sendEmailWhitresendemailveri(){

        userVerificationWhitEmail(props.userObj).then(()=>{
          props.chageStateLoguin("waitemailverification");

        }).catch((error)=>{
          if(error.code == "auth/invalid-email"){
            setErrorresendemailveri(t("login.error-invalid-email"))
          }
          else if(error.code == "auth/missing-android-pkg-name"){
              setErrorresendemailveri("Error Android")
          }
          else if(error.code == "auth/missing-continue-uri"){
              setErrorresendemailveri(t("login.error-missing-continue-uri"))
          }
          else if(error.code == "auth/missing-ios-bundle-id"){
              setErrorresendemailveri("Error IOS")
          }
          else if(error.code == "auth/invalid-continue-uri"){
              setErrorresendemailveri(t("login.error-missing-continue-uri"))
          }
          else if(error.code == "auth/unauthorized-continue-uri"){
              setErrorresendemailveri(t("login.error-unauthorized-continue-uri"))
          }
          else if(error.code == "auth/user-not-found"){
              setErrorresendemailveri(t("login.error-user-disabled"))
          }
          else{
            setErrorresendemailveri(error.code)
          }
        })

    }

    const controlSendEmail=()=>{
        /* if(!examineData()){ */
            sendEmailWhitresendemailveri()
     /*    } */
    }

    return(
        <div className="container-gen-resendemailveri">

            <div className="container-tag-resendemailveri">
              <img onClick={()=>{props.chageStateLoguin("singin")}} className="icon-tag-back-resendemailveri" src={backIcon}></img>  
              <div onClick={()=>{props.chageStateLoguin("singin")}}  className="tag-resendemailveri" >{t("login.back")}</div>
            </div>

             <div className="container-resendemailveri">
              <img className="logo-img-resendemailveri" src={logoPiyion}></img>
             </div>

            <div className="title-resendemailveri">
                {t("login.title-resendemailve")}
            </div>
          
            <div className="zone-inputs-resendemailveri">
                <div className="text-description-resendemailveri">
                    {t("login.p-resendemailve")} {props.roleSelect=="ADMIN" ? t("login.p-role-admin-register"):t("login.p-role-adviser-register")}
                </div>
               {/*  <InputNinus seterValue={setEmailUser} icon={emailIcon} title={"Correo electrónico"}></InputNinus> */}
                <CustomButton onClick={controlSendEmail} width="100%"  value={t("login.button-resendemailve")}></CustomButton>
            </div>

            <div className="zone-error-resendemailveri">
                {errorresendemailveri}
            </div>

        </div>
    )
}

export default ReSendEmailVerification