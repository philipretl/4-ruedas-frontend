<template>
  <div class="min-h-screen bg-red-200">
    <!-- Two columns -->
    <div class="flex mb-4 ">
      <app-menu/>
      <div class="bg-gray-900 shadow-lg pt-4 w-full">
        <div id="logo" class="bg-yellow-400 h- rounded-lg mx-2">
          <div class="text-center justify-center py-4 text-3xl min-w-full text-white">
              4 Ruedas parqueadero
          </div>
        </div>
        <router-view/>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Menu from '@/views/menu'
export default {
  name: 'Home',
  components: {
    'app-menu': Menu
  }
}
</script>
