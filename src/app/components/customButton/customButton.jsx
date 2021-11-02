import React, {Component,useRef, useState, useEffect} from "react";
import { motion, useAnimation } from "framer-motion"

import SimpleLoader from "../simpleLoader/simpleLoader"

import "./customButton.css"

function CustomButton(props){


    const [loading, setLoading] = useState(false);
    const [loadActive, setLoadActive] = useState(false);
    const [colorButton, setColorButton] = useState("var(--azul-oscuro-piyion)");

    const animateClick = useAnimation();
    const animateHover = useAnimation();
    const refAnimation = useRef();

    const onHoverIn =()=>{
      if(!props.disabled){
        setColorButton("var(--violeta-piyion-1)")
      }
    }

    const onHoverOut =()=>{
      if(!props.disabled){
        setColorButton("var(--azul-oscuro-piyion)")
      }
    }

    const clickHandler = ()=>{
        animateClick.start({
            width:"100%",
            height:"100%",
            backgroundColor:"rgba(255, 255, 255, 0)",
            borderRadius:"10px",
            transition: { duration: 0.4}
        }).then(()=>{
            animateClick.start({
                width:"0px",
                height:"0px",
                backgroundColor:"rgba(255, 255, 255, 0.6)",
                borderRadius:"20px",
                transition: {type: "Inertia", duration: 0}
            })
        })

        if(props.promessOnclick){
          setLoading(true);
          props.promessOnclick().then(()=>{
            setLoading(false);
          }).catch(()=>{
            setLoading(false);
          })
        }
        else{
          props.onClick()
        }
    }

    useEffect(()=>{


    },[props.disabled])

    return(
        <motion.button  disabled={props.disabled ? props.disabled : false} onClick={clickHandler} 
                        style={{width:props.width, 
                                height: props.height ? props.height : "40px",
                                opacity: props.opacity ? props.opacity : 1,
                                marginTop: props.marginMode=="1" ? "10px" : "0px",
                                marginRight: props.marginMode=="1" ? "10px" : "0px",
                                backgroundColor:colorButton}} 
                        ref={props.refButton} className="container-gen-custombutton"
                        onHoverStart={onHoverIn} onHoverEnd={onHoverOut}>

            <div className="containerAnimate-custombutton">
                <motion.div ref={refAnimation} animate={animateClick} className="animate-custombutton"></motion.div> 
            </div>

            {
              loading ? 
                <div style={{marginTop:props.height ? "-"+props.height : "-40px"}} className="container-text-custombutton">
                            <SimpleLoader width="25px" widthLine="5px"></SimpleLoader>
                </div>
                        :
                <div style={{marginTop:props.height ? "-"+props.height : "-40px"}} className="container-text-custombutton">
                        {props.value}
                </div>      
            }

        </motion.button>
    )
}

export default CustomButton