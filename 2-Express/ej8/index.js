const express = require('express')
const app = express()
const port = process.env.PORT || 3000
let array = require('./array')
const random = require('./funcion')


app.get('/', function (req, resp) {
   num = random()
   for (let i = 0; i < array.length; i++) {
      if (i === num) {
         array[i]++
      }
   }
   resp.send(`<h1>${array}</h1>`)
})

app.get('/borrar/:numero', function (req, resp) {
   numero = parseInt(req.params.numero)
   for (let i = 0; i < array.length; i++) {
      if (i === numero) {
         array[i] = 0
      }
   }
   resp.send(`<h1>${array}</h1>`)
})


app.listen(port, err => {
   err
      ? console.log("He fallado, lo siento")
      : console.log(`estoy funcionando en localhost:${port}`)
})