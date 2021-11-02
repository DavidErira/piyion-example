import React, {Component,useRef, useState, useEffect} from "react";
import { useTranslation } from "react-i18next";
import './waitEmailVerification.css'

import {listenUserVerificate} from '../../../firebaseHandler/authFirebase'
import CustomButton from "../../customButton/customButton";
import logoPiyion from './assets/logoPiyion.svg'

function WaitEmailVerification(props){

    //traducciónes
    const [t,i18n] = useTranslation("global");
   
    const[activeIn,setActiveIn] = useState("0.5");
    const[buttonDisabled,setButtonDisabled] = useState(true);
    const[userFirebase,setUserFirebase]= useState(null);

    const [errorVerification,setErrorVerification]= useState(null);

    const [Text, setText] = useState("");

    useEffect(()=>{
      setText(t("login.p1-verify-email")+props.emailUser+t("login.p2-verify-email"))
    })

    const clickEnter = ()=>{
        //se envia el objeto user
        props.setUserObj(userFirebase);
    }

    useEffect(()=>{
        /* Se ejecuta listener de usuario verificado por correo */
        listenUserVerificate(props.userObj).then((user)=>{
            //se coloca el usurio en null para enviarlo cuando se ejecute el boton de ingresar
            props.setUserObj(null);
            setUserFirebase(user);
            setButtonDisabled(false);
            setActiveIn("1");
        }).catch((error)=>{
            setErrorVerification("No se pudo completar la verificación, tiempo expirado");
        });
    },[])

    return(
        <div className="container-gen-waitEmailVerification">
 
            <div className="container-logo-waitEmailVerification">
              <img className="logo-img-waitEmailVerification" src={logoPiyion}></img>
            </div>
            
            <div className="title-waitEmailVerification">
              {t("login.title-verify-email")}
            </div>

            <div className="zone-inputs-waitEmailVerification">
                <div className="text-description-waitEmailVerification">
                    {Text}
                </div>
                {/* <button onClick={clickEnter} disabled={buttonDisabled} style={{opacity:activeIn}} className="button-waitEmailVerification">INGRESAR</button> */}
                <CustomButton height="40px" disabled={buttonDisabled} opacity={activeIn} onClick={clickEnter} width="100%"  value={t("login.enter-verify-email")}></CustomButton>
            </div>
            <div className="zone-error-waitEmailVerification">
                {errorVerification}
            </div>  
        </div>
    )
}

export default WaitEmailVerification