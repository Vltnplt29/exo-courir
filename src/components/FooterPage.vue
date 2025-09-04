<template>
  <footer
    v-if="!isMobileFollowPage"
    class="w-full py-6 px-8 flex justify-between items-center bg-gray-100 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 shadow-lg"
  >
    <span class="text-gray-700 dark:text-gray-200 text-sm"
      >&copy; 2025 Vltnplt. Tous droits réservés.</span
    >
    <DarkMode />
  </footer>
</template>

<script setup>
import DarkMode from './sous-components/DarkMode.vue'
import { computed } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()
const isMobileFollowPage = computed(() => {
  return route.path === '/user/follow' && window.innerWidth < 768
})
</script>
