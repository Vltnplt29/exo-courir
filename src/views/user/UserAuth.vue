<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/userStore.js'
import { storeToRefs } from 'pinia'

// Store utilisateur
const userStore = useUserStore()
const { users, loading, error } = storeToRefs(userStore)

// Champs du formulaire d'inscription
const register = ref({
  name: '',
  email: '',
  password: '',
  age: '',
  weight: '',
  experience: '',
})

// État pour afficher connexion ou inscription
const isLogin = ref(true)

// Messages dynamiques
const message = ref('')
const messageType = ref('') // 'success' ou 'error'

// Router
const router = useRouter()

// Champs du formulaire de connexion
const login = ref({
  email: '',
  password: '',
})

// Charger les utilisateurs au montage
import { onMounted } from 'vue'
onMounted(() => {
  console.log('[UserAuth] onMounted called')
  userStore.fetchUsers()
  setTimeout(() => {
    console.log('[UserAuth] users in store after fetch:', users.value)
  }, 1000)
})

// Fonction pour gérer l'inscription
async function handleRegister(e) {
  e.preventDefault()

  if (!register.value.name || !register.value.email || !register.value.password) {
    message.value = 'Veuillez remplir les champs obligatoires'
    messageType.value = 'error'
    return
  }

  try {
    await userStore.addUser(register.value)
    message.value = 'Inscription réussie !'
    messageType.value = 'success'
    register.value = {
      name: '',
      email: '',
      password: '',
      age: '',
      weight: '',
      experience: '',
    }
  } catch (err) {
    message.value = "Erreur lors de l'inscription : " + err.message
    messageType.value = 'error'
  }
}

// Fonction pour gérer la connexion
function handleLogin() {
  message.value = ''
  messageType.value = ''
  if (!login.value.email || !login.value.password) {
    message.value = 'Veuillez remplir tous les champs.'
    messageType.value = 'error'
    return
  }
  const ok = userStore.login(login.value.email, login.value.password)
  if (ok) {
    router.push('/user/home')
  } else {
    message.value = 'Identifiants incorrects.'
    messageType.value = 'error'
  }
}
</script>

<template>
  <div
    class="min-h-screen flex flex-col justify-start items-center bg-gray-100 dark:bg-gray-900 transition-colors px-2 pt-10 sm:pt-0"
  >
    <div
      class="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-6 sm:p-8 rounded-3xl shadow-2xl w-full max-w-xs sm:max-w-md border border-gray-200 dark:border-gray-700 transition-colors flex flex-col items-center gap-2 sm:gap-0 mt-6 sm:mt-0"
    >
      <!-- Icône SVG moderne -->
      <div
        class="w-20 h-20 mb-6 flex items-center justify-center rounded-full bg-green-500 shadow-lg"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 48 48"
          class="w-12 h-12 text-white"
        >
          <path
            fill="#fff"
            d="M24 25c3.31 0 6-2.69 6-6s-2.69-6-6-6-6 2.69-6 6 2.69 6 6 6zm0 3c-4.42 0-13 2.21-13 6.6V39h26v-4.4C37 30.21 28.42 28 24 28z"
          />
        </svg>
      </div>
      <h1
        class="text-3xl font-extrabold mb-2 tracking-tight text-center text-green-600 dark:text-green-400"
      >
        Bienvenue !
      </h1>
      <p class="mb-8 text-center text-gray-500 dark:text-gray-300">
        Connecte-toi ou crée un compte pour accéder à l'espace personnel.
      </p>
      <div class="flex justify-center mb-8 gap-4 w-full">
        <button
          :class="[
            'px-4 py-2 font-bold',
            isLogin
              ? 'border-b-2 border-green-500 text-green-600 dark:border-green-400 dark:text-green-400'
              : 'text-gray-400 hover:text-green-600 dark:text-gray-400 dark:hover:text-green-400',
          ]"
          @click="isLogin = true"
        >
          Connexion
        </button>
        <button
          :class="[
            'px-4 py-2 font-bold',
            !isLogin
              ? 'border-b-2 border-green-500 text-green-600 dark:border-green-400 dark:text-green-400'
              : 'text-gray-400 hover:text-green-600 dark:text-gray-400 dark:hover:text-green-400',
          ]"
          @click="isLogin = false"
        >
          Inscription
        </button>
      </div>
      <template v-if="isLogin">
        <form class="w-full" @submit.prevent="handleLogin">
          <label
            class="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-200"
            for="login-email"
            >Email</label
          >
          <input
            id="login-email"
            v-model="login.email"
            type="email"
            placeholder="Email"
            required
            autocomplete="username"
            class="w-full mb-4 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-400 transition-colors"
          />
          <label
            class="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-200"
            for="login-password"
            >Mot de passe</label
          >
          <input
            id="login-password"
            v-model="login.password"
            type="password"
            placeholder="Mot de passe"
            required
            autocomplete="current-password"
            class="w-full mb-2 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-400 transition-colors"
          />
          <div class="flex justify-between items-center mb-6">
            <a href="#" class="text-xs text-green-600 hover:underline dark:text-green-400"
              >Mot de passe oublié ?</a
            >
          </div>
          <button
            type="submit"
            class="w-full py-3 rounded-lg bg-green-500 text-white font-semibold hover:bg-green-600 shadow transition-colors duration-200 dark:bg-green-600 dark:text-white hover:dark:bg-green-700"
          >
            Se connecter
          </button>
        </form>
      </template>
      <template v-else>
        <form class="w-full mt-8" @submit="handleRegister">
          <label
            class="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-200"
            for="register-name"
            >Nom</label
          >
          <input
            id="register-name"
            v-model="register.name"
            type="text"
            placeholder="Nom"
            required
            class="w-full mb-4 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-400 transition-colors"
          />
          <label
            class="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-200"
            for="register-email"
            >Email</label
          >
          <input
            id="register-email"
            v-model="register.email"
            type="email"
            placeholder="Email"
            required
            autocomplete="username"
            class="w-full mb-4 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-400 transition-colors"
          />
          <label
            class="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-200"
            for="register-password"
            >Mot de passe</label
          >
          <input
            id="register-password"
            v-model="register.password"
            type="password"
            placeholder="Mot de passe"
            required
            autocomplete="new-password"
            minlength="6"
            class="w-full mb-4 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-400 transition-colors"
          />
          <label
            class="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-200"
            for="register-age"
            >Âge</label
          >
          <input
            id="register-age"
            v-model="register.age"
            type="number"
            placeholder="Âge"
            min="12"
            max="100"
            required
            class="w-full mb-4 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-400 transition-colors"
          />
          <label
            class="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-200"
            for="register-weight"
            >Poids (kg)</label
          >
          <input
            id="register-weight"
            v-model="register.weight"
            type="number"
            placeholder="Poids (kg)"
            min="30"
            max="200"
            required
            class="w-full mb-4 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-400 transition-colors"
          />
          <label
            class="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-200"
            for="register-experience"
            >Niveau</label
          >
          <select
            id="register-experience"
            v-model="register.experience"
            required
            class="w-full mb-6 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-400 transition-colors"
          >
            <option value="">Sélectionner un niveau</option>
            <option value="Débutant">Débutant</option>
            <option value="Intermédiaire">Intermédiaire</option>
            <option value="Confirmé">Confirmé</option>
          </select>
          <button
            type="submit"
            class="w-full py-3 rounded-lg bg-green-500 text-white font-semibold hover:bg-green-600 shadow transition-colors duration-200 dark:bg-green-600 dark:text-white hover:dark:bg-green-700"
          >
            S'inscrire
          </button>
        </form>
      </template>
    </div>
  </div>
</template>
