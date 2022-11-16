function options(params) {
   let html = ""
   fetch(`/${params}`).then(res => res.json()).then(res => {
      res.results.forEach(element => {
         html += `<option value="${element.nombre}">${element.nombre} ${element.precio}€</option>`
      });
      document.getElementById('muestra').innerHTML = `
      <h3>${params.toUpperCase()}</h3>
      <select id="eleccion">${html}</select>
      <button onclick="agregar('${params}')">Siguiente</button> <div id="feedback"></div>`
   })
}

let menu = []

console.log(menu)
function agregar(params) {
   if (params === "menus") {
      menu.push({ menu: true, bbdd: params, nombre: (document.getElementById('eleccion').value) })
      patatas(params)
      options('bebidas')
   } else if (params === "hamburguesas") {
      menu.push(
         { menu: false, bbdd: params, nombre: (document.getElementById('eleccion').value) })
      document.getElementById('feedback').innerHTML = `
      <p>¿Quieres agregar patatas?</p>
      <button onclick="patatas()">si</button><button onclick="options('bebidas')">no</button>`
      document.getElementById('feedback2').innerHTML = `<button type="button" onclick="sumar()">Agregar</button>`
   } else {
      menu[""]
         ? menu.push({ menu: false, bbdd: params, nombre: (document.getElementById('eleccion').value) })
         : menu.find(elemento => elemento = true)
            ? menu.push({ menu: true, bbdd: params, nombre: (document.getElementById('eleccion').value) })
            : menu.push({ menu: false, bbdd: params, nombre: (document.getElementById('eleccion').value) })


      document.getElementById('feedback2').innerHTML = `<button type="button" onclick="sumar()">Agregar</button>`
   }
   pedido()
   console.log(menu)
}

function patatas(params) {
   menu.push(params === "menus" ? { menu: true, bbdd: "entrantes", nombre: "MongoFries" } : { menu: false, bbdd: "entrantes", nombre: "MongoFries" }),
      pedido(),
      options('bebidas')
}
function bebidas(params, menus) {
   menu.push(menus ? { menu: true, bbdd: params, nombre: "MongoFries" } : { menu: false, bbdd: "entrantes", nombre: "MongoFries" }),
      pedido(),
      options('bebidas')
}

function pedido() {
   let html = ""
   menu.forEach(producto => {
      html += `<li>${producto.bbdd} - ${producto.nombre}</li>`
   });
   document.getElementById('pedido').innerHTML = `<ul>${html}</ul>`
}

function sumar() {
   let precio = 0
   menu.forEach(elemento => {
      let bbdd = elemento.bbdd
      let nombre = elemento.nombre
      let menu = elemento.menu

      fetch('/pedidos/nuevo', {
         method: "POST",
         headers: {
            "Content-Type": "application/json"
         },
         body: JSON.stringify({ bbdd, nombre, menu })

      }).then(res => res.json()).then(res => {

      })
      document.getElementById('feedback2').innerHTML = `<button type="button" onclick="editar()">Editar pedido</button>`
      document.getElementById('pedido').innerHTML = "<p>¿quieres algo mas?</p>"

   })
   menu = []
   console.log(menu)
}

function editar() {
   let html = ""
   fetch('/pedidos').then(res => res.json()).then(res => {
      res.results.forEach(elemento => {
         if (elemento.coleccion === "menus" && elemento.menu) {
            html += `<li>Menu ${elemento.nombre} - ${elemento.precio}<button style="background-color: transparent; border: red; margin-left: 5px;" type="button" onclick="borrar(${elemento.menu})">X</button></li>`
         } else if (elemento.menu) {
            html += `<li>${elemento.nombre}<button style="background-color: transparent; border: red; margin-left: 5px;" type="button" onclick="borrar()">X</button></li>`
         } else {
            html += `<li>${elemento.nombre} - ${elemento.precio}<button style="background-color: transparent; border: red; margin-left: 5px;" type="button" onclick="borrar()">X</button></li>`

         }
      })
      document.getElementById('feedback2').innerHTML = `<ul>${html}</ul>`
   })
}