<template>
  <section
    class="w-full min-h-screen flex flex-col items-center justify-start bg-gradient-to-b from-blue-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 px-2 py-6"
  >
    <NavbarPage />
    <div v-if="!currentProgram" class="w-full flex flex-col items-center justify-center mt-24">
      <p class="text-center text-lg text-gray-600 dark:text-gray-300">
        Aucun programme en cours.<br />
        <router-link to="/user/program" class="text-blue-600 underline"
          >Choisir un programme</router-link
        >
      </p>
    </div>
    <div v-else class="w-full max-w-md flex flex-col items-center gap-8">
      <!-- Titre et progression -->
      <div class="w-full flex flex-col items-center gap-1 mb-2">
        <h1
          class="text-3xl font-extrabold text-blue-700 dark:text-blue-300 text-center w-full mb-6 tracking-tight"
        >
          Programme
          {{ currentProgram.titre }}
        </h1>
        <div class="flex gap-2 text-base text-center">
          <span
            class="bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-full px-3 py-1 font-semibold"
            >Semaine {{ currentWeek + 1 }} / {{ currentProgram.weeks.length }}</span
          >
          <span
            class="bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full px-3 py-1 font-semibold"
            >Séance {{ currentSessionIndex + 1 }} / {{ currentSessionCount }}</span
          >
        </div>
      </div>

      <!-- Bloc chrono et step -->
      <div
        class="w-full bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-6 flex flex-col items-center gap-6 border-2 border-blue-100 dark:border-gray-700"
      >
        <div class="flex flex-col items-center gap-2 w-full">
          <div class="text-lg font-bold text-blue-700 dark:text-blue-200 text-center">
            Étape en cours
          </div>
          <div class="text-2xl font-semibold text-gray-800 dark:text-gray-100 text-center mb-1">
            {{ currentStepLabel }}
          </div>
          <div class="flex flex-col items-center gap-1 my-2">
            <span class="text-xs text-gray-400 dark:text-gray-400">Temps restant</span>
            <div
              class="text-6xl font-mono font-extrabold text-green-600 dark:text-green-400 tracking-widest"
            >
              {{ formattedTime }}
            </div>
          </div>
        </div>
        <!-- Boutons chrono -->
        <div class="flex gap-4 w-full justify-center mt-2">
          <button
            @click="prevStep"
            :disabled="isFirstStep"
            class="w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 font-bold text-2xl flex items-center justify-center disabled:opacity-40 shadow"
            title="Étape précédente"
          >
            <span>&lt;</span>
          </button>
          <button
            @click="toggleChrono"
            class="flex-1 py-3 rounded-full bg-green-600 text-white font-bold text-xl shadow-lg hover:bg-green-700 transition"
            style="min-width: 120px"
          >
            {{ running ? 'Pause' : elapsed > 0 ? 'Reprendre' : 'Démarrer' }}
          </button>
          <button
            @click="nextStep"
            :disabled="isLastStep"
            class="w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 font-bold text-2xl flex items-center justify-center disabled:opacity-40 shadow"
            title="Étape suivante"
          >
            <span>&gt;</span>
          </button>
        </div>
        <button v-if="elapsed > 0" @click="resetChrono" class="text-red-500 underline text-sm mt-2">
          Réinitialiser le chrono
        </button>
        <!-- Navigation séances -->
        <div class="flex w-full justify-between mt-4">
          <button
            @click="prevSession"
            :disabled="isFirstSession"
            class="text-blue-500 underline text-xs font-semibold"
          >
            Séance précédente
          </button>
          <button
            @click="nextSession"
            :disabled="isLastSession"
            class="text-blue-500 underline text-xs font-semibold"
          >
            Séance suivante
          </button>
        </div>
        <!-- Instructions mobile -->
        <div v-if="isMobile" class="w-full flex flex-col items-center mt-6">
          <span class="text-base text-blue-700 dark:text-blue-300 font-semibold text-center"
            >Appuie sur le bouton vert pour démarrer ou reprendre ta séance</span
          >
          <span class="text-xs text-gray-500 mt-1 text-center"
            >Fais défiler pour voir les étapes suivantes</span
          >
        </div>
      </div>

      <button @click="stopProgram" class="mt-8 text-red-600 underline text-base font-semibold">
        Arrêter le programme
      </button>

      <!-- Modal fin de séance pour stats -->
      <div
        v-if="showStatsModal"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40"
      >
        <div
          class="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-6 w-full max-w-sm flex flex-col gap-4"
        >
          <h2 class="text-lg font-bold text-blue-700 dark:text-blue-300 mb-2">
            Bravo, séance terminée !
          </h2>
          <label class="block mb-2">
            <span class="text-gray-700 dark:text-gray-200">Ressenti (optionnel)</span>
            <input
              v-model="feeling"
              class="mt-1 block w-full rounded border-gray-300 dark:bg-gray-800 dark:text-gray-100"
              placeholder="Ex: Facile, dur, super..."
            />
          </label>
          <label class="block mb-2">
            <span class="text-gray-700 dark:text-gray-200">Notes (optionnel)</span>
            <textarea
              v-model="notes"
              class="mt-1 block w-full rounded border-gray-300 dark:bg-gray-800 dark:text-gray-100"
              placeholder="Ajoute un commentaire..."
            />
          </label>
          <button
            @click="saveStatsAndQuit"
            class="mt-2 px-4 py-2 rounded bg-blue-600 text-white font-bold hover:bg-blue-700 transition"
          >
            Enregistrer et quitter
          </button>
        </div>
      </div>
    </div>
    <FooterPage />
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, toRefs } from 'vue'
import { useUserStore } from '@/stores/userStore'
import { useRouter } from 'vue-router'
import NavbarPage from '@/components/NavbarPage.vue'
import FooterPage from '@/components/FooterPage.vue'

