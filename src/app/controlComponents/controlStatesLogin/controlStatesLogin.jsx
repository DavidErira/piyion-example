import React, {Component,useRef, useState, useEffect} from "react";
import { useTranslation } from "react-i18next";
import { motion, useAnimation } from "framer-motion"

import { isFirstLoged } from "../../firebaseHandler/dbFirebase";
import { uploadUserData } from "../../firebaseHandler/dbFirebase";
import iconNinus from "./assets/ninusIcon.svg"

import Singin from "../../components/statesLogin/singin/singin";
import CreateUser from "../../components/statesLogin/createUser/createUser";
import RecoverPassword from "../../components/statesLogin/recoverPassword/recoverPassword";
import AfterRecoverPassword from "../../components/statesLogin/afterRecoverPassword/afterRecoverPassword";
import WaitEmailVerification from "../../components/statesLogin/waitEmailVerification/waitEmailVerification";
import StatePreloader from "../../components/statesLogin/statePreloader/statePreloader";
import ReSendEmailVerification from "../../components/statesLogin/reSendEmailVerification/reSendEmailVerification";
import SelectIdiomS from "../../components/selectIdiomS/selectIdiomS"

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
    useHistory,
    useLocation
} from "react-router-dom";

import './controlStatesLogin.css'
function ControlStatesLogin(props){

    //traducciónes
    const [t,i18n] = useTranslation("global");

    let history = useHistory();

    const [stateLogin, setStateLogin] = useState("singin"); //change singin
    const [stateLoginDelay, setStateLoginDelay] = useState("singin"); //change singin
    const [stateLoginBefore,setStateLoginBefore]=useState(null);

    const [activePreloader, setActivePreloader]=useState(false);
    /* useEffect(()=>{
      setTimeout(()=>{
        setEndPreloader(true)
      },3000)
    }) */

    const [endPreloader, setEndPreloader]=useState(false);
    const [endAnimationPreloader,setEndAnimationPreloader]=useState(false);

    const controlsAnimaSingIn = useAnimation();
    const controlsCreateUser = useAnimation();
    const controlsRecoverPassword = useAnimation();
    const controlsAfterRecoverPassword = useAnimation();
    const controlsWaitEmailVerification = useAnimation();
    const controlsReSendEmailVe = useAnimation();

    /* este hook solamente se crea para la recepción del objeto User de firebase 
    (puede ser mutable en casos de otro tipo de login en ese caso debería crearse un objeto similar 
    que conserve la misma funcionalidad de User de firebase), solamente lo utilizan los componentes
    que crean un usuario o inician con un usuario y firebase regresa este objeto, inicialmente en null
    Si este objeto tiene un firebase.user es por que ya se puede ingresar al aplicativo*/
    const [userObj,setUserObj] = useState(null);

    /* Email de ingreso de usuario es necesario cuando se crea un usuario y se quiere conocer 
    a que correo se envía el Email */
    const [emailUser,setEmailUser] = useState("");

    /* Animaciones existentes  */

    /* Animación de arrastre a la derecha */
    const animationIn = {
        in:{   
                x:"0%",
                transition: { duration: 0.4 }
        },
        out:{
            x:"100%",
            transition: { duration: 0.2 }
        },
        hidden: {   
                    x:"-100%",
                },
    }

    /* Esta animación es una anulacion de animaciones solo para efectos de prueba */
    const animationNone = {
        in:{   
            transition: { duration: 0 }
        },
        out:{
            transition: { duration: 0 }
        },
        hidden: {   
            transition: { duration: 0 }
                },
    }

    /* la transición activa actualmente utilizada para la animación de 
    avanzar entre componentes de Login */
    const [activeTransition, setActiveTransition] =useState(animationIn);

    /* Control de animaciónes de salida de un estado de login */
    useEffect(() => {
        if(stateLoginBefore=="singin"){
            controlsAnimaSingIn.start("out")
        }
        if(stateLoginBefore=="createuser"){
            controlsCreateUser.start("out")
        }
        if(stateLoginBefore=="recoverpassword"){
            controlsRecoverPassword.start("out")
        }
        if(stateLoginBefore=="afterrecoverpassword"){
            controlsAfterRecoverPassword.start("out")
        }
        if(stateLoginBefore=="waitemailverification"){
            controlsWaitEmailVerification.start("out")
        }
        if(stateLoginBefore=="resendemailve"){
          controlsReSendEmailVe.start("out")
        }
        
        setTimeout(()=>{
            setStateLoginDelay(stateLogin);
        },200)
        
    },[stateLogin])

    /* Control de animaciónes de entrada de un estado de login */
    useEffect(()=>{
        if(stateLoginDelay=="singin"){
            controlsAnimaSingIn.start("in")
            setStateLoginBefore("singin");
        }
        if(stateLoginDelay=="createuser"){
            controlsCreateUser.start("in")
            setStateLoginBefore("createuser");
        }
        if(stateLoginDelay=="recoverpassword"){
            controlsRecoverPassword.start("in")
            setStateLoginBefore("recoverpassword");
        }
        if(stateLoginDelay=="afterrecoverpassword"){
            controlsAfterRecoverPassword.start("in")
            setStateLoginBefore("afterrecoverpassword");
        }
        if(stateLoginDelay=="waitemailverification"){
            controlsWaitEmailVerification.start("in")
            setStateLoginBefore("waitemailverification");
        }
        if(stateLoginDelay=="resendemailve"){
          controlsReSendEmailVe.start("in")
          setStateLoginBefore("resendemailve");
        }       
    },[stateLoginDelay])

    /* OBJETO MUY IMPORTANTE */
    /* Controlador del objeto resuelto para el login */
    useEffect(()=>{
        if(userObj!=null){
            /* se tiene un objeto de login de firebase Auth */
            if(userObj.emailVerified){
                //cambiar estado a preloader
                setActivePreloader(true)
                /* El usuario logeado tiene correo electrónico verificado, se continua con el proceso */
                console.log(userObj.uid)
                isFirstLoged(userObj.uid).then((name)=>{
                    console.log("then")
                    console.log("name is: "+name)
                        if(name != null && name != ""){
                            //parar preloader de login
                            setEndPreloader(true)
                            setTimeout(()=>{
                                console.log("usuario ya existe")
                                history.push("/panel")
                            },2500)
                        }else{
                            setEndPreloader(true)
                            setTimeout(()=>{
                              console.log("usuario ya existe")
                              history.push("/firstsettings")
                            },1000)

                        }
                }).catch((e)=>{
                    console.log("catch")
                    if(e=="NOEXIST"){
                         //se crea la rama con role = Admin resto de campos vacíos 
                         const dataUsers = {
                            ROLE: props.roleSelect,
                            ID:userObj.uid,
                         }
                         uploadUserData(dataUsers).then(()=>{
                            //parar preloader de login
                            setEndPreloader(true)
                            setTimeout(()=>{
                                /* Se debe ingresar a first Settings si es primera vez que realiza un registro */
                                history.push("/firstsettings")
                            },2500)
                         })
                    }
                })
                /* Si ya es un usuario registrado y solo está iniciando sesión se ingresa directamente al panel */
            }
            else{
                //Este usuario no esta verificado
                if(stateLoginDelay=="singin"){
                  setStateLogin("resendemailve")
                }else{
                  //console.log("ESTE USUARIO NO ESTA VERIFICADO");
                }
            }
        }       
    },[userObj])

    return(

      <div className="supercontainer-gen-controlStatesLogin">
        <div className="container-gen-controlStatesLogin">
          {   activePreloader ? 
              <StatePreloader endLoad={endPreloader}></StatePreloader>:
              null
          }
          {
              stateLoginDelay=="singin" ? 
              <motion.div  animate={controlsAnimaSingIn} variants={activeTransition} initial="hidden">
                  <Singin roleSelect={props.roleSelect} setRoleSelect={props.setRoleSelect} setUserObj={setUserObj} chageStateLoguin={setStateLogin}></Singin> 
              </motion.div>
              :
              <div></div>
          }     
          {
              stateLoginDelay=="createuser" ? 
              <motion.div  animate={controlsCreateUser} variants={activeTransition} initial="hidden">
                  <CreateUser roleSelect={props.roleSelect} setEmailUser={setEmailUser} setUserObj={setUserObj} chageStateLoguin={setStateLogin}></CreateUser> 
              </motion.div>
              :
              <div></div>
          }
          {
              stateLoginDelay=="recoverpassword" ? 
              <motion.div  animate={controlsRecoverPassword} variants={activeTransition} initial="hidden">
                  <RecoverPassword chageStateLoguin={setStateLogin}></RecoverPassword> 
              </motion.div>
              :
              <div></div>
          }
          {
              stateLoginDelay=="afterrecoverpassword" ? 
              <motion.div  animate={controlsAfterRecoverPassword} variants={activeTransition} initial="hidden">
                  <AfterRecoverPassword chageStateLoguin={setStateLogin}></AfterRecoverPassword> 
              </motion.div>
              :
              <div></div>
          }
          {
              stateLoginDelay=="waitemailverification" ? 
              <motion.div  animate={controlsWaitEmailVerification} variants={activeTransition} initial="hidden">
                  <WaitEmailVerification emailUser={emailUser} setUserObj={setUserObj} userObj={userObj} chageStateLoguin={setStateLogin}></WaitEmailVerification> 
              </motion.div>
              :
              <div></div>
          }
          {
              stateLoginDelay=="resendemailve" ? 
              <motion.div  animate={controlsReSendEmailVe} variants={activeTransition} initial="hidden">
                  <ReSendEmailVerification roleSelect={props.roleSelect} userObj={userObj} chageStateLoguin={setStateLogin}></ReSendEmailVerification> 
              </motion.div>
              :
              <div></div>
          }


        </div>

        <div className="credentials-movil-ninus-login">

            <div style={{width: "150px"}}></div> 

            <div style={{display:"flex", alignItems:"center"}}>
              {t("login.cred")} <text style={{marginLeft:"4px", color:"var(--violeta-piyion-1)"}}> Ninus</text>
              <img className="credentials-movil-icon-ninus-login" src = {iconNinus}></img>
            </div>

            <div className="container-idiom-select-controlStatesLogin">
              <SelectIdiomS></SelectIdiomS>
            </div>
            
        </div>
      </div>
    )
}

export default ControlStatesLogin