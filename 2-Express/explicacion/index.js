const express = require('express')
const app = express()
const port = process.env.PORT || 3000

app.get('/', function (request, response) {

   response.send('<h1>llamada recibida</h1>')
})
app.get('/despedida', function (request, response) {
   response.send('<h2>taluego</h2>')
})
app.get('/datos', function (request, response) {
   response.send({
      results: [{
         nombre: "Macarena"
      },
      {
         nombre: "Rober"
      },
      {
         nombre: "Jimena"
      },]
   })
})

app.get('/persona/:nombre', function(request, response) {
   
   response.send('hola ' + request.params.nombre);
   });



   app.listen(port, err =>{
      err
      ?console.log("He fallado, lo siento")
      :console.log(`estoy funcionando en localhost:${port}`)
   })

