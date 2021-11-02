import React, {Component,useRef, useState, useEffect} from "react";
import { motion, useAnimation } from "framer-motion"


import AnimationPreloader from "../animationPreloader/animationPreloader";

import NinusBlack from "./assets/NinusBlack.svg"

import './preloaderPage.css'
function PreloaderPage (props) {

    const refPreloader = useRef()

    return (
        <div ref={refPreloader} className="container-gen-preloaderpage">
            <AnimationPreloader endLoad={props.endLoad} containerRef={refPreloader} ></AnimationPreloader>
        </div>
    )
}

export default PreloaderPage