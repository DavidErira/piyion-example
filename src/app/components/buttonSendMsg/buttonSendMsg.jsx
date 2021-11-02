import React, {Component,useRef, useState, useEffect} from "react";

import sendIcon from "./assets/send-icon.svg"

import "./buttonSendMsg.css"
function ButtonSendMsg(props){

  return(
    <div onClick={props.onClick} className="container-gen-buttonsendmsg">
      <img className="icon-send-buttonsendmsg" src={sendIcon}></img>
    </div>
  )
}


export default ButtonSendMsg