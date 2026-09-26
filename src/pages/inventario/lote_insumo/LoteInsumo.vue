<template>
  <div
    class="flex flex-col sm:flex-row sm:items-end gap-4 p-4 bg-[#fcfcfc] border border-slate-100 rounded-lg shadow-sm"
  >
    <div class="w-full sm:w-72">
      <label for="filtro-tipo-insumo" class="filter-label">
        Tipo de insumo
      </label>
      <select
        id="filtro-tipo-insumo"
        v-model="tipoInsumoFiltro"
        class="filter-select"
      >
        <option value="">Todos los tipos</option>
        <option
          v-for="tipo in tiposInsumo"
          :key="tipo.tipo_insumo_id"
          :value="tipo.tipo_insumo_id"
        >
          {{ tipo.nombre }}
        </option>
      </select>
    </div>

    <div class="w-full sm:w-72">
      <label for="filtro-almacen" class="filter-label">
        Almacén
      </label>
      <select
        id="filtro-almacen"
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
      @click="showCreateModal = true"
      class="sm:ml-auto px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-lg text-[10px] font-black uppercase tracking-widest shadow-lg shadow-red-100 flex items-center justify-center gap-2 transition-colors"
    >
      <i class="fa-solid fa-plus"></i>
      Crear lote insumo
    </button>
  </div>

  <slot name="summary"></slot>

  <!-- TABLA + PAGINADOR-->
  <div class="w-full bg-white border border-slate-100 rounded-lg overflow-hidden shadow-xl shadow-slate-200/50">
    <div class="w-full overflow-x-auto">
      <table class="min-w-max w-full">
        <!-- HEADER -->
        <thead class="bg-gray-50 text-gray-600 uppercase text-[10px] tracking-wider">
          <tr>
            <th class="px-4 py-3 text-left">ID</th>
            <th class="px-4 py-3 text-center bg-blue-200">Nombre</th>
            <th class="px-4 py-3 text-center w-[300px] bg-green-200">Tipo insumo</th>
            <th class="px-4 py-3 text-center w-[250px] bg-purple-200">Almacén</th>
            <th class="px-4 py-3 text-right bg-gray-200">Estado lote</th>
            <th class="px-4 py-3 text-right bg-green-200">Stock Actual</th>
            <th class="px-4 py-3 text-left bg-indigo-200">Stock inicial</th>
            <th class="px-4 py-3 text-left bg-pink-200">Concentración</th>
            <th class="px-4 py-3 text-right bg-yellow-200">Costo Unitario</th>
            <th class="px-4 py-3 text-right bg-red-200">Costo total</th>
            <th class="px-4 py-3 text-center bg-gray-200">Proveedor</th>
            <th class="px-4 py-3 text-center bg-yellow-200">Acciones</th>
          </tr>
        </thead>

        <!-- BODY -->
        <tbody>
          <!-- 🔄 LOADING -->
          <tr v-if="loading">
            <td colspan="12" class="text-center py-10">
              <div class="flex flex-col items-center gap-3">
                <div
                  class="w-10 h-10 border-4 border-green-800 border-t-transparent rounded-full animate-spin"
                ></div>
                <span class="text-sm text-gray-500">Cargando insumos...</span>
              </div>
            </td>
          </tr>

          <!-- ❌ SIN DATOS -->
          <tr v-else-if="paginatedInsumos.length === 0">
            <td colspan="12" class="text-center py-10 text-gray-500">No hay datos disponibles</td>
          </tr>

          <!-- ✅ DATA -->
          <tr
            v-else
            v-for="(item, index) in paginatedInsumos"
            :key="index"
            class="border-t hover:bg-gray-50 transition"
          >
            <!-- tu contenido -->
            <!-- ID -->
            <td class="px-4 py-2 text-xs">
              <div class="font-medium text-gray-900">{{ item.lote_insumo_id }}</div>
              <!--div class="text-xs text-gray-500">{{ item.hora }}</div-->
            </td>

            <!-- Nombre -->
            <td class="px-4 py-2 text-xs">
              <div class="font-medium text-gray-100 bg-blue-500 rounded p-1">{{ item.nombre }}</div>
              <!--div class="text-xs text-gray-500">{{ item.hora }}</div-->
            </td>

            <!-- Tipo insumo -->
            <td class="px-4 py-3">
              <div
                class="flex justify-center items-center gap-2 bg-green-300 rounded-lg text-green-600 px-2 py-1"
              >
                <span class="text-xs">{{ item.tipo_insumo_nombre }}</span>
              </div>
            </td>

            <!-- Almacén -->
            <td class="px-4 py-3 text-right">
              <div
                class="flex justify-start items-center gap-2 bg-purple-300 rounded-lg text-purple-600 px-2 py-1"
              >
                <span class="text-xs">{{ item.almacen_nombre }}</span>
              </div>
            </td>

            <!-- Estado lote -->
            <td class="px-4 py-3">
              <div class="flex items-center gap-2">
                <span class="text-xs">{{ item.estado_lote || '-' }}</span>
              </div>
            </td>

            <!-- Stock actual -->
            <td class="px-4 py-2">
              <div class="flex flex-col">
                <span class="font-bold">
                  {{ item.stock_actual }}
                </span>

                <span class="text-[13px] text-gray-500 font-bold">
                  {{ item.unidad_medida_cantidad }}
                </span>
              </div>
            </td>

            <!-- Stock inicial -->
            <td class="px-4 py-2">
              <div class="flex flex-col">
                <span class="font-bold">
                  {{ item.stock_inicial }}
                </span>

                <span class="text-[13px] text-gray-500 font-bold">
                  {{ item.unidad_medida_cantidad }}
                </span>
              </div>
            </td>

            <!-- Concentración -->
            <td class="px-4 py-2">
              <div class="flex flex-col">
                <span class="font-bold">
                  {{ item.concentracion }}
                </span>

                <span class="text-[13px] text-gray-500 font-bold">
                  {{ item.unidad_medida_concentracion }}
                </span>
              </div>
            </td>

            <!-- Costo unitario -->
            <td class="px-4 py-2">
              <div class="flex flex-col">
                <span class="font-bold">
                  {{ item.costo_unitario }}
                </span>

                <span class="text-[13px] text-gray-500 font-bold">
                  {{ item.unidad_medida_moneda }}
                </span>
              </div>
            </td>

            <!-- Costo total -->
            <td class="px-4 py-2">
              <div class="flex flex-col">
                <span class="font-bold">
                  {{ item.costo_total_actual }}
                </span>

                <span class="text-[13px] text-gray-500 font-bold">
                  {{ item.unidad_medida_moneda }}
                </span>
              </div>
            </td>

            <!-- Nombre proveedor-->
            <td class="px-4 py-3 text-center">
              <div class="flex items-center gap-2">
                <span class="text-xs">{{ item.proveedor_nombre }}</span>
              </div>
            </td>

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

                <!-- ELIMINAR -->
                <!--
                <button
                  @click="confirmarEliminar(item)"
                  class="p-2 rounded-lg text-red-600 hover:bg-red-100 transition"
                  title="Eliminar"
                >
                  <i class="fa-solid fa-trash"></i>
                </button>-->
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
            {{ detailItem?.nombre || 'Lote de insumo' }}
          </h3>
        </div>

        <button
          type="button"
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
            ID del lote
          </p>
          <p class="mt-2 text-sm font-bold text-slate-800">
            {{ detailItem?.lote_insumo_id ?? '-' }}
          </p>
        </div>

        <div class="rounded-lg border border-slate-100 bg-slate-50 px-4 py-4">
          <p class="text-[9px] font-black uppercase tracking-widest text-slate-400">
            Fecha de creación
          </p>
          <p class="mt-2 text-sm font-bold text-slate-800">
            {{ formatearFechaHora(detailItem?.creado_en) }}
          </p>
        </div>

        <div class="rounded-lg border border-slate-100 bg-slate-50 px-4 py-4 sm:col-span-2">
          <p class="text-[9px] font-black uppercase tracking-widest text-slate-400">
            Fecha de modificación
          </p>
          <p class="mt-2 text-sm font-bold text-slate-800">
            {{ formatearFecha(detailItem?.modificado_en) }}
          </p>
        </div>
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

  <!-- SHOW DIALOG DE CREACIÓN DE INSUMO-->
  <div
    v-if="showCreateModal"
    class="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/45 p-4 backdrop-blur-[2px]"
  >
    <div class="relative flex max-h-[92vh] w-full max-w-[720px] flex-col overflow-hidden rounded-lg border border-slate-200 bg-white shadow-2xl">
      <div
        v-if="isCreatingLote"
        class="absolute inset-0 z-30 flex cursor-wait items-center justify-center bg-white/70 backdrop-blur-[1px]"
        role="status"
        aria-live="polite"
      >
        <div class="flex items-center gap-3 rounded-lg border border-blue-100 bg-white px-5 py-4 shadow-xl">
          <i class="fa-solid fa-circle-notch fa-spin text-xl text-blue-600"></i>
          <span class="text-[11px] font-black uppercase tracking-widest text-[#1e3a8a]">
            Creando lote...
          </span>
        </div>
      </div>

      <div class="border-b border-slate-100 bg-slate-50 px-6 py-5 sm:px-8">
        <h2 class="text-2xl font-black text-[#1e3a8a]">Nuevo lote de insumo</h2>
        <p class="mt-1 text-[10px] font-bold uppercase tracking-widest text-slate-400">
          Completa los datos para el registro de inventario
        </p>
      </div>

      <div class="space-y-8 overflow-y-auto p-6 sm:p-8">
        <section class="space-y-4">
          <div class="flex flex-wrap items-center justify-between gap-3">
            <h3 class="flex items-center text-xs font-black uppercase tracking-widest text-slate-800">
              <i class="fa-solid fa-circle-info mr-2 text-blue-500"></i>
              Información básica
            </h3>
            <button
              type="button"
              @click="showTipoInsumoForm = !showTipoInsumoForm"
              class="text-[9px] font-black uppercase tracking-widest text-blue-600 transition-colors hover:text-blue-800"
            >
              <i class="fa-solid fa-circle-plus mr-1"></i>
              {{ showTipoInsumoForm ? 'Cerrar registro' : 'Crear tipo de insumo' }}
            </button>
          </div>

          <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div class="space-y-1.5">
              <label class="corporate-label">Nombre del lote</label>
              <input
                v-model="createForm.nombre"
                placeholder="Ej: Lote-2026-A"
                class="corporate-field"
              />
            </div>
            <div class="space-y-1.5">
              <label class="corporate-label">Tipo de insumo</label>
              <select v-model="createForm.tipo_insumo_id" class="corporate-field cursor-pointer">
                <option disabled value="">Seleccionar...</option>
                <option
                  v-for="tipo in tiposInsumo"
                  :key="tipo.tipo_insumo_id"
                  :value="tipo.tipo_insumo_id"
                >
                  {{ tipo.nombre }}
                </option>
              </select>
            </div>
          </div>

          <CrearInsumo
            v-if="showTipoInsumoForm"
            v-model="showTipoInsumoForm"
            @created="handleTipoInsumoCreado"
          />
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
              <select v-model="createForm.almacen_id" class="corporate-field cursor-pointer focus:border-red-400 focus:ring-red-50">
                <option disabled value="">Seleccionar...</option>
                <option
                  v-for="almacen in almacenes"
                  :key="almacen.almacen_id"
                  :value="almacen.almacen_id"
                >
                  {{ almacen.nombre }}
                </option>
              </select>
            </div>
            <div class="space-y-1.5">
              <label class="corporate-label">Proveedor</label>
              <select v-model="createForm.proveedor_id" class="corporate-field cursor-pointer focus:border-red-400 focus:ring-red-50">
                <option disabled value="">Seleccionar...</option>
                <option
                  v-for="proveedor in proveedores"
                  :key="proveedor.proveedor_id"
                  :value="proveedor.proveedor_id"
                >
                  {{ proveedor.nombre_razon_social }}
                </option>
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

          <div class="space-y-4">
            <div class="grid grid-cols-3 items-end gap-3">
              <div class="col-span-2 space-y-1.5">
                <label class="corporate-label uppercase tracking-widest">Stock inicial</label>
                <input v-model="createForm.stock_inicial" type="number" placeholder="0.00" class="corporate-field font-bold focus:border-emerald-400 focus:ring-emerald-50" />
              </div>
              <div class="space-y-1.5">
                <label class="corporate-label uppercase tracking-widest">Unidad</label>
                <select v-model="createForm.unidad_medida_cantidad" class="corporate-field cursor-pointer font-black uppercase focus:border-emerald-400 focus:ring-emerald-50">
                  <option disabled value="">Seleccionar</option>
                  <option v-for="vol in volumen" :key="vol.unidades_medida_id" :value="vol.unidad_de_medida">{{ vol.unidad_de_medida }}</option>
                </select>
              </div>
            </div>

            <div class="grid grid-cols-3 items-end gap-3">
              <div class="col-span-2 space-y-1.5">
                <label class="corporate-label uppercase tracking-widest">Costo total</label>
                <input v-model="createForm.costo_total_inicial" type="number" step="0.01" placeholder="0.00" class="corporate-field font-bold focus:border-emerald-400 focus:ring-emerald-50" />
              </div>
              <div class="space-y-1.5">
                <label class="corporate-label uppercase tracking-widest">Moneda</label>
                <select v-model="createForm.unidad_medida_moneda" class="corporate-field cursor-pointer font-black uppercase focus:border-emerald-400 focus:ring-emerald-50">
                  <option disabled value="">Seleccionar</option>
                  <option v-for="din in dinero" :key="din.unidades_medida_id" :value="din.unidad_de_medida">{{ din.unidad_de_medida }}</option>
                </select>
              </div>
            </div>

            <div class="grid grid-cols-3 items-end gap-3">
              <div class="col-span-2 space-y-1.5">
                <label class="corporate-label uppercase tracking-widest">Concentración / pureza</label>
                <input v-model="createForm.concentracion" type="number" step="0.01" placeholder="0.00" class="corporate-field font-bold focus:border-emerald-400 focus:ring-emerald-50" />
              </div>
              <div class="space-y-1.5">
                <label class="corporate-label uppercase tracking-widest">Unidad</label>
                <select v-model="createForm.unidad_medida_concentracion" class="corporate-field cursor-pointer font-black uppercase focus:border-emerald-400 focus:ring-emerald-50">
                  <option disabled value="">Seleccionar</option>
                  <option v-for="mas in masa" :key="mas.unidades_medida_id" :value="mas.unidad_de_medida">{{ mas.unidad_de_medida }}</option>
                </select>
              </div>
            </div>
          </div>
        </section>
      </div>

      <div class="flex items-center justify-end gap-4 border-t border-slate-100 bg-slate-50 px-6 py-5 sm:px-8">
        <button type="button" :disabled="isCreatingLote" @click="showCreateModal = false" class="px-5 py-2.5 text-[10px] font-black uppercase tracking-widest text-slate-400 transition-colors hover:text-slate-600 disabled:cursor-not-allowed disabled:opacity-50">
          Cancelar
        </button>
        <button type="button" :disabled="isCreatingLote" @click="crearLoteInsumo" class="rounded-lg bg-[#1e3a8a] px-7 py-3 text-[10px] font-black uppercase tracking-widest text-white shadow-lg shadow-blue-100 transition-all hover:bg-blue-900 active:scale-95 disabled:cursor-wait disabled:opacity-70 disabled:active:scale-100">
          <i v-if="isCreatingLote" class="fa-solid fa-circle-notch fa-spin mr-2"></i>
          {{ isCreatingLote ? 'Creando lote...' : 'Crear nuevo lote' }}
        </button>
      </div>
    </div>
  </div>

  <!-- SHOW DIALOG DE ACTULIZAR DE INSUMO-->
  <div
    v-if="showUpdateModal"
    class="fixed inset-0 bg-black/40 flex items-center justify-center z-50 bg-gray-800/30"
  >
    <div class="bg-red-100 p-6 rounded-xl w-[650px] shadow-lg max-h-[90vh] overflow-y-auto">
      <h2 class="text-xl font-bold mb-6">Actualizar Lote de Insumo</h2>

      <div class="flex flex-col gap-6">
        <!-- 🔹 BLOQUE 1 -->

        <!-- ACTUALIZAR ESTADO LOTE -->
        <div>
          <h3 class="text-sm font-bold text-gray-500 mb-3">Estado de lote</h3>

          <div class="grid grid-cols-1 gap-4">
            <select v-model="updateForm.estado_lote_id" class="input">
              <option disabled value="">Estado del lote</option>
              <option :value="1">Disponible</option>
              <option :value="3">Bloqueado</option>
            </select>
            <button
              @click="actualizarEstadoLoteInsumo"
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
              @click="actualizarStockActualLoteInsumo"
              class="bg-blue-500 hover:bg-gray-600 text-white py-2 px-4 rounded"
            >
              Actualizar Stock
            </button>
          </div>
        </div>

        <!-- 🔘 BOTONES -->
        <div class="flex justify-end gap-3">
          <button
            @click="showUpdateModal = false"
            class="px-4 py-2 bg-gray-800 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 flex items-center gap-2"
          >
            <i class="fa-solid fa-close"></i>
            Cerrar
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- SHOW DIALOG RESULTADO -->
  <div
    v-if="showResultModal"
    class="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/45 p-4 backdrop-blur-[2px]"
  >
    <div class="result-modal flex w-full max-w-sm flex-col items-center space-y-6 rounded-lg border border-slate-100 bg-white p-8 text-center shadow-2xl sm:p-10">
      <div class="relative">
        <div
          class="flex h-24 w-24 items-center justify-center rounded-full"
          :class="resultType === 'success' ? 'bg-emerald-50 text-emerald-500' : 'bg-red-50 text-red-500'"
        >
          <i
            class="fa-solid text-5xl"
            :class="resultType === 'success' ? 'fa-circle-check' : 'fa-circle-exclamation'"
          ></i>
        </div>
        <div
          class="absolute -bottom-1 -right-1 flex h-8 w-8 items-center justify-center rounded-full border-4 border-white bg-white shadow-sm"
          :class="resultType === 'success' ? 'text-emerald-500' : 'text-red-500'"
        >
          <i
            class="fa-solid text-xs"
            :class="resultType === 'success' ? 'fa-star' : 'fa-xmark'"
          ></i>
        </div>
      </div>

      <div>
        <h2 class="text-2xl font-black text-slate-900">
          {{ resultType === 'success' ? '¡Todo listo!' : 'No se pudo completar' }}
        </h2>
        <p class="mt-2 text-sm font-medium leading-relaxed text-slate-400">
          {{ resultMessage }}
        </p>
      </div>

      <button
        @click="showResultModal = false"
        class="w-full rounded-lg bg-slate-900 py-4 text-xs font-black uppercase tracking-widest text-white shadow-xl shadow-slate-200 transition-all hover:bg-slate-800 active:scale-95"
      >
        {{ resultType === 'success' ? 'Continuar trabajando' : 'Revisar datos' }}
      </button>
    </div>
  </div>
