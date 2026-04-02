<template>
  <tr class="border-b hover:bg-surface-light transition">
    <td class="p-3">
      <div class="flex items-center gap-3">
        <div class="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs">
          {{ initials }}
        </div>
        <span class="font-medium">{{ name }}</span>
      </div>
    </td>

    <td class="p-3">
      <span class="text-xs bg-gray-100 px-2 py-1 rounded">{{ role }}</span>
    </td>

    <td class="p-3">
      <span :class="statusClass">
        {{ active ? 'Activo' : 'Bloqueado' }}
      </span>
    </td>

    <td class="p-3 flex gap-2">
      <button>✏️</button>
      <button>🔑</button>
    </td>
  </tr>
</template>

<script setup>
const props = defineProps({
  name: String,
  role: String,
  active: Boolean,
})

const initials = props.name
  .split(' ')
  .map((n) => n[0])
  .join('')

const statusClass = props.active ? 'text-green-600 text-xs' : 'text-red-600 text-xs'
</script>
