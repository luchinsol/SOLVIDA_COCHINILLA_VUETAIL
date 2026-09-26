<template>
  <div
    class="flex flex-col sm:flex-row sm:items-end gap-4 p-4 bg-[#fcfcfc] border border-slate-100 rounded-lg shadow-sm"
  >
    <div class="w-full sm:w-72">
      <label for="filtro-tipo-lote-cochinilla" class="filter-label">Tipo de lote</label>
      <select
        id="filtro-tipo-lote-cochinilla"
        v-model="tipoLoteFiltro"
        class="filter-select"
      >
        <option value="">Todos los tipos</option>
        <option value="comprado">Comprado</option>
        <option value="preparado">Preparado</option>
      </select>
    </div>

    <div class="w-full sm:w-72">
      <label for="filtro-almacen-cochinilla" class="filter-label">Almacén</label>
      <select
        id="filtro-almacen-cochinilla"
        v-model="almacenFiltro"
        class="filter-select"
      >
        <option value="todos">Todos los almacenes</option>
        <option
          v-for="almacen in almacenes"
          :key="almacen.almacen_id"
          :value="String(almacen.almacen_id)"
        >
          {{ almacen.nombre }}
        </option>
      </select>
    </div>

    <button
      @click="showCreateCochinillaModal = true"
      class="sm:ml-auto px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-lg text-[10px] font-black uppercase tracking-widest shadow-lg shadow-red-100 flex items-center justify-center gap-2 transition-colors"
    >
      <i class="fa-solid fa-plus"></i>
      Crear lote cochinilla
    </button>
  </div>

  <slot name="summary"></slot>

  <div class="w-full bg-white border border-gray-200 rounded-xl">
    <div class="overflow-x-auto">
      <table class="w-full min-w-[1200px]">
        <!-- HEADER -->
        <thead class="bg-gray-50 text-gray-600 uppercase text-[10px] tracking-wider">
          <tr>
            <th class="px-4 py-3 text-left">ID</th>
            <th class="px-4 py-3 text-left">Almacén</th>
            <th class="px-4 py-3 text-left bg-yellow-200">Tipo Lote</th>
            <th class="px-4 py-3 text-left bg-pink-200">Calidad Cochinilla</th>
            <th class="px-4 py-3 text-left bg-gray-200">Stock actual</th>
            <th class="px-4 py-3 text-center bg-gray-200">Concentración AC (%)</th>
            <th class="px-4 py-3 text-right bg-gray-200">Humedad (%)</th>
            <th class="px-4 py-3 text-left bg-gray-200">Estado Lote</th>
            <th class="px-4 py-3 text-left bg-gray-200">Costo unitario (USD/PTS AC)</th>
            <th class="px-4 py-3 text-left bg-gray-200">Costo Unitario</th>

            <th class="px-4 py-3 text-right bg-gray-200">Stock inicial</th>
            <th class="px-4 py-3 text-center bg-yellow-200">Costo Total Actual</th>
            <th class="px-4 py-3 text-center bg-black-200">Proveedor nombre</th>
            <th class="px-4 py-3 text-center bg-black-10">Acciones</th>
          </tr>
        </thead>
        

        <!-- BODY -->
        <tbody>
          <!-- 🔄 LOADING -->
          <tr v-if="loading">
            <td colspan="14" class="text-center py-10">
              <div class="flex flex-col items-center gap-3">
                <div
                  class="w-10 h-10 border-4 border-green-800 border-t-transparent rounded-full animate-spin"
                ></div>
                <span class="text-sm text-gray-500">Cargando lotes de cochinilla...</span>
              </div>
            </td>
          </tr>

          <!-- ❌ SIN DATOS -->
          <tr v-else-if="paginatedCochinilla.length === 0">
            <td colspan="14" class="text-center py-10 text-gray-500">No hay datos disponibles</td>
          </tr>

          <!-- ✅ DATA -->
          <tr
            v-else
            v-for="(item, index) in paginatedCochinilla"
            :key="index"
            class="border-t hover:bg-gray-50 transition"
          >
            <!-- tu contenido -->
            <!-- ID -->
            <td class="px-4 py-2 text-xs">
              <div class="font-medium text-gray-900">{{ item.lote_cochinilla_id }}</div>
              <!--div class="text-xs text-gray-500">{{ item.hora }}</div-->
            </td>

            <!-- Almacén -->
            <td class="px-4 py-3 text-right">
              <div
                class="flex justify-start items-center gap-2 bg-purple-300 rounded-lg text-purple-600 px-2 py-1"
              >
                <span class="text-xs">{{ item.almacen_nombre || '-' }}</span>
              </div>
            </td>

            <!-- Tipo lote -->
            <td class="px-4 py-3 text-left text-xs">
              <div class="font-bold text-gray-900">{{ item.tipo_lote }}</div>
            </td>

            <!-- Documento 
            <td class="px-4 py-3">
              <div
                class="text-xs font-bold flex items-center gap-1 cursor-pointer hover:text-blue-600 text-gray-600"
              >
                <i :class="item.docIcon"></i>
                <span>{{ item.documento }}</span>
              </div>
            </td>-->

            <!-- Costo unitario 
            <td class="px-4 py-3 text-right font-bold text-xs" :class="item.cantidadColor">
              {{ item.cantidad }}
            </td>-->

            <!-- Calidad cochinilla -->
            <td class="px-4 py-3 text-right font-bold text-xs text-gray-900">
              {{ item.calidad_cochinilla }}
            </td>

            <!-- Stock Actual -->

            
            <td class="px-4 py-2">
              <div class="flex flex-col">
                <span class="font-bold">
                  {{ item.stock_actual }}
                </span>
              
                <span class="text-[14px] text-gray-500 font-bold">
                  {{ item.unidad_medida_stock }}
                </span>
              </div>
            </td>

            <!-- Concentración Actual AC -->
            <td class="px-4 py-3 text-right font-bold text-xs text-gray-900">
              {{ item.concentracion_ac_actual || '-' }}
            </td>

            <!-- Humedad actual -->
            <td class="px-4 py-3 text-right font-bold text-xs text-gray-900">
              {{ item.humedad_actual || '-' }}
            </td>

            <!-- Estado Lote -->
            <td class="px-4 py-3 text-right font-bold text-xs text-gray-900">
              {{ item.estado_lote }}
            </td>

            

            <!-- Costo Punto AC Dolares -->
            
            <td class="px-4 py-2">
              <div class="flex flex-col">
                <span class="font-bold">
                  {{ item.costo_puntoac_dolares || 0.0 }}
                </span>
              
                <span class="text-[14px] text-gray-500 font-bold">
                  {{ item.unidad_medida_dinero }}
                </span>
              </div>
            </td>

            <!-- Costo Kilo Dolares o COSTO UNITARIO-->
            
            <td class="px-4 py-2">
              <div class="flex flex-col">
                <span class="font-bold">
                  {{ item.costo_kilo_dolares || 0.0 }}
                </span>
              
                <span class="text-[14px] text-gray-500 font-bold">
                  {{ item.unidad_medida_dinero }}
                </span>
              </div>
            </td>
            

            

            <!-- Stock Inicial -->
            

            <td class="px-4 py-2">
              <div class="flex flex-col">
                <span class="font-bold">
                  {{ item.stock_inicial }}
                </span>
              
                <span class="text-[13px] text-gray-500 font-bold">
                  {{ item.unidad_medida_stock }}
                </span>
              </div>
            </td>
            

        
            <!-- Costo Total Actual -->
           
            <td class="px-4 py-2">
              <div class="flex flex-col">
                <span class="font-bold">
                  {{ item.costo_total_actual || 0.0 }}
                </span>
              
                <span class="text-[14px] text-gray-500 font-bold">
                  {{ item.unidad_medida_dinero }}
                </span>
              </div>
            </td>

            <!-- Costo Total Actual -->
            <td class="px-4 py-3 text-right font-bold text-xs text-gray-900">
              {{ item.proveedor_nombre }}
            </td>

            <!-- Usuario 
            <td class="px-4 py-3">
              <div class="flex items-center gap-2">
                <img :src="item.avatar" class="w-6 h-6 rounded-full" alt="User" />
                <span class="text-xs">{{ item.usuario }}</span>
              </div>
            </td>-->

            <!-- CONTROL DE ACCIONES -->
            <td class="px-4 py-3 text-center">
              <div
                class="flex justify-center items-center gap-2 opacity-70 hover:opacity-100 transition"
              >
                <!-- VER DETALLE -->
                <button
                  @click="verDetalle(item)"
                  class="p-2 rounded-lg text-blue-600 hover:bg-blue-50 transition"
                  title="Ver información del lote"
                  aria-label="Ver información del lote"
                >
                  <i class="fa-solid fa-eye"></i>
                </button>

                <!-- EDITAR -->
                <button
                  @click="editar(item)"
                  class="p-2 rounded-lg text-yellow-600 hover:bg-yellow-100 transition"
                  title="Editar"
                >
                  <i class="fa-solid fa-pen"></i>
                </button>
                

               
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- CONTROL DE PÁGINAS -->
    <div
      class="flex justify-start items-center gap-2 p-5 border-t font-sans text-[11px] font-semibold text-slate-500"
    >
        <!-- selector -->
        <div class="flex items-center gap-2">
          <span>Mostrar:</span>

          <select
            v-model="perPage"
            @change="currentPage = 1"
            class="border border-slate-200 rounded-md bg-white px-2.5 py-1.5 font-sans text-[11px] font-semibold text-slate-700 outline-none focus:border-red-300 focus:ring-2 focus:ring-red-50"
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
            class="px-3 py-1.5 border border-slate-200 rounded-md text-slate-500 hover:text-red-600 hover:border-red-200 disabled:opacity-50 disabled:hover:text-slate-500"
            :disabled="currentPage === 1"
          >
            <i class="fa-solid fa-angles-left"></i>
          </button>

          <span>Página {{ currentPage }} de {{ totalPages }}</span>

          <button
            @click="nextPage"
            class="px-3 py-1.5 border border-slate-200 rounded-md text-slate-500 hover:text-red-600 hover:border-red-200 disabled:opacity-50 disabled:hover:text-slate-500"
            :disabled="currentPage === totalPages"
          >
            <i class="fa-solid fa-angles-right"></i>
          </button>
        </div>
    </div>
  </div>

  <!-- DETALLE DEL LOTE -->
  <div
    v-if="showDetailModal"
    class="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4"
    @click.self="showDetailModal = false"
  >
    <div class="w-full max-w-md overflow-hidden rounded-lg bg-white shadow-2xl shadow-slate-950/20">
      <div class="flex items-start justify-between border-b border-slate-100 px-6 py-5">
        <div>
          <p class="text-[9px] font-black uppercase tracking-widest text-slate-400">
            Información del lote
          </p>
          <h3 class="mt-1 text-lg font-black text-slate-900">
            {{ detailItem?.codigo_lote || 'Lote de cochinilla' }}
          </h3>
        </div>

        <button
          @click="showDetailModal = false"
          class="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
          title="Cerrar"
          aria-label="Cerrar detalle"
        >
          <i class="fa-solid fa-xmark"></i>
        </button>
      </div>

      <div class="grid grid-cols-1 gap-4 p-6 sm:grid-cols-2">
        <div class="rounded-lg border border-slate-100 bg-slate-50 px-4 py-4">
          <p class="text-[9px] font-black uppercase tracking-widest text-slate-400">
            Creado por
          </p>
          <p class="mt-2 text-sm font-bold text-slate-800">
            {{ detailItem?.creado_por_nombre || '-' }}
          </p>
        </div>

        <div class="rounded-lg border border-slate-100 bg-slate-50 px-4 py-4">
          <p class="text-[9px] font-black uppercase tracking-widest text-slate-400">
            Fecha de creación
          </p>
          <p class="mt-2 text-sm font-bold text-slate-800">
            {{ formatearFechaHora(detailItem?.fecha_creacion) }}
          </p>
        </div>

        <div class="rounded-lg border border-slate-100 bg-slate-50 px-4 py-4 sm:col-span-2">
          <p class="text-[9px] font-black uppercase tracking-widest text-slate-400">
            Costo total inicial
          </p>
          <div class="mt-2 flex items-baseline gap-2">
            <span class="text-sm font-bold text-slate-800">
              {{ detailItem?.costo_total_inicial ?? '-' }}
            </span>
            <span v-if="detailItem?.unidad_medida_dinero" class="text-[10px] font-black uppercase text-slate-400">
              {{ detailItem.unidad_medida_dinero }}
            </span>
          </div>
        </div>

        <div class="rounded-lg border border-slate-100 bg-slate-50 px-4 py-4 sm:col-span-2">
          <p class="text-[9px] font-black uppercase tracking-widest text-slate-400">
            Observaciones
          </p>
          <p class="mt-2 whitespace-pre-wrap break-words text-sm leading-6 text-slate-700">
            {{ detailItem?.observaciones || '-' }}
          </p>
        </div>
      </div>
    </div>
  </div>

  <!-- SHOW DIALOG DE CREACIÓN DE COCHINILLA X COMPRA-->
  <div
    v-if="showCreateCochinillaModal"
    class="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/45 p-4 backdrop-blur-[2px]"
  >
    <div class="flex max-h-[92vh] w-full max-w-[720px] flex-col overflow-hidden rounded-lg border border-slate-200 bg-white shadow-2xl">
      <div class="border-b border-slate-100 bg-slate-50 px-6 py-5 sm:px-8">
        <h2 class="text-2xl font-black text-[#1e3a8a]">Nuevo lote de cochinilla</h2>
        <p class="mt-1 text-[10px] font-bold uppercase tracking-widest text-slate-400">
          Registra una compra y su ingreso inicial al inventario
        </p>
      </div>

      <div class="space-y-8 overflow-y-auto p-6 sm:p-8">
        <section class="space-y-4">
          <h3 class="flex items-center text-xs font-black uppercase tracking-widest text-slate-800">
            <i class="fa-solid fa-circle-info mr-2 text-blue-500"></i>
            Información básica
          </h3>
          <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div class="space-y-1.5">
              <label class="corporate-label">Fecha de creación</label>
              <input v-model="createLoteCochinillaForm.fecha_creacion" type="date" class="corporate-field" />
            </div>
            <div class="space-y-1.5">
              <label class="corporate-label">Tipo de cochinilla</label>
              <select v-model="createLoteCochinillaForm.tipo_cochinilla_id" class="corporate-field cursor-pointer" required>
                <option disabled value="">Seleccione un tipo</option>
                <option
                  v-for="tipo in tiposCochinilla"
                  :key="tipo.tipo_cochinilla_id"
                  :value="tipo.tipo_cochinilla_id"
                >
                  {{ tipo.nombre }}
                </option>
              </select>
            </div>
          </div>
        </section>

        <section class="space-y-4">
          <div class="flex flex-wrap items-center justify-between gap-3">
            <h3 class="flex items-center text-xs font-black uppercase tracking-widest text-slate-800">
              <i class="fa-solid fa-location-dot mr-2 text-red-500"></i>
              Ubicación y proveedor
            </h3>
            <button
              type="button"
              @click="showProveedorForm = !showProveedorForm"
              class="text-[9px] font-black uppercase tracking-widest text-red-600 transition-colors hover:text-red-800"
            >
              <i class="fa-solid fa-circle-plus mr-1"></i>
              {{ showProveedorForm ? 'Cerrar registro' : 'Crear proveedor' }}
            </button>
          </div>

          <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div class="space-y-1.5">
              <label class="corporate-label">Almacén de destino</label>
              <select v-model="createLoteCochinillaForm.almacen_id" class="corporate-field cursor-pointer focus:border-red-400 focus:ring-red-50">
                <option disabled value="">Seleccionar...</option>
                <option v-for="almacen in almacenes" :key="almacen.almacen_id" :value="almacen.almacen_id">{{ almacen.nombre }}</option>
              </select>
            </div>
            <div class="space-y-1.5">
              <label class="corporate-label">Proveedor</label>
              <select v-model="createLoteCochinillaForm.proveedor_id" class="corporate-field cursor-pointer focus:border-red-400 focus:ring-red-50">
                <option disabled value="">Seleccionar...</option>
                <option v-for="proveedor in proveedores" :key="proveedor.proveedor_id" :value="proveedor.proveedor_id">{{ proveedor.nombre_razon_social }}</option>
              </select>
            </div>
          </div>

          <CrearProveedor
            v-if="showProveedorForm"
            v-model="showProveedorForm"
            @created="handleProveedorCreado"
          />
        </section>

        <section class="space-y-4 border-t border-slate-100 pt-6">
          <h3 class="flex items-center text-xs font-black uppercase tracking-widest text-slate-800">
            <i class="fa-solid fa-microscope mr-2 text-emerald-500"></i>
            Datos técnicos
          </h3>
          <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div class="space-y-1.5">
              <label class="corporate-label uppercase tracking-widest">Stock inicial</label>
              <input
                v-model="createLoteCochinillaForm.stock_inicial"
                type="number"
                class="corporate-field font-bold focus:border-emerald-400 focus:ring-emerald-50"
                placeholder="0.00"
              />
            </div>
            <div class="space-y-1.5">
              <label class="corporate-label uppercase tracking-widest">Costo total inicial</label>
              <input
                v-model="createLoteCochinillaForm.costo_total_inicial"
                type="number"
                class="corporate-field font-bold focus:border-emerald-400 focus:ring-emerald-50"
                placeholder="0.00"
              />
            </div>
            <div class="space-y-1.5 sm:col-span-2">
              <label class="corporate-label uppercase tracking-widest">Observaciones</label>
              <input
                v-model="createLoteCochinillaForm.observaciones"
                type="text"
                class="corporate-field focus:border-emerald-400 focus:ring-emerald-50"
                placeholder="Detalles adicionales del lote"
              />
            </div>
          </div>
        </section>
      </div>

      <div class="flex items-center justify-end gap-4 border-t border-slate-100 bg-slate-50 px-6 py-5 sm:px-8">
        <button type="button" @click="showCreateCochinillaModal = false" class="px-5 py-2.5 text-[10px] font-black uppercase tracking-widest text-slate-400 transition-colors hover:text-slate-600">
          Cancelar
        </button>
        <button type="button" @click="crearLoteCochinilla" class="rounded-lg bg-[#1e3a8a] px-7 py-3 text-[10px] font-black uppercase tracking-widest text-white shadow-lg shadow-blue-100 transition-all hover:bg-blue-900 active:scale-95">
          Crear nuevo lote
        </button>
      </div>
    </div>
  </div>

  <!-- SHOW DIALOG DE REGISTRO ELIMINACIÓN-->
  <div
    v-if="showDeleteModal"
    class="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
  >
    <div class="bg-white p-6 rounded-xl w-80 shadow-lg">
      <h2 class="text-lg font-bold mb-4">Confirmar eliminación</h2>

      <p class="text-sm text-gray-600 mb-6">¿Seguro que deseas eliminar este registro?</p>

      <div class="flex justify-end gap-3">
        <button @click="showDeleteModal = false" class="px-4 py-2 text-sm border rounded-lg">
          Cancelar
        </button>

        <button @click="eliminar" class="px-4 py-2 text-sm bg-red-600 text-white rounded-lg">
          Eliminar
        </button>
      </div>
    </div>
  </div>

  <!-- SHOW DIALOG RESULTADO -->
  <div
    v-if="showResultadoModalCochinilla "
    class="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
  >
    <div
      class="p-6 rounded-xl w-[400px] shadow-lg text-center"
      :class="resultType === 'success' ? 'bg-green-100' : 'bg-red-100'"
    >
      <h2 class="text-xl font-bold mb-4 text-gray-900">
        {{ resultType === 'success' ? 'Operación exitosa' : 'Error' }}
      </h2>

      <p class="mb-6">
        {{ resultMessage }}
      </p>

      <button
        @click="showResultadoModalCochinilla = false"
        class="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700"
      >
        Aceptar
      </button>
    </div>
  </div>

  <!-- SHOW DIALOG DE ACTULIZAR COCHINILLA-->
  <div
    v-if="showUpdateCochinillaModal"
    class="fixed inset-0 bg-black/40 flex items-center justify-center z-50 bg-gray-800/30"
  >
    <div class="bg-red-100 p-6 rounded-xl w-[650px] shadow-lg max-h-[90vh] overflow-y-auto">
      <h2 class="text-xl font-bold mb-6">Actualizar Lote Cochinilla</h2>

      <div class="flex flex-col gap-6">
        <!-- 🔹 BLOQUE 1 -->

        <!-- ACTUALIZAR ESTADO LOTE -->
        <div>
          <h3 class="text-sm font-bold text-gray-500 mb-3">Estado de lote</h3>

          <div class="grid grid-cols-1 gap-4">
            <select v-model="updateForm.estado_lote" class="input">
              <option disabled value="">Estado del lote</option>
              <option value="disponible">Disponible</option>
              <option value="por analizar">Por analizar</option>
              <option value="bloqueado">Bloqueado</option>
              <option value="agotado">Agotado</option>
            </select>
            <button
              @click="actualizarEstadoLoteCochinilla"
              class="bg-blue-500 hover:bg-gray-600 text-white py-2 px-4 rounded"
            >
              Actualizar Estado
            </button>
          </div>
        </div>

        <!-- ACTUALIZAR STOCK ACTUAL LOTE -->
        <div>
          <h3 class="text-sm font-bold text-gray-500 mb-3">Stock actual</h3>

          <div class="grid grid-cols-1 gap-4">
            <input
              v-model="updateForm.stock_actual"
              type="number"
              placeholder="Stock actual"
              class="input"
            />
            <button
              @click="actualizarStockActualCochinilla"
              class="bg-blue-500 hover:bg-gray-600 text-white py-2 px-4 rounded"
            >
              Actualizar Stock
            </button>
          </div>
        </div>

        <!-- 🔘 BOTONES -->
        <div class="flex justify-end gap-3">
          <button
            @click="showUpdateCochinillaModal = false"
            class="px-4 py-2 bg-gray-800 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 flex items-center gap-2"
          >
            <i class="fa-solid fa-close"></i>
            Cerrar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from 'axios'
