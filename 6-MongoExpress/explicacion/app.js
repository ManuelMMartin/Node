const express = require('express')
const app = express()
const port = process.env.PORT || 3000

const mongodb = require('mongodb')
let MongoClient = mongodb.MongoClient

MongoClient.connect('mongodb://127.0.0.1:27017', function (err, client) {
   if (err) {
      console.error('MongoDB no conectado. Error: ' + err)
   } else {
      console.log('MongoDB se ha conectado')
      app.locals.db = client.db('pruebas')
   }
})


app.get('/', function (req, res) {

   let results = app.locals.db.collection('pruebas').find().toArray(function (err, data) {
      !err
         ? data
         : err
   })

   res.send({ mensaje: "ok", resultado: results })

});

app.post('/anyadir', (req, res)=>{
   

})


app.listen(port, err => {
   err
      ? console.log("He fallado, lo siento")
      : console.log(`estoy funcionando en localhost:${port}`)
})