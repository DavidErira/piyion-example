import React, {Component,useRef, useState, useEffect} from "react";

//import components
import Header from "../../components/header/header"
import BarMenu from "../../components/barMenu/barMenu"
import {initialHook,AlertHandler, AlertCostumNinus } from "../../components/alertCostumNinus/alertCostumNinus";
import PreloaderPage from "../../components/preloaderPage/preloaderPage";
import ControlMsgs from "../../controlComponents/controlMsgs/controlMsgs";
import InputMsg from "../../components/inputMsg/inputMsg"
import ButtonSendMsg from "../../components/buttonSendMsg/buttonSendMsg"
import HeaderChat from "../../components/headerChat/headerChat"
import OtherInputs from "../../components/otherInputs/otherInputs"

//import funcionalidaes
import {geUserfirebase} from "../../firebaseHandler/authFirebase"
import {sendMsgToDB} from "../../firebaseHandler/dbFirebase"


import './chatsOnline.css'
function ChatsOnline(){

    const alertHook = useState(initialHook)
    const alrt = new AlertHandler(alertHook)
    const [dataLoaded,setDataLoaded]= useState(false)
    const [nameUser,setNameUser] = useState("")


    const [arrayMsgs, setArrayMsgs]= useState([])

    const [refInputMsg,setRefInputMsg]= useState([])


    const sendText = ()=>{
      var numMsg =  arrayMsgs.length+1;
      sendMsgToDB("O3UlGRFj8p63DggJevT6",numMsg,refInputMsg.current.textContent.replace(/&nbsp;/g, ''));
      refInputMsg.current.innerHTML = "";
    }

    useEffect(()=>{
        geUserfirebase().then((user)=>{
            setNameUser(user.displayName)
            setDataLoaded(true)
        }).catch(()=>{
             alrt.alertPrint("No hay una sesión activa en Ninus chat, por favor inicia sesión")
        })
    },[])

    return(
        <div className="container-gen-chatsonline">
            <AlertCostumNinus mode="exitToSingIn" state={alrt.returnHook()}></AlertCostumNinus>
            {/* <PreloaderPage endLoad={dataLoaded}></PreloaderPage>*/} 

            <Header mode="2" nameUser={nameUser}></Header>
            <BarMenu></BarMenu>

              <div className="body-chatsonline">
                <div className="container-zone-msgs-chatsonline">

                    <div className="zone-chatsopen-chatsonline">
                    </div>

                    <div className="container-controlmsgs-send-chatsonline">

                        <div className="zone-headerchat-chatsonline">
                          <HeaderChat canal="whatsapp"></HeaderChat>
                        </div>

                        <div className="zone-controlmsgs-chatsonline">
                              <ControlMsgs setArrayMsgsDB={setArrayMsgs}></ControlMsgs>
                        </div>

                        <div className="zone-send-msg-chatsonline">
                         {/*  <OtherInputs setFile={} setT></OtherInputs> */}
                          <InputMsg setRef={setRefInputMsg} onEnter={sendText}></InputMsg>
                          <ButtonSendMsg onClick={sendText}></ButtonSendMsg>
                        </div>
                        
                    </div>

                  </div>
                </div>
          </div>
    )
}

export default ChatsOnline;


