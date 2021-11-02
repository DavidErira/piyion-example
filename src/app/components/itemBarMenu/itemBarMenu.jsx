import React, {Component,useRef, useState, useEffect, version} from "react";
import { motion, useAnimation } from "framer-motion"


import './itemBarMenu.css'
function ItemBarMenu(props) {

    const animateTitleFloat = useAnimation();
    const animateIconActiveHover = useAnimation();
    const refContainer = useRef();


    const iconHoverIn = ()=>{
        animateIconActiveHover.start({
            backgroundColor:"#fff",
            transition: { duration: 0}
        })
    }

    const iconHoverOut = ()=>{
        animateIconActiveHover.start({
            backgroundColor:"rgba(255, 255, 255, 0)",
            transition: { duration: 0}
        })
    }

    const titleFloatAction = ()=>{
        if(!props.deployed){
            refContainer.current.style.overflowX = "visible"
            animateTitleFloat.start({
                opacity:1,
                display:"flex",
                transition: { duration: 0.2}
            })
        }
    }

    const titleFloatActionOut = ()=>{
        if(!props.deployed){
        animateTitleFloat.start({
            opacity:0,
            transition: { duration: 0.2}
        }).then(()=>{
            refContainer.current.style.overflowX = "hidden"
            animateTitleFloat.start({
                display:"none",
                transition: { duration: 0.1}
            })
        })
        }
    }

    useEffect(()=>{

        if(props.displayNone){
            refContainer.current.style.display = "none"
        }

    },[props.displayNone])

    return(
        <motion.div  onClick={props.active ? props.onClick : ()=>{}} ref={refContainer} className="container-gent-itembarmenu">
            
            <motion.div 
                    onMouseEnter={titleFloatAction}
                    onMouseLeave={titleFloatActionOut}
                    whileHover={
                        props.active ?
                        {
                            backgroundColor: props.deployed ? "rgba(0, 0, 0, 0.05)" : "none",
                            transition: { duration: 0.05 },
                        }:
                        null
                    }   
                    className="container-2-itembarmenu"
                    animate={props.animateContainerItem}
                   >
                    <motion.div 
                        onHoverStart={ (props.active && !props.deployed) ? iconHoverIn : null}
                        onHoverEnd={(props.active && !props.deployed) ? iconHoverOut : null}
                        animate={animateIconActiveHover}
                        className="container-icon-itembarmenu">
                        <motion.img custom={props.custom}  animate={props.animateIcon} className="icon-itembarmenu" src={props.icon}></motion.img>
                    </motion.div>

                    <motion.div custom={props.custom} animate={props.animateTitleIcon} className = "title-itembarmenu">{props.title}</motion.div>
            </motion.div>

            <motion.div animate={animateTitleFloat} className="title-float-itembarmenu">
                    {props.title}
            </motion.div>
            
        </motion.div>
       
    )
}

ItemBarMenu.defaultProps = {
    active:true
}

export default ItemBarMenu