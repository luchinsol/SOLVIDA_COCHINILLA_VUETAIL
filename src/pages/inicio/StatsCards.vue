<template>
  <div>
    <!-- Header -->
    <div
      class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 lg:mb-8 gap-4"
    >
      <div>
        <h2 class="text-2xl font-bold text-textMain tracking-tight">Production Overview</h2>
        <p class="text-sm text-textMuted mt-1">
          Real-time metrics for Carmine extraction and processing.
        </p>
      </div>

      <button
        class="bg-white border border-gray-200 text-textMain hover:bg-gray-50 text-sm font-medium py-2 px-4 rounded-lg shadow-sm transition-colors flex items-center"
      >
        <i class="fa-solid fa-download mr-2 text-textMuted"></i>
        Descargar Reporte
      </button>
    </div>

    <!-- Stats -->
    <section
      id="summary-stats"
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-8"
    >
      <!-- Card 1 -->
      <div
        class="bg-surface rounded-xl p-5 shadow-card border border-gray-100 flex items-center justify-between relative overflow-hidden group"
      >
        <div
          class="absolute right-0 top-0 w-16 h-16 bg-blue-50 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110"
        ></div>

        <div>
          <p class="text-sm font-medium text-textMuted mb-1">Rendimiento Promedio</p>

          <div class="flex items-baseline space-x-2">
            <h3 class="text-2xl font-bold text-textMain">18.4%</h3>

            <span class="text-xs font-medium text-success flex items-center">
              <i class="fa-solid fa-arrow-trend-up mr-1"></i>
              +1.2%
            </span>
          </div>
        </div>

        <div
          class="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-primary z-10"
        >
          <i class="fa-solid fa-chart-line text-xl"></i>
        </div>
      </div>

      <!-- Card 2 -->
      <div
        class="bg-surface rounded-xl p-5 shadow-card border border-gray-100 flex items-center justify-between relative overflow-hidden group"
      >
        <div
          class="absolute right-0 top-0 w-16 h-16 bg-red-50 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110"
        ></div>

        <div>
          <p class="text-sm font-medium text-textMuted mb-1">Promedio Ácido Carmínico</p>

          <div class="flex items-baseline space-x-2">
            <h3 class="text-2xl font-bold text-textMain">52.3%</h3>

            <span class="text-xs font-medium text-success flex items-center">
              <i class="fa-solid fa-arrow-trend-up mr-1"></i>
              +0.5%
            </span>
          </div>
        </div>

        <div
          class="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center text-accent z-10"
        >
          <i class="fa-solid fa-droplet text-xl"></i>
        </div>
      </div>

      <!-- Card 3 -->
      <div
        class="bg-surface rounded-xl p-5 shadow-card border border-gray-100 flex items-center justify-between relative overflow-hidden group"
      >
        <div
          class="absolute right-0 top-0 w-16 h-16 bg-yellow-50 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110"
        ></div>

        <div>
          <p class="text-sm font-medium text-textMuted mb-1">Análisis Pendientes</p>

          <div class="flex items-baseline space-x-2">
            <h3 class="text-2xl font-bold text-warning">12</h3>
            <span class="text-xs font-medium text-textMuted">Lotes</span>
          </div>
        </div>

        <div
          class="w-12 h-12 rounded-full bg-yellow-50 flex items-center justify-center text-warning z-10"
        >
          <i class="fa-solid fa-flask-vial text-xl"></i>
        </div>
      </div>

      <!-- Card 4 -->
      <div
        class="bg-surface rounded-xl p-5 shadow-card border border-gray-100 flex items-center justify-between relative overflow-hidden group"
      >
        <div
          class="absolute right-0 top-0 w-16 h-16 bg-gray-50 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110"
        ></div>

        <div>
          <p class="text-sm font-medium text-textMuted mb-2">Alertas de Stock</p>

          <span
            class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 border border-red-200"
          >
            <i class="fa-solid fa-triangle-exclamation mr-1.5"></i>
            Crítico: Solvente A
          </span>
        </div>

        <div
          class="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-textMuted z-10"
        >
          <i class="fa-solid fa-boxes-stacked text-xl"></i>
        </div>
      </div>
    </section>
  </div>
</template>
