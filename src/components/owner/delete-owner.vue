<template>
  <div class="modal flex h-screen w-full fixed top-0 left-0 right-0 flex justify-center bg-black bg-opacity-50 " :class="isVisible">
    <!-- modal -->

    <div class="bg-white rounded shadow-lg pl-12 pb-2 w-8/12 my-12 overflow-y-scroll pt-2" style="height: 50vh;">
      <!-- modal header -->
      <div class="border-b px-4 py-2 flex justify-between items-center">
        <h3 class="font-semibold text-lg">Eliminar un propietario</h3>
        <button @click="cancel" class="text-black close-modal">&cross;</button>
      </div>
      <!-- Error Messages-->
      <template v-if="hasErrors">
        <div>Existen errores con los datos:</div>
        <ul class="ml-12 mt-6">
          <li class="text-red-500" v-for="error in errors" :key="error.id">{{ error.message }}</li>
        </ul>
      </template>
      <template v-if="hasMessages">
        <ul class="ml-12 mt-6">
          <template v-for="message in messages">
            <svg v-if=" message.message_code=== 'DELETED' " class="h-6 w-6 mr-6 text-green-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <li class="text-green-400" :key="message.id">{{ message.message }}</li>
          </template>
        </ul>
      </template>
      <!-- modal body -->

        <div class="mx-5 justify-text-center my-5 flex-col">
          <div v-if="!isProcessCompleted"> Realmente desea elminar el propietario?</div>
          <div>Propietario: {{owner.full_name}}</div>
          <div>DNI: {{owner.dni}}</div>
        </div>
        <div class="md:flex md:items-center pl-32">
        <template v-if="!isProcessCompleted">
          <div class="md:w-1/3 ">
            <button @click="cancel" class="shadow bg-gray-500 hover:bg-white hover:text-black focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="button">
              Cancelar
            </button>
          </div>

          <template v-if="!isLoading">
            <div class="md:w-2/3">
              <button @click="deleteOwner" type="button" class="shadow bg-yellow-500 hover:bg-yellow-600 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" >
                Eliminar
              </button>
            </div>
          </template>
          <template v-if="isLoading">
            <div>
              Cargando...
            </div>
          </template>
        </template>
        </div>
    </div>
  </div>
</template>

<script>
import store from "@/store";

export default{
  props:{
    owner:{}
  },
  created() {
    console.log('created');
    console.log(this.owner);
  },
  computed: {
    isLoading(){
      return store.getters['owners/isLoading'];
    },
    isVisible() {
      return store.getters['owners/isDeletingOwner'];
    },
    hasErrors(){
      return  store.getters['owners/hasErrors'];
    },
    errors(){
      return store.getters['owners/errors'];
    },
    messages(){
      return store.getters['owners/getMessages'];
    },
    hasMessages(){
      return store.getters['owners/hasMessages'];
    },
    isProcessCompleted(){
      let process = store.getters['owners/getProcess'];
      return process.executing === false &&
              process.action === 'delete' &&
              process.status === 'completed';
    }
  },
  methods:{
    cancel(){
      store.dispatch('owners/establishDeletingOwner', false);
    },
    deleteOwner: function(){
      store.dispatch('owners/deleteOwnerServer', this.owner.id);
    }
  }
}
</script>