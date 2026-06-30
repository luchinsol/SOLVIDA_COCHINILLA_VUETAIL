<template>
  <div class="bg-industrial-bg text-industrial-text-primary flex overflow-hidden dashboard-page">
<!-- Collapsed Sidebar -->
    <aside id="sidebar" class="w-14 bg-industrial-sidebar flex flex-col items-center py-0 shrink-0 relative z-20" style="height: 100vh; min-height: 600px;">
        <!-- Logo -->
        <div class="w-full flex items-center justify-center py-4 border-b border-gray-800">
            <div class="w-8 h-8 bg-industrial-carmine rounded flex items-center justify-center">
                <span class="font-mono text-white text-xs font-bold leading-none">C</span>
            </div>
        </div>

        <!-- Main Nav Icons -->
        <nav class="flex flex-col items-center gap-1 mt-3 w-full px-2 flex-1">
            <div class="sidebar-icon-btn relative w-full flex justify-center">
                <button class="nav-active w-10 h-10 rounded flex items-center justify-center text-white transition-colors duration-150">
                    <i class="fa-solid fa-flask-vial text-sm"></i>
                </button>
                <span class="sidebar-tooltip absolute left-14 top-1/2 -translate-y-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap z-50 font-sans">Recetas</span>
            </div>
            <div class="sidebar-icon-btn relative w-full flex justify-center">
                <button class="w-10 h-10 rounded flex items-center justify-center text-gray-500 hover:text-gray-200 hover:bg-gray-800 transition-colors duration-150">
                    <i class="fa-solid fa-industry text-sm"></i>
                </button>
                <span class="sidebar-tooltip absolute left-14 top-1/2 -translate-y-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap z-50 font-sans">Producción</span>
            </div>
            <div class="sidebar-icon-btn relative w-full flex justify-center">
                <button class="w-10 h-10 rounded flex items-center justify-center text-gray-500 hover:text-gray-200 hover:bg-gray-800 transition-colors duration-150">
                    <i class="fa-solid fa-chart-line text-sm"></i>
                </button>
                <span class="sidebar-tooltip absolute left-14 top-1/2 -translate-y-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap z-50 font-sans">Métricas</span>
            </div>
            <div class="sidebar-icon-btn relative w-full flex justify-center">
                <button class="w-10 h-10 rounded flex items-center justify-center text-gray-500 hover:text-gray-200 hover:bg-gray-800 transition-colors duration-150">
                    <i class="fa-solid fa-boxes-stacked text-sm"></i>
                </button>
                <span class="sidebar-tooltip absolute left-14 top-1/2 -translate-y-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap z-50 font-sans">Inventario</span>
            </div>
            <div class="sidebar-icon-btn relative w-full flex justify-center">
                <button class="w-10 h-10 rounded flex items-center justify-center text-gray-500 hover:text-gray-200 hover:bg-gray-800 transition-colors duration-150">
                    <i class="fa-solid fa-vials text-sm"></i>
                </button>
                <span class="sidebar-tooltip absolute left-14 top-1/2 -translate-y-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap z-50 font-sans">Laboratorio</span>
            </div>
            <div class="sidebar-icon-btn relative w-full flex justify-center">
                <button class="w-10 h-10 rounded flex items-center justify-center text-gray-500 hover:text-gray-200 hover:bg-gray-800 transition-colors duration-150">
                    <i class="fa-solid fa-file-contract text-sm"></i>
                </button>
                <span class="sidebar-tooltip absolute left-14 top-1/2 -translate-y-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap z-50 font-sans">Documentos</span>
            </div>

            <div class="w-8 border-t sidebar-divider my-2"></div>

            <div class="sidebar-icon-btn relative w-full flex justify-center">
                <button class="w-10 h-10 rounded flex items-center justify-center text-gray-500 hover:text-gray-200 hover:bg-gray-800 transition-colors duration-150">
                    <i class="fa-solid fa-gear text-sm"></i>
                </button>
                <span class="sidebar-tooltip absolute left-14 top-1/2 -translate-y-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap z-50 font-sans">Configuración</span>
            </div>
            <div class="sidebar-icon-btn relative w-full flex justify-center">
                <button class="w-10 h-10 rounded flex items-center justify-center text-gray-500 hover:text-gray-200 hover:bg-gray-800 transition-colors duration-150">
                    <i class="fa-solid fa-circle-question text-sm"></i>
                </button>
                <span class="sidebar-tooltip absolute left-14 top-1/2 -translate-y-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap z-50 font-sans">Ayuda</span>
            </div>
        </nav>

        <!-- User Avatar -->
        <div class="mb-3 sidebar-icon-btn relative w-full flex justify-center">
            <button class="w-8 h-8 rounded-full overflow-hidden border-2 border-gray-700 hover:border-industrial-carmine transition-colors duration-150">
                <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-7.jpg" alt="User" class="w-full h-full object-cover">
            </button>
            <span class="sidebar-tooltip absolute left-14 bottom-0 bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap z-50 font-sans">Ana Quispe</span>
        </div>
    </aside>

    <!-- Main Content -->
    <div class="flex flex-col flex-1 overflow-hidden">

        <!-- Global Header -->
        <header id="header" class="bg-white border-b border-industrial-border h-12 flex items-center px-4 gap-3 shrink-0 z-10">
            <div class="flex items-center gap-2 shrink-0">
                <span class="text-xs text-industrial-neutral font-sans">CarmineERP</span>
                <i class="fa-solid fa-chevron-right text-industrial-border text-xs"></i>
                <span class="text-xs font-semibold text-industrial-text-primary font-sans">Recetas de Extracción</span>
            </div>
            <div class="flex-1 max-w-xl relative mx-2">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <i class="fa-solid fa-magnifying-glass text-industrial-neutral text-xs"></i>
                </div>
                <input type="text" placeholder="Buscar por código, nombre, proceso o técnico responsable..." class="w-full h-7 pl-8 pr-3 text-xs border border-industrial-border rounded bg-white focus:outline-none focus:border-industrial-carmine focus:ring-1 focus:ring-industrial-carmine font-sans text-industrial-text-primary placeholder-gray-400 transition-colors">
            </div>
            <div class="flex items-center gap-1 ml-auto">
                <button class="w-7 h-7 flex items-center justify-center text-industrial-neutral hover:text-industrial-text-primary hover:bg-gray-100 rounded transition-colors relative">
                    <i class="fa-solid fa-bell text-xs"></i>
                    <span class="absolute top-1 right-1 w-1.5 h-1.5 bg-industrial-carmine rounded-full"></span>
                </button>
                <button class="w-7 h-7 flex items-center justify-center text-industrial-neutral hover:text-industrial-text-primary hover:bg-gray-100 rounded transition-colors">
                    <i class="fa-solid fa-clock-rotate-left text-xs"></i>
                </button>
                <button class="w-7 h-7 flex items-center justify-center text-industrial-neutral hover:text-industrial-text-primary hover:bg-gray-100 rounded transition-colors">
                    <i class="fa-solid fa-expand text-xs"></i>
                </button>
                <div class="w-px h-5 bg-industrial-border mx-1"></div>
                <div class="flex items-center gap-2 pl-1">
                    <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-7.jpg" alt="User" class="w-6 h-6 rounded-full object-cover">
                    <span class="text-xs font-medium text-industrial-text-secondary hidden md:block">Ana Quispe</span>
                    <i class="fa-solid fa-chevron-down text-xs text-industrial-neutral hidden md:block"></i>
                </div>
            </div>
        </header>

        <!-- Page Subheader -->
        <div id="subheader" class="bg-white border-b border-industrial-border px-5 py-2.5 flex items-center justify-between shrink-0">
            <div class="flex items-center gap-3">
                <div class="w-7 h-7 bg-red-50 rounded flex items-center justify-center">
                    <i class="fa-solid fa-flask-vial text-industrial-carmine text-xs"></i>
                </div>
                <div>
                    <h1 class="text-sm font-bold text-industrial-text-primary font-sans leading-tight">Recetas de Extracción</h1>
                    <p class="text-xs text-industrial-neutral font-sans leading-tight">Gestión de fórmulas de producción de carmín / cochinilla</p>
                </div>
            </div>
            <div class="flex items-center gap-2">
                <button class="h-7 px-3 flex items-center gap-1.5 border border-industrial-border rounded text-xs font-medium text-industrial-text-secondary hover:bg-gray-50 transition-colors font-sans">
                    <i class="fa-solid fa-arrow-up-from-bracket text-xs"></i>
                    <span class="hidden sm:inline">Exportar</span>
                </button>
                <button class="h-7 px-3 flex items-center gap-1.5 border border-industrial-border rounded text-xs font-medium text-industrial-text-secondary hover:bg-gray-50 transition-colors font-sans">
                    <i class="fa-solid fa-print text-xs"></i>
                    <span class="hidden sm:inline">Imprimir</span>
                </button>
                <button class="h-7 px-3 flex items-center gap-1.5 bg-industrial-carmine rounded text-xs font-semibold text-white hover:bg-industrial-carmine-dark transition-colors font-sans">
                    <i class="fa-solid fa-plus text-xs"></i>
                    Nueva receta
                </button>
            </div>
        </div>

        <!-- KPI Strip -->
        <div id="kpi-strip" class="bg-white border-b border-industrial-border px-5 py-0 shrink-0 flex items-center gap-0 overflow-x-auto">
            <div class="flex items-center gap-3 px-4 py-2.5 border-r border-industrial-border min-w-max">
                <div class="w-6 h-6 rounded bg-red-50 flex items-center justify-center">
                    <i class="fa-solid fa-flask text-industrial-carmine text-xs"></i>
                </div>
                <div>
                    <div class="font-mono text-sm font-semibold text-industrial-text-primary">247</div>
                    <div class="text-xs text-industrial-neutral font-sans leading-none">Total Recetas</div>
                </div>
            </div>
            <div class="flex items-center gap-3 px-4 py-2.5 border-r border-industrial-border min-w-max">
                <div class="w-6 h-6 rounded bg-green-50 flex items-center justify-center">
                    <i class="fa-solid fa-circle-check text-industrial-success text-xs"></i>
                </div>
                <div>
                    <div class="font-mono text-sm font-semibold text-industrial-success">183</div>
                    <div class="text-xs text-industrial-neutral font-sans leading-none">Vigentes</div>
                </div>
            </div>
            <div class="flex items-center gap-3 px-4 py-2.5 border-r border-industrial-border min-w-max">
                <div class="w-6 h-6 rounded bg-gray-100 flex items-center justify-center">
                    <i class="fa-solid fa-circle-xmark text-industrial-neutral text-xs"></i>
                </div>
                <div>
                    <div class="font-mono text-sm font-semibold text-industrial-neutral">64</div>
                    <div class="text-xs text-industrial-neutral font-sans leading-none">No vigentes</div>
                </div>
            </div>
            <div class="flex items-center gap-3 px-4 py-2.5 border-r border-industrial-border min-w-max">
                <div class="w-6 h-6 rounded bg-amber-50 flex items-center justify-center">
                    <i class="fa-solid fa-thermometer-half text-amber-600 text-xs"></i>
                </div>
                <div>
                    <div class="font-mono text-sm font-semibold text-industrial-text-primary">74.3°C</div>
                    <div class="text-xs text-industrial-neutral font-sans leading-none">Temp. Promedio</div>
                </div>
            </div>
            <div class="flex items-center gap-3 px-4 py-2.5 border-r border-industrial-border min-w-max">
                <div class="w-6 h-6 rounded bg-blue-50 flex items-center justify-center">
                    <i class="fa-solid fa-droplet text-blue-500 text-xs"></i>
                </div>
                <div>
                    <div class="font-mono text-sm font-semibold text-industrial-text-primary">5.42</div>
                    <div class="text-xs text-industrial-neutral font-sans leading-none">pH Promedio</div>
                </div>
            </div>
            <div class="flex items-center gap-3 px-4 py-2.5 min-w-max">
                <div class="w-6 h-6 rounded bg-purple-50 flex items-center justify-center">
                    <i class="fa-solid fa-percent text-purple-600 text-xs"></i>
                </div>
                <div>
                    <div class="font-mono text-sm font-semibold text-industrial-text-primary">87.6%</div>
                    <div class="text-xs text-industrial-neutral font-sans leading-none">Rendimiento Prom.</div>
                </div>
            </div>
        </div>

        <!-- Filter Ribbon -->
        <div id="filter-ribbon" class="bg-gray-50 border-b border-industrial-border px-5 py-2 flex items-center gap-2 flex-wrap shrink-0">
            <div class="flex items-center gap-1.5 text-xs text-industrial-neutral font-sans shrink-0">
                <i class="fa-solid fa-sliders text-xs"></i>
                <span class="font-medium">Filtros:</span>
            </div>
            <select class="compact-select h-7 px-2.5 text-xs border border-industrial-border rounded bg-white text-industrial-text-secondary focus:outline-none focus:border-industrial-carmine font-sans appearance-none cursor-pointer min-w-0">
                <option>Todos los estados</option>
                <option>Vigente</option>
                <option>No vigente</option>
            </select>
            <select class="compact-select h-7 px-2.5 text-xs border border-industrial-border rounded bg-white text-industrial-text-secondary focus:outline-none focus:border-industrial-carmine font-sans appearance-none cursor-pointer min-w-0">
                <option>Todos los procesos</option>
                <option>Extracción Acuosa</option>
                <option>Extracción Ácida</option>
                <option>Extracción Alcalina</option>
                <option>Liofilización</option>
            </select>
            <select class="compact-select h-7 px-2.5 text-xs border border-industrial-border rounded bg-white text-industrial-text-secondary focus:outline-none focus:border-industrial-carmine font-sans appearance-none cursor-pointer min-w-0">
                <option>Todos los técnicos</option>
                <option>García M.</option>
                <option>Torres A.</option>
                <option>Mamani L.</option>
                <option>Quispe R.</option>
            </select>
            <select class="compact-select h-7 px-2.5 text-xs border border-industrial-border rounded bg-white text-industrial-text-secondary focus:outline-none focus:border-industrial-carmine font-sans appearance-none cursor-pointer min-w-0">
                <option>Categoría: Todas</option>
                <option>FD-40 Premium</option>
                <option>WS-85 Estándar</option>
                <option>AC-60 Alta Conc.</option>
            </select>
            <div class="flex items-center gap-2 shrink-0">
                <span class="text-xs text-industrial-neutral font-mono">pH:</span>
                <input type="range" min="1" max="14" class="w-20 h-1 cursor-pointer" v-model="phLimit">
                <span id="ph-value" class="font-mono text-xs text-industrial-text-secondary w-8">{{ phLabel }}</span>
            </div>
            <div class="flex items-center gap-2 shrink-0">
                <span class="text-xs text-industrial-neutral font-mono">Rdto.:</span>
                <input type="range" min="0" max="100" class="w-20 h-1 cursor-pointer" v-model="yieldLimit">
                <span id="yield-value" class="font-mono text-xs text-industrial-text-secondary w-10">{{ yieldLabel }}</span>
            </div>
            <select class="compact-select h-7 px-2.5 text-xs border border-industrial-border rounded bg-white text-industrial-text-secondary focus:outline-none focus:border-industrial-carmine font-sans appearance-none cursor-pointer min-w-0">
                <option>Año: 2024</option>
                <option>Año: 2023</option>
                <option>Año: 2022</option>
                <option>Todos los años</option>
            </select>
            <div class="ml-auto flex items-center gap-1.5">
                <button class="h-7 px-2.5 text-xs text-industrial-carmine border border-industrial-carmine rounded hover:bg-red-50 transition-colors font-sans font-medium">
                    Limpiar
                </button>
                <span class="text-xs font-mono text-industrial-neutral bg-white border border-industrial-border px-2 h-7 flex items-center rounded">247 resultados</span>
            </div>
        </div>

        <!-- Table Area -->
        <div id="table-area" class="flex-1 overflow-auto bg-industrial-bg">
            <table class="data-table w-full min-w-max text-xs">
                <thead class="sticky-header bg-white">
                    <tr class="text-left">
                        <th class="py-2.5 px-3 font-semibold text-industrial-text-secondary font-sans whitespace-nowrap border-b border-industrial-border">
                            <input type="checkbox" id="select-all" class="w-3 h-3 accent-industrial-carmine cursor-pointer" @change="toggleAllRows($event)">
                        </th>
                        <th class="py-2.5 px-3 font-semibold text-industrial-text-secondary font-sans whitespace-nowrap border-b border-industrial-border">
                            <div class="flex items-center gap-1 cursor-pointer hover:text-industrial-text-primary">
                                Código <i class="fa-solid fa-sort text-industrial-border text-xs"></i>
                            </div>
                        </th>
                        <th class="py-2.5 px-3 font-semibold text-industrial-text-secondary font-sans whitespace-nowrap border-b border-industrial-border">
                            <div class="flex items-center gap-1 cursor-pointer hover:text-industrial-text-primary">
                                Nombre de Receta <i class="fa-solid fa-sort text-industrial-border text-xs"></i>
                            </div>
                        </th>
                        <th class="py-2.5 px-3 font-semibold text-industrial-text-secondary font-sans whitespace-nowrap border-b border-industrial-border">
                            <div class="flex items-center gap-1 cursor-pointer hover:text-industrial-text-primary">
                                Proceso <i class="fa-solid fa-sort-down text-industrial-carmine text-xs"></i>
                            </div>
                        </th>
                        <th class="py-2.5 px-3 font-semibold text-industrial-text-secondary font-sans whitespace-nowrap border-b border-industrial-border">
                            <div class="flex items-center gap-1 cursor-pointer hover:text-industrial-text-primary">
                                Categoría <i class="fa-solid fa-sort text-industrial-border text-xs"></i>
                            </div>
                        </th>
                        <th class="py-2.5 px-3 font-semibold text-industrial-text-secondary font-sans whitespace-nowrap border-b border-industrial-border text-right">
                            <div class="flex items-center gap-1 cursor-pointer hover:text-industrial-text-primary justify-end">
                                pH <i class="fa-solid fa-sort text-industrial-border text-xs"></i>
                            </div>
                        </th>
                        <th class="py-2.5 px-3 font-semibold text-industrial-text-secondary font-sans whitespace-nowrap border-b border-industrial-border text-right">
                            <div class="flex items-center gap-1 cursor-pointer hover:text-industrial-text-primary justify-end">
                                Temp. (°C) <i class="fa-solid fa-sort text-industrial-border text-xs"></i>
                            </div>
                        </th>
                        <th class="py-2.5 px-3 font-semibold text-industrial-text-secondary font-sans whitespace-nowrap border-b border-industrial-border text-right">
                            <div class="flex items-center gap-1 cursor-pointer hover:text-industrial-text-primary justify-end">
                                Tiempo (min) <i class="fa-solid fa-sort text-industrial-border text-xs"></i>
                            </div>
                        </th>
                        <th class="py-2.5 px-3 font-semibold text-industrial-text-secondary font-sans whitespace-nowrap border-b border-industrial-border text-right">
                            <div class="flex items-center gap-1 cursor-pointer hover:text-industrial-text-primary justify-end">
                                Rendimiento <i class="fa-solid fa-sort text-industrial-border text-xs"></i>
                            </div>
                        </th>
                        <th class="py-2.5 px-3 font-semibold text-industrial-text-secondary font-sans whitespace-nowrap border-b border-industrial-border text-right">
                            <div class="flex items-center gap-1 cursor-pointer hover:text-industrial-text-primary justify-end">
                                Concentración <i class="fa-solid fa-sort text-industrial-border text-xs"></i>
                            </div>
                        </th>
                        <th class="py-2.5 px-3 font-semibold text-industrial-text-secondary font-sans whitespace-nowrap border-b border-industrial-border">
                            Últ. Actualización
                        </th>
                        <th class="py-2.5 px-3 font-semibold text-industrial-text-secondary font-sans whitespace-nowrap border-b border-industrial-border">
                            Estado
                        </th>
                        <th class="py-2.5 px-3 font-semibold text-industrial-text-secondary font-sans whitespace-nowrap border-b border-industrial-border text-center">
                            Acciones
                        </th>
                    </tr>
                </thead>
                <tbody id="table-body">

                    <!-- Row 1 — Vigente -->
                    <tr class="table-row bg-white" data-id="1">
                        <td class="py-2 px-3"><input type="checkbox" class="row-check w-3 h-3 accent-industrial-carmine cursor-pointer"></td>
                        <td class="py-2 px-3"><span class="font-mono text-industrial-carmine font-medium">EXT-001</span></td>
                        <td class="py-2 px-3 font-sans font-medium text-industrial-text-primary whitespace-nowrap">Extracción Carmín FD-40 Lote A</td>
                        <td class="py-2 px-3"><span class="font-sans text-industrial-text-secondary whitespace-nowrap">Extracción Acuosa</span></td>
                        <td class="py-2 px-3"><span class="font-mono text-xs bg-red-50 text-industrial-carmine px-1.5 py-0.5 rounded font-medium">FD-40</span></td>
                        <td class="py-2 px-3 text-right"><span class="font-mono text-industrial-text-primary">3.80</span></td>
                        <td class="py-2 px-3 text-right"><span class="font-mono text-industrial-text-primary">78.5</span></td>
                        <td class="py-2 px-3 text-right"><span class="font-mono text-industrial-text-primary">120</span></td>
                        <td class="py-2 px-3 text-right"><span class="font-mono font-semibold text-industrial-success">91.2%</span></td>
                        <td class="py-2 px-3 text-right"><span class="font-mono text-industrial-text-primary">40 g/L</span></td>
                        <td class="py-2 px-3"><span class="font-mono text-industrial-neutral text-xs">2024-11-03</span></td>
                        <td class="py-2 px-3">
                            <div class="flex items-center gap-2">
                                <label class="status-toggle" title="Cambiar estado">
                                    <input type="checkbox" class="status-checkbox" checked @change="toggleStatus($event)">
                                    <span class="status-toggle-slider"></span>
                                </label>
                                <span class="status-pill inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium font-sans bg-industrial-success-bg text-industrial-success whitespace-nowrap">
                                    <span class="status-dot w-1.5 h-1.5 rounded-full bg-industrial-success inline-block"></span>
                                    <span class="status-label">Vigente</span>
                                </span>
                            </div>
                        </td>
                        <td class="py-2 px-3">
                            <div class="flex items-center gap-1.5 justify-center">
                                <button class="row-action-btn"><i class="fa-regular fa-eye"></i> Ver detalle</button>
                                <button class="row-action-btn"><i class="fa-regular fa-copy"></i> Duplicar</button>
                            </div>
                        </td>
                    </tr>

                    <!-- Row 2 — Vigente -->
                    <tr class="table-row bg-gray-50/50" data-id="2">
                        <td class="py-2 px-3"><input type="checkbox" class="row-check w-3 h-3 accent-industrial-carmine cursor-pointer"></td>
                        <td class="py-2 px-3"><span class="font-mono text-industrial-carmine font-medium">EXT-002</span></td>
                        <td class="py-2 px-3 font-sans font-medium text-industrial-text-primary whitespace-nowrap">Cochinilla WS-85 Estándar</td>
                        <td class="py-2 px-3"><span class="font-sans text-industrial-text-secondary whitespace-nowrap">Extracción Ácida</span></td>
                        <td class="py-2 px-3"><span class="font-mono text-xs bg-blue-50 text-blue-700 px-1.5 py-0.5 rounded font-medium">WS-85</span></td>
                        <td class="py-2 px-3 text-right"><span class="font-mono text-industrial-text-primary">5.20</span></td>
                        <td class="py-2 px-3 text-right"><span class="font-mono text-industrial-text-primary">65.0</span></td>
                        <td class="py-2 px-3 text-right"><span class="font-mono text-industrial-text-primary">90</span></td>
                        <td class="py-2 px-3 text-right"><span class="font-mono font-semibold text-industrial-success">87.4%</span></td>
                        <td class="py-2 px-3 text-right"><span class="font-mono text-industrial-text-primary">85 g/L</span></td>
                        <td class="py-2 px-3"><span class="font-mono text-industrial-neutral text-xs">2024-10-22</span></td>
                        <td class="py-2 px-3">
                            <div class="flex items-center gap-2">
                                <label class="status-toggle" title="Cambiar estado">
                                    <input type="checkbox" class="status-checkbox" checked @change="toggleStatus($event)">
                                    <span class="status-toggle-slider"></span>
                                </label>
                                <span class="status-pill inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium font-sans bg-industrial-success-bg text-industrial-success whitespace-nowrap">
                                    <span class="status-dot w-1.5 h-1.5 rounded-full bg-industrial-success inline-block"></span>
                                    <span class="status-label">Vigente</span>
                                </span>
                            </div>
                        </td>
                        <td class="py-2 px-3">
                            <div class="flex items-center gap-1.5 justify-center">
                                <button class="row-action-btn"><i class="fa-regular fa-eye"></i> Ver detalle</button>
                                <button class="row-action-btn"><i class="fa-regular fa-copy"></i> Duplicar</button>
                            </div>
                        </td>
                    </tr>

                    <!-- Row 3 — Vigente -->
                    <tr class="table-row bg-white" data-id="3">
                        <td class="py-2 px-3"><input type="checkbox" class="row-check w-3 h-3 accent-industrial-carmine cursor-pointer"></td>
                        <td class="py-2 px-3"><span class="font-mono text-industrial-carmine font-medium">EXT-003</span></td>
                        <td class="py-2 px-3 font-sans font-medium text-industrial-text-primary whitespace-nowrap">Alta Concentración AC-60 Lote B</td>
                        <td class="py-2 px-3"><span class="font-sans text-industrial-text-secondary whitespace-nowrap">Extracción Alcalina</span></td>
                        <td class="py-2 px-3"><span class="font-mono text-xs bg-purple-50 text-purple-700 px-1.5 py-0.5 rounded font-medium">AC-60</span></td>
                        <td class="py-2 px-3 text-right"><span class="font-mono text-industrial-text-primary">8.40</span></td>
                        <td class="py-2 px-3 text-right"><span class="font-mono text-industrial-text-primary">82.0</span></td>
                        <td class="py-2 px-3 text-right"><span class="font-mono text-industrial-text-primary">150</span></td>
                        <td class="py-2 px-3 text-right"><span class="font-mono font-semibold text-industrial-success">93.7%</span></td>
                        <td class="py-2 px-3 text-right"><span class="font-mono text-industrial-text-primary">60 g/L</span></td>
                        <td class="py-2 px-3"><span class="font-mono text-industrial-neutral text-xs">2024-11-09</span></td>
                        <td class="py-2 px-3">
                            <div class="flex items-center gap-2">
                                <label class="status-toggle" title="Cambiar estado">
                                    <input type="checkbox" class="status-checkbox" checked @change="toggleStatus($event)">
                                    <span class="status-toggle-slider"></span>
                                </label>
                                <span class="status-pill inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium font-sans bg-industrial-success-bg text-industrial-success whitespace-nowrap">
                                    <span class="status-dot w-1.5 h-1.5 rounded-full bg-industrial-success inline-block"></span>
                                    <span class="status-label">Vigente</span>
                                </span>
                            </div>
                        </td>
                        <td class="py-2 px-3">
                            <div class="flex items-center gap-1.5 justify-center">
                                <button class="row-action-btn"><i class="fa-regular fa-eye"></i> Ver detalle</button>
                                <button class="row-action-btn"><i class="fa-regular fa-copy"></i> Duplicar</button>
                            </div>
                        </td>
                    </tr>

                    <!-- Row 4 — No vigente -->
                    <tr class="table-row bg-gray-50/50" data-id="4">
                        <td class="py-2 px-3"><input type="checkbox" class="row-check w-3 h-3 accent-industrial-carmine cursor-pointer"></td>
                        <td class="py-2 px-3"><span class="font-mono text-gray-400 font-medium">EXT-004</span></td>
                        <td class="py-2 px-3 font-sans font-medium text-industrial-neutral whitespace-nowrap">Liofilizado Premium LP-20 v1.0</td>
                        <td class="py-2 px-3"><span class="font-sans text-industrial-neutral whitespace-nowrap">Liofilización</span></td>
                        <td class="py-2 px-3"><span class="font-mono text-xs bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded font-medium">FD-40</span></td>
                        <td class="py-2 px-3 text-right"><span class="font-mono text-industrial-neutral">4.10</span></td>
                        <td class="py-2 px-3 text-right"><span class="font-mono text-industrial-neutral">-55.0</span></td>
                        <td class="py-2 px-3 text-right"><span class="font-mono text-industrial-neutral">480</span></td>
                        <td class="py-2 px-3 text-right"><span class="font-mono font-semibold text-industrial-neutral">72.1%</span></td>
                        <td class="py-2 px-3 text-right"><span class="font-mono text-industrial-neutral">20 g/L</span></td>
                        <td class="py-2 px-3"><span class="font-mono text-industrial-neutral text-xs">2023-06-15</span></td>
                        <td class="py-2 px-3">
                            <div class="flex items-center gap-2">
                                <label class="status-toggle" title="Cambiar estado">
                                    <input type="checkbox" class="status-checkbox" @change="toggleStatus($event)">
                                    <span class="status-toggle-slider"></span>
                                </label>
                                <span class="status-pill inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium font-sans bg-gray-100 text-gray-500 whitespace-nowrap">
                                    <span class="status-dot w-1.5 h-1.5 rounded-full bg-gray-400 inline-block"></span>
                                    <span class="status-label">No vigente</span>
                                </span>
                            </div>
                        </td>
                        <td class="py-2 px-3">
                            <div class="flex items-center gap-1.5 justify-center">
                                <button class="row-action-btn"><i class="fa-regular fa-eye"></i> Ver detalle</button>
                                <button class="row-action-btn"><i class="fa-regular fa-copy"></i> Duplicar</button>
                            </div>
                        </td>
                    </tr>

                    <!-- Row 5 — Vigente -->
                    <tr class="table-row bg-white" data-id="5">
                        <td class="py-2 px-3"><input type="checkbox" class="row-check w-3 h-3 accent-industrial-carmine cursor-pointer"></td>
                        <td class="py-2 px-3"><span class="font-mono text-industrial-carmine font-medium">EXT-005</span></td>
                        <td class="py-2 px-3 font-sans font-medium text-industrial-text-primary whitespace-nowrap">Extracción Carmín WS-85 v2.1</td>
                        <td class="py-2 px-3"><span class="font-sans text-industrial-text-secondary whitespace-nowrap">Extracción Acuosa</span></td>
                        <td class="py-2 px-3"><span class="font-mono text-xs bg-blue-50 text-blue-700 px-1.5 py-0.5 rounded font-medium">WS-85</span></td>
                        <td class="py-2 px-3 text-right"><span class="font-mono text-industrial-text-primary">4.90</span></td>
                        <td class="py-2 px-3 text-right"><span class="font-mono text-industrial-text-primary">72.0</span></td>
                        <td class="py-2 px-3 text-right"><span class="font-mono text-industrial-text-primary">105</span></td>
                        <td class="py-2 px-3 text-right"><span class="font-mono font-semibold text-industrial-success">89.6%</span></td>
                        <td class="py-2 px-3 text-right"><span class="font-mono text-industrial-text-primary">85 g/L</span></td>
                        <td class="py-2 px-3"><span class="font-mono text-industrial-neutral text-xs">2024-11-01</span></td>
                        <td class="py-2 px-3">
                            <div class="flex items-center gap-2">
                                <label class="status-toggle" title="Cambiar estado">
                                    <input type="checkbox" class="status-checkbox" checked @change="toggleStatus($event)">
                                    <span class="status-toggle-slider"></span>
                                </label>
                                <span class="status-pill inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium font-sans bg-industrial-success-bg text-industrial-success whitespace-nowrap">
                                    <span class="status-dot w-1.5 h-1.5 rounded-full bg-industrial-success inline-block"></span>
                                    <span class="status-label">Vigente</span>
                                </span>
                            </div>
                        </td>
                        <td class="py-2 px-3">
                            <div class="flex items-center gap-1.5 justify-center">
                                <button class="row-action-btn"><i class="fa-regular fa-eye"></i> Ver detalle</button>
                                <button class="row-action-btn"><i class="fa-regular fa-copy"></i> Duplicar</button>
                            </div>
                        </td>
                    </tr>

                    <!-- Row 6 — No vigente -->
                    <tr class="table-row bg-gray-50/50" data-id="6">
                        <td class="py-2 px-3"><input type="checkbox" class="row-check w-3 h-3 accent-industrial-carmine cursor-pointer"></td>
                        <td class="py-2 px-3"><span class="font-mono text-gray-400 font-medium">EXT-006</span></td>
                        <td class="py-2 px-3 font-sans font-medium text-industrial-neutral whitespace-nowrap">Carmín Alcalino AC-60 Antiguo</td>
                        <td class="py-2 px-3"><span class="font-sans text-industrial-neutral whitespace-nowrap">Extracción Alcalina</span></td>
                        <td class="py-2 px-3"><span class="font-mono text-xs bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded font-medium">AC-60</span></td>
                        <td class="py-2 px-3 text-right"><span class="font-mono text-industrial-neutral">8.80</span></td>
                        <td class="py-2 px-3 text-right"><span class="font-mono text-industrial-neutral">79.5</span></td>
                        <td class="py-2 px-3 text-right"><span class="font-mono text-industrial-neutral">135</span></td>
                        <td class="py-2 px-3 text-right"><span class="font-mono font-semibold text-industrial-neutral">68.3%</span></td>
                        <td class="py-2 px-3 text-right"><span class="font-mono text-industrial-neutral">55 g/L</span></td>
                        <td class="py-2 px-3"><span class="font-mono text-industrial-neutral text-xs">2022-03-28</span></td>
                        <td class="py-2 px-3">
                            <div class="flex items-center gap-2">
                                <label class="status-toggle" title="Cambiar estado">
                                    <input type="checkbox" class="status-checkbox" @change="toggleStatus($event)">
                                    <span class="status-toggle-slider"></span>
                                </label>
                                <span class="status-pill inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium font-sans bg-gray-100 text-gray-500 whitespace-nowrap">
                                    <span class="status-dot w-1.5 h-1.5 rounded-full bg-gray-400 inline-block"></span>
                                    <span class="status-label">No vigente</span>
                                </span>
                            </div>
                        </td>
                        <td class="py-2 px-3">
                            <div class="flex items-center gap-1.5 justify-center">
                                <button class="row-action-btn"><i class="fa-regular fa-eye"></i> Ver detalle</button>
                                <button class="row-action-btn"><i class="fa-regular fa-copy"></i> Duplicar</button>
                            </div>
                        </td>
                    </tr>

                    <!-- Row 7 — Vigente -->
                    <tr class="table-row bg-white" data-id="7">
                        <td class="py-2 px-3"><input type="checkbox" class="row-check w-3 h-3 accent-industrial-carmine cursor-pointer"></td>
                        <td class="py-2 px-3"><span class="font-mono text-industrial-carmine font-medium">EXT-007</span></td>
                        <td class="py-2 px-3 font-sans font-medium text-industrial-text-primary whitespace-nowrap">Carmín FD-40 Alta Pureza v3.0</td>
                        <td class="py-2 px-3"><span class="font-sans text-industrial-text-secondary whitespace-nowrap">Extracción Ácida</span></td>
                        <td class="py-2 px-3"><span class="font-mono text-xs bg-red-50 text-industrial-carmine px-1.5 py-0.5 rounded font-medium">FD-40</span></td>
                        <td class="py-2 px-3 text-right"><span class="font-mono text-industrial-text-primary">3.60</span></td>
                        <td class="py-2 px-3 text-right"><span class="font-mono text-industrial-text-primary">76.0</span></td>
                        <td class="py-2 px-3 text-right"><span class="font-mono text-industrial-text-primary">110</span></td>
                        <td class="py-2 px-3 text-right"><span class="font-mono font-semibold text-industrial-success">94.5%</span></td>
                        <td class="py-2 px-3 text-right"><span class="font-mono text-industrial-text-primary">42 g/L</span></td>
                        <td class="py-2 px-3"><span class="font-mono text-industrial-neutral text-xs">2024-11-11</span></td>
                        <td class="py-2 px-3">
                            <div class="flex items-center gap-2">
                                <label class="status-toggle" title="Cambiar estado">
                                    <input type="checkbox" class="status-checkbox" checked @change="toggleStatus($event)">
                                    <span class="status-toggle-slider"></span>
                                </label>
                                <span class="status-pill inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium font-sans bg-industrial-success-bg text-industrial-success whitespace-nowrap">
                                    <span class="status-dot w-1.5 h-1.5 rounded-full bg-industrial-success inline-block"></span>
                                    <span class="status-label">Vigente</span>
                                </span>
                            </div>
                        </td>
                        <td class="py-2 px-3">
                            <div class="flex items-center gap-1.5 justify-center">
                                <button class="row-action-btn"><i class="fa-regular fa-eye"></i> Ver detalle</button>
                                <button class="row-action-btn"><i class="fa-regular fa-copy"></i> Duplicar</button>
                            </div>
                        </td>
                    </tr>

                    <!-- Row 8 — Vigente -->
                    <tr class="table-row bg-gray-50/50" data-id="8">
                        <td class="py-2 px-3"><input type="checkbox" class="row-check w-3 h-3 accent-industrial-carmine cursor-pointer"></td>
                        <td class="py-2 px-3"><span class="font-mono text-industrial-carmine font-medium">EXT-008</span></td>
                        <td class="py-2 px-3 font-sans font-medium text-industrial-text-primary whitespace-nowrap">Cochinilla WS-85 Bajo pH</td>
                        <td class="py-2 px-3"><span class="font-sans text-industrial-text-secondary whitespace-nowrap">Extracción Ácida</span></td>
                        <td class="py-2 px-3"><span class="font-mono text-xs bg-blue-50 text-blue-700 px-1.5 py-0.5 rounded font-medium">WS-85</span></td>
                        <td class="py-2 px-3 text-right"><span class="font-mono text-industrial-text-primary">2.90</span></td>
                        <td class="py-2 px-3 text-right"><span class="font-mono text-industrial-text-primary">68.0</span></td>
                        <td class="py-2 px-3 text-right"><span class="font-mono text-industrial-text-primary">95</span></td>
                        <td class="py-2 px-3 text-right"><span class="font-mono font-semibold text-industrial-success">85.0%</span></td>
                        <td class="py-2 px-3 text-right"><span class="font-mono text-industrial-text-primary">83 g/L</span></td>
                        <td class="py-2 px-3"><span class="font-mono text-industrial-neutral text-xs">2024-09-14</span></td>
                        <td class="py-2 px-3">
                            <div class="flex items-center gap-2">
                                <label class="status-toggle" title="Cambiar estado">
                                    <input type="checkbox" class="status-checkbox" checked @change="toggleStatus($event)">
                                    <span class="status-toggle-slider"></span>
                                </label>
                                <span class="status-pill inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium font-sans bg-industrial-success-bg text-industrial-success whitespace-nowrap">
                                    <span class="status-dot w-1.5 h-1.5 rounded-full bg-industrial-success inline-block"></span>
                                    <span class="status-label">Vigente</span>
                                </span>
                            </div>
                        </td>
                        <td class="py-2 px-3">
                            <div class="flex items-center gap-1.5 justify-center">
                                <button class="row-action-btn"><i class="fa-regular fa-eye"></i> Ver detalle</button>
                                <button class="row-action-btn"><i class="fa-regular fa-copy"></i> Duplicar</button>
                            </div>
                        </td>
                    </tr>

                    <!-- Row 9 — No vigente -->
                    <tr class="table-row bg-white" data-id="9">
                        <td class="py-2 px-3"><input type="checkbox" class="row-check w-3 h-3 accent-industrial-carmine cursor-pointer"></td>
                        <td class="py-2 px-3"><span class="font-mono text-gray-400 font-medium">EXT-009</span></td>
                        <td class="py-2 px-3 font-sans font-medium text-industrial-neutral whitespace-nowrap">Extracción AC-60 Prueba pH9</td>
                        <td class="py-2 px-3"><span class="font-sans text-industrial-neutral whitespace-nowrap">Extracción Alcalina</span></td>
                        <td class="py-2 px-3"><span class="font-mono text-xs bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded font-medium">AC-60</span></td>
                        <td class="py-2 px-3 text-right"><span class="font-mono text-industrial-neutral">9.10</span></td>
                        <td class="py-2 px-3 text-right"><span class="font-mono text-industrial-neutral">84.5</span></td>
                        <td class="py-2 px-3 text-right"><span class="font-mono text-industrial-neutral">160</span></td>
                        <td class="py-2 px-3 text-right"><span class="font-mono font-semibold text-industrial-neutral">61.0%</span></td>
                        <td class="py-2 px-3 text-right"><span class="font-mono text-industrial-neutral">58 g/L</span></td>
                        <td class="py-2 px-3"><span class="font-mono text-industrial-neutral text-xs">2023-01-19</span></td>
                        <td class="py-2 px-3">
                            <div class="flex items-center gap-2">
                                <label class="status-toggle" title="Cambiar estado">
                                    <input type="checkbox" class="status-checkbox" @change="toggleStatus($event)">
                                    <span class="status-toggle-slider"></span>
                                </label>
                                <span class="status-pill inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium font-sans bg-gray-100 text-gray-500 whitespace-nowrap">
                                    <span class="status-dot w-1.5 h-1.5 rounded-full bg-gray-400 inline-block"></span>
                                    <span class="status-label">No vigente</span>
                                </span>
                            </div>
                        </td>
                        <td class="py-2 px-3">
                            <div class="flex items-center gap-1.5 justify-center">
                                <button class="row-action-btn"><i class="fa-regular fa-eye"></i> Ver detalle</button>
                                <button class="row-action-btn"><i class="fa-regular fa-copy"></i> Duplicar</button>
                            </div>
                        </td>
                    </tr>

                    <!-- Row 10 — Vigente -->
                    <tr class="table-row bg-gray-50/50" data-id="10">
                        <td class="py-2 px-3"><input type="checkbox" class="row-check w-3 h-3 accent-industrial-carmine cursor-pointer"></td>
                        <td class="py-2 px-3"><span class="font-mono text-industrial-carmine font-medium">EXT-010</span></td>
                        <td class="py-2 px-3 font-sans font-medium text-industrial-text-primary whitespace-nowrap">Liofilizado FD-40 v2.0 Mejorado</td>
                        <td class="py-2 px-3"><span class="font-sans text-industrial-text-secondary whitespace-nowrap">Liofilización</span></td>
                        <td class="py-2 px-3"><span class="font-mono text-xs bg-red-50 text-industrial-carmine px-1.5 py-0.5 rounded font-medium">FD-40</span></td>
                        <td class="py-2 px-3 text-right"><span class="font-mono text-industrial-text-primary">4.30</span></td>
                        <td class="py-2 px-3 text-right"><span class="font-mono text-industrial-text-primary">-50.0</span></td>
                        <td class="py-2 px-3 text-right"><span class="font-mono text-industrial-text-primary">520</span></td>
                        <td class="py-2 px-3 text-right"><span class="font-mono font-semibold text-industrial-success">81.4%</span></td>
                        <td class="py-2 px-3 text-right"><span class="font-mono text-industrial-text-primary">22 g/L</span></td>
                        <td class="py-2 px-3"><span class="font-mono text-industrial-neutral text-xs">2024-08-30</span></td>
                        <td class="py-2 px-3">
                            <div class="flex items-center gap-2">
                                <label class="status-toggle" title="Cambiar estado">
                                    <input type="checkbox" class="status-checkbox" checked @change="toggleStatus($event)">
                                    <span class="status-toggle-slider"></span>
                                </label>
                                <span class="status-pill inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium font-sans bg-industrial-success-bg text-industrial-success whitespace-nowrap">
                                    <span class="status-dot w-1.5 h-1.5 rounded-full bg-industrial-success inline-block"></span>
                                    <span class="status-label">Vigente</span>
                                </span>
                            </div>
                        </td>
                        <td class="py-2 px-3">
                            <div class="flex items-center gap-1.5 justify-center">
                                <button class="row-action-btn"><i class="fa-regular fa-eye"></i> Ver detalle</button>
                                <button class="row-action-btn"><i class="fa-regular fa-copy"></i> Duplicar</button>
                            </div>
                        </td>
                    </tr>

                    <!-- Row 11 — Vigente -->
                    <tr class="table-row bg-white" data-id="11">
                        <td class="py-2 px-3"><input type="checkbox" class="row-check w-3 h-3 accent-industrial-carmine cursor-pointer"></td>
                        <td class="py-2 px-3"><span class="font-mono text-industrial-carmine font-medium">EXT-011</span></td>
                        <td class="py-2 px-3 font-sans font-medium text-industrial-text-primary whitespace-nowrap">Cochinilla WS-85 Granulado</td>
                        <td class="py-2 px-3"><span class="font-sans text-industrial-text-secondary whitespace-nowrap">Extracción Acuosa</span></td>
                        <td class="py-2 px-3"><span class="font-mono text-xs bg-blue-50 text-blue-700 px-1.5 py-0.5 rounded font-medium">WS-85</span></td>
                        <td class="py-2 px-3 text-right"><span class="font-mono text-industrial-text-primary">5.60</span></td>
                        <td class="py-2 px-3 text-right"><span class="font-mono text-industrial-text-primary">70.0</span></td>
                        <td class="py-2 px-3 text-right"><span class="font-mono text-industrial-text-primary">100</span></td>
                        <td class="py-2 px-3 text-right"><span class="font-mono font-semibold text-industrial-success">88.9%</span></td>
                        <td class="py-2 px-3 text-right"><span class="font-mono text-industrial-text-primary">80 g/L</span></td>
                        <td class="py-2 px-3"><span class="font-mono text-industrial-neutral text-xs">2024-10-05</span></td>
                        <td class="py-2 px-3">
                            <div class="flex items-center gap-2">
                                <label class="status-toggle" title="Cambiar estado">
                                    <input type="checkbox" class="status-checkbox" checked @change="toggleStatus($event)">
                                    <span class="status-toggle-slider"></span>
                                </label>
                                <span class="status-pill inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium font-sans bg-industrial-success-bg text-industrial-success whitespace-nowrap">
                                    <span class="status-dot w-1.5 h-1.5 rounded-full bg-industrial-success inline-block"></span>
                                    <span class="status-label">Vigente</span>
                                </span>
                            </div>
                        </td>
                        <td class="py-2 px-3">
                            <div class="flex items-center gap-1.5 justify-center">
                                <button class="row-action-btn"><i class="fa-regular fa-eye"></i> Ver detalle</button>
                                <button class="row-action-btn"><i class="fa-regular fa-copy"></i> Duplicar</button>
                            </div>
                        </td>
                    </tr>

                </tbody>
            </table>

            <!-- Footer / Pagination -->
            <footer id="footer" class="bg-white border-t border-industrial-border px-5 py-2.5 flex items-center justify-between flex-wrap gap-2 sticky bottom-0">
                <div class="flex items-center gap-3">
                    <span class="text-xs text-industrial-neutral font-sans">Mostrando <span class="font-mono font-medium text-industrial-text-primary">1–11</span> de <span class="font-mono font-medium text-industrial-text-primary">247</span> recetas</span>
                    <div class="flex items-center gap-1.5">
                        <span class="text-xs text-industrial-neutral font-sans">Filas:</span>
                        <select class="h-6 px-1.5 text-xs border border-industrial-border rounded bg-white text-industrial-text-secondary focus:outline-none font-sans appearance-none pr-5 compact-select">
                            <option>25</option>
                            <option>50</option>
                            <option>100</option>
                        </select>
                    </div>
                </div>
                <div class="flex items-center gap-1">
                    <button class="w-7 h-7 flex items-center justify-center border border-industrial-border rounded text-industrial-neutral hover:border-industrial-carmine hover:text-industrial-carmine transition-colors">
                        <i class="fa-solid fa-angles-left text-xs"></i>
                    </button>
                    <button class="w-7 h-7 flex items-center justify-center border border-industrial-border rounded text-industrial-neutral hover:border-industrial-carmine hover:text-industrial-carmine transition-colors">
                        <i class="fa-solid fa-angle-left text-xs"></i>
                    </button>
                    <button class="w-7 h-7 flex items-center justify-center border border-industrial-carmine rounded bg-industrial-carmine text-white font-mono text-xs font-medium">1</button>
                    <button class="w-7 h-7 flex items-center justify-center border border-industrial-border rounded text-industrial-text-secondary hover:border-industrial-carmine hover:text-industrial-carmine transition-colors font-mono text-xs">2</button>
                    <button class="w-7 h-7 flex items-center justify-center border border-industrial-border rounded text-industrial-text-secondary hover:border-industrial-carmine hover:text-industrial-carmine transition-colors font-mono text-xs">3</button>
                    <span class="px-1 text-industrial-neutral font-mono text-xs">…</span>
                    <button class="w-7 h-7 flex items-center justify-center border border-industrial-border rounded text-industrial-text-secondary hover:border-industrial-carmine hover:text-industrial-carmine transition-colors font-mono text-xs">10</button>
                    <button class="w-7 h-7 flex items-center justify-center border border-industrial-border rounded text-industrial-neutral hover:border-industrial-carmine hover:text-industrial-carmine transition-colors">
                        <i class="fa-solid fa-angle-right text-xs"></i>
                    </button>
                    <button class="w-7 h-7 flex items-center justify-center border border-industrial-border rounded text-industrial-neutral hover:border-industrial-carmine hover:text-industrial-carmine transition-colors">
                        <i class="fa-solid fa-angles-right text-xs"></i>
                    </button>
                </div>
                <div class="flex items-center gap-1.5 text-xs text-industrial-neutral font-sans">
                    <i class="fa-solid fa-circle text-industrial-carmine text-xs"></i>
                    <span class="font-semibold text-industrial-carmine font-mono">CarmineERP</span>
                    <span class="text-industrial-border mx-1">|</span>
                    <span>v4.2.1 · Plataforma Industrial</span>
                </div>
            </footer>
        </div>
    </div>

    <!-- Toast Notification -->
    <div v-if="toast.visible" id="toast" class="fixed bottom-6 right-6 z-50">
        <div class="flex items-center gap-2.5 bg-gray-900 text-white text-xs font-sans px-4 py-2.5 rounded-lg shadow-xl border border-gray-700">
            <i id="toast-icon" :class="toastIconClass"></i>
            <span id="toast-msg">{{ toast.message }}</span>
        </div>
    </div>
  </div>
