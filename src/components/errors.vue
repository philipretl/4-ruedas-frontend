<template>
  <div>
      <div>Existen errores con los datos:</div>
      <ul class="ml-12 mt-6">
        <li class="text-red-500" v-for="error in errors" :key="error.id">{{ error.message }}</li>
      </ul>
  </div>
</template>


  <script>
    export default{
      props:['errors'],
    }
  </script>