let objeto = require('./objeto')

let paises = objeto.paises.a.concat(objeto.paises.b, objeto.paises.c)

let favoritos = []

   for (let i = 0; i < paises.length; i++) {
      if (objeto.favoritos.includes(i)) {
        favoritos.push(paises[i]+" ")
      }
      
   }
   

console.log(`Los paises favoritos de ${objeto.nombre} son ${favoritos}`)