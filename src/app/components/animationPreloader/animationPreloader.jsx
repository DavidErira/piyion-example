import React, {Component,useRef, useState, useEffect} from "react";
import { motion, useAnimation } from "framer-motion"

import NinusBlack from "./assets/NinusBlack.svg"
import NinusWhite from "./assets/NinusWhite.svg"

import './animationPreloader.css'


function AnimationPreloader (props){

    
    const endLoad = useRef(false);

    const animateObjContainer = useAnimation();
    const animateCircle = useAnimation();
    const animateIcon = useAnimation();

    function animIcon(){
        props.containerRef.current.style.display = "none"
        //Se puede mostrar una figura al finalizar hassta el momento esta el logo de ninus
        /* animateIcon.start({
            height:"100px",
            width:"100px",
            transition:{duration: 0.6}
        }).then(()=>{
            setTimeout(()=>{
                animateIcon.start({
                    height:"0px",
                    width:"0px",
                    transition:{duration: 0.6}
                }).then(()=>{
                    props.containerRef.current.style.display = "none"
                })
            },500)
        }) */
    }

    function animateSizeObj(){
        const timeAnim = 0.4;
        var countLoop = 0;
        return new Promise((resolve,reject)=>{
            function animate(){
                countLoop=countLoop+1
                animateObjContainer.start({
                    height:"100px",
                    width:"100px",
                    transition:{duration: timeAnim}
                }).then(()=>{
                    animateObjContainer.start({
                        rotate:215,
                        transition:{duration: 0.8}
                    }).then(()=>{
                        animateObjContainer.start({
                            rotate:-35,
                            transition:{duration:0.8}
                        }).then(()=>{
                            animateObjContainer.start({
                                height:"0px",
                                width:"0px",
                                transition:{duration: timeAnim}
                            }).then(()=>{
                                    if(countLoop>=1){
                                        if(endLoad.current){
                                            animIcon()
                                            resolve(); 
                                        }
                                        else{
                                            animate() 
                                        }
                                    }else{
                                        animate()
                                    }
                            }) 
                            animateCircle.start({
                                height:"0px",
                                width:"0px",
                                transition:{duration: timeAnim}
                            })
                        }) 
                    })
                })
                animateCircle.start({
                    height:"30px",
                    width:"30px",
                    transition:{duration: timeAnim}
                })
            }
            animate()
        })
    }

    useEffect(()=>{
         animateSizeObj()
    },[])

    useEffect(()=>{
        console.log(props.endLoad)
        endLoad.current=props.endLoad;
    },[props.endLoad])

    return(
        <div>
            <motion.div style={{backgroundColor: props.blackMode ? "#000" : "#fff"}} animate={animateIcon} className="container-icon-animationpreloader">
                <img  src={props.blackMode ? NinusWhite : NinusBlack} className="icon-animationpreloader"></img>
            </motion.div>

            <motion.div animate={animateObjContainer} className="container-obj-animationpreloader">
                <div className="container-circle-animationpreloader">
                    <motion.div style={{backgroundColor:props.blackMode ? "#000" : "#fff"}} animate={animateCircle} className="one-circle-animationpreloader"></motion.div>
                </div>
                <div className="container-circle-animationpreloader">
                    <motion.div style={{backgroundColor:props.blackMode ? "#000" : "#fff"}} animate={animateCircle} className="one-circle-animationpreloader"></motion.div>
                </div>
                <div className="container-circle-animationpreloader">
                    <motion.div style={{backgroundColor:props.blackMode ? "#000" : "#fff"}} animate={animateCircle} className="one-circle-animationpreloader"></motion.div>
                </div>
                <div className="container-circle-animationpreloader">
                    <motion.div style={{backgroundColor:props.blackMode ? "#000" : "#fff"}} animate={animateCircle}  className="one-circle-animationpreloader"></motion.div>
                </div>
            </motion.div>
        </div>
    )
}

export default AnimationPreloader