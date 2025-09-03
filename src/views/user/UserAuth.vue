<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-gray-100">
    <div class="bg-white p-8 rounded shadow-md w-full max-w-md">
      <div class="flex justify-center mb-6">
        <button :class="isLogin ? activeTab : inactiveTab" @click="isLogin = true">
          Connexion
        </button>
        <button :class="!isLogin ? activeTab : inactiveTab" @click="isLogin = false">
          Inscription
        </button>
      </div>
      <form v-if="isLogin" @submit.prevent="handleLogin">
        <input
          class="input"
          type="email"
          placeholder="Email"
          v-model="login.email"
          required
          autocomplete="username"
        />
        <input
          class="input"
          type="password"
          placeholder="Mot de passe"
          v-model="login.password"
          required
          autocomplete="current-password"
        />
        <button class="btn-primary w-full mt-4" type="submit">Se connecter</button>
      </form>
      <form v-else @submit.prevent="handleRegister">
        <input class="input" type="text" placeholder="Nom" v-model="register.name" required />
        <input
          class="input"
          type="email"
          placeholder="Email"
          v-model="register.email"
          required
          autocomplete="username"
        />
        <input
          class="input"
          type="password"
          placeholder="Mot de passe"
          v-model="register.password"
          required
          autocomplete="new-password"
        />
        <button class="btn-primary w-full mt-4" type="submit">S'inscrire</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const isLogin = ref(true)
const login = ref({ email: '', password: '' })
const register = ref({ name: '', email: '', password: '' })

const activeTab = 'px-4 py-2 font-bold border-b-2 border-blue-500 text-blue-600'
const inactiveTab = 'px-4 py-2 text-gray-500'

function handleLogin() {
  // ... logique de connexion ...
}

function handleRegister() {
  // ... logique d\'inscription ...
}
</script>

<style scoped>
.input {
  @apply w-full mb-3 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400;
}
.btn-primary {
  @apply bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition;
}
</style>
