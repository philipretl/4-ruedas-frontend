<template>
  <div class="main-vehicles">
    <div class="max-w-full rounded  overflow-auto shadow-lg bg-white mt-2 mx-2">
      <div class="flex flex-row-reverse pr-4 py-4">
        <button class="bg-gray-900 hover:bg-yellow-400 text-white font-bold py-2 px-4 rounded">
          Agregar Vehiculo
        </button>
      </div>
      <div class="px-6 pt-4 pb-8">
        <div class="text-3xl text-gray-900">
          List de Vehiculos
        </div>
        <hr>
        <table class="table-fixed w-full mt-10">
          <thead>
          <tr>
            <th class="w-1/4 px-2 py-2 text-left">Placa</th>
            <th class="w-1/2 px-2 py-2 text-left">Marca</th>
            <th class="w-1/2 px-2 py-2 text-left">Modelo</th>
            <th class="w-1/2 px-2 py-2 text-left">Tipo</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td class="border px-4 py-2">PlX 125</td>
            <td class="border px-4 py-2">Renault</td>
            <td class="border px-4 py-2">Sandero</td>
            <td class="border px-4 py-2">Carro</td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import store from '@/store'

export default{

}
</script>