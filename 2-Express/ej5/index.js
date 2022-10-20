const express = require('express')
const app = express()
const port = process.env.PORT || 3000

let objeto = {
   nombre: "",
   apellido: "",
   edad: ""
}

app.get('/', function (req, resp) {
   resp.send(`
   <h2>Dirigete a las siguientes rutas para modificar los datos:</h2>
   <p>${"Nombre: "+objeto.nombre}</p>
   <p>${"Apellido: "+objeto.apellido}</p>
   <p>${"Edad: "+objeto.edad}</p>
   <ul>
   <li>http://localhost:3000/nombre/(aqui la modificacion)</li>
   <li>http://localhost:3000/apellido/(aqui la modificacion)</li>
   <li>http://localhost:3000/edad/(aqui la modificacion)</li>
   </ul>
   `)

})

app.get('/nombre/:nombre', function(req, resp){
   objeto.nombre=req.params.nombre
   resp.send(`<h2>Nombre modificado, dirigete a <a href="http://localhost:3000/">inicio</a> para ver el resultado</h2>`)
})
app.get('/apellido/:apellido', function(req, resp){
   objeto.apellido=req.params.apellido
   resp.send(`<h2>Apellido modificado, dirigete a <a href="http://localhost:3000/">inicio</a> para ver el resultado</h2>`)
})
app.get('/edad/:edad', function(req, resp){
   objeto.edad=req.params.edad
   resp.send(`<h2>Edad modificada, dirigete a <a href="http://localhost:3000/">inicio</a> para ver el resultado</h2>`)
})






app.listen(port, err => {
   err
      ? console.log("He fallado, lo siento")
      : console.log(`estoy funcionando en localhost:${port}`)
})