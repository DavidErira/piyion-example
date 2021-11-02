console.log("Iniciando EXPRESS en APP Engine")

//Carga de variables de entorno locales o en la servicios de la nube
if(process.env.NODE_ENV !== 'production'){
  require('dotenv').config();
}
else{
  console.log("Se esta ejecutando en ambiente de Producción !!");
}

//Carga de requerimientos 
const http = require("http"); 
const path = require("path");
const express = require("express"); 
const morgan = require('morgan');

// Se obtiene el puerto o se tiene un pruerto por defecto
const port = process.env.PORT;

// Configuración Express server
const app = express();
app.use(morgan('dev'));

app.use(express.static(path.resolve(__dirname, "../dist")));
app.use('/login/firstsettings', express.static(path.join(__dirname, "../dist")));

const webServer = http.createServer(app);

webServer.listen(port, () => {
  console.log("listening on PORT: " + port);
});
