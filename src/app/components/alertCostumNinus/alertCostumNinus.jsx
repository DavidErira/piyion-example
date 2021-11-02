import React, {useContext,Component,useRef, useState, useEffect} from "react";
import { motion, useAnimation } from "framer-motion"
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
    useHistory,
    useLocation
  } from "react-router-dom"

import CustomButton from "../customButton/customButton";

import CloseIcon from './assets/closeicon.svg'
import CheckIcon from './assets/check.svg'
import AlertIcon from './assets/alertIcon.svg'
import ErrorIcon from './assets/errorIcon.svg'

import './alertCostumNinus.css'

export const initialHook ={
    print: false, 
    msg:"", 
    fun: null,
    type:null
}

export class AlertHandler{
    constructor(AlertObj) {
        const[stateC,setStateC] = AlertObj
        this.state = stateC
        this.setState = setStateC
    }
    returnHook(){
        return( [this.state,this.setState])
    }
    alertPrint(msg){
        this.setState({print: true, msg:msg, fun: null, type:null})
    }
    alertPrint(msg, buttonFunction){
        this.setState({print: true, msg:msg, fun: buttonFunction, type:null})
    }
    alertPrint(msg, buttonFunction,typeIn){
        this.setState({print: true, msg:msg, fun: buttonFunction, type:typeIn})
    }
}

export function AlertCostumNinus(props){

    let history = useHistory();
    const controlsAnimateWindow = useAnimation();
    const animateIcon = useAnimation();

    const oneFunctionAlone = ()=>{
        /* cerrar alert flotante */
        const setprint = props.state[1]
        setprint({print: false, msg:"",fun:props.state[0].fun, type:props.state[0].type})
        if(props.state[0].fun != null){
            props.state[0].fun()
        }else{
            if(props.mode == "exitToSingIn"){
                history.push("/")
            }    
        }
    }

    const closeFunctionAlone = ()=>{
        /* cerrar alert flotante */
        const setprint = props.state[1]
        setprint({print: false, msg:"",fun:props.state[0].fun, type:props.state[0].type})

        if(props.state[0].fun != null){
            //props.state[0].fun()
        }else{
            if(props.mode == "exitToSingIn"){
                history.push("/")
            } 
        }
    }

    useEffect(()=>{
        if(props.state[0].print == true){
            setTimeout(()=>{
                controlsAnimateWindow.start({
                    marginTop:"0px",
                    transition: {duration:0.3}
                }).then(()=>{
                    animateIcon.start({
                        width:"80px",
                        height:"80px",
                        transition: {duration:0.2}
                    })
                })
            },50)
        }
    },[props.state])


    return (
        <div className="container-alert-alertcostumninus">
            {
            (props.state[0].print == true) ?
            <div className="container-gen-alertcostumninus">
                <motion.div animate={controlsAnimateWindow}  className="container-window-alertcostumninus">

                    <div onClick={closeFunctionAlone} className="close-alertcostumninus">
                        <img className="close-icon-alertcostumninus" src={CloseIcon}></img>
                    </div>

                    {
                        props.state[0].type != null ? 
                        <div className="zone-icon-alertcostumninus">
                            {
                                props.state[0].type == "check" ?
                                <motion.div animate={animateIcon} className="container-icon-check-alertcostumninus">
                                    <motion.img className="img-icon-alertcostumninus" src={CheckIcon}></motion.img>
                                </motion.div>:
                                null
                            }
                            {
                                props.state[0].type == "alert" ?
                                <motion.div animate={animateIcon} className="container-icon-alert-alertcostumninus">
                                    <motion.img  className="img-icon-alertcostumninus" src={AlertIcon}></motion.img>
                                </motion.div>
                                :
                                null
                            }
                            {
                                props.state[0].type == "error" ?
                                <motion.div animate={animateIcon} className="container-icon-error-alertcostumninus">
                                    <motion.img  style={{height:"70px", width:"70px", marginTop:"0px"}} className="img-icon-alertcostumninus" src={ErrorIcon}></motion.img>
                                </motion.div>
                                :
                                null
                            }
                        </div>:
                        null
                    }

                    <div className="zone-msg-alertcostumninus">
                        {props.state[0].msg}
                    </div>

                    <div className="zone-buttons-alertcostumninus">   
                        <CustomButton width="100px" value="Aceptar" onClick={oneFunctionAlone}></CustomButton>
                    </div>

                </motion.div>
            </div>: null
            }
        </div>
    )
}


//reunion antes del viernes

