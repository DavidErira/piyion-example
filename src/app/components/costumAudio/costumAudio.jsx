import React, {Component,useRef, useState, useEffect} from "react";

import userIcon from "./assets/userIcon.svg"
import "./costumAudio.css"

function CostumAudio(props){

    return(
        <div className="container-gen-costumaudio">
            <div className="container-element-audio-costumaudio">
                <audio className="audio-container-costumaudio"  controls controlsList="nodownload nofullscreen" 
                src={props.srcAudio}></audio>
            </div>
            <div className="container-icon-user-costumaudio">
                <img className="icon-user-costumaudio" src={userIcon}></img>
            </div>
        </div>
    )
}

export default CostumAudio;