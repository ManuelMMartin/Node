const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const mongoose = require('mongoose')

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(express.static('public'))

mongoose.connect('mongodb://127.0.0.1:27017/discoshop', {
   useNewUrlParser: true,
   useUnifiedTopology: true,
}).then(
   console.log('🟢Mongoose se ha conectado')
).catch(
   err => console.error('🔴MongoDB no conectado. Error: ' + err)
)

let Disco = require('./schemas/Disco')

/* const discoSchema = mongoose.Schema({
   _id: mongoose.Schema.Types.ObjectId,
   titulo: {
      type: String,
      required: [true, "El titulo es obligatorio"]
   },
   artista: {
      type: String,
      required: [true, "El artista es obligatorio"]
   },
   anyo: {
      type: Number,
      required: [true, "El año es obligatorio"]
   },
   genero: String,
   stock: {
      type: Number,
      required: [true, "Debes añadir el stock"]
   },
   formato: String
})

let Disco = mongoose.model('disco', discoSchema) */

app.get('/discos', (req, res) => {
   Disco.find({}, (err, data) => {
      err
         ? res.send({ error: true, mensaje: "No hay", data: err })
         : data.length < 1
            ? res.send({ error: true, mensaje: "No hay discos", data: data })
            : res.send({ error: false, mensaje: "Aqui los tienes", results: data })
   })
})
app.get('/disco/:titulo', (req, res) => {
   Disco.find({ titulo: req.params.titulo }, (err, data) => {
      err
         ? res.send({ error: true, mensaje: "No hay", data: data })
         : res.send({ error: true, mensaje: "Aqui lo tienes", results: data })
   })
})

app.post('/grabar', (req, res) => {
   console.log(req.body)
   let DiscoNew = new Disco({
      _id: new mongoose.Types.ObjectId(),
      titulo: req.body.titulo,
      artista: req.body.artista,
      anyo: req.body.anyo,
      genero: req.body.genero,
      stock: req.body.stock,
      formato: req.body.formato
   })

   DiscoNew.save((err, data) => {
      err
         ? res.send({ error: true, mensaje: "Error al guardar el disco", data: err })
         : res.send({ error: false, mensaje: "Disco guardado correctamente", data: data })
   })

})

app.put('/modificar', (req, res) => {
   Disco.findOneAndUpdate({ titulo: req.body.titulo },
      {
         $set: {
            artista: req.body.artista ? req.body.artista : artista,
            anyo: req.body.anyo ? req.body.anyo : anyo,
            genero: req.body.genero ? req.body.genero : genero,
            stock: req.body.stock ? req.body.stock : stock,
            formato: req.body.formato ? req.body.formato : formato
         },
      }, (err, data) => {
         err
            ? res.send({ error: true, mensaje: "Error al guardar el disco", data: err })
            : res.send({ error: false, mensaje: "Disco actualizado correctamente", data: data })
      })
})

app.delete('/borrar', (req, res) => {
   Disco.deleteOne({ titulo: req.body.titulo }, (err, data) => {
      err
         ? res.send({ error: true, mensaje: "Error al borrar el disco", data: err })
         : res.send({ error: false, mensaje: "Disco borrado correctamente", data: data })
   })
})




app.listen(port, err => {
   err
      ? console.log("🔴He fallado, lo siento")
      : console.log(`🟢estoy funcionando en localhost:${port}`)
})