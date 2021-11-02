import React, {Component,useRef, useState, useEffect} from "react";
import { useTranslation } from "react-i18next";
import './createUser.css'

import InputNinus from "../../inputNinus/inputNinus";
import { registerUser } from "../../../firebaseHandler/authFirebase";

import CustomButton from "../../customButton/customButton";

import emailIcon from './assets/emailicon.svg'
import passwordIcon from './assets/passwordicon.svg'
import userInfoIcon from './assets/userinfoicon.svg'
import backIcon from './assets/backicon.svg'
import logoPiyion from './assets/logoPiyion.svg'
import firebase from "firebase";

function CreateUser(props){

    //traducciónes
    const [t,i18n] = useTranslation("global");

    /* Datos de ingreso para registro */
    const [nameUser,setNameUser] = useState("");
    const [emailUser,setEmailUser] = useState("");
    const [passwordUser,setPasswordUser] = useState("");
    const [repeatRepasswordUser,setRepeatEmailUser] = useState("");
    const [aceptPolitics1, setAceptPolitics1] = useState(false);
    const [aceptPolitics2, setAceptPolitics2] = useState(false);

    /* mensaje que describe el error al crear usuarios */
    const [messageError,setMessageError] = useState("");

    /* alertas para cada input */
    const [alertNameUser,setAlertNameUser] = useState(false);
    const [alertEmailUser,setAlertEmailUser] = useState(false);
    const [alertPasswordUser,setAlertPasswordUser] = useState(false);
    const [alertRepeatRepasswordUser,setAlertRepeatRepasswordUser] = useState(false);

    /*  muestra un mensaje de error y marca los input errados */
    const controlErrors = (arraySetAlertInput,message)=>{
                arraySetAlertInput.map((setAlertInput,index)=>(
            setAlertInput(true)
        ))
          setMessageError(message)
    }

    /* regresa las alertas en los inputs a ninguna */
    function refreshAlerts(){
        setAlertNameUser(false);
        setAlertEmailUser(false);
        setAlertPasswordUser(false);
        setAlertRepeatRepasswordUser(false);
        setMessageError("");
    }

    /* Funcion para examinar los datos e informar de errores al usuario */
    function examineData(){
        refreshAlerts();
        let existError = false;
        //Examinar campos vacios, alguno o todos        
        if(nameUser==""){
            controlErrors([setAlertNameUser],t("login.error-empty-fields"));
            existError=true;
        }
        if(emailUser==""){
            controlErrors([setAlertEmailUser],t("login.error-empty-fields"));
            existError=true;
        }
        if(passwordUser==""){
            controlErrors([setAlertPasswordUser],t("login.error-empty-fields"));
            existError=true;
        }
        if(repeatRepasswordUser==""){
            controlErrors([setAlertRepeatRepasswordUser],t("login.error-empty-fields"));
            existError=true;
        }
         //Examinar contraseñas iguales
        if(passwordUser!=repeatRepasswordUser){
            controlErrors([setAlertPasswordUser,setAlertRepeatRepasswordUser],t("login.error-password-dif"));
            existError=true;
        }
        //examina checks de politicas
        if(!(aceptPolitics1 && aceptPolitics2)){
          controlErrors([],t("login.error-no-acept-term"));
          existError=true;
        }
        return(existError);
    }

    const clickCheckPolitics1 = (e)=>{
      setAceptPolitics1(e.target.checked)
    }

    const clickCheckPolitics2 = (e)=>{
      setAceptPolitics2(e.target.checked)
    }


  
    /* Control para examinar los campos antes del registro en firebase, igualmente 
    firebase examina los campos con sus proprios codigos de error */
    function controlRegistro(){
        let existError = examineData();
        if(!existError){
          return new Promise((resolve,reject)=>{
            registerUser(emailUser,passwordUser,nameUser).then((user)=>{
                props.setUserObj(user);
                props.setEmailUser(emailUser);
                props.chageStateLoguin("waitemailverification");
                resolve();
            }).catch((error)=>{
                if(error.code=="auth/invalid-email"){
                    controlErrors([setAlertEmailUser],t("login.error-invalid-email"));
                }
                if(error.code=="auth/weak-password"){
                    controlErrors([setAlertPasswordUser,setAlertRepeatRepasswordUser],t("login.error-weak-password"));
                }
                if(error.code=="auth/email-already-in-use"){
                    controlErrors([setAlertEmailUser],t("login.error-email-already-in-use"));
                }
                else{
                    controlErrors([],error.code);
                }
                reject();
            });
          })
        }else{
          return new Promise((resolve,reject)=>{
            reject();
          })
        }
    }

    return(
        <div className="container-gen-createUser">
            <div  className="container-tag-createUser">
              <img onClick={()=>{props.chageStateLoguin("singin")}} className="icon-tag-back-createUser" src={backIcon}></img>  
              <div onClick={()=>{props.chageStateLoguin("singin")}} className="tag-createUser" >{t("login.back")}</div>
            </div>

            <div className="title-createUser">
              ¡{t("login.reguister-title")} Piyion!
            </div>

            <div className="title-movile-createUser">
              {t("login.reguister-title")}
              <img className="logo-img-createUser" src={logoPiyion}>
              </img>
            </div>

            <div className="subtitle-createUser">
              {t("login.p-register")} <text style={{color:"var(--violeta-piyion-1)"}}>
              {
                props.roleSelect =="ADMIN" ?
                t("login.p-role-admin-register")
                :
                t("login.p-role-adviser-register")
              }  
              </text>  
            </div>
            <div className="container-zones-inputs-register-createUser">
                
                <div className="zone-inputs-createUser">
                    <div className="zone-errors-createUser">
                        {messageError}
                    </div>
                    <InputNinus alertError={alertNameUser} seterValue={setNameUser} icon={userInfoIcon} title={t("login.input-name-user")}></InputNinus>
                    <InputNinus alertError={alertEmailUser} seterValue={setEmailUser} icon={emailIcon} title={t("login.input-email")}></InputNinus>
                    <InputNinus type="password" alertError={alertPasswordUser} seterValue={setPasswordUser} icon={passwordIcon} title={t("login.input-password")}></InputNinus>
                    <InputNinus type="password" alertError={alertRepeatRepasswordUser} seterValue={setRepeatEmailUser} icon={passwordIcon} title={t("login.inpit-rep-password")}></InputNinus>
                </div>
                
                <div className="container-politics-createUser">
                  <div className="item-politics-createUser"> <input onChange={clickCheckPolitics1} className="check-politics-createUser" type="checkbox"></input> {t("login.acept-terms")} <a className="link-politics-createUser" href="https://www.google.com" target="_blank"> {t("login.terms")}</a> </div>
                  <div className="item-politics-createUser"> <input onChange={clickCheckPolitics2} className="check-politics-createUser" type="checkbox"></input> {t("login.acept-privacy")} <a className="link-politics-createUser" href="https://www.google.com" target="_blank"> {t("login.privacy")}</a> </div>
                </div>

                <div className="zone-register-createUser">
                   <CustomButton promessOnclick={controlRegistro}  /* onClick={controlRegistro} */ width="100%"  value={t("login.button-register")}></CustomButton>
                </div>
            </div>
        </div>
    )
}

export default CreateUser