</template>

<script setup>
import axios from 'axios'
import { watch, computed, onMounted, ref } from 'vue'
import CrearInsumo from './Formularios_inline/CrearInsumo.vue'
import CrearProveedor from './Formularios_inline/CrearProveedor.vue'

/// VARIABLES REACTIVAS
const insumos = ref([])
const tiposInsumo = ref([])
const tipoInsumoFiltro = ref('')
const almacenes = ref([])
const proveedores = ref([])
const loading = ref(false)
const isCreatingLote = ref(false)
const showDeleteModal = ref(false)
const selectedItem = ref(null)
const showCreateModal = ref(false)
const showUpdateModal = ref(false)
const showDetailModal = ref(false)
const detailItem = ref(null)
const showTipoInsumoForm = ref(false)
const showProveedorForm = ref(false)
const currentPage = ref(1) // PAGINACIÓN
const perPage = ref(5) // PAGINACIÓN
const perPageOptions = [5, 10, 15, 'All']
const volumen = ref([])
const masa = ref([])
const dinero = ref([])

// Mensaje de feedback para el usuario
const showResultModal = ref(false)
const resultMessage = ref('')
const resultType = ref('') // success | error

/// FORMULARIO NUEVO INSUMO
const createForm = ref({
  nombre: '',
  tipo_insumo_id: '',
  estado_lote: 'activo',
  proveedor_id: '',
  almacen_id: '',
  concentracion: '',
  stock_inicial: '',
  costo_total_inicial: '',
  unidad_medida_cantidad: '', // volumen
  unidad_medida_moneda: '', // dinero
  unidad_medida_concentracion: '', // masa
})

