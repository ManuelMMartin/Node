const express = require('express')
const app = express()
const port = process.env.PORT || 3000
let clientes = require('./routes/clientes')
let habitaciones = require('./routes/habitaciones')
let reservas = require('./routes/reservas')
//para que pueda leer lo que le llega por el body
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
//para que pueda leer lo que le llega por el body

//acceso a la carpeta public
app.use(express.static('public'))
//acceso a la carpeta public

//que pueda leer las rutas
app.use('/clientes', clientes)
app.use('/habitaciones', habitaciones)
app.use('/reservas', reservas)
//que pueda leer las rutas

//Configuración mongodb
const MongoClient = require('mongodb').MongoClient
//conexion con promesas
MongoClient.connect('mongodb://127.0.0.1:27017', {
   useNewUrlParser: true,
   useUnifiedTopology: true,
}).then(client => {
   console.log('🟢MongoDB se ha conectado')
   app.locals.db = client.db("hotel")
}).catch(err => console.error('🔴MongoDB no conectado. Error: ' + err))
//Configuración mongodb


















app.listen(port, err => {
   err
      ? console.log("🔴He fallado, lo siento")
      : console.log(`🟢estoy funcionando en localhost:${port}`)
})