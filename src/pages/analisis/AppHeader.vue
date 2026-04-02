<template>
  <header class="bg-white h-20 border-b flex items-center justify-between px-6 sticky top-0 z-10">
    <div class="flex items-center gap-4">
      <div class="relative hidden sm:block">
        <i
          class="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
        ></i>
        <input
          type="text"
          placeholder="Buscar muestra, lote, análisis..."
          class="pl-12 pr-4 py-2 border rounded-lg text-sm w-72 focus:outline-none focus:ring-1 focus:ring-indigo-500"
        />
      </div>
    </div>

    <div class="flex items-center gap-6">
      <button class="text-gray-500 hover:text-indigo-600">
        <i class="fa-solid fa-qrcode text-xl"></i>
      </button>

      <div class="flex items-center gap-3 border-l pl-6">
        <img
          src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-5.jpg"
          class="w-9 h-9 rounded-full"
        />
        <div class="hidden sm:block">
          <p class="text-sm font-bold">Dra. Elena M.</p>
          <p class="text-xs text-gray-500">Jefa de Laboratorio</p>
        </div>
      </div>
    </div>
  </header>
</template>
