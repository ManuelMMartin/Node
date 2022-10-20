const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const saludarEnExpress = require('./function')


app.get('/', function(req,resp){
   resp.send(`${saludarEnExpress()}`)
})



app.listen(port, err =>{
   err
   ?console.log("He fallado, lo siento")
   :console.log(`estoy funcionando en localhost:${port}`)
})