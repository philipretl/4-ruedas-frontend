<template>
  <div class="modal flex h-screen w-full fixed top-0 left-0 right-0 flex justify-center bg-black bg-opacity-50 " :class="isVisible">
    <!-- modal -->

    <div class="bg-white rounded shadow-lg pl-12 pb-2 w-8/12 my-12 overflow-y-scroll pt-2" style="height: 70vh;">
      <!-- modal header -->
      <div class="border-b px-4 py-2 flex justify-between items-center">
        <h3 class="font-semibold text-lg">Actualizar nuevo propietario</h3>
        <button @click="cancel" class="text-black close-modal">&cross;</button>
      </div>
      <template v-if="hasErrors">
        <app-errors :errors="errors"/>
      </template>

      <template v-if="hasMessages">
        <app-messages :messages="messages"/>
      </template>

      <!-- modal body -->
      <form @submit.prevent = "updateOwner" class="w-full pt-12 max-w-lg  flex flex-col">
        <div class="md:flex md:items-center mb-6">
          <div class="md:w-1/3">
            <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-full-name">
              Nombres
            </label>
          </div>
          <div class="md:w-2/3">
            <input v-model="name" type="text" required class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="name" >
          </div>
        </div>
        <div class="md:flex md:items-center mb-6">
          <div class="md:w-1/3">
            <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-password">
              Apellidos
            </label>
          </div>
          <div class="md:w-2/3">
            <input v-model="last_name" type="text" required class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="last_name">
          </div>
        </div>
        <div class="md:flex md:items-center mb-6">
          <div class="md:w-1/3">
            <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="dni">
              DNI
            </label>
          </div>
          <div class="md:w-2/3">
            <input v-model="dni" type="text" required class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="last_name">
          </div>
        </div>
        <div class="md:flex md:items-center pl-32">
          <div class="md:w-1/3 ">
            <button @click="cancel" class="shadow bg-gray-500 hover:bg-white hover:text-black focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="button">
              Cancelar
            </button>
          </div>
          <div class="md:w-2/3">
            <button type="submit" class="shadow bg-yellow-500 hover:bg-yellow-600 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" >
              Actualizar
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import store from '@/store'
import Messages from '@/components/messages'
import Errors from '@/components/errors'

export default{
  components:{
    'app-messages': Messages,
    'app-errors': Errors
  },
  props:['owner'],
  data(){
    return {
      id: '',
      name:'',
      last_name:'',
      dni: '',
    };
  },
  created() {
    this.id = this.owner.id;
    this.name = this.owner.name;
    this.last_name = this.owner.last_name;
    this.dni = this.owner.dni;
  },
  computed: {
    isVisible() {
      return store.getters['owners/isUpdatingOwner'];
    },
    hasErrors(){
      return  store.getters['owners/hasErrors'];
    },
    hasMessages(){
      return store.getters['owners/hasMessages'];
    },
    messages(){
      return store.getters['owners/getMessages'];
    },
    errors(){
      return store.getters['owners/errors'];
    },
    isProcessCompleted(){
      let process = store.getters['owners/getProcess'];
      return process.executing === false &&
          process.action === 'put' &&
          process.status === 'completed';
    }
  },
  methods:{
    cancel(){
      store.dispatch('owners/establishUpdatingOwner', false);
    },
    updateOwner(){
      let owner_to_update = {
        'name': this.name,
        'last_name': this.last_name,
        'dni': parseInt(this.dni),
      }
      store.dispatch(
          'owners/updateOwnerServer',
          {
            owner_to_update: owner_to_update,
            owner_id: this.owner.id,
          }
      );
    }
  }
}
</script>