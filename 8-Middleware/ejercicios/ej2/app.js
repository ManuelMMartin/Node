const express = require('express')
const app = express()
const port = process.env.PORT || 3000
let bcrypt = require('bcrypt')
//para que pueda leer lo que le llega por el body
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
//para que pueda leer lo que le llega por el body
//acceso a la carpeta public
app.use(express.static('public'))
//acceso a la carpeta public

//Configuración mongodb
const MongoClient = require('mongodb').MongoClient
//conexion con promesas
MongoClient.connect('mongodb://127.0.0.1:27017', {
   useNewUrlParser: true,
   useUnifiedTopology: true,
}).then(client => {
   console.log('🟢MongoDB se ha conectado')
   app.locals.db = client.db("usuarios")
}).catch(err => console.error('🔴MongoDB no conectado. Error: ' + err))
//Configuración mongodb

app.post('/registro', (req, res) => {
   cifrar(req)
   app.locals.db.collection('clientes').find({ email: req.body.email }).toArray((err, data) => {
      err
         ? res.send({ error: true, mensaje: "error al acceder a la BBDD", data: err })
         : data.length > 0
            ? res.send({ error: true, mensaje: "Este usuario ya esta registrado", data: data })
            : app.locals.db.collection('clientes').insertOne({
               nombre: req.body.nombre,
               email: req.body.email,
               pass: req.body.pass,
               dni: req.body.dni,
               nacimiento: req.body.nacimiento,
               ciudad: req.body.ciudad,
               publicidad: req.body.publicidad
            }, (err1, data1) => {
               err1
                  ? res.send({ error: true, mensaje: "error al acceder a la BBDD", data: err1 })
                  : data1.insertedId === null
                     ? res.send({ error: true, mensaje: "No se ha podido registrar el usuario", data: data1 })
                     : res.send({ error: false, mensaje: "Registrado correctamente", results: data1 })
            })
   })
})




app.delete('/borrar', (req, res) => {
   app.locals.db.collection('clientes').find({ email: req.body.email }).toArray((err, data) => {
      console.log(bcrypt.compareSync(req.body.pass, data[0].pass), data[0])
      err
         ? res.send({ error: true, mensaje: "error al acceder a la BBDD", data: err })
         : data.length < 1
            ? res.send({ error: true, mensaje: "Credenciales incorrectas", data: err })
            : !bcrypt.compareSync(req.body.pass, data[0].pass)
               ? res.send({ error: true, mensaje: "Credenciales incorrectas", data: err })
               : app.locals.db.collection('clientes').deleteOne({ dni: req.body.dni }, (err1, data1) => {
                  err1
                     ? res.send({ error: true, mensaje: "error al acceder a la BBDD", data: err1 })
                     : data1.deletedCount < 1
                        ? res.send({ error: true, mensaje: "No se ha podido borrar al usuario", data: data1 })
                        : res.send({ error: false, mensaje: "Borrado", results: data1 })
               })
   })
})

function login(req, res, next) {
   app.locals.db.collection('clientes').find({ email: req.body.email }).toArray((err, data) => {
      if (err) {
         return { error: true, mensaje: "error al acceder a la BBDD", data: err }
      } else {
         console.log(req.body)
         if (data.length < 1) {
            return { error: true, mensaje: "Credenciales incorrectas", data: err }
         } else {

            if (!bcrypt.compareSync(req.body.pass, data[0].pass)) {
               return { error: true, mensaje: "Credenciales incorrectas", data: err }
            } else {
               console.log(req.body)
               return ({ error: false, mensaje: "Credenciales correctas", data: data[0] }, next())
            }
         }
      }
   })
}


app.post('/peticion', (req, res) => {
   app.locals.db.collection('clientes').find({ email: req.body.email }).toArray((err, data) => {
      if (err) {
         res.send({ error: true, mensaje: "error al acceder a la BBDD", data: err })
      } else {
         console.log(req.body)
         if (data.length < 1) {
            res.send({ error: true, mensaje: "Credenciales incorrectas", data: err })
         } else {

            if (!bcrypt.compareSync(req.body.pass, data[0].pass)) {
               res.send({ error: true, mensaje: "Credenciales incorrectas", data: err })
            } else {
               console.log(req.body)
               res.send({ error: false, mensaje: "Credenciales correctas", data: data[0] })
            }
         }
      }
   })

})

app.put('/modificacion', (req, res) => {
   app.locals.db.collection('clientes').find({ email: req.body.email }).toArray((err, data) => {
      console.log(bcrypt.compareSync(req.body.pass, data[0].pass), data[0])
      err
         ? res.send({ error: true, mensaje: "error al acceder a la BBDD", data: err })
         : data.length < 1
            ? res.send({ error: true, mensaje: "Credenciales incorrectas", data: err })
            : !bcrypt.compareSync(req.body.pass, data[0].pass)
               ? res.send({ error: true, mensaje: "Credenciales incorrectas", data: err })
               : app.locals.db.collection('clientes').updateOne({ email: req.body.email }, {
                  $set: {
                     nombre: req.body.nombre,
                     email: req.body.email,
                     pass: bcrypt.hashSync(req.body.passNew, 10),
                     dni: req.body.dni,
                     nacimiento: req.body.nacimiento,
                     ciudad: req.body.ciudad,
                     publicidad: req.body.publicidad
                  }
               }, (err, data) => {
                  err
                     ? res.send({ error: true, mensaje: "error al acceder a la BBDD", data: err })
                     : res.send({ error: false, mensaje: "Modificado correctamente", results: data[0] })
               })
   })
})

function autentificar(req, res, next) {
   console.log(bcrypt.compareSync(req.body.pass, data[0].pass), data[0])
   err
      ? res.send({ error: true, mensaje: "error al acceder a la BBDD", data: err })
      : !bcrypt.compareSync(req.body.pass, data[0].pass)
         ? res.send({ error: true, mensaje: "La contraseña no es correcta", data: err })
         : res.send({ error: false, mensaje: "Busqueda satisfactoria", results: data })
}

function cifrar(req, res, next) {
   req.body.pass = bcrypt.hashSync(req.body.pass, 10)
}

app.listen(port, err => {
   err
      ? console.log("🔴He fallado, lo siento")
      : console.log(`🟢estoy funcionando en localhost:${port}`)
})