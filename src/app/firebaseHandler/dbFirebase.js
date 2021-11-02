import {db} from './firebaseOb'

export function uploadUserData(data){
  return new Promise((resolve,reject)=>{
      /*  
          ESTRUCTURA DE LA DATA RECIBIDA: 
          data = {
              NAME: data.NAME,
              SURNAME: data.SURNAME,
              PHONE: data.PHONE,
              ID:data.ID,
              ROLE:data.ROLE,
              EMAIL:data.EMAIL,
              COMPANY_ID:data.COMPANY_ID
              } 
      */
      db.collection("USERS").doc(data.ID).set(data, { merge: true }).then(()=>{
          resolve();
      }).catch((e)=>{
          reject(e);
      })
  })
}

export function downloadUserData(userId){
  return new Promise((resolve, reject) => {
      const datosUsuarioRef = db.collection("USERS").doc(userId);
      datosUsuarioRef.get().then((doc)=>{
        if (!doc.exists) {
          reject("NoExist");
        } else {
          resolve(doc.data());
        }
      }).catch((e)=>{
          console.log("error: "+e);
          reject(e);
      })
  })
}

export function isFirstLoged(userId){
    return new Promise((resolve, reject) => {
        const datosUsuarioRef = db.collection("USERS").doc(userId);
        datosUsuarioRef.get().then((doc)=>{
          if (!doc.exists) {
            reject("NOEXIST");
          } else {
            resolve(doc.data().NAME);
          }
        }).catch((e)=>{
            reject(e);
        })
    })
}

export function downloadCompanyData (companyID){
  return new Promise((resolve, reject) => {
    const datosCompanyRef = db.collection("COMPANY").doc(companyID);
    datosCompanyRef.get().then((doc)=>{
      if (!doc.exists) {
        reject("NoExist");
      } else {
        resolve(doc.data());
      }
    }).catch((e)=>{
        console.log("error: "+e);
    })
  })
}


export function createCompanyData (data){
    /*  
        ESTRUCTURA DE LA DATA RECIBIDA: 
        data = {
            NAME: data.NAME,
            EMAIL: data.EMAIL,
            NIT: data.NIT,
            OWNER: data.OWNER,
            } 
    */
  return new Promise((resolve,reject)=>{
    db.collection("COMPANY").add(data).then((docRef)=>{
      db.collection("COMPANY").doc(docRef.id).set({
        ID:docRef.id
      }, { merge: true }).then(()=>{
        resolve(docRef.id);
      }).catch((e)=>{
          reject(e);
      })
    })

  })
}

export function updateCompanyData (data){
  /*  
      ESTRUCTURA DE LA DATA RECIBIDA: 
      data = {
          ID: data.ID
          NAME: data.NAME,
          EMAIL: data.EMAIL,
          NIT: data.NIT,
          OWNER: data.OWNER,
          } 
  */
  return new Promise((resolve,reject)=>{
    db.collection("COMPANY").doc(data.ID).set(data,{ merge: true}).then(()=>{
      resolve();
    }).catch((e)=>{
        reject(e);
    })
  })
}

export function deleteCompanyData(companyId){
  return new Promise((resolve,reject)=>{
    db.collection("COMPANY").doc(companyId).delete().then(() => {
      console.log("Document successfully deleted!");
      resolve()
    }).catch((error) => {
      reject()
      console.error("Error removing document: ", error);
    });
  })
}

/* cuando la promesa se resuelva tieme que cambiar el relojito por el enviado */
export function sendMsgToDB(idChat,number,msg){

  const date = new Date();
  const strDate = date.getMinutes() + ":" + date.getHours()+ ":" + date.getDay()+ ":" + date.getMonth()+ ":" + date.getFullYear()

  const data = {
    DATETIME: strDate,
    FROM: "I",
    STATE:"WAIT",
    TEXT: msg,
    TYPE:"text",
    srcAudio:{src:""},
    srcImg:{src:"", name:""},
    srcPDF:{src:"", name:""},
    POSITION:number
  }

  return new Promise((resolve,reject)=>{
    db.collection("CURRENT_CHATS").doc(idChat).collection("MESSAGES").add(data).then(()=>{
        console.log("enviadooo")
        resolve();
      }).catch((e)=>{
          reject(e);
      })
  })
}

export function listenerMsgs(idChat,setArrayMessages){
  db.collection("CURRENT_CHATS").doc(idChat).collection("MESSAGES").orderBy("POSITION").onSnapshot((querySnapshot) => {
        var messages = [];
        querySnapshot.forEach((doc) => {
          messages.push(doc.data());
        });

        setArrayMessages(messages);
  });
}

//filtro por date ISO8601 https://es.wikipedia.org/wiki/ISO_8601 - tipo de dato timestamp 


