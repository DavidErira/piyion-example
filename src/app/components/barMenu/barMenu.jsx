import React, {useLayoutEffect,Component,useRef, useState, useEffect, version} from "react";
import { motion, useAnimation } from "framer-motion"
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
    useHistory,
    useLocation
  } from "react-router-dom";

import CameraIcon from './assets/camera.svg'
import ChatsIcon from './assets/chats.svg'
import PointsIcon from './assets/points.svg'
import ConfigIcon from './assets/config.svg'
import EstadisticIcon from './assets/estadistic.svg'
import HelpIcon from './assets/help.svg'
import UserAddIcon from './assets/useradd.svg'
import MinIcon from './assets/min.svg'
import NinusIcon from './assets/ninusblack.svg'

import ItemBarMenu from "../itemBarMenu/itemBarMenu";

import './barMenu.css'

function BarMenu(props) {

    let history = useHistory();

    const animatedDeployContainer = useAnimation();
    const animateDeployedContainerItem = useAnimation();
    const animatedDeployIcon = useAnimation();
    const animatedDeployTitleIcon = useAnimation();

    const animateCloseAndMenuSup = useAnimation();
    const animateCloseAndMenuInf = useAnimation();
    const animateContainerIcons = useAnimation();
    const animateZoneclose = useAnimation();
    const animateDots = useAnimation();
 
    const [deployed,setDeployed] = useState(false)
    const [itemNone,setItemNone] = useState(false)
    const [close, setClose] = useState(false)
    const [size, setSize] = useState([0, 0]);

    
    function animateIcons(){
        animatedDeployIcon.start({
            opacity:0,
            width:"0px",
            transition: { duration: 0.15}
        }).then(()=>{
            setTimeout(()=>{
                animatedDeployIcon.start({
                    opacity:1,
                    transition: { duration: 0.01}, 
                })

                animatedDeployIcon.start(i =>({
                    width:"30px",
                    transition: { duration: 0.2,delay: i * 0.15}, 
                }))
            },200)
           
        })
    }

    const clickDeployHandler = ()=>{
        animateZoneclose.start({
            opacity:0,
            transition: { duration:0}
        })
        if(deployed){
            animateIcons()
            animatedDeployTitleIcon.start({
                opacity:0,
                transition: { duration: 0.15}, 
              }).then(()=>{
                animatedDeployTitleIcon.start({
                    display:"none",
                    transition: { duration: 0.1}, 
                })
                animatedDeployContainer.start({
                    width:"50px",
                    borderRadius:"25px",
                    transition: { duration: 0.3},
                  })
            })
            animateDeployedContainerItem.start({
                paddingLeft:"0px",

                transition: { duration: 0.3}
            })
            setDeployed(false)
        }else{
            animatedDeployContainer.start({
                width:"270px",
                borderRadius:"15px",
                transition: { duration: 0.3},
            }).then(()=>{
                animatedDeployTitleIcon.start( i =>({
                    display:"flex",
                    opacity:1,
                    transition: { duration: 0.3,delay: i * 0.1}, 
                }))
            })
            animateDeployedContainerItem.start({
                paddingLeft:"10px",

                transition: { duration: 0.3}
            })
             setDeployed(true)
        }
    }

    const clickHandlerOpenClose = ()=>{
        if(close){
            OpenMenu()
            setClose(false)
        }else{
            closeMenu()
            setClose(true)
        }
    }

    function closeMenu(){
        animateCloseAndMenuSup.start({
            y: "0px",
            rotate:0,
            transition: { duration: 0.3}
        })
        animateCloseAndMenuInf.start({
            y: "0px",
            rotate:0,
            transition: { duration: 0.3}
        })
        animatedDeployIcon.start(i =>({
            width:"0px",
            transition: { duration: 0.13,delay: (5-i) * 0.1}, 
        }))
        animateContainerIcons.start({
            height:"0px",
            marginTop:"0px",
            transition: { duration: 0.6}
        }).then(()=>{
            animateContainerIcons.start({
                overflowY: "hidden",
                transition: { duration: 0}
            })
        })
        animateDots.start({
            opacity: 0,
            transition: { duration: 0.7}
        })
        animatedDeployContainer.start({
            height:"50px",
            y:"var(--displacement-y)",
            backgroundColor:"var(--background-color-var)",
            transition: { duration: 0.8}
        })
    }

    function OpenMenu(){
        animateCloseAndMenuSup.start({
            y: "6px",
            rotate:45,
            transition: { duration: 0.3}
        })
        animateCloseAndMenuInf.start({
            y: "-6px",
            rotate:-45,
            transition: { duration: 0.3}
        })
        setTimeout(()=>{
            animatedDeployIcon.start(i =>({
                width:"30px",
                transition: { duration: 0.13,delay: i * 0.1}, 
            }))
        },200)
        animateContainerIcons.start({
            height:"350px",
            overflowY:"visible",
            transition: { duration: 0.8}
        })
        animatedDeployContainer.start({
            height:"calc( 100% - 120px)",
            y:"0px",
            backgroundColor:"#e5ebf7",
            transition: { duration: 0.5}
        })
        animateDots.start({
           opacity: 1,
           transition: { duration: 0.6}
        })
    }

    useEffect(()=>{
        animateCloseAndMenuSup.start({
            y: "6px",
            rotate:45,
            transition: { duration: 0}
        })
        animateCloseAndMenuInf.start({
            y: "-6px",
            rotate:-45,
            transition: { duration: 0}
        })
        setTimeout(()=>{
            animateZoneclose.start({
                opacity:1,
                transition: { duration:0.6}
            })
        },100)
    },[deployed])

    useEffect(()=>{
        if(close){
            if(size[0] <= 650){
                animatedDeployContainer.start({
                    y:"var(--displacement-y)",
                    backgroundColor:"var(--background-color-var)",
                    transition: { duration: 0}
                })
            } 
            if(size[0] > 620){
                animatedDeployContainer.start({
                    y:"var(--displacement-y)",
                    backgroundColor:"var(--background-color-var)",
                    transition: { duration: 0}
                })
            }
        }
       
    },[size])

    useLayoutEffect(()=>{
        function updateSize() {
            setSize([window.innerWidth, window.innerHeight]);
        }
        window.addEventListener('resize', updateSize);
        updateSize();
    }, [])

    return(
        <motion.div animate={animatedDeployContainer} className="container-gen-barmenu">

            <motion.div  animate={animateContainerIcons} className="container-icons-barmenu">

                <motion.div animate={animateDots}  className="container-dots-barmenu">
                    <img onClick={clickDeployHandler} className="icon-dots-barmenu" src={deployed ? MinIcon  : PointsIcon}></img>
                </motion.div>

                <ItemBarMenu active={true} onClick={()=>{history.push("/chatsonline")}} title ="Ir a chats" custom={0} animateIcon={animatedDeployIcon} 
                            animateTitleIcon={animatedDeployTitleIcon} deployed={deployed} 
                            icon={ChatsIcon}  animateContainerItem={animateDeployedContainerItem} />

                <ItemBarMenu active={false} title ="Supervisión de agentes" custom={1} animateIcon={animatedDeployIcon} 
                            animateTitleIcon={animatedDeployTitleIcon} deployed={deployed} 
                            icon={CameraIcon} animateContainerItem={animateDeployedContainerItem} />

                <ItemBarMenu active={false} title ="Agregar un nuevo agente" custom={2} animateIcon={animatedDeployIcon} 
                            animateTitleIcon={animatedDeployTitleIcon} deployed={deployed} 
                            icon={UserAddIcon}  animateContainerItem={animateDeployedContainerItem}/>

                <ItemBarMenu active={false} title ="Estadisticas" custom={3} animateIcon={animatedDeployIcon} 
                            animateTitleIcon={animatedDeployTitleIcon} deployed={deployed} 
                            icon={EstadisticIcon}  animateContainerItem={animateDeployedContainerItem}/>

                <ItemBarMenu active={false} title ="Configurar cuentas" custom={4} animateIcon={animatedDeployIcon} 
                            animateTitleIcon={animatedDeployTitleIcon} deployed={deployed} 
                            icon={ConfigIcon} animateContainerItem={animateDeployedContainerItem} />

                <ItemBarMenu active={false} title ="Ayuda" custom={5} animateIcon={animatedDeployIcon} 
                            animateTitleIcon={animatedDeployTitleIcon} deployed={deployed} 
                            icon={HelpIcon}  animateContainerItem={animateDeployedContainerItem}/>
                            
            </motion.div>

                <motion.div animate={animateZoneclose} className="zone-menu-close-barmenu">
                    
                    {
                    !deployed ?

                    <motion.div  onClick={clickHandlerOpenClose} className="container-menu-close-barmenu">
                        <motion.div  animate={animateCloseAndMenuSup} className="line-menu-close-barmenu"></motion.div>
                        <div style={{height:"6px"}}></div>
                        <motion.div  animate={animateCloseAndMenuInf} className="line-menu-close-barmenu"></motion.div>
                    </motion.div>:
                    <motion.div   className="container-by-barmenu">
                        <img className="ninus-icon-by-barmenu" src={NinusIcon}></img>
                        <div className="text-by-barmenu">
                            By Ninus Design
                        </div>
                    </motion.div>
                    }       
                </motion.div>

        </motion.div>
    )
}

BarMenu.defaultProps ={
    ative: "una vez"
}

export default BarMenu