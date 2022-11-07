function options(params) {
   let html = ""
   fetch(`/${params}`).then(res => res.json()).then(res => {
      res.results.forEach(element => {
         html += `<option value="${element.nombre}">${element.nombre} ${element.precio}€</option>`
      });
      document.getElementById('muestra').innerHTML = `
      <h3>${params.toUpperCase()}</h3>
      <select id="eleccion">${html}</select>
      <button onclick="agregar('${params}')">Agregar</button>`
   })
   console.log(document.getElementById('eleccion').value)

}
let menu = []
function agregar(params) {
   if (params === "menus") {
      menu.push(document.getElementById('eleccion').value)
      menu.push("MongoFries")
   } else {
      menu.push(document.getElementById('eleccion').value)
   }
   pedido()
   console.log(menu)
}

function pedido() {
   let html = ""
   menu.forEach(producto => {
      html += `<li>${producto}</li>`
   });
   document.getElementById('pedido').innerHTML = `<ul>${html}</ul>`
}