import React, {Component,useRef, useState, useEffect} from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory,
  useLocation
} from "react-router-dom";

//import funcionalidaes
import {geUserfirebase} from "../../firebaseHandler/authFirebase"
import {uploadUserData} from "../../firebaseHandler/dbFirebase"
import {downloadUserData} from "../../firebaseHandler/dbFirebase"
import {isFirstLoged} from "../../firebaseHandler/dbFirebase";
import { downloadCompanyData } from "../../firebaseHandler/dbFirebase";

//import componentes
import Header from "../../components/header/header";
import InputNinus from "../../components/inputNinus/inputNinus";
import PreloaderPage from "../../components/preloaderPage/preloaderPage";
import CustomButton from "../../components/customButton/customButton";
import {initialHook,AlertHandler, AlertCostumNinus } from "../../components/alertCostumNinus/alertCostumNinus";
import RegisterCompany from "./components/registerCompany";

//import multimedia
import userInfoIcon from './assets/userinfoicon.svg'
import phone from './assets/phone.svg'
import ilustration from './assets/ilustration.svg'

import './editProfil.css'

function EditProfil(props) {

    //controlador del Alert personalizado
    const alertHook = useState(initialHook)
    const alrt = new AlertHandler(alertHook)

    let history = useHistory();

    //estados del user OBJ de firebase
    const [userObjFB, setUSerObjFB] = useState();
    const [nameUserHeader,setNameUserHeader ] = useState("");
        //datos desde los input de la interfaz para los datos de perfil
    const[namesUser,setNamesUser] =useState("");
    const[surnamesUser,setSurnamesUser] =useState("");
    const[cellUser,setCellUser] =useState("");

    //alerts inputs
    const[nameAlertError, setNameAlertError] =useState(false);
    //controlador de preloader
    const[dataLoaded,setDataLoaded] =useState(false);

    //data de Usuario descargada de base de datos
    const[dataUserDownload,setDataUserDownload] = useState(null);
    const[dataCompanyDownload,setDataCompanyDownload] = useState(null);

    const SaveDataBase = ()=>{
      //recoger datos para guardar
      uploadUserData(OrganizedUserData()).then(()=>{
        alrt.alertPrint("Datos guardados",()=>{},"check")
      }).catch((e)=>{
        console.log("error: "+e)
      })
    }

    const UpdateCredentialsAuth = ()=>{
      userObjFB.updateProfile({
        displayName: namesUser
      }).then()
    }

    const clickHandlerEnter = ()=>{
      history.push("/panel")
    }

    const saveHandler = ()=>{
      console.log("name "+namesUser)
      if(namesUser==""){
        setNameAlertError(true)
        alrt.alertPrint("Por favor registre todos los campos necesarios",()=>{},"error")
      }else{
        SaveDataBase()
        UpdateCredentialsAuth()
        setNameAlertError(false)
      }
    }

    const OrganizedUserData = ()=>{
      const data = {
        ID:userObjFB.uid,
        NAME:namesUser,
        SURNAME:surnamesUser,
        EMAIL:userObjFB.email,
        PHONE:cellUser,
        ROLE:"ADMIN"
      }
      return data
    }

    const processUserExist = (dataUser)=>{
        //Se muestran en el formulario los datos guardados si los hay 
        setNamesUser(dataUser.NAME)
        setSurnamesUser(dataUser.SURNAME)
        setCellUser(dataUser.PHONE)
        //Actualiza nombre del header
        setNameUserHeader(dataUser.NAME)
    }

    const pocessUserNoExist =(user)=>{
      setNamesUser(user.displayName)
      setNameUserHeader(user.displayName)
    }


    /* Control de acceso, si es primera vez y recuperación del objeto de firebase y 
    descarga de datos si estos estan en base de datos */
    useEffect(()=>{

      /* obtenemos el usuario autenticado en firebase */
      geUserfirebase().then((user)=>{
        //set de objeto user de firebase para su uso global en este screan
        setUSerObjFB(user);
        downloadUserData(user.uid).then((dataUser)=>{

          if(dataUser.NAME != null && dataUser.NAME != ""){
            //Es primera vez para guardar datos
            setDataUserDownload(dataUser)
            processUserExist(dataUser);
          }else{
            // no existe un usuarío registrado - es primera vez
            pocessUserNoExist(user)
          }
          
          //Se reviza que exista una compañia registrada con este usuario
          if(dataUser.COMPANY_ID != null && dataUser.COMPANY_ID != ""){
            console.log("whatss")
            downloadCompanyData(dataUser.COMPANY_ID).then((dataCompany)=>{
              setDataCompanyDownload(dataCompany);
              //finalizar preloader
              setDataLoaded(true)
            })
          }else{
            //finalizar preloader
            setDataLoaded(true)
          }

        }).catch((e)=>{
          //No existen datos
          alrt.alertPrint("Error al obtener los datos !")
          console.log("Error al obtener los datos: "+e)
          //finalizar preloader
          setDataLoaded(true)
        })
      }).catch(()=>{
        alrt.alertPrint("No hay una sesión activa en Ninus chat, por favor inicia sesión")
      })
    },[])


    return (
      <div className="container-firstsettings">
        <AlertCostumNinus mode="exitToSingIn" state={alrt.returnHook()}></AlertCostumNinus>
        <PreloaderPage endLoad={dataLoaded}></PreloaderPage>
        <Header mode="2" nameUser={nameUserHeader}></Header>
        
        <div className ="body-firstsettings">
          <br></br><br></br><br></br><br></br>

          <div className="title-firstsettings">
            Configuración del usuario
          </div>

          <div className="zone-config-firstsettings">
            <br></br><br></br>
            <div className="subtitle-firstsettings">Datos del administrador</div>
            <div className= "description-firstsettings">
              Esta es una cuenta de administrador, a continuación puede realizar la actualización de sus datos personales
            </div>
            <div className="container-inputs-firstsettings">
                <InputNinus alertError={nameAlertError} required valueI={namesUser} seterValue={setNamesUser} title={"Nombres "} icon={userInfoIcon} marginLeftInputninus="var(--marginLeft-inputninus-firstsettings)" widthInputninus="var(--width-inputninus-firstsettings)" marginTopInputninus="10px"></InputNinus>
                <InputNinus valueI={surnamesUser} seterValue={setSurnamesUser} title={"Apellidos "} icon={userInfoIcon} marginLeftInputninus="var(--marginLeft-inputninus-firstsettings)" widthInputninus="var(--width-inputninus-firstsettings)" marginTopInputninus="10px"></InputNinus>
                <InputNinus valueI={cellUser} seterValue={setCellUser} title={"Celular"} icon={phone}  marginLeftInputninus="var(--marginLeft-inputninus-firstsettings)" widthInputninus="var(--width-inputninus-firstsettings)" marginTopInputninus="10px"></InputNinus>
            </div>

            <div  className="container-buttons-firstsettings">
              <CustomButton width="var(--width-custombutton-firstsettings)" onClick={saveHandler} value="Guardar"></CustomButton>
            </div>

            <br></br>
            <div className="zone-company-firstsettings">
              {
              (dataLoaded) ?  
              <RegisterCompany userLoged= {userObjFB} dataCompany ={dataCompanyDownload} dataUser={dataUserDownload}></RegisterCompany>
                :
                null
              }
            </div>
            <br></br>
          </div>
          
          <div className="end-zone-buttons-firstsettings" >
            <CustomButton width="180px" onClick={clickHandlerEnter} value="Ingresar al panel"></CustomButton>
          </div>

          <br></br>
          <br></br>
          <br></br>
        </div>
      </div>
    );
  }
  
export default EditProfil;