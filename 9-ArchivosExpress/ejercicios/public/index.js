function mostrarLogin() {
   document.getElementById('login').style.display = 'block';
}
function mostrarRegistro() {
   document.getElementById('registro').style.display = 'block';
}

function registro() {
   fetch('/registro', {
      method: "POST",
      headers: {
         "Content-Type": "application/json"
      },
      body: JSON.stringify({
         usuario: document.getElementById('usuario').value,
         pass: document.getElementById('pass').value,
         email: document.getElementById('email').value
      })
   }).then(res => res.json()).then(res => {
      console.log(res)
      res.error
         ? feedback(res)
         : (document.getElementById('registro').style.display = 'none',
            feedback(res))
   })

}

function login() {
   let fotos = ""
   fetch('/login', {
      method: "POST",
      headers: {
         "Content-Type": "application/json"
      },
      body: JSON.stringify({
         email: document.getElementById('emailLog').value,
         pass: document.getElementById('passLog').value
      })

   }).then(res => res.json()).then(res => {
      res.error
         ? feedback(res)
         : (
            res.data.img.forEach(foto => {
               fotos += `<img src="/images/${res.data.email}/${foto}" alt="${foto}"/> <button onclick="borrar('${foto}')">eliminar</button>`
            }),
            document.getElementById('login').style.display = 'none',
            feedback(res),
            document.getElementById('subir').style.display = 'block',
            document.getElementById('imagenes').innerHTML = fotos,
            document.getElementById('emailSubir').value = document.getElementById('emailLog').value,
            document.getElementById('passSubir').value = document.getElementById('passLog').value
         )
   })
}

/* function subirFichero() {
   let file = document.getElementById('file').value

   fetch('/subir-archivo', {
      method: "POST",
      headers: {
         "Content-Type": "multipart/form-data"
      },
      body: JSON.stringify({
         imagen: file,
         email: document.getElementById('emailLog').value,
         pass: document.getElementById('passLog').value
      })
   }).then(res => res.json()).then(res => {
      feedback(res)
   })
} */

function borrar(foto) {
   fetch('/borrar', {
      method: "DELETE",
      headers: {
         "Content-Type": "application/json"
      },
      body: JSON.stringify({
         images: foto,
         email: document.getElementById('emailLog').value,
         pass: document.getElementById('passLog').value
      })
   }).then(res => res.json()).then(res => {
      feedback(res)
   })
}

function feedback(res) {
   document.getElementById("feedback").innerHTML = `<p>${res.mensaje}</p>`
   document.getElementById("feedback").style.color = (res.error ? "red" : "green")
   setTimeout(() => {
      document.getElementById("feedback").innerHTML = ""
   }, 3000)
}