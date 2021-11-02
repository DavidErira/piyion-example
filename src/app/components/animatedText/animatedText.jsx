import React, {Component,useRef, useState, useEffect} from "react";
import { motion, useAnimation } from "framer-motion"
import './animatedText.css'

import { useTranslation } from "react-i18next"

function AnimatedText(props) {

    const [t,i18n] = useTranslation("global");

    const textSaludo = t("login.presentation-text");
    const [textSaludoHook, setTextSaludoHook] = useState("");
    
   function  animLeterReturnPromise(){
            return( new Promise((resolve, reject) => {
                const lengthTextSaludo = textSaludo.length
                var countActualLeter = 1;
                function animLeter(){
                  setTimeout(()=>{
                    setTextSaludoHook(textSaludo.substr(0,countActualLeter));
                    countActualLeter=countActualLeter+1;
                    if(countActualLeter<=lengthTextSaludo){
                      animLeter();
                    }else{
                      resolve()
                    } 
                  },50)
                }
                animLeter();
            }))      
    }
    

    useEffect(() => {
      if(props.start){
        animLeterReturnPromise().then(()=>{
            props.setEndAnimate(true);
        })
      }  
    },[props.start])
      
    return(
        <div  className={"zone-text-animatedText"}>
               {t("login.presentation-text")} 
        </div>
    )
}

export default AnimatedText