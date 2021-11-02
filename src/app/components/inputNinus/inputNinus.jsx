import React, {Component,useRef, useState, useEffect, version} from "react";
import './inputNinus.css'
import { motion, useAnimation } from "framer-motion"

import inputDefault from "./assets/input-default.svg"
import iconLoolPassword from "./assets/lookPassword.svg"

function InputNinus(props) {
    const controls = useAnimation();
    const input = useRef();
    const refInputBorder= useRef();
    const refTitle = useRef();
    const refIcon = useRef();

    const [typeInput,setTypeInput] = useState("");
    
    const [width,setWidth] = useState("100%");
    const [marginLeft, setMarginLeft] = useState("0px")
    const [marginTop, setMarginTop] = useState("0px")
    const [valueI,setValueI] = useState(null)
    
    const click = ()=>{

        input.current.focus();
        return(
            controls.start({
                marginTop:"-11px",
                fontSize:"14px",
                height:"16px",
/*                 color: "#0F002E", */
                transition: {ease:"easeIn",duration:"0.1"}
            })
        )
    }

    const handlerClick = ()=>{
        if(!props.locked){
            click()
        }
    }

    const changeValueInput = (event) =>{
        props.seterValue(event.target.value);
    }  

    const lookOnPassword = ()=>{
      input.current.type = "text"
    }

    const lookOffPassword = ()=>{
      input.current.type = "password"
    }

    //manejador de existencía de propiedades
    useEffect(()=>{
        if(props.widthInputninus != null){
            setWidth(props.widthInputninus)
        }
        if(props.marginLeftInputninus != null){
            setMarginLeft(props.marginLeftInputninus)
        }

        if(props.marginTopInputninus != null){
            setMarginTop(props.marginTopInputninus)
        }
    },[])

    //manejadores de propiedades separadas que pueden cambiar en el tiempo
    useEffect(()=>{
        if(props.type!= null){
            setTypeInput(props.type);
        }
    },[props.type])

    useEffect(()=>{
        if(props.alertError != null){
            if(props.alertError){
                refInputBorder.current.style.borderColor="var(--color-error-inputs)"
                refTitle.current.style.color="var(--color-error-inputs)"
                refIcon.current.style.borderRight = "2px solid var(--color-error-inputs)"
            }
            else{
                refInputBorder.current.style.borderColor="#0F002E"
            }
        }
    },[props.alertError])

    useEffect(()=>{
        if(props.valueI != null && props.valueI != ""){
            click().then(()=>{
                input.current.value=props.valueI;
            });
        }
    },[props.valueI])

    useEffect(()=>{

    },[props.locked])

    return(
        <div className="container-gen-inputninus" style={{width:width, marginLeft:marginLeft, marginTop:marginTop, opacity: props.locked ? "0.5": "1"}}>
            <div ref={refInputBorder} className="border-inputninus">
                <div onClick={handlerClick} className="overlap-inputninus">
                    <img ref={refIcon} className="icon-inputninus" src={props.icon ? props.icon : inputDefault}></img>
                    <motion.div ref={refTitle} style={{background: props.backColor ? 
                        "linear-gradient(180deg, "+props.backColor+" 0%, "+props.backColor+" 70%, rgba(0,0,0,0) 100%)":
                        "linear-gradient(180deg, var(--var-color-back) 0%, var(--var-color-back) 70%, rgba(0,0,0,0) 100%)"
                        }} 
                        animate={controls} onClick={handlerClick} className="title-inputninus"> 
                            {props.title} 
                    </motion.div>
                    {
                      props.required ? 
                      <div className="symbol-required-inputninus">*</div> :
                      null
                    }
                    {
                      typeInput =="password" ?
                      <div className="container-look-password-inputninus">
                        <img onMouseUp={lookOffPassword} onMouseDown={lookOnPassword} src={iconLoolPassword} className="icon-password-inputninus"></img>
                      </div> :
                      null
                    }
                </div>
                <input readOnly={props.locked ? props.locked: false} style={{paddingRight: props.required ?  "28px" : "5px", width: typeInput !="password" ? "calc(100% - 40px)" : "calc(100% - 80px)"}} autoComplete="new-password" type={typeInput} 
                        onFocus={handlerClick} onChange={changeValueInput} onClick={handlerClick} ref={input} className="input-inputninus">
                </input>
            </div>
        </div>
    )
}


export default InputNinus;