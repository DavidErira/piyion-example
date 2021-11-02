import React, {Component,useRef, useState, useEffect} from "react";
import './buttonProfile.css'
import { motion, useAnimation } from "framer-motion"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory,
  useLocation
} from "react-router-dom";


import menuIcon from './assets/iconuser.svg'
import editProfil from './assets/editprofil.svg'
import singOut from './assets/singout.svg'

import {signOut} from "../../firebaseHandler/authFirebase"

function ButtonProfile(props) {

    let history = useHistory();

    const controlsAnimate = useAnimation();
    const [windowState, setWindowState] = useState(false)
    const buttonRef = useRef();
    
    const singOutFirebase = ()=>{
      signOut().then(()=>{
        console.log("cerro sesión con exito !")
        history.push("/")
      })
    } 

    const goToUserSettings = ()=>{
        history.push("/firstsettings")
    } 

    const clickHandler = () =>{
      if(!windowState){
        controlsAnimate.start({
          marginTop:"10px",
          borderStartStartRadius:"0px",
          borderStartEndRadius:"0px",
          minHeight:"80px",
          transition: { duration: 0.2 },
        })
        setWindowState(true)
      }else{
        controlsAnimate.start({
          marginTop:"-50px",
          borderStartStartRadius:"9px",
          borderStartEndRadius:"9px",
          minHeight:"50px",
          transition: { duration: 0.2 },
        })
        setWindowState(false)
      }
    }

    const focusHandler = () =>{

      setTimeout(()=>{
        controlsAnimate.start({
          marginTop:"-50px",
          borderStartStartRadius:"9px",
          borderStartEndRadius:"9px",
          minHeight:"50px",
          transition: { duration: 0.2 },

        })
        setWindowState(false)
      },100)
      
    }


    return (
      <div  className="container-gen-buttonprofile">

        <button onBlur={focusHandler} onClick={clickHandler} className="zone-name-icon-buttonprofile">

          <div ref={buttonRef} className="name-buttonprofile">
            {props.nameUser}
          </div>

          <img className="icon-user" src ={menuIcon}></img>

        </button>

        <motion.div className="window-options-buttonprofile" animate={controlsAnimate}>
          <div className="container-options-buttonprofile">
            <div onClick={goToUserSettings} className="option-buttonprofile">
                <img className="img-option-buttonprofile" src = {editProfil}></img>
                <div style={{width:"10px"}}></div>
                <div className="title-option">Editar perfil</div>
            </div>
            <div onClick={singOutFirebase} className="option-buttonprofile">
                <img className="img-option-buttonprofile" src = {singOut}></img>
                <div style={{width:"10px"}}></div>
                <div className="title-option">Cerrar sesión</div>
            </div>
          </div>
        </motion.div>

      </div>
    );
  }
  
  export default ButtonProfile;