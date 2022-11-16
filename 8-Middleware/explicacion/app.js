const express = require('express')
const app = express()
const cors = require('cors')
const port = process.env.PORT || 3000
const bcrypt = require('bcrypt')
//para que pueda leer lo que le llega por el body


const whitelist = ['http://example1.com', 'http://example2.com']
let corsOptions = {
   origin: function (origin, callback) {
      if (whitelist.indexOf(origin) != -1) {
         callback(null, true)
      } else {
         callback(new Error('No permitido por la política CORS'))
      }
   }
}

/* let contrasenyaCifrada = bcrypt.hashSync('contraseñaSupersegura', 10)

console.log(contrasenyaCifrada)
console.log(bcrypt.compareSync('contraseñaSupersegura', contrasenyaCifrada)) */

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors(corsOptions))

app.use(recibido)
app.use(ip)
//para que pueda leer lo que le llega por el body
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


app.get("/", (req, res, next) => {

   res.send("Hola desde /")
})

app.get("/saludo", (req, res, next) => {

   res.send("hola desde /saludo")
})

function ip(req, res, next) {
   console.log(req.ip)
   next()
}
function recibido(req, res, next) {
   console.log("Peticion recibida")
   next()
}
function cifrar(req, res, next) {
   req.body.pass = bcrypt.hashSync(req.body.pass, 10)
}














app.listen(port, err => {
   err
      ? console.log("🔴He fallado, lo siento")
      : console.log(`🟢estoy funcionando en localhost:${port}`)
})