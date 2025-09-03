import { defineStore } from 'pinia'
import { ref } from 'vue'

const API_BASE = 'http://localhost:8888/cockpit-core/api/'
const API_KEY = 'API-7de5aeb31eecb18d31a429da6503f28ebee94c19'

export const useUserStore = defineStore('user', () => {
  const users = ref([])
  const currentUser = ref(null)
  const loading = ref(false)
  const error = ref(null)

  async function fetchUsers() {
    loading.value = true
    error.value = null
    try {
      const response = await fetch(`${API_BASE}content/item/users`, {
        headers: {
          Authorization: 'Bearer ' + API_KEY,
        },
      })
      const data = await response.json()
      if (Array.isArray(data.entries)) {
        users.value = data.entries
      } else if (Array.isArray(data.items)) {
        users.value = data.items
      } else if (Array.isArray(data)) {
        users.value = data
      } else if (typeof data === 'object' && data !== null) {
        users.value = [data]
      } else {
        users.value = []
        console.error('[userStore] fetchUsers: format de réponse inattendu', data)
      }
    } catch (err) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  async function addUser(user) {
    loading.value = true
    error.value = null
    try {
      const res = await fetch(`${API_BASE}content/item/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authorization: 'Bearer ' + API_KEY,
        },
        body: JSON.stringify({ data: user }),
      })
      if (!res.ok) {
        const errText = await res.text()
        throw new Error('Erreur API Cockpit (addUser): ' + errText)
      }
      await fetchUsers()
      return await res.json()
    } catch (err) {
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  function findUserByEmail(email) {
    return users.value.find((u) => u.email === email)
  }

  function login(email, password) {
    const user = findUserByEmail(email)
    if (user && user.password === password) {
      currentUser.value = user
      return true
    }
    return false
  }

  function logout() {
    currentUser.value = null
  }

  return {
    users,
    currentUser,
    loading,
    error,
    fetchUsers,
    addUser,
    findUserByEmail,
    login,
    logout,
  }
})