</template>

<script setup>
import { computed, reactive, ref } from 'vue';

const phLimit = ref(9);
const yieldLimit = ref(70);
const toast = reactive({
  visible: false,
  icon: 'toggle-on',
  message: 'Estado actualizado correctamente.',
});

let toastTimer;

const phLabel = computed(() => `<=${Number(phLimit.value).toFixed(1)}`);
const yieldLabel = computed(() => `>=${yieldLimit.value}%`);
const toastIconClass = computed(() => [
  'fa-solid',
  `fa-${toast.icon}`,
  'text-sm',
  toast.icon === 'toggle-on' ? 'text-green-400' : 'text-gray-400',
]);

function toggleStatus(event) {
  const checkbox = event.target;
  const row = checkbox.closest('tr');
  const pill = row?.querySelector('.status-pill');
  const dot = row?.querySelector('.status-dot');
  const label = row?.querySelector('.status-label');
  const codeCell = row?.querySelector('td:nth-child(2) span');
  const nameCell = row?.querySelector('td:nth-child(3)');
  const rendCell = row?.querySelector('td:nth-child(9) span');

  if (checkbox.checked) {
    if (pill) pill.className = 'status-pill inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium font-sans bg-industrial-success-bg text-industrial-success whitespace-nowrap';
    if (dot) dot.className = 'status-dot w-1.5 h-1.5 rounded-full bg-industrial-success inline-block';
    if (label) label.textContent = 'Vigente';
    if (codeCell) codeCell.className = 'font-mono text-industrial-carmine font-medium';
    if (nameCell) nameCell.className = 'py-2 px-3 font-sans font-medium text-industrial-text-primary whitespace-nowrap';
    if (rendCell) rendCell.className = 'font-mono font-semibold text-industrial-success';
    showToast('toggle-on', 'Receta marcada como Vigente.');
  } else {
    if (pill) pill.className = 'status-pill inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium font-sans bg-gray-100 text-gray-500 whitespace-nowrap';
    if (dot) dot.className = 'status-dot w-1.5 h-1.5 rounded-full bg-gray-400 inline-block';
    if (label) label.textContent = 'No vigente';
    if (codeCell) codeCell.className = 'font-mono text-gray-400 font-medium';
    if (nameCell) nameCell.className = 'py-2 px-3 font-sans font-medium text-industrial-neutral whitespace-nowrap';
    if (rendCell) rendCell.className = 'font-mono font-semibold text-industrial-neutral';
    showToast('toggle-off', 'Receta marcada como No vigente.');
  }
}

