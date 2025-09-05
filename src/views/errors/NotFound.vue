<template>
  <NavbarPage />
  <section class="flex flex-col items-center justify-center min-h-[80vh] px-4 text-center">
    <img
      src="/public/images/logo-550.png"
      alt="404 runner lost"
      class="w-40 h-40 mb-6 animate-bounce drop-shadow-xl dark:invert"
    />
    <h1 class="text-5xl md:text-7xl font-extrabold text-blue-600 dark:text-blue-400 mb-4">404</h1>
    <h2 class="text-2xl md:text-3xl font-bold mb-2 text-gray-800 dark:text-gray-200">
      Oups, tu es hors-piste !
    </h2>
    <p class="mb-6 text-lg text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
      La page que tu cherches n'existe pas ou a été déplacée.<br />
      Mais pas de panique, même les meilleurs coureurs se perdent parfois !
    </p>
    <router-link
      to="/"
      class="inline-block px-6 py-3 rounded-full bg-blue-600 text-white font-bold shadow-lg hover:bg-blue-700 transition dark:bg-blue-500 dark:hover:bg-blue-600"
    >
      Retour à l'accueil
    </router-link>
    <div class="mt-10 text-xs text-gray-400 dark:text-gray-600">
      <span class="italic"
        >Astuce : vérifie l'URL ou explore le menu pour retrouver ta route 🏃‍♂️</span
      >
    </div>
  </section>
</template>

<script setup>
import NavbarPage from '@/components/NavbarPage.vue'
</script>
