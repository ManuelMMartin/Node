const express = require('express')
const app = express()
const port = process.env.PORT || 3000

//import
let almacen = require('./modules/almacen')

let cesta = []

app.get('/', (req, res) => {
   res.send(almacen)
})

app.get('/ropa', (req, res) => {
   let html = ""
   almacen[0].productos.forEach((producto) => html += `<tr><td>${producto.nombre}</td><td>${producto.precio}</td><td>${producto.stock}</td></tr>`)

   res.send(`<table><tr><th>Producto</th><th>Precio</th><th>Stock</th></tr>${html}</table>`)
})
app.get('/tecnologia', (req, res) => {
   let html = ""
   almacen[1].productos.forEach((producto) => html += `<tr><td>${producto.nombre}</td><td>${producto.precio}</td><td>${producto.stock}</td></tr>`)

   res.send(`<table><tr><th>Producto</th><th>Precio</th><th>Stock</th></tr>${html}</table>`)
})

app.get('/:departamento/:nombre/:cantidad', (req, res) => {
   let departamento = almacen.find(departamento => departamento.nombre === req.params.departamento)
   let departamentoIndex = almacen.findIndex(departamento => departamento.nombre === req.params.departamento)

   if (departamento === undefined) {
      res.send('No existe el departamento')
   } else {
      let producto = departamento.productos.find(producto => producto.nombre === req.params.nombre)
      let productoIndex = departamento.productos.findIndex(producto => producto.nombre === req.params.nombre)
      if (producto === undefined) {
         res.send('No existe el el producto')
      } else {
         if (producto.stock < req.params.cantidad) {
            res.send('No podemos servirte esa cantidad, el maximo seria: ' + producto.stock)
         } else {
            cesta.push({ nombre: producto.nombre, cantidad: req.params.cantidad, precio: producto.precio })
            almacen[departamentoIndex].productos[productoIndex].stock -= req.params.cantidad
            res.send('Añadido')
         }
      }
   }
})

app.get('/cesta', (req, res) => {
   let html = ""
   let total = 0

   cesta.forEach((producto) => total += producto.cantidad * producto.precio)
   cesta.forEach((producto) => html += `<tr><td>${producto.nombre}</td><td>${producto.cantidad}</td><td>${producto.cantidad * producto.precio}</td></tr>`)

   res.send(`<table><tr><th>Producto</th><th>Cantidad</th><th>Total</th></tr>${html}<td></td><td>TOTAL</td><td>${total}</td></table><a href="http://localhost:3000/comprar"><button>Comprar</button></a>`)
})

app.get('/comprar', (req, res) => {
   res.send(cesta.length > 0 ? "Compra realizada" : "selecciona primero algunos productos")
   cesta = []
})







app.listen(port, err => {
   err
      ? console.log("He fallado, lo siento")
      : console.log(`estoy funcionando en localhost:${port}`)
})