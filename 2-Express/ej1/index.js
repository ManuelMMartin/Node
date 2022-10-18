const express = require('express')
const app = express()
const port = process.env.PORT || 3000

app.get('/', function (req, resp) {

   resp.send(`
   <h1>Hola Mundo</h1>
   <h2>desde express</h2>
   `)
})

app.listen(port, err => {
   err
      ? console.log("He fallado, lo siento")
      : console.log(`estoy funcionando en localhost:${port}`)
})