import { watch, computed } from 'vue'
import { onMounted } from 'vue'
import { ref } from 'vue'
import CrearProveedor from '../lote_insumo/Formularios_inline/CrearProveedor.vue'

const cochinilla = ref([])

const almacenes = ref([])
const proveedores = ref([])
const tiposCochinilla = ref([])
const loading = ref(false)
const showDeleteModal = ref(false)
const selectedItem = ref(null)
const currentPage = ref(1)
const perPage = ref(5)
const tipoLoteFiltro = ref('')
const showProveedorForm = ref(false)
const showCreateCochinillaModal = ref(false)
const showUpdateCochinillaModal = ref(false)
const showDetailModal = ref(false)
const detailItem = ref(null)

// MENSAJES UI DE RESULTADOS
const resultMessage = ref('')
const resultType = ref('') // 'success' o 'error'
const showResultadoModalCochinilla = ref(false)

const perPageOptions = [5, 10, 20, 'All']

const createLoteCochinillaForm = ref({
  almacen_id: '',
  proveedor_id: '',
  creado_por: 1,
  fecha_creacion: '',
  tipo_cochinilla_id: '',
  stock_inicial: 0.0,
  costo_total_inicial: 0.0,
  observaciones: 'N/A',
})

const updateForm = ref({
  id: null,
  estado_lote: '',
  stock_actual: null,
})

