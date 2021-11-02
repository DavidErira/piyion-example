import React, {Component,useRef, useState, useEffect} from "react";

//import svg
import DeplyInfoChat from "./assets/deploy-info.svg"

import canalInstagramSvg from "./assets/canal-instagram.svg"
import canalWspSvg from "./assets/canal-wsp.svg"
import canalMessengerSvg from "./assets/canal-messenger.svg"

import "./headerChat.css"
function HeaderChat(props){


  return(
    <div className="container-gen-headerchat">
       
       <div className="canal-headerchat"> 

          <div className="icon-canal-headerchat">
            {
              props.canal == "whatsapp" ?
                <img style={{width:"40px", height:"40px"}} src={canalWspSvg}></img> : null
            }
            {
              props.canal == "facebook" ?
                <img style={{width:"40px", height:"40px"}} src={canalMessengerSvg}></img> : null
            }
            {
              props.canal == "instagram" ?
                <img style={{width:"40px", height:"40px"}} src={canalInstagramSvg}></img> : null
            }
          </div>


          <div className="name-canal-headerchat">
              {
                props.canal == "whatsapp" ?
                "WHATSAPP":null
              }
              {
                props.canal == "facebook" ?
                "FACEBOOK":null
              }
              {
                props.canal == "instagram" ?
                "INSTAGRAM":null
              }
                <div style={{fontSize:"14px", color:"#8B8B8B", marginTop: "2px"}}>
                Canal de atención
              </div>
          </div>
        </div>

      <div className="date-headerchat">
            12:36 PM
            <div style={{fontSize:"12px"}}> 13/08/2021</div>
      </div>

      <div className="deploy-chatinfo-headerchat">
        <img src={DeplyInfoChat} className="deploy-icon-chatinfo-headerchat"></img>
      </div>

    </div>
  )
}

export default HeaderChat