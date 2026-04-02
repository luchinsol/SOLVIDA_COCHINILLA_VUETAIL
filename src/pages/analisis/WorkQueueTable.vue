<template>
  <div class="bg-white rounded-xl border flex flex-col">
    <div class="p-4 border-b flex justify-between">
      <h2 class="font-bold">Cola de Trabajo</h2>
      <select class="border rounded px-2 py-1 text-sm">
        <option>Todas</option>
      </select>
    </div>

    <table class="w-full text-sm">
      <thead class="bg-gray-100 text-gray-500 text-xs uppercase">
        <tr>
          <th class="p-3 text-left">ID</th>
          <th class="p-3 text-left">Lote</th>
          <th class="p-3 text-left">Estado</th>
          <th class="p-3 text-left">Acción</th>
        </tr>
      </thead>

      <tbody>
        <tr class="border-b hover:bg-gray-50">
          <td class="p-3 font-medium">M-1024</td>
          <td class="p-3">EXT-2023</td>
          <td class="p-3">
            <span class="bg-yellow-100 text-yellow-600 px-2 py-1 rounded text-xs"> Pendiente </span>
          </td>
          <td class="p-3 text-indigo-600 cursor-pointer">Iniciar</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
