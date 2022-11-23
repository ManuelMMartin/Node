<template>
   <div class="container">
      <button @click="cambiarNumero(false)" class="btn btn-primary">restar</button>
      <p>{{ numero }}</p>
      <button @click="cambiarNumero(true)" class="btn btn-primary">sumar</button>
   </div>
</template>

<script>
export default {
   name: 'numero-controlado',
   data() {
      return {
         numero: 0
      }
   },
   methods: {
      cambiarNumero(prop) {
         prop
            ? this.numero++
            : this.numero--
      }
   }
}
</script>

<style>

</style>
