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

app.get('/persona', function (req, resp) {
   resp.send(`
   <h1>Lista de personas</h1>
   <ul>
   ${listado(array)}
   </ul>
   `)
})

app.get('/persona/:nombre', function (req, resp) {
   let nombre = req.params.nombre.charAt(0).toUpperCase() + req.params.nombre.slice(1)
   respuesta = ''
   if (array.includes(nombre)) {
      respuesta = `el nombre ${nombre} esta en nuestra base de datos`
   } else {
      respuesta = `${nombre} no esta en nuestra base de datos`
   }
   resp.send(`
   <h1>Lista de personas</h1>
   ${respuesta}
   `)

})

app.listen(port, err => {
   err
      ? console.log("He fallado, lo siento")
      : console.log(`estoy funcionando en localhost:${port}`)
})