// Détection mobile simple
const isMobile = ref(false)
onMounted(() => {
  isMobile.value = window.innerWidth < 768
})

// --- Cockpit API pour stats ---
const API_BASE = 'https://ingrwf12.cepegra-frontend.xyz/cockpit_val/'
const API_KEY = 'API-7de5aeb31eecb18d31a429da6503f28ebee94c19'

// Saisie du ressenti/notes à la fin de la séance
const feeling = ref('')
const notes = ref('')
const showStatsModal = ref(false)

const userStore = useUserStore()
const router = useRouter()

// Expose les refs pour le template
const { currentProgram, currentWeek } = toRefs(userStore)

// Indices pour la séance et la step courante
const currentSessionIndex = ref(0)
const currentStepIndex = ref(0)

const currentSessionCount = computed(
  () => currentProgram.value?.weeks?.[currentWeek.value]?.sessions?.length || 0,
)

const currentSession = computed(
  () =>
    currentProgram.value?.weeks?.[currentWeek.value]?.sessions?.[currentSessionIndex.value] || {
      steps: [],
    },
)
const currentStep = computed(
  () => currentSession.value.steps?.[currentStepIndex.value] || { step: '' },
)
const currentStepLabel = computed(() => currentStep.value.step || '')

// Parsing de la durée de la step (ex: "T 10'" ou "M 2'30''")
function parseStepDuration(stepLabel) {
  // Cherche un nombre de minutes et éventuellement de secondes
  // Ex: "T 10'", "M 2'30''", "S 45''"
  const minMatch = stepLabel.match(/(\d+)\s*'/)
  const secMatch = stepLabel.match(/(\d+)\s*''/)
  const min = minMatch ? parseInt(minMatch[1]) : 0
  const sec = secMatch ? parseInt(secMatch[1]) : 0
  // Si pas de minutes ni secondes, retourne 0
  return min * 60 + sec
}

// Chronomètre lié à la durée de la step
const running = ref(false)
const elapsed = ref(0)
let interval = null

const stepDuration = computed(() => parseStepDuration(currentStepLabel.value))

const formattedTime = computed(() => {
  const total = stepDuration.value
  const remain = Math.max(total - elapsed.value, 0)
  const min = Math.floor(remain / 60)
  const sec = remain % 60
  return `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`
})

function toggleChrono() {
  if (running.value) {
    clearInterval(interval)
    running.value = false
  } else {
    running.value = true
    interval = setInterval(() => {
      elapsed.value++
      if (elapsed.value >= stepDuration.value) {
        nextStep()
      }
    }, 1000)
  }
}
function resetChrono() {
  clearInterval(interval)
  running.value = false
  elapsed.value = 0
}
onUnmounted(() => {
  clearInterval(interval)
})

// Navigation entre steps et séances
const isFirstStep = computed(() => currentStepIndex.value === 0)
const isLastStep = computed(() => currentStepIndex.value === currentSession.value.steps.length - 1)
const isFirstSession = computed(() => currentSessionIndex.value === 0)
const isLastSession = computed(() => currentSessionIndex.value === currentSessionCount.value - 1)

function nextStep() {
  resetChrono()
  if (currentStepIndex.value < currentSession.value.steps.length - 1) {
    currentStepIndex.value++
  } else {
    // Dernière step, passe à la séance suivante si possible
    if (!isLastSession.value) {
      nextSession()
    } else {
      // Dernière step de la dernière séance : fin de la séance !
      showStatsModal.value = true
    }
  }
}
function prevStep() {
  resetChrono()
  if (currentStepIndex.value > 0) {
    currentStepIndex.value--
  } else {
    // Première step, revient à la séance précédente si possible
    if (!isFirstSession.value) {
      prevSession()
    }
  }
}
function nextSession() {
  resetChrono()
  if (currentSessionIndex.value < currentSessionCount.value - 1) {
    currentSessionIndex.value++
    currentStepIndex.value = 0
  }
}
function prevSession() {
  resetChrono()
  if (currentSessionIndex.value > 0) {
    currentSessionIndex.value--
    currentStepIndex.value = 0
  }
}

async function saveStatsAndQuit() {
  // Construction de l'objet stats à envoyer à Cockpit
  const userId = userStore.currentUser?._id
  const programId = userStore.currentProgram?._id
  const week = userStore.currentWeek
  const session = currentSessionIndex.value + 1
  const steps = currentSession.value.steps.map((s) => ({
    step: s.step,
    duration: parseStepDuration(s.step),
    realDuration: stepDuration.value, // simplifié, à adapter si besoin
    description: '',
  }))
  const totalTime = steps.reduce((acc, s) => acc + (s.realDuration || 0), 0)
  const distance = 0 // à calculer si tu as la donnée
  const date_completed = new Date().toISOString()
  const stat = {
    user: userId,
    program: programId,
    week: week + 1,
    session,
    completed: true,
    date_completed,
    steps,
    totalTime,
    distance,
    feeling: feeling.value,
    notes: notes.value,
  }
  try {
    await fetch(`${base_url}/collections/save/userstats`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${bearer_token}`,
      },
      body: JSON.stringify({ data: stat }),
    })
  } catch (e) {
    alert('Erreur lors de la sauvegarde des stats: ' + e.message)
  }
  userStore.stopProgram()
  router.push('/user/program')
}

function stopProgram() {
  userStore.stopProgram()
  router.push('/user/program')
}
</script>