/// FORMULARIO ACTUALIZAR INSUMO
const updateForm = ref({
  id: '',
  estado_lote_id: '',
  stock_actual: '',
})

const formatearFechaHora = (fecha) => {
  if (!fecha) return '-'

  return new Intl.DateTimeFormat('es-PE', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  }).format(new Date(fecha))
}

const formatearFecha = (fecha) => {
  if (!fecha) return '-'

  return new Intl.DateTimeFormat('es-PE', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(new Date(fecha))
}

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
  'tipo-insumo-cambiado',
])

const almacenFiltro = computed({
  get: () => props.inventario,
  set: (value) => emit('update:inventario', value),
})

/// COMPUTED PROPERTIES PARA PAGINACIÓN
const paginatedInsumos = computed(() => {
  if (perPage.value === 'All') return insumos.value
  const start = (currentPage.value - 1) * perPage.value
  return insumos.value.slice(start, start + perPage.value)
})

const totalPages = computed(() => {
  if (perPage.value === 'All') return 1
  return Math.ceil(insumos.value.length / perPage.value)
})

const nextPage = () => {
  if (currentPage.value < totalPages.value) currentPage.value++
}

const prevPage = () => {
  if (currentPage.value > 1) currentPage.value--
}

const crearLoteInsumo = async () => {
  if (isCreatingLote.value) return

  isCreatingLote.value = true

  try {
    console.log('PAYLOAD:', {
      nombre: createForm.value.nombre,
      tipo_insumo_id: parseInt(createForm.value.tipo_insumo_id),

      proveedor_id: parseInt(createForm.value.proveedor_id),
      almacen_id: parseInt(createForm.value.almacen_id),
      concentracion: parseFloat(createForm.value.concentracion),
      stock_inicial: parseFloat(createForm.value.stock_inicial),
      costo_total_inicial: parseFloat(createForm.value.costo_total_inicial),
      unidad_medida_cantidad: createForm.value.unidad_medida_cantidad,
      unidad_medida_moneda: createForm.value.unidad_medida_moneda,
      unidad_medida_concentracion: createForm.value.unidad_medida_concentracion,
    })
    const baseURL = import.meta.env.VITE_API_URL
    const response = await axios.post(`${baseURL}/lote-insumos`, {
      nombre: createForm.value.nombre,
      tipo_insumo_id: parseInt(createForm.value.tipo_insumo_id),

      proveedor_id: parseInt(createForm.value.proveedor_id),
      almacen_id: parseInt(createForm.value.almacen_id),
      concentracion: parseFloat(createForm.value.concentracion),
      stock_inicial: parseFloat(createForm.value.stock_inicial),
      costo_total_inicial: parseFloat(createForm.value.costo_total_inicial),
      unidad_medida_cantidad: createForm.value.unidad_medida_cantidad,
      unidad_medida_moneda: createForm.value.unidad_medida_moneda,
      unidad_medida_concentracion: createForm.value.unidad_medida_concentracion,
    })

    console.log('Lote de insumo creado:', response.data)
    showCreateModal.value = false
    resultMessage.value = 'Lote de insumo creado correctamente'
    resultType.value = 'success'
    showResultModal.value = true

    // limpiar form
    createForm.value = {
      nombre: '',
      tipo_insumo_id: '',
      estado_lote: 'activo',
      proveedor_id: '',
      almacen_id: '',
      concentracion: '',
      stock_inicial: '',
      costo_total_inicial: '',
      unidad_medida_cantidad: '', // volumen
      unidad_medida_moneda: '', // dinero
      unidad_medida_concentracion: '', // masa
    }

    /// recargar datos
    await getLoteInsumos(props.inventario)
    emit('inventario-actualizado')
  } catch (error) {
    console.error(error)
    resultMessage.value = error.response?.data?.error || 'No se pudo crear el lote de insumo'
    resultType.value = 'error'
    showResultModal.value = true
  } finally {
    isCreatingLote.value = false
  }
}

