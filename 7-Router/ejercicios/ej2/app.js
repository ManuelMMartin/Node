const express = require('express')
const app = express()
const port = process.env.PORT || 3000
let menus = require('./routes/menus')
let agregar = require('./routes/agregar')
let hamburguesas = require('./routes/hamburguesas')
let bebidas = require('./routes/bebidas')
let pedidos = require('./routes/pedidos')
//para que pueda leer lo que le llega por el body
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
//para que pueda leer lo que le llega por el body
app.use('/menus', menus)
app.use('/agregar', agregar)
app.use('/hamburguesas', hamburguesas)
app.use('/bebidas', bebidas)
app.use('/pedidos', pedidos)
app.use(express.static('public'))
//Configuración mongodb 
const MongoClient = require('mongodb').MongoClient
//conexion con promesas
MongoClient.connect('mongodb://127.0.0.1:27017', {
   useNewUrlParser: true,
   useUnifiedTopology: true,
}).then(client => {
   console.log('🟢MongoDB se ha conectado')
   app.locals.db = client.db("mongonald")
}).catch(err => console.error('🔴MongoDB no conectado. Error: ' + err))
//Configuración mongodb

app.listen(port, err => {
   err
      ? console.log("🔴He fallado, lo siento")
      : console.log(`🟢estoy funcionando en localhost:${port}`)
})