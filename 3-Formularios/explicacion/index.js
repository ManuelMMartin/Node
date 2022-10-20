const express = require('express')
const app = express()
const port = process.env.PORT || 3000

app.use(express.static('public'))

app.get('/persona', (req, res) => {
   res.send("hola: " + req.query.nombre + " " + req.query.apellido)
})
app.get('/', (req, res) => {
   res.send("hola: " + req.query.nombre + " " + req.query.apellido)
})

/* app.get("/web", (req, res) => {
   res.send(`<!DOCTYPE html>
   <html lang="en">
   <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Document</title>
   </head>
   <body>
      <form action="/">
         <input type="text" name="nombre"/>
         <input type="text" name="apellido"/>
         <button type="submit">Enviar</button>
      </form>
   
   </body>
   </html>`)
}) */


app.listen(port, err => {
   err
      ? console.log("He fallado, lo siento")
      : console.log(`estoy funcionando en localhost:${port}`)
})