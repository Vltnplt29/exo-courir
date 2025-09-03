<template>
  <div
    class="min-h-screen flex items-center justify-center bg-white dark:bg-black transition-colors"
  >
    <div
      class="bg-white dark:bg-black text-black dark:text-yellow-300 p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-100 dark:border-yellow-400 transition-colors"
    >
      <!-- Onglets Connexion / Inscription -->
      <div class="flex justify-center mb-8 gap-4">
        <button
          :class="
            <button
              :class="loginTabClass"
              @click="isLogin = true"
            >
              Connexion
            </button>
            <button
              :class="registerTabClass"
              @click="isLogin = false"
            >
              Inscription
            </button>
      </div>

      <!-- Formulaire Connexion -->
      <form v-if="isLogin" @submit.prevent="handleLogin">
        <input
          v-model="login.email"
          type="email"
          placeholder="Email"
          required
          autocomplete="username"
          class="w-full mb-4 px-4 py-3 border border-gray-300 dark:border-yellow-400 rounded-lg bg-gray-50 dark:bg-black text-gray-900 dark:text-yellow-300 focus:outline-none focus:ring-2 focus:ring-green-400 transition-colors"
        />
        <input
          v-model="login.password"
          type="password"
          placeholder="Mot de passe"
          required
          autocomplete="current-password"
          class="w-full mb-6 px-4 py-3 border border-gray-300 dark:border-yellow-400 rounded-lg bg-gray-50 dark:bg-black text-gray-900 dark:text-yellow-300 focus:outline-none focus:ring-2 focus:ring-green-400 transition-colors"
        />
        <button
          type="submit"
          class="w-full py-3 rounded-lg bg-green-500 text-white font-semibold hover:bg-green-600 shadow transition-colors duration-200 dark:bg-yellow-400 dark:text-black hover:dark:bg-yellow-300"
        >
          Se connecter
        </button>
      </form>

      <!-- Formulaire Inscription -->
      <form v-else @submit.prevent="handleRegister">
        <input
          v-model="register.name"
          type="text"
          placeholder="Nom"
          required
          class="w-full mb-4 px-4 py-3 border border-gray-300 dark:border-yellow-400 rounded-lg bg-gray-50 dark:bg-black text-gray-900 dark:text-yellow-300 focus:outline-none focus:ring-2 focus:ring-green-400 transition-colors"
        />
        <input
          v-model="register.email"
          type="email"
          placeholder="Email"
          required
          autocomplete="username"
          class="w-full mb-4 px-4 py-3 border border-gray-300 dark:border-yellow-400 rounded-lg bg-gray-50 dark:bg-black text-gray-900 dark:text-yellow-300 focus:outline-none focus:ring-2 focus:ring-green-400 transition-colors"
        />
        <input
          v-model="register.password"
          type="password"
          placeholder="Mot de passe"
          required
          autocomplete="new-password"
          class="w-full mb-6 px-4 py-3 border border-gray-300 dark:border-yellow-400 rounded-lg bg-gray-50 dark:bg-black text-gray-900 dark:text-yellow-300 focus:outline-none focus:ring-2 focus:ring-green-400 transition-colors"
        />
        <button
          type="submit"
          class="w-full py-3 rounded-lg bg-green-500 text-white font-semibold hover:bg-green-600 shadow transition-colors duration-200 dark:bg-yellow-400 dark:text-black hover:dark:bg-yellow-300"
        >
          S'inscrire
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'


const isLogin = ref(true)
const login = ref({ email: '', password: '' })
const register = ref({ name: '', email: '', password: '' })

const loginTabClass = computed(() =>
  isLogin.value
    ? 'px-6 py-2 rounded-full transition-colors duration-200 bg-green-500 text-white shadow font-bold dark:bg-yellow-400 dark:text-black'
    : 'px-6 py-2 rounded-full transition-colors duration-200 bg-gray-200 text-gray-700 hover:bg-blue-100 dark:bg-gray-800 dark:text-yellow-300'
)
const registerTabClass = computed(() =>
  !isLogin.value
    ? 'px-6 py-2 rounded-full transition-colors duration-200 bg-green-500 text-white shadow font-bold dark:bg-yellow-400 dark:text-black'
    : 'px-6 py-2 rounded-full transition-colors duration-200 bg-gray-200 text-gray-700 hover:bg-blue-100 dark:bg-gray-800 dark:text-yellow-300'
)

// Handlers (à brancher sur API)
function handleLogin() {
  console.log('Login avec', login.value)
}

function handleRegister() {
  console.log('Register avec', register.value)
}
</script>
