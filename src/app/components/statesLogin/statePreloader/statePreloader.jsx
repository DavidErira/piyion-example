import React, {Component,useRef, useState, useEffect} from "react";
import './statePreloader.css'

import AnimationPreloader from "../../animationPreloader/animationPreloader";

function StatePreloader(props){

    const refAnimation = useRef();

    return(
        <div className="container-gen-statepreloader">
            <div ref={refAnimation} className="containerAnimation-statepreloader">
                <AnimationPreloader  endLoad={props.endLoad} blackMode containerRef={refAnimation} ></AnimationPreloader>
            </div>
        </div>
    )
}

export default StatePreloader