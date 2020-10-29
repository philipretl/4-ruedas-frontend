<template>
  <div>
    <h2>
      Error {{error_code}} {{ message }}
    </h2>
    <p>
      <router-link :to="{name: 'home'}"> Regresar al home</router-link>
    </p>
  </div>
</template>

<script>
export  default {
  props: {
    error_code: {
      type: Number,
      default: 505,
    },
    message: {
      type: String,
      default: 'Server Error!!!',
    }
  },

}
</script>