/// PROPS
const props = defineProps({
  inventario: {
    type: String,
    default: 'todos',
  },
})
const emit = defineEmits([
  'update:inventario',
  'inventario-actualizado',
  'tipo-lote-cambiado',
])

const almacenFiltro = computed({
  get: () => props.inventario,
  set: (value) => emit('update:inventario', value),
})

const crearLoteCochinilla = async () => {
  try {
    console.log('Crear lote cochinilla con datos:', createLoteCochinillaForm.value)

    // ejemplo:
    // await axios.post('/api/lotes-cochinilla', createLoteCochinillaForm.value)
    const baseURL = import.meta.env.VITE_API_URL
  const response =  await axios.post(`${baseURL}/lotes-cochinilla/compra`, {
      almacen_id: parseInt(createLoteCochinillaForm.value.almacen_id),
      proveedor_id: parseInt(createLoteCochinillaForm.value.proveedor_id),
      creado_por: createLoteCochinillaForm.value.creado_por,
      fecha_creacion: createLoteCochinillaForm.value.fecha_creacion,
      tipo_cochinilla_id: parseInt(createLoteCochinillaForm.value.tipo_cochinilla_id),
      stock_inicial: createLoteCochinillaForm.value.stock_inicial,
      costo_total_inicial: createLoteCochinillaForm.value.costo_total_inicial,
      observaciones: createLoteCochinillaForm.value.observaciones,
    })
    showCreateCochinillaModal.value = false

    if(response.status === 201) {

     resultMessage.value = 'Lote de cochinilla creado exitosamente'
     resultType.value = 'success'
      showResultadoModalCochinilla.value = true   

    } 
    await getLoteCochinilla(props.inventario) // recarga la lista después de crear
    emit('inventario-actualizado')
  } catch (error) {
    console.error('Error creando lote de cochinilla:', error)
    showCreateCochinillaModal.value = false

    const msg =  error.response?.data?.message || 'Error inesperado al crear lote de cochinilla' 
      resultMessage.value = msg
      resultType.value = 'error'
       showResultadoModalCochinilla.value = true

      
        


      console.error('Error inesperado al crear lote de cochinilla:', response)
  }
}

