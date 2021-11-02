import React, {Component,useRef, useState, useEffect} from "react";
import { useTranslation } from "react-i18next";
import Select from 'react-select'

import './login.css'
import '../../App.css'

//import de componentes
import Header from "../../components/header/header";
import AnimatedText from "../../components/animatedText/animatedText";
import AnimatedIcons from "../../components/animatedIcons/animatedIcons";
import LogoNinusChat from "../../components/logoNinusChat/logoNinusChat";
import ControlStatesLogin from "../../controlComponents/controlStatesLogin/controlStatesLogin";
import BackgroundLogin from "../../components/backgroundLogin/backgroundLogin"
import iconNinus from "./assets/ninusIcon.svg"
import spanichIcon from "./assets/spanishIcon.png"

import SelectIdiomS from "../../components/selectIdiomS/selectIdiomS"

function Login(props) {

    //traducciónes
    const [t,i18n] = useTranslation("global");

    const micons = "esta es mi nueva constante string"

    //variables de control para animación del componente de texto animado
    const [startAnimLeter, setStartAnimLeter] = useState(false);
    const [endAnimateLeter,setEndAnimateLeter] = useState(false);

    //Variables de control para animacion de iconos
    const [startAnimIcons, setStartAnimIcons] = useState(false);
    const [endAnimIcons,setEndAnimIcons] = useState(false);

    //Role seleccionado
    const [roleSelect, setRoleSelect] = useState("ADMIN");

    /*  istener para conocer cuando la animación de letras termina, se ejecuta cada vez 
        que endAnimateLeter tiene un cambio en  endAnimateLeter y endAnimIcons*/
    useEffect(() => {
      if(endAnimateLeter){
        //se lanza animación de iconos cuando se termina de animar letras
        setTimeout(()=>{
          setStartAnimIcons(true);
        },500)
      }
      //Se ejecuta cuando se finaliza la animación de los iconos
      /* if(endAnimIcons){
        console.log("Termina de animar iconos ")
      } */
    },[endAnimateLeter,endAnimIcons])

    // Se ejecuta en el primer render
    useEffect(() => {
      setStartAnimLeter(true)
    },[])

    return (
      <div className="container-gen-login">

        <BackgroundLogin roleSelect = {roleSelect} ></BackgroundLogin>
       
        <div className="container-body">
          {/* ZONA de login  */}
          <div className="container-zone-login">   
            {/* Zona de presentación, Logo NinusChat, Texto e Iconos animados  */}    
            <div className="zone-logo-text-icons">
              <div></div>
              <LogoNinusChat ></LogoNinusChat>
              <div></div>
              <AnimatedText start={startAnimLeter} setEndAnimate={setEndAnimateLeter}></AnimatedText>
              <AnimatedIcons  indentify="login" start={startAnimIcons} setEndAnimate={setEndAnimIcons} ></AnimatedIcons>
            </div>

            {/* Fragmento medio con degradé */}
            <div className="login-degrade"></div>

            {/* Zona de cambios de estado en el proceso de login */}
            <div className="container-controlstatelogin">
            {/* El control de estados de login determina si se encuentra en 4 estados posibles, como:
              inisio de sesión regular,
              olvidó contraseña,
              registro,
              postRegistr verificación de correo
              Este componente tambien controla el Objeto de login, el cual estará disponible desde 
              firebase posteriormente, por lo tanto tambien realiza el cambio de pantalla */}
              <ControlStatesLogin roleSelect={roleSelect} setRoleSelect={setRoleSelect}></ControlStatesLogin>
            </div>
          </div> 
          {/* credenciales NINUS by NINUS fron NINUS :) */}
          <div className="credentials-escritorio-ninus-login">
           
            <div style={{width: "150px"}}></div>

            <div style={{display:"flex", alignItems:"center"}}>
              {t("login.cred")} <text style={{fontWeight:"600", marginLeft:"4px", color:"var(--violeta-piyion-1)"}}> Ninus</text>
              <img className="credentials-escritorio-icon-ninus-login" src = {iconNinus}></img>
            </div>

            <div className="container-idiom-select-login">
              <SelectIdiomS></SelectIdiomS>
            </div>

          </div>
        </div>
      </div>
    );
  }
  
export default Login;



<Header mode="3" nameUser="AAAAAA BBBB DDDDDDD"></Header> 