function showToast(icon, message) {
  toast.icon = icon;
  toast.message = message;
  toast.visible = true;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.visible = false;
  }, 2800);
}

function toggleAllRows(event) {
  document.querySelectorAll('.row-check').forEach((checkbox) => {
    checkbox.checked = event.target.checked;
  });
}
</script>

<style scoped>
.dashboard-page {
  height: 100vh;
  font-family: 'Work Sans', sans-serif;
  background-color: #fcfcfc;
}

::-webkit-scrollbar { display: none;}

body { font-family: 'Work Sans', sans-serif; background-color: #fcfcfc; }
        .font-mono { font-family: 'JetBrains Mono', monospace; }
        .sidebar-tooltip { display: none; }
        .sidebar-icon-btn:hover .sidebar-tooltip { display: block; }
        input[type="range"] {
            -webkit-appearance: none;
            appearance: none;
            height: 4px;
            background: #e2e8f0;
            border-radius: 2px;
            outline: none;
        }
        input[type="range"]::-webkit-slider-thumb {
            -webkit-appearance: none;
            appearance: none;
            width: 14px;
            height: 14px;
            border-radius: 50%;
            background: #800020;
            cursor: pointer;
            border: 2px solid #fff;
            box-shadow: 0 0 0 2px #800020;
        }
        .table-row:hover { background-color: #fdf8f9; }
        .action-btn { color: #cbd5e0; transition: color 0.15s; }
        .action-btn:hover { color: #800020; }
        select { background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%23718096' stroke-width='1.5' fill='none' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E"); background-repeat: no-repeat; background-position: right 10px center; }
        .sticky-header { position: sticky; top: 0; z-index: 10; }
        .data-table { border-collapse: separate; border-spacing: 0; }
        .data-table th, .data-table td { border-bottom: 1px solid #e2e8f0; }
        .compact-select { -webkit-appearance: none; appearance: none; padding-right: 28px !important; }
        .nav-active { background-color: #800020 !important; color: #fff !important; }
        .sidebar-divider { border-color: #2d2d2d; }

        /* Status Toggle Switch */
        .status-toggle { position: relative; display: inline-block; width: 32px; height: 17px; }
        .status-toggle input { opacity: 0; width: 0; height: 0; }
        .status-toggle-slider {
            position: absolute; cursor: pointer; top: 0; left: 0; right: 0; bottom: 0;
            background-color: #cbd5e0; border-radius: 17px;
            transition: background-color 0.2s ease;
        }
        .status-toggle-slider:before {
            position: absolute; content: "";
            height: 11px; width: 11px; left: 3px; bottom: 3px;
            background-color: white; border-radius: 50%;
            transition: transform 0.2s ease;
            box-shadow: 0 1px 3px rgba(0,0,0,0.2);
        }
        .status-toggle input:checked + .status-toggle-slider { background-color: #800020; }
        .status-toggle input:checked + .status-toggle-slider:before { transform: translateX(15px); }
        .status-toggle:hover .status-toggle-slider { filter: brightness(0.95); }

        /* Row action buttons */
        .row-action-btn {
            display: inline-flex; align-items: center; gap: 4px;
            height: 26px; padding: 0 8px;
            font-size: 11px; font-family: 'Work Sans', sans-serif; font-weight: 500;
            border: 1px solid #e2e8f0; border-radius: 4px;
            color: #4a5568; background: #fff;
            cursor: pointer; white-space: nowrap;
            transition: all 0.15s ease;
        }
        .row-action-btn:hover {
            border-color: #800020; color: #800020; background-color: #fdf8f9;
        }
        .row-action-btn i { font-size: 10px; }

        select { background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%23718096' stroke-width='1.5' fill='none' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E"); background-repeat: no-repeat; background-position: right 10px center; }
</style>