const eliminar = async () => {
  try {
    console.log('Eliminar:', selectedItem.value)

    // ejemplo:
    // await axios.delete(`/api/insumos/${selectedItem.value.insumo_id}`)

    showDeleteModal.value = false
  } catch (error) {
    console.error(error)
  }
}
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

const formatearFechaHora = (fecha) => {
  if (!fecha) return '-'

  const valor = new Date(fecha)
  if (Number.isNaN(valor.getTime())) return '-'

  const partes = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/Lima',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  })
    .formatToParts(valor)
    .reduce((resultado, parte) => {
      resultado[parte.type] = parte.value
      return resultado
    }, {})

  return `${partes.day}/${partes.month}/${partes.year} ${partes.hour}:${partes.minute} ${partes.dayPeriod.toUpperCase()}`
}

const verDetalle = (item) => {
  detailItem.value = item
  showDetailModal.value = true
}

const editar = (item) => {
  console.log('Editar:', item)
  showUpdateCochinillaModal.value = true
  updateForm.value = {
    id: item.lote_cochinilla_id,
    estado_lote: item.estado_lote,
    stock_actual: item.stock_actual,
  }
  

}

const actualizarStockActualCochinilla = async () => {
  try {
    const baseURL = import.meta.env.VITE_API_URL

    const response = await axios.patch(
      `${baseURL}/lotes-cochinilla/${updateForm.value.id}/stock-actual`,
      {
        stock_actual: updateForm.value.stock_actual,
      },
    )

    if (response.status === 200) {
      // cerrar modal actual
      showUpdateCochinillaModal.value = false

      // mostrar resultado
      resultMessage.value = 'Stock actual del lote actualizado correctamente'
      resultType.value = 'success'
      showResultadoModalCochinilla.value = true
    }

    await getLoteCochinilla(props.inventario)
    emit('inventario-actualizado')
    //showUpdateModal.value = false
  } catch (error) {
    //showUpdateModal.value = false
    showUpdateCochinillaModal.value = false
    const msg = error.response?.data?.message || 'El stock actual no debe ser mayor al stock inicial'
    resultMessage.value = msg
    resultType.value = 'error'
    showResultadoModalCochinilla.value = true
    console.error(error)
  }
}

