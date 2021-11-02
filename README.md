# omnicanality_frontend


Proyecto en REACT, solo contiene el cliente de toda aplicación

### Funcionamiento 📋
Se utiliza webpack y babel para generar los archivos transpilados del cliente, convirtiendo todo el js, jxs y css en un un solo cliente para el navegador para ello ejecutar en la terminal 

## Comenzando 🚀

COMANDOS NPM

"start-dev": "webpack-dev-server --config webpack.config.dev.js --open",
"webpack-dev": "webpack --config webpack.config.dev.js --watch",
"build-prod": "webpack --config webpack.config.prod.js",
"test-prod": "cross-env NODE_ENV=development-test nodemon src/server/index.js",
"start-prod": "cross-env NODE_ENV=production node server/index.js"


Una vez generado el cliente, se debe utilizar un servidor para ver los resultados, recomendación LiveServer en VSC

