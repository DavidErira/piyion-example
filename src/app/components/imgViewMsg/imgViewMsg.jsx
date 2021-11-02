
import React, {Component,useRef, useState, useEffect} from "react";

import CloseIcon from "./assets/closeicon.svg"

import "./imgViewMsg.css"
function ImgViewMsg(props){
    return(
        <div style={{display: props.deploy ? "flex" : "none"}} className="container-gen-imgviewmsg">
            <div className="zone-view-img-imgviewmsg">
                <div onClick={()=>{props.setDeploy(false)}} className="container-close-imgviewmsg">
                    <img className="icon-close-imgviewmsg" src={CloseIcon}></img>
                </div>
                <img src={props.img} className="img-imgviewmsg"></img>
            </div>
        </div>
    )
}

export default ImgViewMsg;