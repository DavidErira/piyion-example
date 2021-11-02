import React, {Component,useRef, useState, useEffect} from "react";
import { useTranslation } from "react-i18next";

import './recoverPassword.css'
import InputNinus from "../../inputNinus/inputNinus";
import emailIcon from './assets/emailicon.svg'
import backIcon from './assets/backicon.svg'
import logoPiyion from './assets/logoPiyion.svg'

import {sendEmailForRecoverPassword} from "../../../firebaseHandler/authFirebase"
import CustomButton from "../../customButton/customButton";

function RecoverPassword(props){

    //traducciónes
    const [t,i18n] = useTranslation("global");

    const [emailUser,setEmailUser] = useState("");
    const [errorRecoverPassword,setErrorRecoverPassword] = useState("");


    function examineData(){
        var existError = false
        if(emailUser==""){
            setErrorRecoverPassword(t("login.error-empty-fields"));
            existError=true;
        };
        return(existError)
    }

    function sendEmailWhitRecoverPassword(){

      return new Promise((resolve, reject) => {
        sendEmailForRecoverPassword(emailUser).then(()=>{
            //Redirigimos al lugar posterior al envio del email cuando este fué exitoso
            props.chageStateLoguin("afterrecoverpassword")
            resolve()
        }).catch((error)=>{
            if(error.code == "auth/invalid-email"){
                setErrorRecoverPassword("El correo electrónico es invalido")
            }
            if(error.code == "auth/missing-android-pkg-name"){
                setErrorRecoverPassword("Error Android")
            }
            if(error.code == "auth/missing-continue-uri"){
                setErrorRecoverPassword("No existe una URL de continuación para el proceso, comunicarse con NINUS.com")
            }
            if(error.code == "auth/missing-ios-bundle-id"){
                setErrorRecoverPassword("Error IOS")
            }
            if(error.code == "auth/invalid-continue-uri"){
                setErrorRecoverPassword("Error en la URL de continuación, comuniquese con NINUS.com")
            }
            if(error.code == "auth/unauthorized-continue-uri"){
                setErrorRecoverPassword("Domunio de la URL de continuación errado, comuniquese con NINUS.com")
            }
            if(error.code == "auth/user-not-found"){
                setErrorRecoverPassword("No existe ningun usuario con este correo electrónico")
            }
            reject()
        });
      })
        
    }


    function controlSendEmail(){
        if(!examineData()){
          return new Promise((resolve, reject) => {
            sendEmailForRecoverPassword(emailUser).then(()=>{
                //Redirigimos al lugar posterior al envio del email cuando este fué exitoso
                props.chageStateLoguin("afterrecoverpassword")
                resolve()
            }).catch((error)=>{
                if(error.code == "auth/invalid-email"){
                    setErrorRecoverPassword(t("login.error-invalid-email"))
                }
                if(error.code == "auth/missing-android-pkg-name"){
                    setErrorRecoverPassword("Error Android")
                }
                if(error.code == "auth/missing-continue-uri"){
                    setErrorRecoverPassword(t("login.error-missing-continue-uri"))
                }
                if(error.code == "auth/missing-ios-bundle-id"){
                    setErrorRecoverPassword("Error IOS")
                }
                if(error.code == "auth/invalid-continue-uri"){
                    setErrorRecoverPassword(t("login.error-missing-continue-uri"))
                }
                if(error.code == "auth/unauthorized-continue-uri"){
                    setErrorRecoverPassword(t("login.error-unauthorized-continue-uri"))
                }
                if(error.code == "auth/user-not-found"){
                    setErrorRecoverPassword(t("login.error-user-not-found"))
                }
                reject()
            });
          })
        }else{
          return new Promise((resolve, reject) => {
            reject();
          })
        }
    }

    return(
        <div className="container-gen-recoverPassword">

            <div className="container-tag-recoverPassword">
              <img onClick={()=>{props.chageStateLoguin("singin")}} className="icon-tag-back-recoverPassword" src={backIcon}></img>  
              <div onClick={()=>{props.chageStateLoguin("singin")}}  className="tag-recoverPassword" >{t("login.back")}</div>
            </div>

             <div className="container-recoverPassword">
              <img className="logo-img-recoverPassword" src={logoPiyion}></img>
             </div>

            <div className="title-recoverPassword">
                {t("login.title-forgot-password")}
            </div>
          
            <div className="zone-inputs-recoverPassword">
                <div className="text-description-recoverPassword">
                    {t("login.p-forgot-password")}
                </div>
                <InputNinus seterValue={setEmailUser} icon={emailIcon} title={t("login.input-email")}></InputNinus>
                <CustomButton promessOnclick={controlSendEmail} /* onClick={controlSendEmail} */ width="100%"  value={t("login.send-forgot-password")}></CustomButton>
            </div>

            <div className="zone-error-recoverPassword">
                {errorRecoverPassword}
            </div>

        </div>
    )
}

export default RecoverPassword