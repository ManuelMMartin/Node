<template>
   <div class="card" style="width: 18rem;">
      <img class="card-img-top" :src="libro.formats['image/jpeg']" alt="{{ libro.title }}">
      <div class="container">
         <h4><b>{{ libro.title }}</b></h4>
         <button @click="cambiarNumero(stock)" class="btn btn-primary">🛒</button>
         <p>{{ stock < 1 ? "No quedan unidades" : stock + " unidades en stock" }} </p>
      </div>
   </div>
</template>

<script>
export default {
   name: 'LibroVue',
   data() {
      return {
         stock: 3
      }
   },
   props: {
      libro: Object
   },
   methods: {
      cambiarNumero(stock) {
         stock < 1
            ? ""
            : this.stock--
      }
   }
}
</script>

<style scoped>
.card {
  /* Add shadows to create the "card" effect */
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  transition: 0.3s;
  border-radius: 5px; /* 5px rounded corners */
}

/* On mouse-over, add a deeper shadow */
.card:hover {
  box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
}

/* Add some padding inside the card container */
.container {
  padding: 2px 16px;
}

/* Add rounded corners to the top left and the top right corner of the image */
img {
  border-radius: 5px 5px 0 0;
}
</style>
