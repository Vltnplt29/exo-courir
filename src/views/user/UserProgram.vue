<template>
  <section class="w-full max-w-4xl mx-auto mt-8 px-4">
    <h1
      class="text-3xl md:text-4xl font-extrabold mb-8 text-center text-blue-600 dark:text-blue-400"
    >
      Nos programmes
    </h1>
    <div class="flex flex-col md:flex-row md:justify-center gap-4 mb-8 items-start">
      <div class="flex flex-col md:flex-row gap-4 w-full">
        <button
          v-for="program in programs"
          :key="getProgramId(program)"
          @click="selectProgram(program)"
          :class="[
            'flex-1 rounded-xl shadow bg-white dark:bg-gray-900 border border-blue-200 dark:border-blue-700 p-3 sm:p-4 hover:bg-blue-50 dark:hover:bg-blue-800 transition flex flex-col items-center',
            selectedProgram && getProgramId(selectedProgram) === getProgramId(program)
              ? 'ring-2 ring-blue-500'
              : '',
          ]"
        >
          <div class="font-bold text-base text-blue-700 dark:text-blue-300 mb-1">
            {{ program.titre }}
          </div>
          <div class="text-s text-gray-700 dark:text-gray-200 text-center line-clamp-2">
            {{ program.description }}
          </div>
        </button>
      </div>
      <div class="mt-0 md:mt-0 text-left self-start w-1/2">
        <button
          @click="showCreateModal = true"
          class="rounded-2xl border-2 border-dashed border-blue-400 text-blue-500 py-6 px-8 font-semibold hover:bg-blue-50 dark:hover:bg-blue-900 transition flex flex-col items-center justify-center w-full"
        >
          <span class="text-3xl mb-1">+</span>
          <span>Créer un programme</span>
        </button>
      </div>
    </div>
    <hr class="border-t-2 border-blue-500 dark:border-blue-400 mb-6" />
    <!-- Détail du programme sélectionné -->
    <div v-if="selectedProgram" class="mb-10 animate-fade-out">
      <h2 class="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-2 text-center">
        Programme / {{ selectedProgram.titre }}
      </h2>
      <p class="text-center text-gray-700 dark:text-gray-200 mb-4">
        {{ selectedProgram.description }}
      </p>
      <div class="flex flex-col items-center mb-4">
        <button
          @click="handleStartProgram(selectedProgram)"
          class="mb-4 px-6 py-2 rounded-lg bg-green-600 text-white font-bold shadow hover:bg-green-700 transition text-lg"
        >
          Démarrer ce programme
        </button>
      </div>
      <div
        class="rounded-2xl border-4 border-blue-300 dark:border-blue-700 bg-blue-50 dark:bg-gray-800 shadow-lg p-6 mb-8"
      >
        <h2
          class="text-xl font-extrabold text-blue-800 dark:text-blue-200 mb-4 text-center tracking-wide uppercase"
        >
          Légende des abréviations
        </h2>
        <ul
          class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-4 gap-x-8 text-base font-semibold"
        >
          <li class="flex items-center gap-3">
            <span
              :class="`inline-block px-3 py-1 rounded-lg font-mono text-base font-bold shadow ${stepColorClass('E/S')}`"
              >E/S</span
            >
            <span class="text-gray-800 dark:text-gray-100">Échauffement &amp; souplesse</span>
          </li>
          <li class="flex items-center gap-3">
            <span
              :class="`inline-block px-3 py-1 rounded-lg font-mono text-base font-bold shadow ${stepColorClass('T')}`"
              >T</span
            >
            <span class="text-gray-800 dark:text-gray-100">Trot (vitesse habituelle)</span>
          </li>
          <li class="flex items-center gap-3">
            <span
              :class="`inline-block px-3 py-1 rounded-lg font-mono text-base font-bold shadow ${stepColorClass('M')}`"
              >M</span
            >
            <span class="text-gray-800 dark:text-gray-100">Marche</span>
          </li>
          <li class="flex items-center gap-3">
            <span
              :class="`inline-block px-3 py-1 rounded-lg font-mono text-base font-bold shadow ${stepColorClass('C')}`"
              >C</span
            >
            <span class="text-gray-800 dark:text-gray-100">Course (trot rapide)</span>
          </li>
          <li class="flex items-center gap-3">
            <span
              :class="`inline-block px-3 py-1 rounded-lg font-mono text-base font-bold shadow ${stepColorClass('S')}`"
              >S</span
            >
            <span class="text-gray-800 dark:text-gray-100">Sprint</span>
          </li>
          <li class="flex items-center gap-3">
            <span
              :class="`inline-block px-3 py-1 rounded-lg font-mono text-base font-bold shadow ${stepColorClass('Et')}`"
              >Et</span
            >
            <span class="text-gray-800 dark:text-gray-100">Étirements</span>
          </li>
        </ul>
      </div>
      <!-- Affiche les 3 premières semaines -->
      <div v-for="(week, i) in selectedProgram.weeks.slice(0, 3)" :key="i" class="mb-10">
        <h2 class="text-xl font-bold text-green-600 dark:text-green-400 mb-4 text-center">
          Semaine {{ i + 1 }}
        </h2>
        <div class="flex flex-col md:flex-row md:space-x-6 space-y-4 md:space-y-0 justify-center">
          <div
            v-for="(session, j) in week.sessions"
            :key="j"
            :class="[
              'flex-1 bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-6 border-2',
              j % 2 === 0
                ? 'border-blue-200 dark:border-blue-700'
                : 'border-green-200 dark:border-green-700',
            ]"
          >
            <h3 class="font-semibold text-lg text-blue-700 dark:text-blue-300 mb-2 text-center">
              Séance {{ j + 1 }}
            </h3>
            <ul class="text-base text-gray-800 dark:text-gray-100 space-y-1 mb-2">
              <li
                v-for="(stepObj, k) in session.steps"
                :key="k"
                class="flex items-center gap-2 flex-wrap"
              >
                <span
                  :class="`inline-block px-2 py-1 rounded font-mono text-sm mr-2 ${stepColorClass(stepObj.step)}`"
                >
                  {{ stepObj.step }}
                </span>
                <span
                  v-if="stepObj.duration"
                  class="text-xs text-gray-500 dark:text-gray-400 font-mono mr-2"
                >
                  {{ stepObj.duration }}
                </span>
                <span
                  v-if="stepObj.description"
                  class="text-xs text-gray-600 dark:text-gray-300 italic"
                >
                  {{ stepObj.description }}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <!-- Accordion pour les semaines suivantes -->
      <div v-for="(week, i) in selectedProgram.weeks.slice(3)" :key="'acc' + i" class="mb-6">
        <button
          @click="toggleWeek(i + 3)"
          class="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-blue-50 dark:bg-gray-800 border-2 border-blue-200 dark:border-blue-700 font-bold text-blue-700 dark:text-blue-200 shadow mb-2"
        >
          <span>Semaine {{ i + 4 }}</span>
          <span>
            <svg
              v-if="openedWeeks.includes(i + 3)"
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 inline"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5 15l7-7 7 7"
              />
            </svg>
            <svg
              v-else
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 inline"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </span>
        </button>
        <div v-if="openedWeeks.includes(i + 3)" class="animate-fade-in">
          <div class="flex flex-col md:flex-row md:space-x-6 space-y-4 md:space-y-0 justify-center">
            <div
              v-for="(session, j) in week.sessions"
              :key="j"
              :class="[
                'flex-1 bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-6 border-2',
                j % 2 === 0
                  ? 'border-blue-200 dark:border-blue-700'
                  : 'border-green-200 dark:border-green-700',
              ]"
            >
              <h3 class="font-semibold text-lg text-blue-700 dark:text-blue-300 mb-2 text-center">
                Séance {{ j + 1 }}
              </h3>
              <ul class="text-base text-gray-800 dark:text-gray-100 space-y-1 mb-2">
                <li
                  v-for="(stepObj, k) in session.steps"
                  :key="k"
                  class="flex items-center gap-2 flex-wrap"
                >
                  <span
                    :class="`inline-block px-2 py-1 rounded font-mono text-sm mr-2 ${stepColorClass(stepObj.step)}`"
                  >
                    {{ stepObj.step }}
                  </span>
                  <span
                    v-if="stepObj.duration"
                    class="text-xs text-gray-500 dark:text-gray-400 font-mono mr-2"
                  >
                    {{ stepObj.duration }}
                  </span>
                  <span
                    v-if="stepObj.description"
                    class="text-xs text-gray-600 dark:text-gray-300 italic"
                  >
                    {{ stepObj.description }}
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <button @click="selectedProgram = null" class="mt-2 text-blue-500 underline">
        Retour à la liste
      </button>
    </div>

    <!-- Modal création programme (squelette) -->
    <div
      v-if="showCreateModal"
      class="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
    >
      <div
        class="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-2xl w-full max-w-2xl overflow-y-auto max-h-[90vh] border-2 border-blue-200 dark:border-blue-700"
      >
        <h3 class="font-bold text-blue-700 mb-6">Créer un nouveau programme</h3>
        <input
          v-model="newProgram.title"
          placeholder="Titre"
          class="input mb-3 w-full text-lg font-bold bg-blue-50 dark:bg-gray-800 text-blue-900 dark:text-blue-100 placeholder:text-blue-400 dark:placeholder:text-blue-300"
        />
        <input
          v-model="newProgram.category"
          placeholder="Catégorie"
          class="input mb-3 w-full bg-blue-50 dark:bg-gray-800 text-blue-900 dark:text-blue-100 placeholder:text-blue-400 dark:placeholder:text-blue-300"
        />
        <textarea
          v-model="newProgram.description"
          placeholder="Description"
          class="input mb-6 w-full bg-blue-50 dark:bg-gray-800 text-blue-900 dark:text-blue-100 placeholder:text-blue-400 dark:placeholder:text-blue-300"
        ></textarea>
        <div>
          <h4 class="font-semibold mb-4 text-blue-700 dark:text-blue-300 text-lg">
            Semaines & Séances
          </h4>
          <div
            v-for="(week, wIdx) in newProgram.weeks"
            :key="wIdx"
            class="mb-6 bg-blue-50 dark:bg-gray-800 border-2 border-blue-200 dark:border-blue-700 rounded-2xl p-4"
          >
            <div class="flex items-center justify-between mb-2">
              <span class="font-bold text-blue-700 dark:text-blue-300 text-lg"
                >Semaine {{ wIdx + 1 }}</span
              >
              <button @click="removeWeek(wIdx)" class="text-red-500 text-xs ml-2 hover:underline">
                Supprimer semaine
              </button>
            </div>
            <div
              v-for="(session, sIdx) in week.sessions"
              :key="sIdx"
              class="mb-3 bg-white dark:bg-gray-900 border border-blue-100 dark:border-blue-800 rounded-xl p-3"
            >
              <div class="flex items-center justify-between mb-2">
                <span class="font-semibold text-blue-600 dark:text-blue-300"
                  >Séance {{ sIdx + 1 }}</span
                >
                <button
                  @click="removeSession(wIdx, sIdx)"
                  class="text-red-500 text-xs ml-2 hover:underline"
                >
                  Supprimer séance
                </button>
              </div>
              <div
                v-for="(step, stIdx) in session.steps"
                :key="stIdx"
                class="flex items-center mb-2"
              >
                <input
                  v-model="session.steps[stIdx].step"
                  placeholder="Step (ex: T 10')"
                  class="input flex-1 mr-2 bg-blue-50 dark:bg-gray-800 text-blue-900 dark:text-blue-100 placeholder:text-blue-400 dark:placeholder:text-blue-300"
                />
                <button
                  @click="removeStep(wIdx, sIdx, stIdx)"
                  class="text-red-500 text-xs hover:underline"
                >
                  Supprimer
                </button>
              </div>
              <button
                @click="addStep(wIdx, sIdx)"
                class="text-blue-500 text-xs mt-1 hover:underline"
              >
                + Ajouter un step
              </button>
            </div>
            <button @click="addSession(wIdx)" class="text-blue-500 text-xs mt-1 hover:underline">
              + Ajouter une séance
            </button>
          </div>
          <button
            @click="addWeek"
            class="text-blue-600 dark:text-blue-300 text-sm font-semibold hover:underline"
          >
            + Ajouter une semaine
          </button>
        </div>
        <div class="flex gap-2 mt-6">
          <button
            @click="createProgram"
            class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-bold shadow"
          >
            Créer
          </button>
          <button @click="showCreateModal = false" class="text-gray-500 underline">Annuler</button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
