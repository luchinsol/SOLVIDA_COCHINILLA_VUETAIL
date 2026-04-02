<template>
  <section
    id="safety-notifications"
    class="bg-surface rounded-xl shadow-card border border-gray-100 overflow-hidden"
  >
    <!-- Header -->
    <div class="px-5 py-4 border-b border-gray-100 flex justify-between items-center bg-red-50/30">
      <h3 class="text-base font-semibold text-textMain flex items-center">
        <i class="fa-solid fa-shield-exclamation text-accent mr-2"></i>
        Notificaciones de Seguridad
      </h3>

      <span class="bg-accent text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
        3 Nuevas
      </span>
    </div>

    <!-- Lista -->
    <div class="divide-y divide-gray-100">
      <!-- NOTIFICACIÓN 1 -->
      <div
        class="p-4 hover:bg-gray-50 transition-colors cursor-pointer border-l-4 border-accent bg-red-50/10"
      >
        <div class="flex justify-between items-start">
          <div class="flex items-start space-x-3">
            <div class="mt-0.5 text-accent">
              <i class="fa-solid fa-temperature-arrow-up text-sm"></i>
            </div>

            <div>
              <p class="text-sm font-medium text-textMain">Alerta de Temperatura</p>

              <p class="text-xs text-textMuted mt-1 line-clamp-2">
                Reactor B superó el límite de temperatura (85°C) durante fase de extracción.
              </p>
            </div>
          </div>
        </div>

        <div class="mt-2 text-[10px] text-gray-400 flex justify-end">Hace 15 min</div>
      </div>

      <!-- NOTIFICACIÓN 2 -->
      <div class="p-4 hover:bg-gray-50 transition-colors cursor-pointer border-l-4 border-warning">
        <div class="flex justify-between items-start">
          <div class="flex items-start space-x-3">
            <div class="mt-0.5 text-warning">
              <i class="fa-solid fa-mask-ventilator text-sm"></i>
            </div>

            <div>
              <p class="text-sm font-medium text-textMain">Revisión de EPI</p>

              <p class="text-xs text-textMuted mt-1 line-clamp-2">
                Recordatorio: Inspección obligatoria de respiradores en zona de molienda.
              </p>
            </div>
          </div>
        </div>

        <div class="mt-2 text-[10px] text-gray-400 flex justify-end">Hace 2 horas</div>
      </div>

      <!-- NOTIFICACIÓN 3 -->
      <div class="p-4 hover:bg-gray-50 transition-colors cursor-pointer border-l-4 border-info">
        <div class="flex justify-between items-start">
          <div class="flex items-start space-x-3">
            <div class="mt-0.5 text-info">
              <i class="fa-solid fa-clipboard-check text-sm"></i>
            </div>

            <div>
              <p class="text-sm font-medium text-textMain">Auditoría Programada</p>

              <p class="text-xs text-textMuted mt-1 line-clamp-2">
                Auditoría de calidad ISO 9001 programada para mañana a las 09:00 AM.
              </p>
            </div>
          </div>
        </div>

        <div class="mt-2 text-[10px] text-gray-400 flex justify-end">Ayer</div>
      </div>
    </div>

    <!-- Footer -->
    <div class="p-3 border-t border-gray-100 text-center bg-gray-50/50">
      <a href="#" class="text-xs font-medium text-primary hover:underline">
        Ver Historial Completo
      </a>
    </div>
  </section>
</template>
