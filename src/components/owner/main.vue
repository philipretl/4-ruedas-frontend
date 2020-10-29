<template>
  <div class="main-owners">
    <div v-if="isVisibleRegisterOwner">
      <app-create-owner/>
    </div>
    <div v-if="isVisibleDeleteOwner">
      <app-delete-owner :owner="owner"/>
    </div>

    <div v-if="isVisibleUpdateOwner">
      <app-update-owner :owner="owner"/>
    </div>
    <div class="max-w-full h-2/4 rounded-xl shadow-lg bg-white my-2 mx-2">
      <div  class="flex flex-row-reverse pr-4 py-4">
        <button @click="openRegisterOwner" class="flex bg-gray-900 hover:bg-yellow-400 text-white font-bold py-4 px-4 rounded">
          <svg class="h-6 w-6 mr-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Agregar propietario
        </button>
      </div>

      <div class="px-6 pt-4 pb-8 overflow-y-scroll mb-2" style="height: 70vh">
        <div class="text-3xl text-gray-900">
          Lista de Propietarios
        </div>
        <hr>

        <template v-if="isLoading">
          <app-loading/>
        </template>

        <template v-if="!isLoading && !isEmpty">
          <table class="table-fixed w-full mt-10">
            <thead>
            <tr >
              <th class="w-1/2 px-2 py-2 text-left">Nombre completo</th>
              <th class="w-1/2 px-2 py-2 text-left">dni</th>
              <th class="w-1/2 px-2 py-2 text-left">Acciones</th>
            </tr>
            </thead>
            <tbody class="overflow-y-scroll" style="height: 10vh;">
            <tr v-for="(owner, index) in owners" :key="'owner'+index">
              <td class="border px-4 py-2">{{ owner.full_name}}</td>
              <td class="border px-4 py-2">{{ owner.dni }}</td>
              <td class="border px-4 py-2 flex flex-row-reverse space-x-12 space-x-reverse pr-6">
                <div @click="openUpdateOwner(owner)" class="text-yellow-400 h-6 w-6">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                    <path fill-rule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clip-rule="evenodd" />
                  </svg>
                </div>
                <div @click="openDeleteOwner(owner)" class="text-red-400 h-6 w-6">
                  <svg class="stroke-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
                  </svg>
                </div>
              </td>
            </tr>
            </tbody>
          </table>
        </template>

        <template v-if="isEmpty && !isLoading">
          <div class="text-xl">
            No existen propietarios registrados actualmente en el sistema.
          </div>
        </template>

      </div>

    </div>
  </div>
</template>

<script>

import store from "@/store";
import Loading from '@/components/loading'
import CreateOwner from '@/components/owner/create-owner'
import DeleteOwner from '@/components/owner/delete-owner'
import UpdateOwner from '@/components/owner/update-owner'

export default{
  data(){
    return{
      owner:{}
    }
  },
  components:{
    'app-loading' : Loading,
    'app-create-owner': CreateOwner,
    'app-delete-owner': DeleteOwner,
    'app-update-owner': UpdateOwner,
  },
  async created() {
    await store.dispatch('owners/loadOwnersServer');
  },
  computed:{
    isEmpty(){
      return store.getters['owners/isEmptyOwnersList'];
    },
    isLoading(){
      return store.getters['owners/isLoading'];
    },
    owners(){
      return store.getters['owners/ownersList'];
    },
    isVisibleRegisterOwner(){
      return store.getters['owners/isCreatingOwner'];
    },
    isVisibleDeleteOwner(){
      return store.getters['owners/isDeletingOwner'];
    },
    isVisibleUpdateOwner(){
      return store.getters['owners/isUpdatingOwner'];
    }
  },
  methods:{
    openRegisterOwner(){
      store.dispatch('owners/establishCreatingOwner', true);
    },
    openDeleteOwner(owner){
      this.owner = owner;
      store.dispatch('owners/establishDeletingOwner', true);
    },
    openUpdateOwner(owner){
      this.owner = owner;
      store.dispatch('owners/establishUpdatingOwner', true);
    }
  }
}

</script>