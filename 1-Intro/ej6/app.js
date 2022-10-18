
let factorial = require('./funciones/factorial')
let supervillains = require('supervillains')

function random() {
   return Math.floor(Math.random() * ((factorial(5) - 1) + 1))
}


for (let i = 0; i < 4; i++) {
   console.log(supervillains.all[random()])
}