const actualizarEstadoLoteCochinilla = async () => {
  try {
    const baseURL = import.meta.env.VITE_API_URL

    const response = await axios.patch(
      `${baseURL}/lotes-cochinilla/${updateForm.value.id}/estado-lote`,
      {
        estado_lote: updateForm.value.estado_lote,
      },
    )

    if (response.status === 200) {
      // cerrar modal actual
      showUpdateCochinillaModal.value = false

      // mostrar resultado
      resultMessage.value = 'Estado de lote actualizado correctamente'
      resultType.value = 'success'
      showResultadoModalCochinilla.value = true
    }

    await getLoteCochinilla(props.inventario)
    //showUpdateModal.value = false
  } catch (error) {
    //showUpdateModal.value = false
    showUpdateCochinillaModal.value = false
    const msg = error.response?.data?.message || 'No se pudo actualizar el estado del lote'
    resultMessage.value = msg
    resultType.value = 'error'
    showResultadoModalCochinilla.value = true
    console.error(error)
  }
}
const confirmarEliminar = (item) => {
  selectedItem.value = item
  showDeleteModal.value = true
}
const getLoteCochinilla = async (almacenId) => {
  loading.value = true
  try {
    const baseURL = import.meta.env.VITE_API_URL
    const response = await axios.get(`${baseURL}/lotes-cochinilla`, {
      params: {
        almacen_id: almacenId === 'todos' ? undefined : almacenId,
        tipo_lote: tipoLoteFiltro.value || undefined,
      },
    })

    cochinilla.value = Array.isArray(response.data) ? response.data : []
    await delay(1000) // Simula un retraso para mostrar el spinner console.log('Cochinilla:', data)
  } catch (error) {
    console.error('Error fetching cochinilla:', error)
    cochinilla.value = []
  } finally {
    loading.value = false
  }
}

