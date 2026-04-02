<template>
  <section
    id="active-processes"
    class="bg-surface rounded-xl shadow-card border border-gray-100 overflow-hidden"
  >
    <!-- Header -->
    <div class="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
      <h3 class="text-lg font-semibold text-textMain flex items-center">
        <i class="fa-solid fa-spinner fa-spin-pulse text-primary mr-2"></i>
        Procesos Activos
      </h3>

      <a href="#" class="text-sm text-primary hover:underline font-medium"> Ver todos </a>
    </div>

    <!-- Content -->
    <div class="p-6 space-y-8">
      <!-- ========================= -->
      <!-- PROCESO 1 -->
      <!-- ========================= -->
      <div class="relative">
        <div class="flex justify-between items-end mb-2">
          <div>
            <div class="flex items-center space-x-2">
              <span class="text-sm font-bold text-textMain"> Lote L-2023-089 </span>

              <span
                class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800"
              >
                Extracción
              </span>
            </div>

            <p class="text-xs text-textMuted mt-1">Iniciado: 08:30 AM | Cochineal Grado A</p>
          </div>

          <span class="text-sm font-semibold text-primary">45%</span>
        </div>

        <!-- Progress -->
        <div class="relative pt-4">
          <div class="overflow-hidden h-2 mb-4 text-xs flex rounded-full bg-gray-200">
            <div style="width: 45%" class="bg-primary transition-all duration-500"></div>
          </div>

          <!-- Stepper -->
          <div class="flex justify-between text-xs text-textMuted px-1">
            <!-- Paso 1 -->
            <div class="flex flex-col items-center">
              <div
                class="w-4 h-4 rounded-full bg-primary text-white flex items-center justify-center mb-1 -mt-7 ring-4 ring-white"
              >
                <i class="fa-solid fa-check text-[8px]"></i>
              </div>
              <span class="font-medium text-primary">Preparación</span>
            </div>

            <!-- Paso 2 (ACTIVO) -->
            <div class="flex flex-col items-center">
              <div
                class="w-4 h-4 rounded-full bg-primary text-white flex items-center justify-center mb-1 -mt-7 ring-4 ring-white animate-pulse"
              >
                <div class="w-1.5 h-1.5 bg-white rounded-full"></div>
              </div>
              <span class="font-medium text-primary">Extracción</span>
            </div>

            <!-- Paso 3 -->
            <div class="flex flex-col items-center">
              <div class="w-4 h-4 rounded-full bg-gray-200 mb-1 -mt-7 ring-4 ring-white"></div>
              <span>Purificación</span>
            </div>

            <!-- Paso 4 -->
            <div class="flex flex-col items-center">
              <div class="w-4 h-4 rounded-full bg-gray-200 mb-1 -mt-7 ring-4 ring-white"></div>
              <span>Secado</span>
            </div>
          </div>
        </div>
      </div>

      <!-- ========================= -->
      <!-- PROCESO 2 -->
      <!-- ========================= -->
      <div class="relative pt-2 border-t border-gray-100">
        <div class="flex justify-between items-end mb-2 mt-4">
          <div>
            <div class="flex items-center space-x-2">
              <span class="text-sm font-bold text-textMain"> Lote L-2023-088 </span>

              <span
                class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-purple-100 text-purple-800"
              >
                Secado
              </span>
            </div>

            <p class="text-xs text-textMuted mt-1">Iniciado: Ayer 14:00 | Cochineal Grado B</p>
          </div>

          <span class="text-sm font-semibold text-purple-600">85%</span>
        </div>

        <!-- Progress -->
        <div class="relative pt-4">
          <div class="overflow-hidden h-2 mb-4 text-xs flex rounded-full bg-gray-200">
            <div style="width: 85%" class="bg-purple-500 transition-all duration-500"></div>
          </div>

          <!-- Stepper -->
          <div class="flex justify-between text-xs text-textMuted px-1">
            <!-- Paso 1 -->
            <div class="flex flex-col items-center w-1/4">
              <div
                class="w-4 h-4 rounded-full bg-purple-500 text-white flex items-center justify-center mb-1 -mt-7 ring-4 ring-white"
              >
                <i class="fa-solid fa-check text-[8px]"></i>
              </div>
            </div>

            <!-- Paso 2 -->
            <div class="flex flex-col items-center w-1/4">
              <div
                class="w-4 h-4 rounded-full bg-purple-500 text-white flex items-center justify-center mb-1 -mt-7 ring-4 ring-white"
              >
                <i class="fa-solid fa-check text-[8px]"></i>
              </div>
            </div>

            <!-- Paso 3 -->
            <div class="flex flex-col items-center w-1/4">
              <div
                class="w-4 h-4 rounded-full bg-purple-500 text-white flex items-center justify-center mb-1 -mt-7 ring-4 ring-white"
              >
                <i class="fa-solid fa-check text-[8px]"></i>
              </div>
            </div>

            <!-- Paso 4 (ACTIVO) -->
            <div class="flex flex-col items-center w-1/4">
              <div
                class="w-4 h-4 rounded-full bg-purple-500 text-white flex items-center justify-center mb-1 -mt-7 ring-4 ring-white animate-pulse"
              >
                <div class="w-1.5 h-1.5 bg-white rounded-full"></div>
              </div>
              <span class="font-medium text-purple-600">Secado</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
