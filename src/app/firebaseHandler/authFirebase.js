import {provider} from './firebaseOb'
import {auth} from './firebaseOb'
import {localPersistence} from './firebaseOb'

export function registerUser(email, password,nombre){
  return new Promise((resolve, reject) => {
    auth.setPersistence(localPersistence).then(()=>{
      auth.createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        var user = userCredential.user;
        user.updateProfile({
          displayName: nombre
        }).then(function() {
         
        }, function(error) {
          // An error happened.
        });
        //Enviamos correo de verificación por medio de un Email
        if(!user.emailVerified){
          userVerificationWhitEmail(user).then(()=>{
            //resolvemos la promesa pero aun esta pendiente la respuesta de la verificación por email
            resolve(user);
          }).catch((error)=>{
            //se rechasa la promesa su existió un error con el envío de email de verificación
            reject(error);
          }); 
        }
      })
      .catch((error) => {
        //se rechasa promesa si existió un error en el login 
        reject(error);
      });
    }).catch((error)=>{
        reject(error);
    })
  })
}

export function singInUser(email,password) {
  return new Promise((resolve, reject) => {
    auth.setPersistence(localPersistence).then(()=>{
      auth.signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        resolve(user);
      })
      .catch((error) => {
         reject(error);
      });

    }).catch((error)=>{
      reject(error);
    })
    } 
  )}

export function  listenUserVerificate(user){
  return( new Promise((resolve, reject) => {
      var countIntents = 0;
      function listenUserVerificateLoop(){
        setTimeout(()=>{
          //actualizamos los datos del usuario actual para saber si ya se verificó
          user.reload();
          //condicion de repetición o finalización de la promesa
          if(!user.emailVerified){
            countIntents=countIntents+1;
            if(countIntents<=1200){
              listenUserVerificateLoop();
            }else{
              reject("TimeOut");
            }
          }else{
            //resolvemos promesa enviando usuario actualizado
            resolve(user)
          } 
        },500)
      }
      
      listenUserVerificateLoop();
  }))      
}

export function userVerificationWhitEmail(user){
  return (
    new Promise((resolve, reject) => {
      //Se envía correo de verificación
      user.sendEmailVerification()
      .then(function() {
        //se inicia lisener para conocer si se verificó el correo
        /* listenUserVerificate(user).then((user)=>{
          console.log("Todo salió bien")
        }); */
        resolve();
      })
      .catch(function(error) {
        reject(error);
      });
    })
  )
  
}

export function singInWhitGoogle(){
  return new Promise((resolve, reject) => {
    auth.setPersistence(localPersistence).then(()=>{
      auth.signInWithPopup(provider)
      .then((result) => {
         //credenciales
        var credential = result.credential;
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        resolve(user);
        }).catch((error) => {
       
        reject(error);
        // ...
      });

    }).catch((error)=>{
      reject(error);
    })
  })
}

export function sendEmailForRecoverPassword(email){
  return(new Promise((resolve, reject) => {
    auth.sendPasswordResetEmail(email)
    .then(function() {
      // Password reset email sent.
      resolve();

    })
    .catch(function(error) {
      // Error occurred. Inspect error.code.
      reject(error);
    });
  }))
 }

 export function geUserfirebase(){
  return(
    new Promise((resolve,reject)=>{
      auth.onAuthStateChanged((user) => {
        if(auth.currentUser != null){
         
          resolve(user)
        }else{
          
          reject()
        }
      });

    })
  )
 }

  export function signOut(){
    return(
      new Promise((resolve, reject) => {
        auth.signOut().then(()=>{

          resolve()
        }).catch(()=>{

          reject()
        })
      })
    )
  }