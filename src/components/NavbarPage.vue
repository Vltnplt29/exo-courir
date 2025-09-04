<template>
  <nav class="fixed top-0 left-0 py-2 mt-2 w-full bg-white dark:bg-gray-900 shadow z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16 items-center">
        <!-- Logo -->
        <div class="flex-shrink-0 flex items-center gap-2">
          <img src="/images/logo.png" alt="Logo" class="h-9 w-9 object-contain" />
          <router-link
            to="/user/home"
            class="font-extrabold text-2xl text-blue-600 dark:text-blue-400 tracking-tight"
            >RunnerZ</router-link
          >
        </div>
        <!-- Desktop Menu -->
        <div class="hidden md:flex md:items-center md:gap-6">
          <router-link to="/user/home" :class="navLinkClass('/user/home')">Accueil</router-link>
          <router-link to="/user/program" :class="navLinkClass('/user/program')"
            >Programme</router-link
          >
          <router-link to="/user/dashboard" :class="navLinkClass('/user/dashboard')"
            >Statistiques</router-link
          >
        </div>
        <!-- Actions -->
        <div class="flex items-center gap-2">
          <button
            v-if="isLoggedIn"
            @click="logout"
            class="hidden md:inline px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600 transition"
          >
            Déconnexion
          </button>
          <!-- Mobile menu button -->
          <button
            @click="mobileOpen = !mobileOpen"
            class="md:hidden p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Ouvrir le menu"
          >
            <svg
              v-if="!mobileOpen"
              class="h-6 w-6 text-gray-700 dark:text-gray-200"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
            <svg
              v-else
              class="h-6 w-6 text-gray-700 dark:text-gray-200"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
    <!-- Mobile Menu -->
    <transition name="fade">
      <div
        v-if="mobileOpen"
        class="md:hidden bg-white dark:bg-gray-900 shadow-lg border-t border-gray-200 dark:border-gray-700"
      >
        <div class="flex flex-col items-center py-4 gap-2">
          <router-link
            to="/user/home"
            :class="navLinkClass('/user/home', true)"
            @click="mobileOpen = false"
            >Accueil</router-link
          >
          <router-link
            to="/user/program"
            :class="navLinkClass('/user/program', true)"
            @click="mobileOpen = false"
            >Nos programmes</router-link
          >
          <router-link
            to="/user/dashboard"
            :class="navLinkClass('/user/dashboard', true)"
            @click="mobileOpen = false"
            >Vos statistiques</router-link
          >
          <button
            v-if="isLoggedIn"
            @click="logoutAndClose"
            class="w-11/12 px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600 transition"
          >
            Déconnexion
          </button>
          <DarkMode class="mt-4" />
        </div>
      </div>
    </transition>
  </nav>
</template>

<script setup>
import { ref } from 'vue'
import { useUserStore } from '@/stores/userStore'
import { storeToRefs } from 'pinia'
import { useRouter, useRoute } from 'vue-router'
import DarkMode from '@/components/sous-components/DarkMode.vue'

const userStore = useUserStore()
const { isLoggedIn } = storeToRefs(userStore)
const router = useRouter()
const route = useRoute()
const mobileOpen = ref(false)

function logout() {
  userStore.logout()
  router.push('/')
}

function logoutAndClose() {
  mobileOpen.value = false
  logout()
}

function navLinkClass(path, mobile = false) {
  const base = mobile
    ? 'block w-11/12 text-center px-4 py-2 rounded text-lg font-medium transition'
    : 'px-3 py-2 rounded text-base font-medium transition'
  const active =
    route.path === path
      ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 shadow'
      : 'text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-gray-800 hover:text-blue-600 dark:hover:text-blue-400'
  return `${base} ${active}`
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
