import React, {Component,useRef, useState, useEffect} from "react";
import InputNinus from "../../../components/inputNinus/inputNinus";

import { createCompanyData } from "../../../firebaseHandler/dbFirebase";
import { uploadUserData } from "../../../firebaseHandler/dbFirebase";
import { updateCompanyData } from "../../../firebaseHandler/dbFirebase";
import { deleteCompanyData } from "../../../firebaseHandler/dbFirebase";
import {initialHook,AlertHandler, AlertCostumNinus } from "../../../components/alertCostumNinus/alertCostumNinus";
import CustomButton from "../../../components/customButton/customButton";
import emailIcon from "./assets/emailicon.svg"

function RegisterCompany(props){

    //controlador del Alert personalizado
    const alertHook = useState(initialHook)
    const alrt = new AlertHandler(alertHook)

    //datos desde los imputs
    const[companyName,setCompanyName] =useState("");
    const[companyNIT,setCompanyNIT] =useState("");
    const[companyEmail,setCompanyEmail] =useState("");
    
    //datos suministrados al componente (descargados)
    const[dataCompany, setDataCompany] = useState(null)
    const[dataUser, setDataUser] = useState(null);

    //states del view
    const[mode, setMode] =useState("");

    //crear la compañia
    const firstRegister = () =>{
      const data = {
        EMAIL: companyEmail,
        NAME: companyName,
        NIT: companyNIT,
        OWNER: props.userLoged.uid
      }
      createCompanyData(data).then((idCompany)=>{
        const dataUser ={
          COMPANY_ID: idCompany,
          ID: props.userLoged.uid
        }
        uploadUserData(dataUser).then(()=>{
          setDataCompany({
            EMAIL: companyEmail,
            NAME: companyName,
            NIT: companyNIT,
            OWNER: props.userLoged.uid,
            ID:idCompany
          })
          alrt.alertPrint("Compañia creada satisfactoriamente !",null,"check")

          setMode("toview")
        })
      })
    }

    //manejador del click para crear la compañia relacionada por primera vez
    const firstRegisterHandler= ()=>{
      //manejador en cuanto a la obligatoriedad de los campos agregar mensaje y resaltar imput
      if(companyName != "" && companyEmail != ""){
        firstRegister();
      }else{
        alrt.alertPrint("Por favor registre todos los campos requeridos !",null,"error")
      }
    }

    const goToEdit = ()=>{
      setMode("edit")
    }

    const saveEditCompany = ()=>{
      const data = {
        ID: dataCompany.ID,
        NAME: companyName,
        EMAIL: companyEmail,
        NIT: companyNIT,
        OWNER: dataCompany.OWNER,
      } 
      updateCompanyData(data).then(()=>{
        setMode("toview")
      }).then(()=>{
        alrt.alertPrint("Datos de la compañia actualizados satisfactoriamente",null,"check")
      })
    }

    const handlerSaveEditCompany =()=>{
      if(companyName!="" && companyEmail!=""){
        saveEditCompany()
      }else{
        alrt.alertPrint("Por favor registre todos los campos requeridos !",null,"error")
      }
    }

    const deleteEditCompany = ()=>{
      deleteCompanyData(dataCompany.ID).then(()=>{
        const data ={
          COMPANY_ID:"",
          ID: props.userLoged.uid
        }
        uploadUserData(data).then(()=>{
          setCompanyName("")
          setCompanyNIT("")
          setCompanyEmail("")
          setMode("register")
        })
      })
    }

    const handlerDeleteEditComapy= ()=>{
      alrt.alertPrint("Está seguro que desea eliminar la compañia "+ companyName+
      ", al eliminar se perderán todos los registros bajo esta compañia, incluyendo el historial de los chats, datos recogidos hasta el momento y se perderá la relación con sus agentes suscritos !",deleteEditCompany,"alert")
    }

    const cancelEditCompany = ()=>{
      setMode("toview")
    }


    // UseEffect para manejar el estado de los datos actuales
    useEffect(()=>{
      console.log(props.dataUser)
      console.log(props.dataCompany)

      setDataCompany(props.dataCompany)
      setDataUser(props.dataUser)

      if(props.dataUser != null){
        if(props.dataCompany != null){
          //Existen datos guardados en base de datos
          //visualiza los datos de la compañia registrados actualente
          setCompanyName(props.dataCompany.NAME)
          setCompanyNIT(props.dataCompany.NIT)
          setCompanyEmail(props.dataCompany.EMAIL)
          setMode("toview")
        }else{
          // No tiene una compañia registrada y no lo hizo la primera vez
          //Estado para recordarle que debe registrar una
          setMode("register")
        }
      }else{
        if(props.dataCompany != null){
          //visualiza los datos de la compañia registrados actualente
          setCompanyName(props.dataCompany.NAME)
          setCompanyNIT(props.dataCompany.NIT)
          setCompanyEmail(props.dataCompany.EMAIL)
          setMode("toview")
        }else{
          setMode("firstRegister")
        }
      }
    },[props.dataUser,props.dataCompany])

    /* Todos los estilos de este componente estan tomados desde el componente editProfil */
    return(
      <div className="container-window-company-firstsettings">
        <AlertCostumNinus state={alrt.returnHook()}></AlertCostumNinus>
        {
          mode=="firstRegister" ?
          <div>
              <br></br>
              <div className="subtitle-firstsettings">Registro de compañia</div>
              <div className= "description-firstsettings">
                Para las cuentas de administrador es obligatorio realizar el registro de una compañía, esto le va a permitir 
                registrar las redes sociales que se quieren administrar para su negocio, además por medio de esta información 
                se podrán agregar agentes quienes puedan tener acceso a la zona de chats de la compañía registrada. A continuación 
                ingresa la información de la compañia:
              </div>
              <div className="container-inputs-firstsettings">
                <InputNinus backColor="rgb(236, 236, 236)" required valueI={companyName} seterValue={setCompanyName} title={"Nombre"}  marginLeftInputninus="var(--marginLeft-inputninus-firstsettings)" widthInputninus="var(--width-inputninus-firstsettings)" marginTopInputninus="10px"></InputNinus>
                <InputNinus icon={emailIcon}  backColor="rgb(236, 236, 236)" required valueI={companyEmail} seterValue={setCompanyEmail} title={"Email "}  marginLeftInputninus="var(--marginLeft-inputninus-firstsettings)" widthInputninus="var(--width-inputninus-firstsettings)" marginTopInputninus="10px"></InputNinus>
                <InputNinus backColor="rgb(236, 236, 236)" type="number" valueI={companyNIT} seterValue={setCompanyNIT} title={"NIT"}   marginLeftInputninus="var(--marginLeft-inputninus-firstsettings)" widthInputninus="var(--width-inputninus-firstsettings)" marginTopInputninus="10px"></InputNinus>
              </div>

              <div  className="container-buttons-firstsettings">
              <CustomButton width="var(--width-custombutton-firstsettings)" onClick={firstRegisterHandler} value="Registrar Compañia"></CustomButton>
              </div>

          </div>
          : null
        }
        {
          mode=="register" ?
          <div>
              <br></br>
              <div style={{color:"rgb(184, 0, 0)"}} className="subtitle-firstsettings">No existe una compañia registrada</div>
              <div className= "description-firstsettings">
                Es obligatorio realizar el registro de una compañía, esto le va a permitir 
                registrar las redes sociales que se quieren administrar para su negocio, además por medio de esta información 
                se podrán agregar agentes quienes puedan tener acceso a la zona de chats de la compañía registrada. A continuación 
                ingresa la información de la compañia:
              </div>
              <div className="container-inputs-firstsettings">
                <InputNinus backColor="rgb(236, 236, 236)" required valueI={companyName} seterValue={setCompanyName} title={"Nombre"}  marginLeftInputninus="var(--marginLeft-inputninus-firstsettings)" widthInputninus="var(--width-inputninus-firstsettings)" marginTopInputninus="10px"></InputNinus>
                <InputNinus backColor="rgb(236, 236, 236)" icon={emailIcon} required valueI={companyEmail} seterValue={setCompanyEmail} title={"Email "}  marginLeftInputninus="var(--marginLeft-inputninus-firstsettings)" widthInputninus="var(--width-inputninus-firstsettings)" marginTopInputninus="10px"></InputNinus>
                <InputNinus backColor="rgb(236, 236, 236)"type="number"  valueI={companyNIT} seterValue={setCompanyNIT} title={"NIT"}   marginLeftInputninus="var(--marginLeft-inputninus-firstsettings)" widthInputninus="var(--width-inputninus-firstsettings)" marginTopInputninus="10px"></InputNinus>
              </div>
              <div  className="container-buttons-firstsettings">
                <CustomButton width="var(--width-custombutton-firstsettings)" onClick={firstRegisterHandler} value="Registrar Compañia"></CustomButton>
              </div>
          </div>
          : null
        }
        {
          mode=="toview" ?
          <div>
              <br></br>
              <div className="subtitle-firstsettings">Compañia</div>
              <div className= "description-firstsettings">
                Compañia actualmente registrada con los siguientes datos:
              </div>
              <div className="container-inputs-firstsettings">
                <InputNinus backColor="rgb(236, 236, 236)" locked valueI={companyName} seterValue={setCompanyName} title={"Nombre"}  marginLeftInputninus="var(--marginLeft-inputninus-firstsettings)" widthInputninus="var(--width-inputninus-firstsettings)" marginTopInputninus="10px"></InputNinus>
                <InputNinus backColor="rgb(236, 236, 236)" icon={emailIcon} locked valueI={companyEmail} seterValue={setCompanyEmail} title={"Email "}  marginLeftInputninus="var(--marginLeft-inputninus-firstsettings)" widthInputninus="var(--width-inputninus-firstsettings)" marginTopInputninus="10px"></InputNinus>
                <InputNinus backColor="rgb(236, 236, 236)" type="number" locked valueI={companyNIT} seterValue={setCompanyNIT} title={"NIT"}   marginLeftInputninus="var(--marginLeft-inputninus-firstsettings)" widthInputninus="var(--width-inputninus-firstsettings)" marginTopInputninus="10px"></InputNinus>
              </div>
              <div  className="container-buttons-firstsettings">
                <CustomButton width="var(--width-custombutton-firstsettings)" onClick={goToEdit} value="Editar"></CustomButton>
              </div>
          </div>
          : null
        }
        {
          mode=="edit" ?
          <div>
              <br></br>
              <div className="subtitle-firstsettings">Compañia</div>
              <div className= "description-firstsettings">
                En este espacio se pueden editar los datos de la compañia, los agentes suscritos a la misma no se veran afectados:
              </div>
              <div className="container-inputs-firstsettings">
                <InputNinus required backColor="rgb(236, 236, 236)"  valueI={companyName} seterValue={setCompanyName} title={"Nombre"}  marginLeftInputninus="var(--marginLeft-inputninus-firstsettings)" widthInputninus="var(--width-inputninus-firstsettings)" marginTopInputninus="10px"></InputNinus>
                <InputNinus required backColor="rgb(236, 236, 236)" icon={emailIcon}  valueI={companyEmail} seterValue={setCompanyEmail} title={"Email "}  marginLeftInputninus="var(--marginLeft-inputninus-firstsettings)" widthInputninus="var(--width-inputninus-firstsettings)" marginTopInputninus="10px"></InputNinus>
                <InputNinus  backColor="rgb(236, 236, 236)" type="number" valueI={companyNIT} seterValue={setCompanyNIT} title={"NIT"}   marginLeftInputninus="var(--marginLeft-inputninus-firstsettings)" widthInputninus="var(--width-inputninus-firstsettings)" marginTopInputninus="10px"></InputNinus>
              </div>
              <div  className="container-buttons-firstsettings">
                <CustomButton marginMode="1" width="var(--width-custombutton-firstsettings)" onClick={handlerSaveEditCompany} value="Guardar"></CustomButton>
                <CustomButton marginMode="1" width="var(--width-custombutton-firstsettings)" onClick={handlerDeleteEditComapy} value="Eliminar compañia"></CustomButton>
                <CustomButton marginMode="1" width="var(--width-custombutton-firstsettings)" onClick={cancelEditCompany} value="Cancelar"></CustomButton>
              </div>
          </div>
          : null
        }
      </div>
    )
}

export default RegisterCompany