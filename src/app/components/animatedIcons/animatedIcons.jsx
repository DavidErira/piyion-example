import React, {Component,useRef, useState, useEffect} from "react";
import { motion, useAnimation } from "framer-motion";
import { useTranslation } from "react-i18next";
import './animatedIcons.css'

//import de media
import logoMesseger from './assets/messengericon.svg'
import logoWhatsapp from './assets/whatsappicon.svg'
import logoInstagram from './assets/instagramicon.svg'
import logoWeb from './assets/webicon.svg'

import logoMessegerMode2 from './assetsMode2/messengericon.svg'
import logoWhatsappMode2 from './assetsMode2/whatsappicon.svg'
import logoInstagramMode2 from './assetsMode2/instagramicon.svg'
import logoWebMode2 from './assetsMode2/webicon.svg'


function AnimatedIcons(props) {

    //traducciónes
    const [t,i18n] = useTranslation("global");
    
    const controlsAnimationIcons = useAnimation();

    function animPromise(){
        return(new Promise((resolve, reject) => {
          function animLoop(){
            setTimeout(()=>{
              controlsAnimationIcons.start(i =>({
                y:["0px","-10px","0px"],
                transition: {duration: 0.5,delay: i * 0.15}
              }))
              animLoop()
            },2000)
          }
          animLoop()
        }))
    }

    //la ejecución se activa cuando el props start se cambié a True
    /* useEffect(() => {
        if(props.start){
            controlsAnimationIcons.start(i =>({
                height:"40px",
                width:"40px",
                transition: {delay: i * 0.2}
              }))
        }
              
    },[props.start]) */

    useEffect(() => {
      
      controlsAnimationIcons.start(i =>({
          height:"30px",
          width:"30px",
          transition: {delay: i * 0.3}
        }))
            
    },[])

    /* useEffect(()=>{
      animPromise();
    },[]) */

    return(
        <div className="container-gen-animatedIcons">
          <div className="text-animatedIcons">{t("login.channels")}</div>
          {
            props.mode=="2" ? 
            <div className="zone-icons-animatedIcons">
              <div className="container-icon-social-network-animatedIcons">
                <motion.img   custom={0}
                              animate={controlsAnimationIcons}
                              className="icon-social-network-animatedIcons" 
                              src={logoWhatsappMode2} 
                              key={props.indentify+"001"}></motion.img>
              </div>
              
              <div className="container-icon-social-network-animatedIcons">
                <motion.img   custom={1}
                              animate={controlsAnimationIcons}
                              className="icon-social-network-animatedIcons" 
                              src={logoMessegerMode2} 
                              key={props.indentify+"002"}></motion.img>
              </div>
              <div className="container-icon-social-network-animatedIcons">
                <motion.img   custom={2}
                              animate={controlsAnimationIcons}
                              className="icon-social-network-animatedIcons" 
                              src={logoInstagramMode2} 
                              key={props.indentify+"003"}></motion.img>
              </div>
              <div className="container-icon-social-network-animatedIcons">
                <motion.img   custom={3}
                              animate={controlsAnimationIcons}
                              className="icon-social-network-animatedIcons" 
                              src={logoWebMode2}
                              key={props.indentify+"005"} 
                              onAnimationComplete={definition => {
                                //Se notificac que la ultima animación terminó
                                props.setEndAnimate(true);
                              }}></motion.img>
              </div>
            </div> : 
            <div className="zone-icons-animatedIcons">

              <div className="container-icon-social-network-animatedIcons">
              <motion.img   custom={0}
                            animate={controlsAnimationIcons}
                            className="icon-social-network-animatedIcons" 
                            src={logoWhatsapp} 
                            key={props.indentify+"010"} ></motion.img>
              </div>
              <div className="container-icon-social-network-animatedIcons">
              <motion.img   custom={1}
                            animate={controlsAnimationIcons}
                            className="icon-social-network-animatedIcons" 
                            src={logoMesseger} 
                            key={props.indentify+"006"} ></motion.img>
              </div>
              <div className="container-icon-social-network-animatedIcons">
              <motion.img   custom={2}
                            animate={controlsAnimationIcons}
                            className="icon-social-network-animatedIcons" 
                            src={logoInstagram} 
                            key={props.indentify+"007"} ></motion.img>
              </div>
              <div className="container-icon-social-network-animatedIcons">
              <motion.img   custom={3}
                            animate={controlsAnimationIcons}
                            className="icon-social-network-animatedIcons" 
                            src={logoWeb} 
                            key={props.indentify+"009"} 
                            onAnimationComplete={definition => {
                              //Se notificac que la ultima animación terminó
                              props.setEndAnimate(true);
                            }}></motion.img>
              </div>
            </div>
          }

      </div>
    )
}

export default AnimatedIcons
