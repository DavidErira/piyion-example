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

process.title = "networked-aframe-server";

// Se obtiene el puerto o se tiene un pruerto por defecto
const port = process.env.PORT;

// Configuración Express server
const app = express();
app.use(morgan('dev'));

app.use(express.static(path.resolve(__dirname, "../public")));
app.use('/firstsettings', express.static(path.join(__dirname, "../public")));

// envíar archivos a las peticiones por ruta por archivos individuales
// app.get('/login/firstsettings', async (req, res) => {
//   res.sendFile(path.join(__dirname, '..',"public","index.html"));
// });
// app.get('/login/firstsettings/bundle.js', async (req, res) => {
//   res.sendFile(path.join(__dirname, '..',"public","bundle.js"));
// });
// app.get('/login/firstsettings/misestilos.css', async (req, res) => {
//   res.sendFile(path.join(__dirname, '..',"public","misestilos.css"));
// });

// Start server Express en HTTP

const webServer = http.createServer(app);

webServer.listen(port, () => {
  console.log("listening on http://localhost:" + port);
});

//CICD

//d.erira-login-implementation