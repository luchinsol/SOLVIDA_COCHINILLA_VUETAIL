<script setup>
// IMPORTS PARA LA PAGINACIÓN
import { ref } from 'vue'
import { computed } from 'vue'
import { watch } from 'vue'

const movimientos = [
  {
    fecha: '29 Oct 2023',
    hora: '14:30:22',
    tipo: 'ENTRADA',
    producto: 'Extracto Líquido Cochinilla',
    codigo: 'EXT-LIQ-01',
    lote: 'EXT-2023-10-29-02',
    ubicacion: 'Planta Extracción',
    subUbicacion: 'Tanque T-105',
    documento: 'OP-2023-892',
    cantidad: '+ 450.00 kg',
    saldo: '1,250.00 kg',
    usuario: 'Miguel S.',
    tipoColor: 'bg-green-100 text-green-700',
    cantidadColor: 'text-green-600',
  },

  {
    fecha: '29 Oct 2023',
    hora: '10:15:00',
    tipo: 'SALIDA',
    producto: 'Cochinilla Grado A',
    codigo: 'MP-COCH-A',
    lote: 'MP-COCH-8922',
    ubicacion: 'Almacén MP',
    subUbicacion: 'Pasillo 2, Rack B',
    documento: 'REQ-PROD-445',
    cantidad: '- 100.00 kg',
    saldo: '900.00 kg',
    usuario: 'Carlos R.',
    tipoColor: 'bg-red-100 text-red-700',
    cantidadColor: 'text-red-600',
  },
]

const perPageOptions = [10, 25, 50, 100]
const perPage = ref(10)
const currentPage = ref(1)
</script>

<template>
  <div class="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
    <!-- HEADER -->
    <div class="px-6 py-5 border-b border-gray-200">
      <h2 class="text-xl font-bold text-gray-900">Kardex Detallado</h2>

      <p class="text-sm text-gray-500 mt-1">Movimientos y trazabilidad de inventario</p>
    </div>

    <!-- TABLE -->
    <div class="overflow-x-auto">
      <table class="w-full min-w-[1300px]">
        <!-- THEAD -->
        <thead class="bg-gray-50 border-b border-gray-200">
          <tr class="text-[11px] uppercase tracking-wider text-gray-500">
            <th class="px-6 py-4 text-left">Fecha / Hora</th>
            <th class="px-6 py-4 text-left">Tipo Mov.</th>
            <th class="px-6 py-4 text-left">Producto / Material</th>
            <th class="px-6 py-4 text-left">Lote</th>
            <th class="px-6 py-4 text-left">Ubicación</th>
            <th class="px-6 py-4 text-left">Documento</th>
            <th class="px-6 py-4 text-right">Cantidad</th>
            <th class="px-6 py-4 text-right">Saldo</th>
            <th class="px-6 py-4 text-left">Usuario</th>
            <th class="px-6 py-4 text-center">Acción</th>
          </tr>
        </thead>

        <!-- TBODY -->
        <tbody>
          <tr
            v-for="(item, index) in movimientos"
            :key="index"
            class="border-b border-gray-100 hover:bg-gray-50 transition"
          >
            <!-- FECHA -->
            <td class="px-6 py-4">
              <div class="font-semibold text-sm text-gray-900">
                {{ item.fecha }}
              </div>

              <div class="text-xs text-gray-400 mt-1">
                {{ item.hora }}
              </div>
            </td>

            <!-- TIPO -->
            <td class="px-6 py-4">
              <span class="px-3 py-1 rounded-lg text-xs font-bold" :class="item.tipoColor">
                {{ item.tipo }}
              </span>
            </td>

            <!-- PRODUCTO -->
            <td class="px-6 py-4">
              <div class="font-semibold text-sm text-gray-900">
                {{ item.producto }}
              </div>

              <div class="text-xs text-gray-400 mt-1">
                {{ item.codigo }}
              </div>
            </td>

            <!-- LOTE -->
            <td class="px-6 py-4">
              <span class="text-indigo-600 font-semibold text-sm">
                {{ item.lote }}
              </span>
            </td>

            <!-- UBICACION -->
            <td class="px-6 py-4">
              <div class="text-sm font-medium text-gray-900">
                {{ item.ubicacion }}
              </div>

              <div class="text-xs text-gray-400 mt-1">
                {{ item.subUbicacion }}
              </div>
            </td>

            <!-- DOCUMENTO -->
            <td class="px-6 py-4">
              <div class="text-sm text-gray-700 font-medium">
                {{ item.documento }}
              </div>
            </td>

            <!-- CANTIDAD -->
            <td class="px-6 py-4 text-right font-bold text-sm" :class="item.cantidadColor">
              {{ item.cantidad }}
            </td>

            <!-- SALDO -->
            <td class="px-6 py-4 text-right font-bold text-gray-900 text-sm">
              {{ item.saldo }}
            </td>

            <!-- USUARIO -->
            <td class="px-6 py-4">
              <div class="flex items-center gap-3">
                <div class="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center">
                  <i class="fa-solid fa-user text-gray-500 text-sm"></i>
                </div>

                <span class="text-sm font-medium text-gray-800">
                  {{ item.usuario }}
                </span>
              </div>
            </td>

            <!-- ACTION -->
            <td class="px-6 py-4 text-center">
              <button class="text-gray-400 hover:text-gray-700">
                <i class="fa-solid fa-ellipsis-vertical"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- CONTROL DE PÁGINAS -->
    <div class="flex justify-start items-center p-5 border-t">
      <!-- selector -->
      <div class="flex items-center gap-2">
        <span class="text-sm text-gray-600">Mostrar:</span>

        <select
          v-model="perPage"
          @change="currentPage = 1"
          class="border rounded px-2 py-1 text-sm"
        >
          <option v-for="opt in perPageOptions" :key="opt" :value="opt">
            {{ opt }}
          </option>
        </select>
      </div>

      <!-- controles -->
      <div class="flex items-center gap-2">
        <button
          @click="prevPage"
          class="px-3 py-1 text-sm border rounded disabled:opacity-50"
          :disabled="currentPage === 1"
        >
          <i class="fa-solid fa-angles-left"></i>
        </button>

        <span class="text-sm"> Página {{ currentPage }} de {{ totalPages }} </span>

        <button
          @click="nextPage"
          class="px-3 py-1 text-sm border rounded disabled:opacity-50"
          :disabled="currentPage === totalPages"
        >
          <i class="fa-solid fa-angles-right"></i>
        </button>
      </div>
    </div>
  </div>
</template>