/// COMPUTED PROPERTIES PARA PAGINACIÓN
const paginatedCochinilla = computed(() => {
  if (perPage.value === 'All') return cochinilla.value
  const start = (currentPage.value - 1) * perPage.value
  return cochinilla.value.slice(start, start + perPage.value)
})

const totalPages = computed(() => {
  if (perPage.value === 'All') return 1
  return Math.ceil(cochinilla.value.length / perPage.value)
})

const nextPage = () => {
  if (currentPage.value < totalPages.value) currentPage.value++
}

const prevPage = () => {
  if (currentPage.value > 1) currentPage.value--
}

const getAlmacenes = async () => {
  try {
    const baseURL = import.meta.env.VITE_API_URL
    const response = await axios.get(`${baseURL}/almacen`)
    almacenes.value = response.data
  } catch (error) {
    console.error('Error fetching almacenes:', error)
  }
}

const getProveedores = async () => {
  try {
    const baseURL = import.meta.env.VITE_API_URL
    const response = await axios.get(`${baseURL}/proveedores`)
    proveedores.value = response.data
  } catch (error) {
    console.error('Error fetching proveedores:', error)
  }
}

const getTiposCochinilla = async () => {
  try {
    const baseURL = import.meta.env.VITE_API_URL
    const response = await axios.get(`${baseURL}/tipos-cochinilla`, {
      params: { activo: true },
    })
    tiposCochinilla.value = Array.isArray(response.data) ? response.data : []
  } catch (error) {
    console.error('Error fetching tipos de cochinilla:', error)
    tiposCochinilla.value = []
  }
}
const handleProveedorCreado = async (nuevoProveedor) => {
  await getProveedores()
}

onMounted(() => {
  getAlmacenes()
  getProveedores()
  getTiposCochinilla()
})
/// WATCHER PARA RECARGAR DATOS CUANDO CAMBIA EL INVENTARIO
watch(
  [() => props.inventario, tipoLoteFiltro],
  ([nuevoAlmacen]) => {
    currentPage.value = 1
    emit('tipo-lote-cambiado', tipoLoteFiltro.value)
    getLoteCochinilla(nuevoAlmacen)
  },
  { immediate: true },
)
</script>

<style scoped>
.corporate-label {
  @apply ml-1 block text-[10px] font-bold text-slate-500;
}

.corporate-field {
  @apply w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-xs font-medium text-slate-700 outline-none transition-all focus:border-blue-400 focus:ring-4 focus:ring-blue-50;
}

.filter-label {
  @apply block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5 ml-1;
}

.filter-select {
  @apply w-full bg-white border border-slate-200 rounded-lg px-4 py-2.5 text-xs font-bold text-slate-600 outline-none focus:ring-4 focus:ring-red-50 focus:border-red-200 transition-all;
}
</style>
