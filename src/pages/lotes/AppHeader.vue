<template>
  <header
    class="bg-surface h-20 border-b border-border-color flex items-center justify-between px-6 lg:px-10 sticky top-0 z-10"
  >
    <div class="flex items-center gap-4">
      <div class="relative hidden sm:block">
        <i
          class="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-text-muted"
        ></i>
        <input
          type="text"
          placeholder="Buscar lote, QR, producto..."
          class="pl-12 pr-4 py-2.5 bg-primary-light border border-border-color rounded-full text-sm w-64 lg:w-[400px] text-white"
        />
      </div>
    </div>

    <div class="flex items-center gap-6">
      <i class="fa-solid fa-qrcode text-xl text-text-muted"></i>
      <i class="fa-solid fa-bell text-xl text-text-muted"></i>

      <div class="flex items-center gap-3 pl-6 border-l border-border-color">
        <img
          src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-4.jpg"
          class="w-10 h-10 rounded-full"
        />
        <div>
          <p class="text-sm font-bold text-white">Carlos R.</p>
          <p class="text-xs text-text-muted">Supervisor de Calidad</p>
        </div>
      </div>
    </div>
  </header>
</template>
