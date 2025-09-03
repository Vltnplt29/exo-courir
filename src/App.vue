<script>
// Active le dark mode automatiquement si le système est en dark
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
  document.documentElement.classList.add('dark')
}
</script>
<script setup>
import FooterPage from './components/FooterPage.vue'
</script>

<template>
  <div class="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900 transition-colors">
    <main class="flex-1 flex flex-col items-center justify-center py-12 px-4">
      <RouterView />
    </main>
    <FooterPage />
  </div>
</template>