const userStore = useUserStore()

function handleStartProgram(program) {
  userStore.startProgram(program)
  router.push('/user/follow')
}
import { ref } from 'vue'

// Variables Cockpit API (production ready)
const API_BASE = 'https://ingrwf12.cepegra-frontend.xyz/cockpit_val'
const API_KEY = 'API-7de5aeb31eecb18d31a429da6503f28ebee94c19'

import { useUserStore } from '@/stores/userStore'

// Programme 0-5km JCPMF, 12 semaines, 3 séances/semaine
const programs = ref([])

// Charger les programmes depuis Cockpit API au montage
const fetchPrograms = async () => {
  try {
    const res = await fetch(`${API_BASE}/content/items/programmes`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${API_KEY}`,
      },
    })
    const data = await res.json()
    // Cockpit retourne { entries: [...] }
    programs.value = data
  } catch (e) {
    console.error('Erreur chargement programmes', e)
  }
}

fetchPrograms()

const selectedProgram = ref(null)
const showCreateModal = ref(false)

const newProgram = ref({ title: '', category: '', description: '', weeks: [] })
// Fonctions pour formulaire dynamique
function addWeek() {
  newProgram.value.weeks.push({ sessions: [] })
}
function removeWeek(wIdx) {
  newProgram.value.weeks.splice(wIdx, 1)
}
function addSession(wIdx) {
  newProgram.value.weeks[wIdx].sessions.push({ steps: [] })
}
function removeSession(wIdx, sIdx) {
  newProgram.value.weeks[wIdx].sessions.splice(sIdx, 1)
}
function addStep(wIdx, sIdx) {
  newProgram.value.weeks[wIdx].sessions[sIdx].steps.push({ step: '' })
}
function removeStep(wIdx, sIdx, stIdx) {
  newProgram.value.weeks[wIdx].sessions[sIdx].steps.splice(stIdx, 1)
}

const selectProgram = (program) => {
  selectedProgram.value = program
}

const createProgram = async () => {
  // Construction du programme à envoyer (structure Cockpit)
  const prog = {
    titre: newProgram.value.title,
    categorie: newProgram.value.category,
    description: newProgram.value.description,
    weeks: newProgram.value.weeks,
  }
  try {
    const res = await fetch(`${base_url}/content/item/programmes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${bearer_token}`,
      },
      body: JSON.stringify({ data: prog }),
    })
    if (!res.ok) throw new Error('Erreur API Cockpit: ' + (await res.text()))
    await fetchPrograms() // recharge la liste depuis la DB
    showCreateModal.value = false
    newProgram.value = { title: '', category: '', description: '', weeks: [] }
  } catch (e) {
    alert('Erreur lors de la création du programme: ' + e.message)
  }
}

// Accordéon pour les semaines > 3
const openedWeeks = ref([])
function toggleWeek(idx) {
  if (openedWeeks.value.includes(idx)) {
    openedWeeks.value = openedWeeks.value.filter((i) => i !== idx)
  } else {
    openedWeeks.value.push(idx)
  }
}

// Coloration dynamique des steps (E/S, T, M, Et, S, C...)
function stepColorClass(step) {
  if (step.startsWith('E/S'))
    return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-700 dark:text-yellow-100'
  if (step.startsWith('T')) return 'bg-blue-100 text-blue-800 dark:bg-blue-700 dark:text-blue-100'
  if (step.startsWith('M'))
    return 'bg-green-100 text-green-800 dark:bg-green-700 dark:text-green-100'
  if (step.startsWith('Et'))
    return 'bg-purple-100 text-purple-800 dark:bg-purple-700 dark:text-purple-100'
  if (step.startsWith('S')) return 'bg-red-100 text-red-800 dark:bg-red-700 dark:text-red-100'
  if (step.startsWith('C')) return 'bg-pink-100 text-pink-800 dark:bg-pink-700 dark:text-pink-100'
  return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-100'
}

function getProgramId(program) {
  return program?._id || program?.ID || ''
}
</script>
