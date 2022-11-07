habitaciones()
function habitaciones() {
   fetch('/habitaciones').then(res => res.json()).then(res => {


      let html = ''
      res.results.forEach(habitacion => {
         html += `<tr><td>Nº: ${habitacion.numero}</td>${habitacion.ocupada ? "<td style='color: red'>Ocupada</td>" : "<td style='color: green'>Libre</td>"}</tr>`
      });
      document.getElementById('habitaciones').innerHTML = `<table><tr><th>Habitacion</th></tr>${html}</table>`


   })
}
clientes()
function clientes() {
   fetch('/clientes').then(res => res.json()).then(res => {
      let html = ''
      res.results.forEach(cliente => {
         html += `<tr><td>${cliente.nombre} ${cliente.apellido}</td><td>${cliente.dni}</td></tr>`
      });
      document.getElementById('clientes').innerHTML = `<table><tr><th>Nombre</th><th>DNI</th></tr>${html}</table>`
   })
}

function agregar() {
   let nombre = document.getElementById('nombre').value
   let apellido = document.getElementById('apellido').value
   let dni = document.getElementById('dni').value

   if (!nombre || !apellido || !dni || dni.length < 9) {
      feedback(!dni ? { mensaje: "Debes rellenar todos los campos", error: true } : dni.length < 9 ? { mensaje: "El DNI tiene que tener 9 caracteres", error: true } : "")
   } else {
      fetch('/clientes/nuevoCliente', {
         method: "POST",
         headers: {
            "Content-Type": "application/json"
         },
         body: JSON.stringify({ nombre, apellido, dni })
      }).then(res => res.json()).then(res => {
         feedback(res)
         document.getElementById('nombre').value = ""
         document.getElementById('apellido').value = ""
         document.getElementById('dni').value = ""
         clientes()
      })
   }
}

function editarCliente() {
   let nombre = document.getElementById('nombre1').value
   let apellido = document.getElementById('apellido1').value
   let dni = document.getElementById('dni1').value
   
   if (!nombre || !apellido || !dni || dni.length < 9) {
      feedback(!dni ? { mensaje: "Debes rellenar todos los campos", error: true } : dni.length < 9 ? { mensaje: "El DNI tiene que tener 9 caracteres", error: true } : "")
   } else {
      fetch('/clientes/editarCliente', {
         method: "PUT",
         headers: {
            "Content-Type": "application/json"
         },
         body: JSON.stringify({ dni, nombre, apellido })
      }).then(res => res.json()).then(res => {
         console.log(res)
         feedback(res)
         clientes()
         cancelar('inputOculto')
      })
   }
}

reservas()
function reservas() {
   fetch('/reservas').then(res => res.json()).then(res => {
      let html = ''
      res.results.forEach(reserva => {
         html += reserva.checkOut === ""
            ? `<tr style="color: green;">
         <td> Nº: ${reserva.habitacion}</td>
         <td>${reserva.cliente}</td>
         <td>${reserva.checkIn}</td>
         <td><button onclick="checkout('${reserva.habitacion}','${reserva.cliente}')">Checkout</button></td></tr>`
            : `<tr style="color: red;"><td> Nº: ${reserva.habitacion}</td><td>${reserva.cliente}</td><td>${reserva.checkIn}</td><td>${reserva.checkOut}</td></tr>`
      });
      document.getElementById('reservas').innerHTML = `<table><tr><th>Habitacion</th><th>DNI</th><th>CheckIn</th><th>CheckOut</th></tr>${html}</table>`
   })

}

function reservar() {
   let dni = document.getElementById('dniReserva').value
   let numero = parseInt(document.getElementById('habitacionReserva').value)

   console.log({ dni, numero })
   fetch('/reservas/checkin', {
      method: "POST",
      headers: {
         "Content-Type": "application/json"
      },
      body: JSON.stringify({ dni, numero })

   }).then(res => res.json()).then(res => {
      feedback(res)
      habitaciones()
      reservas()
      dni = document.getElementById('dniReserva').value = ""
      numero = document.getElementById('habitacionReserva').value = ""
   })

}

function checkout(art1, art2) {
   let numero = parseInt(art1)
   let dni = art2

   console.log({ dni, numero })
   fetch('/reservas/checkout', {
      method: "PUT",
      headers: {
         "Content-Type": "application/json"
      },
      body: JSON.stringify({ dni, numero })

   }).then(res => res.json()).then(res => {
      feedback(res)
      habitaciones()
      reservas()
   })

}

function feedback(res) {
   document.getElementById("feedback").innerHTML = `<p>${res.mensaje}</p>`
   document.getElementById("feedback").style.color = (res.error ? "red" : "green")
   setTimeout(() => {
      document.getElementById("feedback").innerHTML = ""
   }, 3000)
}

function mostrar(params) {
   document.getElementById(params).style.display = "flex"
}
function cancelar(params) {
   document.getElementById(params).style.display = "none"
   document.getElementById('nombre1').value = ""
   document.getElementById('apellido1').value = ""
   document.getElementById('dni1').value = ""
}