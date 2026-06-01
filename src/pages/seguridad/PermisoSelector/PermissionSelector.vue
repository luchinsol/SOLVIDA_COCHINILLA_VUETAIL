<template>
  <div class="flex flex-col gap-1">
    <div class="text-[11px] font-semibold uppercase text-gray-500">
      {{ label }}
    </div>

    <div class="flex items-center gap-3">
      <!-- OFF -->
      <button
        @click="setOff"
        class="flex-1 py-1 text-[10px] rounded-[5px] transition-all"
        :class="
          selected === 'off'
            ? 'bg-gray-600 text-white border-blue-700 shadow-sm'
            : 'bg-white text-gray-700 border-gray-200'
        "
      >
        {{ permission.activo ? 'On' : 'Off' }}
      </button>
    </div>

    <div class="inline-flex bg-gray-100/80 p-1 rounded-[8px] border border-gray-200 min-w-[120px]">
      <!-- NV -->
      <button
        @click="setNoValorado"
        :disabled="!isEnabled"
        class="flex-1 py-1 text-[10px] rounded-[5px] transition-all"
        :class="[
          selected === 'nv' ? activeClass : inactiveClass,
          !isEnabled && 'opacity-40 cursor-not-allowed',
        ]"
      >
        NV
      </button>

      <!-- V -->
      <button
        @click="setValorado"
        :disabled="!isEnabled"
        class="flex-1 py-1 text-[10px] rounded-[5px] transition-all"
        :class="[
          selected === 'v' ? activeClass : inactiveClass,
          !isEnabled && 'opacity-40 cursor-not-allowed',
        ]"
      >
        V
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  label: String,
  permission: Object,
})
const activeClass = 'bg-[#1E3A5F] text-white font-bold shadow-sm border border-[#16314F]'

const inactiveClass = 'text-gray-500 hover:text-gray-700'
const isEnabled = computed(() => props.permission.activo)
const selected = computed(() => {
  if (props.permission.tipo_selector === 'alcance') {
    if (props.permission.opciones?.valorado?.activo) return 'v'

    if (props.permission.opciones?.no_valorado?.activo) return 'nv'

    return 'off'
  }

  return props.permission.activo ? 'v' : 'off'
})

function setOff() {
  props.permission.activo = !props.permission.activo

  if (!props.permission.activo && props.permission.opciones) {
    Object.values(props.permission.opciones).forEach((op) => {
      op.activo = false
    })
  }
}

function setNoValorado() {
  if (props.permission.tipo_selector !== 'alcance') return

  props.permission.activo = true

  props.permission.opciones.no_valorado.activo = true
  props.permission.opciones.valorado.activo = false
}

function setValorado() {
  props.permission.activo = true

  if (props.permission.tipo_selector === 'alcance') {
    props.permission.opciones.no_valorado.activo = false
    props.permission.opciones.valorado.activo = true
  } else {
    props.permission.activo = true
  }
}
</script>
