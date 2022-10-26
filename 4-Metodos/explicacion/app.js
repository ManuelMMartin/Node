const express = require('express')
const app = express()
const port = process.env.PORT || 3000
app.use(express.static('public'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.get('/', function (req, res) {
   res.send('Hola');
});

app.post('/', (req, res) => {
   res.send('Hola desde post: ' + req.body.info);
})
app.put('/put', (req, res) => {
   res.send({
      mensaje: 'Hola desde PUT: ' + req.body.info,
      status: 200
   });
})






app.listen(port, err => {
   err
      ? console.log("No se puede conectar a " + port)
      : console.log("Estoy funcionando en http://localhost/" + port)
})