const express = require('express')
const app = express()
const port = process.env.PORT || 3000

app.use(express.static('public'))
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
//import
let personas = require("./modules/array")

app.get('/get', (req, res) => {
   res.send(personas)
})

app.post('/post', (req, res) => {
   let persona = req.body.persona
   personas.push(persona)
   res.redirect("/")
})

app.put('/put', (req, res) => {
   let i = personas.findIndex(persona => persona.nombre === req.body.persona.nombre)
   if (i < 0) {
      res.send({ mensaje: "No hemos encontardo a " + req.body.persona.nombre })
   } else {
      personas[i] = req.body.persona

   }

   res.send({ mensaje: "Modificados los datos de " + req.body.persona.nombre })
})

app.delete('/delete', (req, res) => {
   let i = personas.findIndex(persona => persona.nombre === req.body.persona.nombre)
   if (i < 0) {
      res.send({ mensaje: "No hemos encontardo a " + req.body.persona.nombre })
   } else {
      personas.splice(i, 1)
   }

   res.send({ mensaje: "Hemos eliminado los datos de " + req.body.persona.nombre })
})


app.listen(port, err => {
   err
      ? console.log("No se puede conectar a " + port)
      : console.log("Estoy funcionando en http://localhost/" + port)
})