import { createApp } from 'vue'
import pinia from './pinia'
import App from './App.vue'
import router from './router'
import '@/styles/main.css'

// Force dark mode au chargement
if (!document.documentElement.classList.contains('dark')) {
  document.documentElement.classList.add('dark')
}

const app = createApp(App)
app.use(pinia)
app.use(router)
app.mount('#app')
