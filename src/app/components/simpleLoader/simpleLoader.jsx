import React, {Component,useRef, useState, useEffect} from "react";


import "./simpleLoader.css"
function SimpleLoader(props){

  return(

      <div style={{width: props.width}} className="loader-simpleloader">
        <svg className="circular-simpleloader" viewBox="25 25 50 50">
          <circle className="path-simpleloader" cx="50" cy="50" r="20" fill="none" strokeWidth={props.widthLine} strokeMiterlimit="10"/>
        </svg>
      </div>

  )
}

export default SimpleLoader;