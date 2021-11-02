import React, {Component,useRef, useState, useEffect, version} from "react";
import './header.css'
import logoIcon from './assets/logoicon.svg'
import logoTitle from './assets/logotitle.svg'

import menuIcon from './assets/menuicon.svg'
import ButtonProfile from '../buttonProfile/buttonProfile'

function Header(props) {

    const goUserOptions = () =>{
        console.log("abriendo opciones de usuario")
    }

    return (

        <div className="container-gen-header">
            {
                (props.mode=="1") ?
                <div className="container-objects-header">

                    <img className="icon-menu-header" src ={menuIcon}></img>

                    <div className="container-logo-header">
                        <img className="icon-ninus-chat-header" src ={logoIcon}></img>
                        <div className="container-title-ninus-chat-header">
                            <img className="title-ninus-chat-header" src ={logoTitle}></img>
                                CHAT
                        </div> 
                    </div>

                    <ButtonProfile  nameUser={props.nameUser}></ButtonProfile>
                </div>
                :
                <div></div>
            }

            {
                (props.mode=="2") ?
                <div className="container-objects-header">

                    <div className="container-logo-header"  style={{marginLeft:"var(--lefth-center)"}}>
                        <img className="icon-ninus-chat-header" src ={logoIcon}></img>
                        <div className="container-title-ninus-chat-header">
                            <img className="title-ninus-chat-header" src ={logoTitle}></img>
                                CHAT
                        </div> 
                    </div>

                    <ButtonProfile nameUser={props.nameUser}></ButtonProfile>
                </div>
                :
                <div></div>
            }

            {
                (props.mode=="3") ?
                <div className="container-objects-header"  style={{justifyContent:"center"}}>

                    <div className="container-logo-header" style={{marginLeft:"0px"}}>
                        <img className="icon-ninus-chat-header" src ={logoIcon}></img>
                        <div className="container-title-ninus-chat-header">
                            <img className="title-ninus-chat-header" src ={logoTitle}></img>
                                CHAT
                        </div> 
                    </div>

                </div>
                :
                <div></div>
            }
           

            <div className="bar-degrade-header"></div>
        </div>
    );


  }
  
  export default Header;