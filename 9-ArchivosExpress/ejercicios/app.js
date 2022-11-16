const express = require('express')
const app = express()
const port = process.env.PORT || 3000
let bcrypt = require('bcrypt')
const fileupload = require('express-fileupload')
const fs = require('fs').promises
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(express.static('public'))
app.use(fileupload({ createParentPath: true }))

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
               usuario: req.body.usuario,
               email: req.body.email,
               pass: req.body.pass,
               img: []
            }, (err1, data1) => {
               err1
                  ? res.send({ error: true, mensaje: "error al acceder a la BBDD", data: err1 })
                  : data1.insertedId === null
                     ? res.send({ error: true, mensaje: "No se ha podido registrar el usuario", data: data1 })
                     : res.send({ error: false, mensaje: "Registrado correctamente", results: data1 })
            })
   })

})

app.post('/login', (req, res) => {
   app.locals.db.collection('clientes').find({ email: req.body.email }).toArray((err, data) => {
      err
         ? res.send({ error: true, mensaje: "error al acceder a la BBDD", data: err })
         : data.length < 1
            ? res.send({ error: true, mensaje: "Credenciales incorrectas", data: err })
            : !bcrypt.compareSync(req.body.pass, data[0].pass)
               ? res.send({ error: true, mensaje: "Credenciales incorrectas", data: err })
               : res.send({ error: false, mensaje: "Logueado correctamente", data: data[0] })
   })
})

app.post('/subir-archivo', (req, res) => {
   let now = new Date().toISOString()
   now = now.replaceAll(':', '').replaceAll('.', '').replaceAll('-', '')

   if (!req.files) {
      res.send({ error: true, mensaje: 'no hay archivo', data: {} })
   } else {
      let filename = now + req.files.imagen.md5 + req.files.imagen.name
      req.files.imagen.mv(`./public/images/${req.body.email}/` + filename)
      app.locals.db.collection('clientes').find({ email: req.body.email }).toArray((err, data) => {
         err
            ? res.send({ error: true, mensaje: "error al acceder a la BBDD", data: err })
            : data.length < 1
               ? res.send({ error: true, mensaje: "Credenciales incorrectas", data: err })
               : !bcrypt.compareSync(req.body.pass, data[0].pass)
                  ? res.send({ error: true, mensaje: "Credenciales incorrectas", data: err })
                  : app.locals.db.collection('clientes').updateOne({ email: req.body.email }, { $push: { img: filename } }, (err1, data1) => {
                     err1
                        ? res.send({ error: true, mensaje: "error al acceder a la BBDD", data: err1 })
                        : data1.modifiedCount < 1
                           ? res.send({ error: true, mensaje: "No se ha podido subir el fichero", data: data1 })
                           : res.send({ error: false, mensaje: "Subido", results: { filename, md5: req.files.imagen.md5, size: req.files.imagen.size } })
                  })
      })
   }
})

app.put('/descarga', (req, res) => {
   app.locals.db.collection('clientes').find({ email: req.body.email }).toArray((err, data) => {
      err
         ? res.send({ error: true, mensaje: "error al acceder a la BBDD", data: err })
         : data.length < 1
            ? res.send({ error: true, mensaje: "Credenciales incorrectas", data: err })
            : !bcrypt.compareSync(req.body.pass, data[0].pass)
               ? res.send({ error: true, mensaje: "Credenciales incorrectas", data: err })
               : app.locals.db.collection('clientes').find({ email: req.body.email }).toArray((err1, data1) => {
                  err1
                     ? res.send({ error: true, mensaje: "error al acceder a la BBDD", data: err1 })
                     : data1.length < 1
                        ? res.send({ error: true, mensaje: "No se ha podido acceder el fichero", data: data1 })
                        : res.download(`./public/images/${req.body.email}/${req.body.images}`)
               })
   })
})


app.delete('/borrar', (req, res) => {
   app.locals.db.collection('clientes').find({ email: req.body.email }).toArray((err, data) => {
      err
         ? res.send({ error: true, mensaje: "error al acceder a la BBDD", data: err })
         : data.length < 1
            ? res.send({ error: true, mensaje: "Credenciales incorrectas", data: err })
            : !bcrypt.compareSync(req.body.pass, data[0].pass)
               ? res.send({ error: true, mensaje: "Credenciales incorrectas", data: err })
               : fs.unlink(`./public/images/${req.body.email}/${req.body.images}`)
                  .then(() => {
                     app.locals.db.collection('clientes').updateOne({ email: req.body.email }, { $pull: { img: req.body.images } }, (err2, data2) => {
                        err2
                           ? res.send({ error: true, mensaje: "error al acceder a la BBDD", data: err2 })
                           : data2.modifiedCount < 1
                              ? res.send({ error: true, mensaje: "No se ha podido borrar el archivo", data: data2 })
                              : res.send({ error: false, mensaje: "Borrado", results: data2 })
                     })
                  })
                  .catch((err1) => { res.send({ error: true, mensaje: "No se ha podido borrar el archivo", data: err1 }) })
   })
})

function login(req, res, next) {
   app.locals.db.collection('clientes').find({ email: req.body.emailLog }).toArray((err, data) => {
      err
         ? res.send({ error: true, mensaje: "error al acceder a la BBDD", data: err })
         : data.length < 1
            ? res.send({ error: true, mensaje: "Credenciales incorrectas", data: err })
            : !bcrypt.compareSync(req.body.pass, data[0].pass)
               ? res.send({ error: true, mensaje: "Credenciales incorrectas", data: err })
               : (next(), app.locals.user = data[0])
   })
}


function cifrar(req, res, next) {
   req.body.pass = bcrypt.hashSync(req.body.pass, 10)
}

app.listen(port, err => {
   err
      ? console.log("🔴He fallado, lo siento")
      : console.log(`🟢estoy funcionando en localhost:${port}`)
})