const express = require('express')
const app = express()
const port = process.env.PORT || 3000

function random(num) {
   return Math.floor(Math.random() * ((num - 1) + 1))
}

app.get('/', function (req, resp) {
   resp.send(`
   <h1>NUMERO ALEATORIO</h1>
   <h2>Indica en la ruta un numero para recibir un numero aleatorio entre tu numero y el 1. ejemplo:</h2></br>
   <h2>http://localhost:3000/100</h2>`)
})

app.get('/:num', function (req, resp) {
   resp.send(
      `<h1>NUMERO ALEATORIO</h1>
   <h2>${(random(parseInt(req.params.num)))}</h2>`
   )
})





app.listen(port, err => {
   err
      ? console.log("He fallado, lo siento")
      : console.log(`estoy funcionando en localhost:${port}`)
})