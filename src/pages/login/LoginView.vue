<template>
  <main class="w-full min-h-screen flex items-center justify-center bg-neutral-50 px-4 py-8">
    <div class="w-full max-w-md">
      <LoginHeader />

      <div class="bg-white border border-neutral-200 rounded-lg shadow-sm p-8">
        <LoginForm />
      </div>

      <LoginFooter />
    </div>
  </main>
</template>

<script setup>
import LoginHeader from '@/pages/login/LoginHeader.vue'
import LoginForm from '@/pages/login/LoginForm.vue'
import LoginFooter from '@/pages/login/LoginFooter.vue'
import SystemStatus from '@/pages/login/SystemStatus.vue'
</script>
