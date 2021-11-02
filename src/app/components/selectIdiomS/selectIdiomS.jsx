import React, {Component,useRef, useState, useEffect} from "react";
import { useTranslation } from "react-i18next"

//loadimagenes idiomas
import spanishIcon from "./assets/spanishIcon.png"
import englishICon from "./assets/englishICon.png" 

import "./selectIdiomS.css"
function SelectIdiomS(props) {

  const tamItems = 25;
  const totalItems = 2;
  const calcTop = (tamItems * totalItems)+"px";

  const [t,i18n] = useTranslation("global"); //hook idioma

  const [idomSelect, setIdiomSelect] = useState("es");
  const [iconSelectActual, setIconSelectActual] = useState(spanishIcon);
  const [deploy, setDeploy] = useState(false);

  const clickHandler = () =>{
    if(deploy){
      setDeploy(false);
    }else{
      setDeploy(true);
    }
  }

  const clickItemHandler = (idiom)=>{
    i18n.changeLanguage(idiom);
    setIdiomSelect(idiom);
    if(idiom == "es"){
      setIconSelectActual(spanishIcon)
    }
    else if(idiom == "en"){
      setIconSelectActual(englishICon)
    }
    clickHandler()
  }

  useEffect(()=>{
    i18n.changeLanguage(idomSelect);
    if(idomSelect == "es"){
      setIconSelectActual(spanishIcon)
    }
    else if(idomSelect == "en"){
      setIconSelectActual(englishICon)
    }
  },[])

  return(
    <div style={{overflow: deploy ? "visible" : "hidden"}} className="container-gen-selectidioms">
        
        {/* Ajuste de 10 px de separación */}
        <div style={{marginTop:"calc(-10px - "+calcTop+")" }} className="overleap-window-selectidioms">
            <div  style={{ height:(tamItems+"px"),
                          borderTopLeftRadius:"5px",
                          borderTopRightRadius:"5px"}}
                  className="item-selectidioms"
                  onClick={()=>{clickItemHandler("es")}}>
              <img className="icon-item-selectidioms" src={spanishIcon}></img> 
              {t("idiom.es")}
            </div>

            <div  style={{ height:(tamItems+"px"), 
                          borderEndEndRadius:"5px", 
                          borderEndStartRadius:"5px"}} 
                  className="item-selectidioms"
                  onClick={()=>{clickItemHandler("en")}}>
              <img className="icon-item-selectidioms" src={englishICon}></img> 
              {t("idiom.en")}
            </div>
        </div>

        <div onClick={clickHandler} className="content-static-selectidioms">
            <img src={iconSelectActual} className="img-select-selectidioms"></img>  <div className="title-selectidioms"></div>
            {t("idiom.idiom")}
            <div></div>
            <div></div>
        </div>

    </div>
  )
}

export default SelectIdiomS;