const getTipoInsumos = async () => {
  try {
    const baseURL = import.meta.env.VITE_API_URL
    const response = await axios.get(`${baseURL}/tipo-insumo`)
    tiposInsumo.value = response.data
  } catch (error) {
    console.error('Error fetching tipo insumos:', error)
  }
}

const handleTipoInsumoCreado = async () => {
  await getTipoInsumos()
}

const handleProveedorCreado = async () => {
  await getProveedores()
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

const verDetalle = (item) => {
  detailItem.value = item
  showDetailModal.value = true
}

const editar = (item) => {
  console.log('Editar:', item)
  showUpdateModal.value = true
  updateForm.value = {
    id: item.lote_insumo_id,
    estado_lote_id: item.estado_lote_id,
    stock_actual: item.stock_actual,
  }

  console.log('Formulario de actualización:', updateForm.value)
}

const actualizarEstadoLoteInsumo = async () => {
  try {
    const baseURL = import.meta.env.VITE_API_URL

    const response = await axios.patch(
      `${baseURL}/lote-insumos/${updateForm.value.id}/estado-lote`,
      {
        estado_lote_id: updateForm.value.estado_lote_id,
      },
    )

    if (response.status === 200) {
      // cerrar modal actual
      showUpdateModal.value = false

      // mostrar resultado
      resultMessage.value = 'Estado de lote actualizado correctamente'
      resultType.value = 'success'
      showResultModal.value = true
    }

    await getLoteInsumos(props.inventario)
    showUpdateModal.value = false
  } catch (error) {
    showUpdateModal.value = false

    const msg = error.response?.data?.message || 'No se pudo actualizar el estado del lote'
    resultMessage.value = msg
    resultType.value = 'error'
    showResultModal.value = true
    console.error(error)
  }
}

const actualizarStockActualLoteInsumo = async () => {
  try {
    const baseURL = import.meta.env.VITE_API_URL

    const response = await axios.patch(
      `${baseURL}/lote-insumos/${updateForm.value.id}/stock-actual`,
      {
        stock_actual: parseFloat(updateForm.value.stock_actual),
      },
    )

    if (response.status === 200) {
      // cerrar modal actual
      showUpdateModal.value = false

      // mostrar resultado
      resultMessage.value = 'Stock actualizado correctamente'
      resultType.value = 'success'
      showResultModal.value = true
    }

    await getLoteInsumos(props.inventario)
    emit('inventario-actualizado')
  } catch (error) {
    // cerrar modal actual
    showUpdateModal.value = false

    const msg =
      error.response?.data?.message || 'El stock actual no debe mayor que el stock inicial'

    resultMessage.value = msg
    resultType.value = 'error'
    showResultModal.value = true
  }
}

/// FUNCIONES PARA CALCULAR OBTENER UNIDADES DE MEDIDA, CONCENTRACIÓN Y COSTO UNITARIO
const getMasa = async () => {
  const baseURL = import.meta.env.VITE_API_URL
  try {
    const response = await axios.get(`${baseURL}/unidades-medida/propiedad/concentracion`)
    masa.value = response.data
  } catch (error) {
    console.error('Error fetching unidad de medida:', error)
  }
}

const getVolumen = async () => {
  const baseURL = import.meta.env.VITE_API_URL
  try {
    const response = await axios.get(`${baseURL}/unidades-medida/propiedad/masa_volumen`)
    volumen.value = response.data
  } catch (error) {
    console.error('Error fetching unidad de medida:', error)
  }
}

const getMoneda = async () => {
  const baseURL = import.meta.env.VITE_API_URL
  try {
    const response = await axios.get(`${baseURL}/unidades-medida/propiedad/dinero`)
    dinero.value = response.data
  } catch (error) {
    console.error('Error fetching unidad de medida:', error)
  }
}

/// FUNCIONES
const getLoteInsumos = async (almacenId) => {
  loading.value = true
  try {
    const baseURL = import.meta.env.VITE_API_URL
    const response = await axios.get(`${baseURL}/lote-insumos`, {
      params: {
        almacen_id: almacenId === 'todos' ? undefined : almacenId,
        tipo_insumo_id: tipoInsumoFiltro.value || undefined,
      },
    })

    insumos.value = Array.isArray(response.data) ? response.data : []
  } catch (error) {
    console.error('Error API:', error)
    insumos.value = []
  } finally {
    loading.value = false
  }
}

/// WATCHER PARA RECARGAR DATOS CUANDO CAMBIA EL INVENTARIO
watch(
  [() => props.inventario, tipoInsumoFiltro],
  ([nuevoAlmacen]) => {
    currentPage.value = 1
    emit('tipo-insumo-cambiado', tipoInsumoFiltro.value)
    getLoteInsumos(nuevoAlmacen)
  },
  { immediate: true },
)

onMounted(() => {
  ;(getTipoInsumos(),
    getAlmacenes(),
    getProveedores(),
    getMasa(),
    getVolumen(),
    getMoneda()) /*getConcentracion(), getCostoUnitario()*/
})
</script>

<style scoped>
.input {
  @apply border px-3 py-2 rounded-lg text-sm w-full focus:outline-none focus:ring-2 focus:ring-green-700;
}

.corporate-label {
  @apply ml-1 block text-[10px] font-bold text-slate-500;
}

.corporate-field {
  @apply w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-xs font-medium text-slate-700 outline-none transition-all focus:border-blue-400 focus:ring-4 focus:ring-blue-50;
}

.result-modal {
  animation: result-bounce-in 0.45s cubic-bezier(0.175, 0.885, 0.32, 1.15);
}

@keyframes result-bounce-in {
  from {
    opacity: 0;
    transform: scale(0.86);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.filter-label {
  @apply block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5 ml-1;
}

.filter-select {
  @apply w-full bg-white border border-slate-200 rounded-lg px-4 py-2.5 text-xs font-bold text-slate-600 outline-none focus:ring-4 focus:ring-red-50 focus:border-red-200 transition-all;
}
</style>
