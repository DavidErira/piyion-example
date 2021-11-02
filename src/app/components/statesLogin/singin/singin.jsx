import React, {Component,useRef, useState, useEffect, version} from "react";
import { motion, useAnimation } from "framer-motion";
import { useTranslation } from "react-i18next";

import './singin.css';

import InputNinus from "../../inputNinus/inputNinus";
import ButtonLoginGoogle from "../../buttonLoginGoogle/buttonLoginGoogle";
import AnimatedIcons from "../../animatedIcons/animatedIcons";
import CustomButton from "../../customButton/customButton";

import {singInUser} from "../../../firebaseHandler/authFirebase"

import admirationIcon from './assets/admirationicon.svg'
import emailIcon from './assets/emailicon.svg'
import passwordIcon from './assets/passwordicon.svg'
import logoPiyion from './assets/logoPiyion.svg'

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
    useHistory,
    useLocation
  } from "react-router-dom";

function Singin(props) {

    //traducciónes
    const [t,i18n] = useTranslation("global");

    let history = useHistory();

    /* Datos de ingreso para registro */
    const [emailUser,setEmailUser] = useState("");
    const [passwordUser,setPasswordUser] = useState("");

    /* mensaje que describe el error al crear usuarios, este mensaje es para el usuario*/
    const [messageError,setMessageError] = useState("");

    /* alertas para los inputs */
    const [alertEmailUser,setAlertEmailUser] = useState(false);
    const [alertPasswordUser,setAlertPasswordUser] = useState(false);

    //Variables de control para animacion de iconos
    const [startAnimIcons, setStartAnimIcons] = useState(false);
    const [endAnimIcons,setEndAnimIcons] = useState(false);

    //variales de control de role visual
    const [roleSelect, setRoleSelect] = useState("ADMIN");
    const animItemAdmin = useAnimation();
    const animItemAdviser = useAnimation();
    const animZoneSelect = useAnimation();

    /*  muestra un mensaje de error y marca los input errados */
    const controlErrors = (arraySetAlertInput,message)=>{
        arraySetAlertInput.map((setAlertInput,index)=>(
            setAlertInput(true)
        ))
        setMessageError(message)
    }

    /* regresa las alertas en los inputs a ninguna */
    function refreshAlerts(){
        setAlertEmailUser(false);
        setAlertPasswordUser(false);
        setMessageError("");
    }

    /* Funcion para examinar los datos e informar de errores al usuario */
    function examineData(){
        refreshAlerts();
        let existError = false;
        if(emailUser==""){
            controlErrors([setAlertEmailUser],t("login.error-empty-fields"));
            existError=true;
        }
        if(passwordUser==""){
            controlErrors([setAlertPasswordUser],t("login.error-empty-fields"));
            existError=true;
        }
        return(existError);
    }


    /* Control para examinar los campos antes del ingreso en firebase, igualmente 
    firebase examina los campos con sus proprios codigos de error */
    function controlRegistro(){
      let existError = examineData();
        if(!existError){
          return new Promise((resolve,reject)=>{
            singInUser(emailUser,passwordUser).then((user)=>{
              props.setUserObj(user);
              resolve();
            }).catch((error)=>{
                if(error.code=="auth/invalid-email"){
                    controlErrors([setAlertEmailUser],t("login.error-invalid-email"));
                }
                else if(error.code=="auth/user-disabled"){
                    controlErrors([setAlertEmailUser],t("login.error-user-disabled"));
                }
                else if(error.code=="auth/user-not-found"){
                    controlErrors([setAlertEmailUser],t("login.error-user-not-found"));
                }
                else if(error.code=="auth/wrong-password"){
                    controlErrors([setAlertPasswordUser],t("login.error-wrong-password"));
                }
                else{
                    controlErrors([],error.message);
                }
                reject();
            });
          })
        }
        else{
          return new Promise((resolve,reject)=>{
            reject();
          })
        }
    }

    const clickHandlerChangeRoleAdmin = (e)=>{
      setRoleSelect("ADMIN");
      props.setRoleSelect("ADMIN")
    }
    const clickHandlerChangeRoleAdviser = (e)=>{
      setRoleSelect("ADVISER");
      props.setRoleSelect("ADVISER")
    }
    const hoverHandlerRoleAdviser = ()=>{
      if(roleSelect == "ADMIN"){
        animZoneSelect.start({
          backgroundColor: "rgba(158, 105, 243,1)",
          transition: {ease:"easeIn",duration:"0.1"}
        })
      }
    }
    const hoverOutHandlerRoleAdviser = ()=>{
      if(roleSelect == "ADMIN"){
        animZoneSelect.start({
          backgroundColor: "rgba(158, 105, 243,0.6)",
          transition: {ease:"easeIn",duration:"0.1"}
        })
      } 
    }
    const hoverHandlerRoleAdmin = ()=>{
      if(roleSelect == "ADVISER"){
        animZoneSelect.start({
          backgroundColor: "rgba(158, 105, 243,1)",
          transition: {ease:"easeIn",duration:"0.1"}
        })
      }
      
    }
    const hoverOutHandlerRoleAdmin = ()=>{
      if(roleSelect == "ADVISER"){
        animZoneSelect.start({
          backgroundColor: "rgba(158, 105, 243,0.6)",
          transition: {ease:"easeIn",duration:"0.1"}
        })
      } 
    }

    //Animación para el selector de role
    useEffect(()=>{
      if(props.roleSelect == "ADVISER"){
        animItemAdmin.start({
          backgroundColor:"rgba(255, 255, 255, 0)",
          transition: {ease:"easeIn",duration:"0.1"}
        })
        animItemAdviser.start({
          backgroundColor:"#fff",
          transition: {ease:"easeIn",duration:"0.1"}
        })
      }
      if(props.roleSelect == "ADMIN"){
        animItemAdmin.start({
          backgroundColor:"#fff",
          transition: {ease:"easeIn",duration:"0.1"}
        })
        animItemAdviser.start({
          backgroundColor:"rgba(255, 255, 255, 0)",
          transition: {ease:"easeIn",duration:"0.1"}
        })
      }
      animZoneSelect.start({
        backgroundColor: "rgba(158, 105, 243,0.6)",
        transition: {ease:"easeIn",duration:"0"}
      })
    },[props.roleSelect])

    useEffect(()=>{
      setTimeout(()=>{
          setStartAnimIcons(true);
      },1000)
    },[])

    return(
        <div className="container-gen1-singin">
            
            <div  className="title-desktop-singin">
                {t("login.login-title")} Piyion
            </div> 
            <div  className="title-movile-singin">
                {t("login.login-title")}
                <img className="logo-img-singin" src={logoPiyion}>
                </img>
            </div>            

            <div className="container-zones-inputs-otherslogin-singin">
                <div className="zone-inputs-singin">
                    <div className="card-inputs-and-select-role-singin">
                      <motion.div animate={animZoneSelect} className="select-card-role-singin">
                            <motion.div onHoverStart={hoverHandlerRoleAdmin} onHoverEnd={hoverOutHandlerRoleAdmin} onClick={clickHandlerChangeRoleAdmin} animate={animItemAdmin} className="item-select-singin">
                              <div style={{borderBottom: props.roleSelect=="ADMIN" ? "solid 2px #9E69F3" : "solid 0px #9E69F3"}} className="text-item-select-singin"> {t("login.role-admin")} </div>
                            </motion.div>
                            <motion.div onHoverStart={hoverHandlerRoleAdviser} onHoverEnd={hoverOutHandlerRoleAdviser} onClick={clickHandlerChangeRoleAdviser} style={{backgroundColor:"rgba(0, 0, 0, 0)"}} animate={animItemAdviser} className="item-select-singin">
                              <div style={{borderBottom: props.roleSelect=="ADVISER" ? "solid 2px #9E69F3" : "solid 0px #9E69F3", color:"#000"}} className="text-item-select-singin"> {t("login.role-adviser")} </div>
                            </motion.div>
                      </motion.div>
                      <div className="container-inputs-card-singin">
                        <InputNinus alertError={alertEmailUser} seterValue={setEmailUser} type="email" icon={emailIcon} title={t("login.input-email")}></InputNinus>
                        <InputNinus alertError={alertPasswordUser} seterValue={setPasswordUser} type="password" icon={passwordIcon} title={t("login.input-password")}></InputNinus>
                        <div ></div>
                        <CustomButton promessOnclick={controlRegistro} /* onClick={controlRegistro} */ height="35px" width="100%"  value={t("login.button-login-enter")}></CustomButton>
                      </div> 
                    </div>
                    <div style={{height:"10px"}}></div>
                    <div onClick={()=>{props.chageStateLoguin("recoverpassword")}} style={{marginTop:"10px"}} className="tag-singin"> 
                        <img className="icon-admiration-singin" src={admirationIcon}></img>{t("login.button-forgot-password")}
                    </div>
                    <div style={{height:"8px"}}></div>
                    <div onClick={()=>{props.chageStateLoguin("createuser")}} className="tag-singin">{t("login.button-create-acount")}</div>
                </div>
                <div className="zone-errors-singin">
                    {messageError}
                </div>
                <div className="zone-otherslogin-singin">
                    <div className="container-or-singin">
                        <div className="rect-or-singin"></div> <div>ó</div> <div className="rect-or-singin"></div>
                    </div>
                    <div style={{width:"90%",marginTop:"10px"}}>
                        <ButtonLoginGoogle setUser={props.setUserObj} setMsgError={setMessageError}></ButtonLoginGoogle>
                    </div>
                </div>
                <div className="containermovile-icons">
                      <AnimatedIcons indentify="singin" mode="2" start={startAnimIcons} setEndAnimate={setEndAnimIcons} ></AnimatedIcons>
                </div>
            </div>
        </div>
    );
}

export default Singin;