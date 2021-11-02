import React, {Component,useRef, useState, useEffect} from "react";

import {listenerMsgs} from "../../firebaseHandler/dbFirebase"
import Msg from "../../components/msg/msg";



import './controlMsgs.css'
function ControlMsgs(props){

  const scrollRef = useRef();
  const [arrayMsgs,setArrayMsgs] = useState([]);

  const [ready, setReady] = useState(false);

  useEffect(()=>{
    listenerMsgs("O3UlGRFj8p63DggJevT6",setArrayMsgs);

  },[])

  useEffect(()=>{
    props.setArrayMsgsDB(arrayMsgs);

    // se mueve hasta el final
 
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  
    //setReady(true);

  },[arrayMsgs])

  
  return(
    <div   ref={scrollRef} className="container-gen-controlmsgs">
      <div className="containert-chats-controlmsgs">
        {
          arrayMsgs.map((item,i)=>(
            <Msg
              key = {i}
              from={item.FROM}
              time={item.DATETIME} 
              text={item.TEXT} 
              type={item.TYPE}
              msgState={item.STATE}
              namePDF={item.srcPDF.name}
              imgName = {item.srcImg.name}
              srcPDF = {item.srcPDF.src}
              srcImg = {item.srcImg.src}
              srcAudio = {item.srcAudio.src}>
            </Msg>
          ))
        }
      </div>
    </div>
  )
}

export default ControlMsgs;



              /*<Msg
                from="FACEBOOK"
                time="12:00 pm" 
                text="Hola soy un usuario de ninucChat" 
                type="IMG" 
                namePDF="descarga.pdf"
                imgName = "igamen01.png"
                srcPDF = "https://firebasestorage.googleapis.com/v0/b/omnicanality.appspot.com/o/descarga.pdf?alt=media&token=810d57b1-71da-45b9-8510-60e7899056f1"
                srcImg ="https://firebasestorage.googleapis.com/v0/b/omnicanality.appspot.com/o/localhost_9000_(Pixel%202%20XL).png?alt=media&token=e7039a64-b41d-4588-ad36-7a67a19c8b14"
                srcAudio="https://firebasestorage.googleapis.com/v0/b/omnicanality.appspot.com/o/adeste-fideles-shorter-by-kevin-macleod-from-filmmusic-io.mp3?alt=media&token=9b33c67c-e2d2-4e60-b4d2-48687898206a">
              </Msg> */