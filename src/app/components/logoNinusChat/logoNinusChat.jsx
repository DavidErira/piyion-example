import React, {Component,useRef, useState, useEffect} from "react";
import './logoNinusChat.css'

//import de media
import logoIcon from './assets/logoicon.svg'
import logoTitle from './assets/logotitle.svg'


function LogoNinusChat(props){

    return(
        <div className= "logo-zone-logoninuschat">
           <img className="icon-logo-logoninuschat" src={logoIcon}></img>
          {/* <img className="title-logo-logoninuschat" src={logoTitle}></img> */}
        </div>
    )
}

export default LogoNinusChat