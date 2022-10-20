const express = require('express')
const app = express()
const port = process.env.PORT || 3000

const array = ['Manuel', 'Carlos', 'Eduardo', 'Juan', 'Paco']

function listado(params) {
   let listado = ""
   for (let i = 0; i < params.length; i++) {
      listado += (`<li>${params[i]}</li>`)
   }
   return listado
}

app.get('/', function(req, resp){
   
   resp.send(`
   <ul>
   ${listado(array)}
   </ul>`)
})

app.get('/:nombre', function(req, resp){
   let nombre = req.params.nombre.charAt(0).toUpperCase() + req.params.nombre.slice(1)
   array.push(nombre)
   resp.send(`<h2>Agregado</h2>
   <a href="http://localhost:3000/">Volver</a>
   `)
})


app.listen(port, err =>{
   err
   ?console.log("He fallado, lo siento")
   :console.log(`estoy funcionando en localhost:${port}`)
})

