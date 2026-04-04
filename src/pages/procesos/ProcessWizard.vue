<template>
  <div class="flex flex-col gap-6">
    <StepHeader />

    <div class="bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col">
      <div class="p-6 border-b border-slate-100">
        <h2 class="text-lg font-bold">Configuración Básica</h2>
      </div>

      <div class="p-6 space-y-8">
        <ProcessTypeSelector />
        <GeneralInfoForm />
        <DynamicExtraction />
        <NotesSection />
      </div>

      <div class="p-6 border-t bg-slate-50 flex justify-between">
        <button disabled class="px-6 py-2.5 border rounded-lg text-sm opacity-50">
          ← Anterior
        </button>
        <button @click="nextStep" class="px-6 py-2.5 bg-primary text-white rounded-lg text-sm">
          Siguiente →
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()
import StepHeader from '@/pages/procesos/StepHeader.vue'
import ProcessTypeSelector from '@/pages/procesos/proceso1/ProcessTypeSelector.vue'
import GeneralInfoForm from '@/pages/procesos/proceso1/GeneralInfoForm.vue'
import DynamicExtraction from '@/pages/procesos/proceso1/DynamicExtraction.vue'
import NotesSection from '@/pages/procesos/proceso1/NotesSection.vue'

const nextStep = () => {
  router.push('/procesos2')
}

const goBack = () => {
  router.push('/procesos')
}
</script>
