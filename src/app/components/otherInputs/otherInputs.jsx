import React, {Component,useRef, useState, useEffect} from "react";
import { motion, useAnimation } from "framer-motion"

import othersInputIcon from "./assets/other-inputs.svg"
import tap from "./assets/pin.svg"
import pdfIcon from "./assets/img-icon.svg"
import imgIcon from "./assets/pdf-icon.svg"


import "./otherInputs.css"
function OtherInputs(props){

  const [deploy, setDeploy] = useState(false);

  const animateIcon = useAnimation();
  const animateIconContainer = useAnimation();

  const animateWindowPop = useAnimation();
  const animateTapWindowPop = useAnimation();
  const animateIconsButton =  useAnimation();

  let idImg="img-msg"
  let idPdf = "pdf-msg"

  const animIconIn = ()=>{
      animateIconContainer.start({
        height:"0px",
        width:"0px",
        transition:{duration: 0.2}
      }).then(()=>{
        animateIconContainer.start({
          height:"10px",
          width:"10px",
          backgroundColor:"#CC94F8",
          borderRadius:"50%",
          transition:{duration: 0.1}
        }).then(()=>{
          setDeploy(true);
        })
      })
      animateIcon.start({
        height:"0px",
        width:"0px",
        transition:{duration: 0.2}
      })

      animWindowIn();
  }

  const animIconOut = ()=>{
    animateIconContainer.start({
      height:"0px",
      width:"0px",
      backgroundColor:"rgba(0, 0, 0, 0)",
        borderRadius:"0px",
      transition:{duration: 0.1}
    }).then(()=>{
      animateIconContainer.start({
        height:"40px",
        width:"40px",
        transition:{duration: 0.2}
      })
      animateIcon.start({
        height:"15px",
        width:"15px",
        transition:{duration: 0.2}
      }).then(()=>{
        setDeploy(false)
      })
    })

    animWindowOut();
  }

  const animWindowIn = ()=>{

    animateWindowPop.start({
      width:"120px",
      height:"120px",
      marginTop:"-120px",
      transition:{duration: 0.3}
    }).then(()=>{
    
      animIconsButtonIn();
    })

    animateTapWindowPop.start({
      display:"inline",
      opacity: 1,
      transition:{duration: 0.2}
    })

  }

  const animWindowOut = ()=>{
    
    animIconsButtonOut().then(()=>{
      animateWindowPop.start({
        width:"0px",
        height:"0px",
        marginTop:"0px",
        transition:{duration: 0.3}
      })
  
      animateTapWindowPop.start({
        display:"none",
        opacity: 0,
        transition:{duration: 0.2}
      })
    })
   
  }


  const animIconsButtonIn=()=>{
    animateIconsButton.start(i =>({
      width:"40px",
      height:"40px",
      transition: { duration: 0.1,delay: i * 0.1} 
    }))
  }

  function animIconsButtonOut(){
    return(
      animateIconsButton.start(i =>({
        width:"0px",
        height:"0px",
        transition: { duration: 0.1,delay: i * 0.1} 
      }))
    )    
  }
  

  return(
   <div className="container-gen-otherinputs">

    {/* VENTANA EMERGENTE */}
    <div className="window-pop-otherinputs">

      <motion.div animate={animateWindowPop} className="window-pop-content-otherinputs">
        
        <div className="button-space-otherinputs">
          <div className="containerinput-file-otherinputs">
            <input type="file" onChange={()=>{console.log("carga")}} className="one-input-otherinputs" id ={idImg}></input>
            <label htmlFor={idImg} className="custom-file-one-input-otherinputs">
              <motion.img custom={0} animate={animateIconsButton} className="button-icon-otherinputs" src={pdfIcon}></motion.img>
            </label>
          </div>
        </div>

        <div className="button-space-otherinputs">
          <div className="containerinput-file-otherinputs">
            <input type="file" onChange={()=>{console.log("carga")}} className="one-input-otherinputs" id ={idPdf}></input>
            <label htmlFor={idPdf} className="custom-file-one-input-otherinputs">
              <motion.img custom={1} animate={animateIconsButton} className="button-icon-otherinputs" src={imgIcon}></motion.img>
            </label>
          </div>
        </div>

        <div className="button-space-otherinputs"></div>
        <div className="button-space-otherinputs"></div>
      </motion.div>

      <motion.img animate={animateTapWindowPop} className="window-pop-tap-otherinputs" src={tap}></motion.img>
    </div>

    {/* LOGICA PARA BOTON DEL INPUT DE MULTIMEDIA */}
    <button onBlur={deploy ? animIconOut : null} onClick={ deploy ? animIconOut : animIconIn}   className="container-icon-otherinputs">
     <motion.div  animate={animateIconContainer} className="icon-otherinputs" >
          <div className="container-circle-otherinputs">
            <motion.div animate={animateIcon} className="circle-icon-otherinputs"></motion.div>
          </div>
          <div className="container-circle-otherinputs">
            <motion.div animate={animateIcon} className="circle-icon-otherinputs"></motion.div>
          </div>
          <div className="container-circle-otherinputs">
            <motion.div animate={animateIcon} className="circle-icon-otherinputs"></motion.div>
          </div>
          <div className="container-circle-otherinputs">
            <motion.div animate={animateIcon} className="circle-icon-otherinputs"></motion.div>
          </div>
      </motion.div>
     </button>

   </div> 
  )
}


export default OtherInputs