<script>
// Active le dark mode automatiquement si le système est en dark
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
  document.documentElement.classList.add('dark')
}
</script>

<script setup>
import FooterPage from './components/FooterPage.vue'
import NavbarPage from './components/NavbarPage.vue'
import { useRoute, useRouter } from 'vue-router'
import { computed, onMounted } from 'vue'
const route = useRoute()
const router = useRouter()
const isMobileFollowPage = computed(() => {
  return route.path === '/user/follow' && window.innerWidth < 768
})

// Scroll to top on every route change
onMounted(() => {
  router.afterEach(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  })
})
</script>

<template>
  <div class="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900 transition-colors">
    <NavbarPage v-if="route.path !== '/' && !isMobileFollowPage" />
    <main class="flex-1 flex flex-col items-center justify-start py-6 px-4 pt-25 pb-28">
      <RouterView />
    </main>
    <FooterPage v-if="route.path !== '/' && !isMobileFollowPage" />
  </div>
</template>
