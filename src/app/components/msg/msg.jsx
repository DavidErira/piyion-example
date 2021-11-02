import React, {useLayoutEffect,Component,useRef, useState, useEffect} from "react";

import PinI from "./assets/pinI.svg"
import PinOther from "./assets/pinOther.svg"

import PinInstagram from "./assets/pinInstagram.svg"
import PinWhatsApp from "./assets/pinWhatsApp.svg"
import PinWeb from "./assets/pinWeb.svg"
import PinFacebook from "./assets/pinFacebook.svg"


import CheckReceived from "./assets/check-received.svg"
import CheckSend from "./assets/check-send.svg"
import CheckViewed from "./assets/check-viewed.svg"
import CheckWait from "./assets/check-wait.svg"

import PdfIcon from "./assets/pdf-icon.svg"
import DownloadIcon from "./assets/download-icon.svg"
import CostumAudio from "../costumAudio/costumAudio";
import ImgViewMsg from "../imgViewMsg/imgViewMsg";


/* 
Notas
    *agregar url del dpf en el props pdfURL
    *descargar pdf desde storage de firebase

    *Crear funcionalidades que conecten con storage de firebase o de google

    * como descargas cosas con un boton

    *Reglas de firebase storage para obtener los archivos

    *agregar props de color
    *agregar si es mensjae enviado o recibido

    *agregar animación de salida
 */

import './msg.css'
function Msg(props){

    const refImgMsg = useRef();
    const refButtonImgView = useRef();
    const refDownloadImg = useRef();

    const [deployImg, setDeployImg] = useState(false);
    const [sizeImg, setSizeImg] = useState([0, 0]);
    const [colorMsg, setColorMsg] = useState(null);
    const [timeMsg, setTimeMsg] = useState("");

    const downloadfile = (url, name) => {
        if (!url) {
            throw new Error("Resource URL not provided! You need to provide one");
        }
        fetch(url)
        .then(response => response.blob())
        .then(blob => {
            const blobURL = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = blobURL;
            a.style = "display: none";
            if (name && name.length) a.download = name;
            document.body.appendChild(a);
            a.click();
        })
        .catch(() => {
            console.log("Error al descargar el archivo")
        });
    };

    //Se ejecuta cuando la imagen esta cargada
    const imgLoaded= ()=>{
        setTimeout(()=>{
            setSizeImg([refImgMsg.current.width,refImgMsg.current.height])
        },100)
    }

    const dateTimeHandler = ()=>{
      var arrayTime = props.time.split(":");
      var hours = arrayTime[1];
      var minutes = arrayTime[0];

      if(hours <= 12){
        setTimeMsg(hours+":"+minutes+" AM")
      }else{
        setTimeMsg((hours-12)+":"+minutes+" PM")
      }

    }

    //carga del tamaño de la image para el boton del img view
    useEffect(()=>{
        if(props.type=="IMG"){
            refButtonImgView.current.style.width = sizeImg[0];
            refButtonImgView.current.style.height = sizeImg[1];
            refButtonImgView.current.style.marginTop = - sizeImg[1];
            if(sizeImg[0]>0){
                refDownloadImg.current.style.display = "flex";
            }
        }
    },[sizeImg])

    //set de color segun la red social en el from
    useEffect(()=>{
        if(props.from == "I"){
            setColorMsg("#ebebeb");
        }
        else if (props.from == "FACEBOOK"){
            setColorMsg("#B7E2F5");
        }
        else if (props.from == "WHATSAPP"){
            setColorMsg("#B7F5C4");
        }
        else if (props.from == "INSTAGRAM"){
            setColorMsg("#E5C7F7");
        }
        else if (props.from == "WEB"){
            setColorMsg("#F0F5B7");
        }
    },[props.from])

    useEffect(()=>{
      dateTimeHandler();
    },[props.time])

    return(
        <div  style={{justifyContent: (props.from == "I") ? "flex-end" :  "flex-start"}} className="container-line-mesg">
           
           <div style={{ borderStartEndRadius: (props.from != "I") ? "10px" : "0px",
                         borderStartStartRadius: (props.from == "I") ? "10px" : "0px",
                         backgroundColor: colorMsg}} 
                className="container-gen-msg">
                <ImgViewMsg setDeploy={setDeployImg} deploy={deployImg} img={props.srcImg}></ImgViewMsg>
                {
                    props.from == "I" ?
                    <img className="pin-msg-i" src={PinI}></img>
                    :
                    null
                }
                {/* Contenido del mensaje dividiendo zonas de texto, imagen, pdf o audios */}
                <div className="zone-content-msg">

                    {/* Mensaje con PDF */}
                    {
                        props.type=="PDF" ? 
                        <div onClick={()=>(downloadfile(props.srcPDF,props.namePDF))} className="pdf-msg">
                            <img src={PdfIcon} className="pdf-icon-msg"></img>
                            <div className="name-pdf-msg">{props.namePDF}</div>
                            <img className="download-pdf-icon-msg" src={DownloadIcon}></img>
                        </div> :
                        null
                    }

                    {/* Mensaje con imagen*/}
                    {
                        props.type=="IMG" ?
                        <div className="container-img-msg">
                            <img ref={refImgMsg} onLoad={imgLoaded} className="img-msg" src={props.srcImg}></img>
                            <div onClick={()=>{setDeployImg(true)}} ref={refButtonImgView} className="click-view-img-msg">
                                Ver imagen
                            </div>
                            <div    onClick={()=>{downloadfile(props.srcImg,props.imgName)}} 
                                    className="container-download-img-icon-msg"
                                    ref={refDownloadImg}>
                                <img className="download-img-icon-msg" src={DownloadIcon}></img>
                            </div> 
                        </div> :
                        null
                    }
                    {/* mensaje en audio */}
                    {
                        props.type=="AUDIO" ? 
                        <CostumAudio srcAudio={props.srcAudio}></CostumAudio> :
                        null
                    }
                    {/*  Contenido en texto del mensaje */}
                    <div className="text-msg">
                        {
                            props.type != "AUDIO" ? props.text : null
                        }
                        {/* Zona en donde va la hora y el estado del mensaje */}
                        <div className="zone-endtext-msg"> 
                            {
                              timeMsg
                            }
                            {
                                props.msgState == "SENT" ?
                                <img className="check-msg" src={CheckSend}></img> :
                                null
                            }
                            {
                                props.msgState == "RECEIVED" ?
                                <img className="check-msg" src={CheckReceived}></img> :
                                null
                            }
                            {
                                props.msgState == "READ" ?
                                <img className="check-msg" src={CheckViewed}></img> :
                                null
                            }
                            {
                               props.msgState == "WAIT" ?
                               <img className="check-msg" src={CheckWait}></img> :
                               null
                            }
                        </div>
                    </div>
                </div>

                {
                    props.from == "FACEBOOK" ?
                    <img className="pin-msg-other" src={PinFacebook}></img>
                    :
                    null
                }
                {
                    props.from == "INSTAGRAM" ?
                    <img className="pin-msg-other" src={PinInstagram}></img>
                    :
                    null
                }
                {
                    props.from == "WHATSAPP" ?
                    <img className="pin-msg-other" src={PinWhatsApp}></img>
                    :
                    null
                }
                {
                    props.from == "WEB" ?
                    <img className="pin-msg-other" src={PinWeb}></img>
                    :
                    null
                }

            </div> 
        </div>
    )
}

export default Msg;