<template>
  <div>
    <p>Nombre: {{ personas.nombre }}</p>
    <p>Edad: {{ personas.edad }}</p>
    <p>año de nacimiento: {{ personas.nacimiento }}</p>
  </div>
  <hr>
  <div>
    <ul>
      <li v-for="pokemon in pokemons" :key="pokemon.nombre">
        nombre: {{ pokemon.nombre }} - Tipo: {{ pokemon.tipo }}
      </li>
    </ul>
  </div>
  <hr>
  <h2>ejercicio 4</h2>
  <Contador />
  <hr>
  <h2>ejercicio 5</h2>
  <CabeceraVue :datos="biblioteca.usuario" />
  <template v-for="libro, index in biblioteca.libros" :key="index">
    <LibroVue :libro="libro" :index="index" />
  </template>

  <hr>
</template>

<script>
import personas from "@/data/personas";
import Contador from "./components/Contador.vue";
import biblioteca from "@/data/biblioteca";
import LibroVue from "./components/Libro.vue";
import CabeceraVue from "./components/Cabecera.vue";

export default {
  name: 'App',
  components: {
    Contador,
    LibroVue,
    CabeceraVue
  },
  data() {
    return {
      personas,
      pokemons: [
        { nombre: "Charmander", tipo: "fuego" },
        { nombre: "Bulbasur", tipo: "planta" },
        { nombre: "Squiertle", tipo: "agua" }
      ],
      biblioteca
    }
  }
}
</script>

<style>

</style>
