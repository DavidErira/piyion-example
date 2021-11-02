import React, {Component,useRef, useState, useEffect} from "react";

//import componentes
import Header from "../../components/header/header";
import BarMenu from "../../components/barMenu/barMenu"

import {initialHook,AlertHandler, AlertCostumNinus } from "../../components/alertCostumNinus/alertCostumNinus";
import PreloaderPage from "../../components/preloaderPage/preloaderPage";

//import funcionalidaes
import {geUserfirebase} from "../../firebaseHandler/authFirebase"

import RobotNinus from "./assets/robotninus.png"
import TxtRobotNinus from "./assets/txtrobotninus.svg"

import './panelAdmin.css'

function PanelAdmin(props){

    const alertHook = useState(initialHook)
    const alrt = new AlertHandler(alertHook)
    const [dataLoaded,setDataLoaded]= useState(false)

    const [nameUser,setNameUser] = useState("")
    useEffect(()=>{
        geUserfirebase().then((user)=>{
            setNameUser(user.displayName)
            setDataLoaded(true)
        }).catch(()=>{
             alrt.alertPrint("No hay una sesión activa en Ninus chat, por favor inicia sesión")
        })
    },[])

    
    return(
        <div  className="container-gen-paneladmin">
            <AlertCostumNinus mode="exitToSingIn" state={alrt.returnHook()}></AlertCostumNinus>
            <PreloaderPage endLoad={dataLoaded}></PreloaderPage>

            <Header mode="2" nameUser={nameUser}></Header>

            <div className="container-barmenu-paneladmin">
                    <BarMenu></BarMenu>
            </div>

            <div className="body-paneladmin">

                <div className="container-robotninus-paneladmin">
                    <img src={RobotNinus} className="png-robot-paneladmin"></img>
                    <img src={TxtRobotNinus} className="txt-robot-paneladmin"></img>
                </div>

            </div>
           
        </div>
    )
}

export default PanelAdmin
