<template>
  <footer
    class="w-full py-6 px-8 flex justify-between items-center bg-gradient-to-r from-blue-100 to-blue-300 dark:from-gray-900 dark:to-gray-800 border-t border-gray-200 dark:border-gray-800 shadow-lg"
  >
    <span class="text-gray-700 dark:text-gray-200 text-sm"
      >&copy; 2025 Cepegra. Tous droits réservés.</span
    >
    <DarkMode />
  </footer>
</template>

<script setup>
import DarkMode from './sous-components/DarkMode.vue'
</script>

<style scoped>
footer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
}
</style>
