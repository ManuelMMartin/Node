const express = require('express')
const app = express()
const port = process.env.PORT || 3000
let libros = require('./routes/libros')

//para que pueda leer lo que le llega por el body
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
//para que pueda leer lo que le llega por el body
app.use(express.static('public'))
//Configuración mongodb
const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient
//conexion con promesas
MongoClient.connect('mongodb://127.0.0.1:27017', {
   useNewUrlParser: true,
   useUnifiedTopology: true,
}).then(client => {
   console.log('MongoDB se ha conectado')
   app.locals.db = client.db("pruebas")
}).catch(err => console.error('MongoDB no conectado. Error: ' + err))
//Configuración mongodb

app.use('/libros', libros)
















app.listen(port, err => {
   err
      ? console.log("He fallado, lo siento")
      : console.log(`estoy funcionando en localhost:${port}`)
})