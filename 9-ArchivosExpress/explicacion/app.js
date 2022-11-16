const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const fileupload = require('express-fileupload')
//para que pueda leer lo que le llega por el body
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(fileupload({ createParentPath: true, safeFileNames: true }))

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
   app.locals.db = client.db("clase")
}).catch(err => console.error('🔴MongoDB no conectado. Error: ' + err))
//Configuración mongodb


app.post('/subir-archivo', (req, resp) => {
   let now = new Date()
   let now2 = now.toISOString()
   now2 = now2.replaceAll(':', '_').replaceAll('.', '_').replaceAll('-', '_')

   if (!req.files) {
      resp.send({ error: true, mensaje: 'no hay archivo', data: {} })
   } else {
      let filename =
         now2 +
         req.files.imagen.md5 +
         req.files.imagen.name.substring(0, req.files.imagen.name.length - 3) +
         '.' +
         req.files.imagen.name.substring(req.files.imagen.name.length - 3)
      req.files.imagen.mv('./public/image/' + filename)
      console.log(filename)
      resp.send({
         error: false,
         mensaje: 'Todo ok',
         data: { filename, md5: req.files.imagen.md5, size: req.files.imagen.size }
      })
   }
})












app.listen(port, err => {
   err
      ? console.log("🔴He fallado, lo siento")
      : console.log(`🟢estoy funcionando en localhost:${port}`)
})