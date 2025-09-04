<template>
  <section class="w-full max-w-4xl mx-auto mt-8 px-4">
    <h1
      class="text-3xl md:text-4xl font-extrabold mb-4 text-center text-blue-600 dark:text-blue-400"
    >
      Nos programmes
    </h1>
    <div class="flex flex-col md:flex-row md:justify-center gap-4 mb-8">
      <button
        v-for="program in programs"
        :key="program._id || program.ID"
        @click="selectProgram(program)"
        class="flex-1 rounded-2xl shadow-lg bg-white dark:bg-gray-900 border-2 border-blue-200 dark:border-blue-700 p-6 hover:bg-blue-50 dark:hover:bg-blue-800 transition flex flex-col items-center"
        :class="{
          'ring-2 ring-blue-500':
            selectedProgram &&
            (selectedProgram._id === (program._id || program.ID) ||
              selectedProgram.ID === program.ID),
        }"
      >
        <div class="font-bold text-lg text-blue-700 dark:text-blue-300 mb-1">
          {{ program.titre }}
        </div>
        <div class="text-xs text-gray-500 mb-2">{{ program.categorie }}</div>
        <div class="text-sm text-gray-700 dark:text-gray-200 text-center line-clamp-2">
          {{ program.description }}
        </div>
      </button>
      <button
        @click="showCreateModal = true"
        class="flex-1 rounded-2xl border-2 border-dashed border-blue-400 text-blue-500 py-6 font-semibold hover:bg-blue-50 dark:hover:bg-blue-900 transition flex flex-col items-center justify-center"
      >
        <span class="text-3xl mb-1">+</span>
        <span>Créer un programme</span>
      </button>
    </div>

    <!-- Détail du programme sélectionné -->
    <div v-if="selectedProgram" class="mb-10 animate-fade-out">
      <h2 class="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-2 text-center">
        {{ selectedProgram.titre }}
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
      <div class="legend-box mb-8">
        <h2
          class="text-lg font-bold text-blue-900 dark:text-blue-200 mb-2 text-center tracking-wide uppercase"
        >
          Légende des abréviations
        </h2>
        <ul class="grid md:grid-cols-3 gap-y-4 gap-x-6 text-base font-normal">
          <li>
            <span :class="`inline-block px-2 py-1 rounded font-mono mr-2 ${stepColorClass('E/S')}`"
              >E/S</span
            >
            : Échauffement &amp; souplesse
          </li>
          <li>
            <span :class="`inline-block px-2 py-1 rounded font-mono mr-2 ${stepColorClass('T')}`"
              >T</span
            >
            : Trot (vitesse habituelle)
          </li>
          <li>
            <span :class="`inline-block px-2 py-1 rounded font-mono mr-2 ${stepColorClass('M')}`"
              >M</span
            >
            : Marche
          </li>
          <li>
            <span :class="`inline-block px-2 py-1 rounded font-mono mr-2 ${stepColorClass('C')}`"
              >C</span
            >
            : Course (trot rapide)
          </li>
          <li>
            <span :class="`inline-block px-2 py-1 rounded font-mono mr-2 ${stepColorClass('S')}`"
              >S</span
            >
            : Sprint
          </li>
          <li>
            <span :class="`inline-block px-2 py-1 rounded font-mono mr-2 ${stepColorClass('Et')}`"
              >Et</span
            >
            : Étirements
          </li>
        </ul>
      </div>
      <div v-for="(week, i) in selectedProgram.weeks" :key="i" class="mb-10">
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
              <li v-for="(stepObj, k) in session.steps" :key="k">
                <span
                  :class="`inline-block px-2 py-1 rounded font-mono text-sm mr-2 ${stepColorClass(stepObj.step)}`"
                >
                  {{ stepObj.step }}
                </span>
              </li>
            </ul>
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

    <!-- Accès dashboard utilisateur -->
    <div
      class="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 p-2 flex justify-center z-40"
    >
      <router-link to="/user/dashboard" class="text-blue-600 font-bold flex items-center gap-1">
        <span class="material-icons">insights</span>
        Dashboard
      </router-link>
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

// Variables Cockpit API
const base_url = 'http://localhost:8888/cockpit-core/api'
const bearer_token = 'API-7de5aeb31eecb18d31a429da6503f28ebee94c19'

import { useUserStore } from '@/stores/userStore'

// Programme 0-5km JCPMF, 12 semaines, 3 séances/semaine
const programs = ref([])

// Charger les programmes depuis Cockpit API au montage
const fetchPrograms = async () => {
  try {
    const res = await fetch(`${base_url}/content/items/programmes`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${bearer_token}`,
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
</script>
<style scoped>
.input {
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  padding: 0.5rem;
  background: #f9fafb;
  color: #111827;
}
.animate-fade-in {
  animation: fadeIn 0.3s;
}
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
/* Style pour la légende */
.legend-box {
  background: #fff;
  border-radius: 1.25rem;
  box-shadow: 0 4px 24px 0 rgba(60, 80, 180, 0.08);
  padding: 2.5rem 2rem;
  border: 2px solid #3b82f6;
  margin-bottom: 2rem;
}
.legend-box ul {
  margin-top: 1.5rem;
  margin-bottom: 0.5rem;
}
.legend-box li {
  margin-bottom: 0.75rem;
  color: #1e293b;
  font-size: 1.1rem;
  font-weight: bold;
}
.dark .legend-box li {
  color: #f1f5f9;
}
.dark .legend-box {
  background: #1e293b;
  border-color: #3b82f6;
}
</style>
