<template>
  <section
    class="w-full min-h-screen flex flex-col items-center justify-start bg-white dark:bg-gray-900 px-2 py-4"
  >
    <div v-if="isMobile" class="w-full flex flex-col items-center mb-4">
      <div class="w-full flex flex-col items-center justify-center">
        <span class="text-2xl mb-2 animate-bounce">⬇️</span>
        <span class="text-base text-blue-700 dark:text-blue-300 font-semibold text-center"
          >Appuie sur le bouton vert pour démarrer ta séance</span
        >
        <span class="text-xs text-gray-500 mt-1 text-center"
          >Fais défiler pour voir les étapes suivantes</span
        >
      </div>
    </div>
    <div v-if="!currentProgram" class="w-full flex flex-col items-center justify-center mt-20">
      <p class="text-center text-lg text-gray-600 dark:text-gray-300">
        Aucun programme en cours.<br />
        <router-link to="/user/program" class="text-blue-600 underline"
          >Choisir un programme</router-link
        >
      </p>
    </div>
    <div v-else class="w-full max-w-md flex flex-col items-center">
      <h1
        class="text-xl font-bold text-blue-600 dark:text-blue-400 mb-1 text-center w-full truncate"
      >
        {{ currentProgram.titre }}
      </h1>
      <div class="text-green-600 dark:text-green-400 text-center mb-2 w-full">
        Semaine {{ currentWeek + 1 }} / {{ currentProgram.weeks.length }}
      </div>
      <div
        class="w-full flex flex-col items-center justify-center bg-blue-50 dark:bg-gray-800 rounded-2xl shadow-lg p-4 mb-4"
      >
        <div class="text-sm text-gray-500 dark:text-gray-300 mb-1">
          Séance {{ currentSessionIndex + 1 }} / {{ currentSessionCount }}
        </div>
        <div class="text-lg font-semibold text-blue-700 dark:text-blue-200 mb-2 text-center">
          {{ currentStepLabel }}
        </div>
        <div class="text-5xl font-mono mb-4">{{ formattedTime }}</div>
        <div class="flex gap-2 w-full justify-center mb-2">
          <button
            @click="prevStep"
            :disabled="isFirstStep"
            class="flex-1 py-3 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 font-bold text-lg disabled:opacity-50"
          >
            &lt;
          </button>
          <button
            @click="toggleChrono"
            class="flex-1 py-3 rounded-lg bg-green-600 text-white font-bold text-lg shadow hover:bg-green-700 transition"
          >
            {{ running ? 'Pause' : elapsed > 0 ? 'Reprendre' : 'Démarrer' }}
          </button>
          <button
            @click="nextStep"
            :disabled="isLastStep"
            class="flex-1 py-3 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 font-bold text-lg disabled:opacity-50"
          >
            &gt;
          </button>
        </div>
        <button v-if="elapsed > 0" @click="resetChrono" class="text-red-500 underline text-sm mb-2">
          Réinitialiser
        </button>
        <div class="flex w-full justify-between mt-2">
          <button
            @click="prevSession"
            :disabled="isFirstSession"
            class="text-blue-500 underline text-xs"
          >
            Séance précédente
          </button>
          <button
            @click="nextSession"
            :disabled="isLastSession"
            class="text-blue-500 underline text-xs"
          >
            Séance suivante
          </button>
        </div>
      </div>
      <button @click="stopProgram" class="mt-4 text-red-600 underline text-base">
        Arrêter le programme
      </button>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, toRefs } from 'vue'
import { useUserStore } from '@/stores/userStore'
import { useRouter } from 'vue-router'

// Détection mobile simple
const isMobile = ref(false)
onMounted(() => {
  isMobile.value = window.innerWidth < 768
})

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
function stopProgram() {
  userStore.stopProgram()
  router.push('/user/program')
}
</script>
