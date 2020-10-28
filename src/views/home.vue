<template>
  <div class="w-full bg-red-200 h-screen">
    <!-- Two columns -->
    <div class="flex mb-4">
      <app-menu/>
      <div class="w-screen h-screen bg-blue-400 overscroll-auto">
        <div class="bg-gray-900 shadow-lg h-full fixed bottom-0  md:relative md:h-full z-10 w-full md:w-full pt-4">
          <div id="logo" class="bg-yellow-400 h-1/4 rounded-lg mx-2">
            <div class="text-center justify-center py-4 text-3xl text-white">
                4 Ruedas parqueadero
            </div>
          </div>
          <router-view/>
        </div>
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
