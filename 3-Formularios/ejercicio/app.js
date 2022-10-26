const express = require('express')
const app = express()
const port = process.env.PORT || 3000
app.use(express.static('public'))
//import
let animales = require('./modules/animales')

app.get('/', (req, res) => {
   let html = ""
   animales.forEach((animal, index) => html += `<tr><td>${animal.nombre}</td><td>${animal.edad}</td><td>${animal.tipo}</td><td><a href="/adoptar/?index=${index}"><button>Adoptar</button></a></td></tr>`)

   res.send(!html.length ? "No quedan animalmes para adoptar!" : `<table><tr><th>Nombre</th><th>Edad</th><th>Tipo</th><th>Adoptar</th></tr>${html}</table><a href="./agregar.html"><button>Dejar</button></a>`)
})

app.get('/animales', (req, res) => {
   res.send(animales)
})

app.get('/sumar-animal', (req, res) => {
   if (req.query.nombre === "" || req.query.edad === "" || req.query.tipo === "") {
      res.send('No has introducido todos los datos, <a href="./agregar.html">Volver</a>')
   } else {
      animales.push({ nombre: req.query.nombre, edad: parseInt(req.query.edad), tipo: req.query.tipo })
      res.redirect('/')
   }

})

app.get('/adoptar', (req, res) => {

   animales.splice(req.query.index, 1)
   res.redirect('/')
})




app.listen(port, err => {
   err
      ? console.log("No se puede conectar a " + port)
      : console.log("Estoy funcionando en http://localhost/" + port)
})