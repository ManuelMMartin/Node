<template>
   <header>
      <h2>Biblioteca Paco</h2>
      <nav>
         {{ datos.vip
      ? "Hola " + datos.nombre + " eres Vip😎"
      : "Hola " + datos.nombre + " no eres Vip...😯"
         }}
      </nav>
   </header>
</template>

<script>
export default {
   name: 'CabeceraVue',
   props: {
      datos: Object
   }
}
</script>

<style>

</style>
