<template>
  <aside class="hidden md:flex flex-col w-64 bg-white h-screen fixed border-r shadow-soft">
    <div class="p-6 flex items-center space-x-3 border-b">
      <div class="w-10 h-10 bg-accent text-white flex items-center justify-center rounded-lg">
        <i class="fa-solid fa-flask"></i>
      </div>
      <div>
        <h1 class="font-bold text-primary">CarmineSys</h1>
        <p class="text-xs text-textMuted">Production Management</p>
      </div>
    </div>

    <nav class="flex-1 py-4 px-3 space-y-1">
      <a class="nav-item active flex items-center px-4 py-3 rounded-lg">
        <i class="fa-solid fa-chart-pie w-6"></i>
        <span class="ml-3">Dashboard</span>
      </a>

      <a class="nav-item flex items-center px-4 py-3 text-textMuted hover:bg-gray-50 rounded-lg">
        <i class="fa-solid fa-industry w-6"></i>
        <span class="ml-3">Production</span>
      </a>

      <a class="nav-item flex items-center px-4 py-3 text-textMuted hover:bg-gray-50 rounded-lg">
        <i class="fa-solid fa-industry w-6"></i>
        <span class="ml-3">Batches</span>
      </a>

      <a class="nav-item flex items-center px-4 py-3 text-textMuted hover:bg-gray-50 rounded-lg">
        <i class="fa-solid fa-industry w-6"></i>
        <span class="ml-3">Inventory</span>
      </a>

      <a class="nav-item flex items-center px-4 py-3 text-textMuted hover:bg-gray-50 rounded-lg">
        <i class="fa-solid fa-industry w-6"></i>
        <span class="ml-3">Lab Analysis</span>
      </a>

      <a class="nav-item flex items-center px-4 py-3 text-textMuted hover:bg-gray-50 rounded-lg">
        <i class="fa-solid fa-industry w-6"></i>
        <span class="ml-3">Security</span>
      </a>
    </nav>

    <div class="p-4 border-t">
      <div>
        <p>Settings</p>
      </div>
      <div class="flex items-center bg-gray-50 p-2 rounded-lg">
        <img class="w-8 h-8 rounded-full" src="https://i.pravatar.cc/40" />
        <div class="ml-2">
          <p class="text-sm font-medium">Carlos M.</p>
          <p class="text-xs text-textMuted">Plant Manager</p>
        </div>
      </div>
    </div>
  </aside>
</template>
