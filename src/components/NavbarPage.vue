<template>
  <nav class="bg-white dark:bg-gray-900 shadow px-4 py-2 flex items-center justify-between">
    <div class="flex items-center space-x-4">
      <router-link
        to="/"
        class="font-bold text-lg text-gray-800 dark:text-white hover:text-blue-600"
        >Courir</router-link
      >
      <router-link
        to="/user/home"
        class="text-gray-700 dark:text-gray-200 hover:text-blue-600"
        v-if="isLoggedIn"
        >Accueil</router-link
      >
      <router-link
        to="/user/program"
        class="text-gray-700 dark:text-gray-200 hover:text-blue-600"
        v-if="isLoggedIn"
        >Programme</router-link
      >
      <router-link
        to="/user/dashboard"
        class="text-gray-700 dark:text-gray-200 hover:text-blue-600"
        v-if="isLoggedIn"
        >Dashboard</router-link
      >
    </div>
    <div class="flex items-center space-x-2">
      <DarkMode />
      <button
        v-if="isLoggedIn"
        @click="logout"
        class="ml-2 px-3 py-1 rounded bg-red-500 text-white hover:bg-red-600"
      >
        Déconnexion
      </button>
      <router-link
        v-else
        to="/user/auth"
        class="px-3 py-1 rounded bg-blue-500 text-white hover:bg-blue-600"
        >Connexion</router-link
      >
    </div>
  </nav>
</template>

<script setup>
import { useUserStore } from '@/stores/userStore'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import DarkMode from '@/components/sous-components/DarkMode.vue'

const userStore = useUserStore()
const { isLoggedIn } = storeToRefs(userStore)
const router = useRouter()

function logout() {
  userStore.logout()
  router.push('/user/auth')
}
</script>

<style scoped>
nav {
  z-index: 50;
}
</style>
