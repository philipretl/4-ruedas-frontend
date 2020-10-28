<template>
  <div class="main-owners">
    <div class="max-w-full min-h-full rounded-xl  overflow-hidden shadow-lg bg-white my-2 mx-2">
      <div class="flex flex-row-reverse pr-4 py-4">
        <button class="bg-gray-900 hover:bg-yellow-400 text-white font-bold py-2 px-4 rounded">
          Agregar propietario
        </button>
      </div>

      <div class="px-6 pt-4 pb-8">
        <div class="text-3xl text-gray-900">
          List de Propietarios
        </div>
        <hr>
        <table class="table-fixed w-full mt-10">
          <thead>
          <tr >
            <th class="w-1/2 px-2 py-2 text-left">Nombre completo</th>
            <th class="w-1/2 px-2 py-2 text-left">dni</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td class="border px-4 py-2">Intro to CSS</td>
            <td class="border px-4 py-2">Adam</td>
          </tr>
          </tbody>
        </table>
      </div>

    </div>
  </div>
</template>