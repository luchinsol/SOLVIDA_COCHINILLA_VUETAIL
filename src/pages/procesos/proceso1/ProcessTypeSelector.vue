<template>
  <section>
    <h3 class="text-sm font-semibold mb-4 uppercase">Tipo de Proceso</h3>

    <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <label v-for="type in types" :key="type.name" class="cursor-pointer">
        <input type="radio" v-model="selected" :value="type.name" class="hidden peer" />

        <div
          class="p-4 rounded-xl border-2 border-slate-200 peer-checked:border-primary peer-checked:bg-primary/5"
        >
          <div class="mb-2 font-bold">{{ type.name }}</div>
          <p class="text-xs text-slate-500">{{ type.desc }}</p>
        </div>
      </label>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const selected = ref('Extracción')

const types = [
  { name: 'Extracción', desc: 'Cochinilla a extracto líquido' },
  { name: 'Laking', desc: 'Precipitación de laca' },
  { name: 'Mezclado', desc: 'Homogeneización' },
  { name: 'Molienda', desc: 'Reducción de tamaño' },
]
</script>
