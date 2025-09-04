<template>
  <section class="w-full max-w-3xl mx-auto mt-8 px-4">
    <h1
      class="text-2xl md:text-3xl font-extrabold mb-6 text-center text-blue-600 dark:text-blue-400"
    >
      Statistiques du coureur
    </h1>
    <!-- 1. Progression -->
    <div
      class="mb-8 p-4 rounded-xl bg-blue-50 dark:bg-gray-800 border-2 border-blue-200 dark:border-blue-700 shadow"
    >
      <h2 class="font-bold text-lg mb-2 text-blue-700 dark:text-blue-300">Progression</h2>
      <div class="flex flex-wrap gap-4 items-center">
        <div>
          <span class="font-bold text-xl">{{ stats.progression.completedSessions }}</span>
          <span class="ml-1">séances réalisées</span>
        </div>
        <div>
          <span class="font-bold text-xl">{{ stats.progression.totalSessions }}</span>
          <span class="ml-1">au total</span>
        </div>
        <div>
          <span class="font-bold text-xl">{{ stats.progression.percent }}%</span>
          <span class="ml-1">d'avancement</span>
        </div>
      </div>
    </div>
    <!-- 2. Historique -->
    <div
      class="mb-8 p-4 rounded-xl bg-white dark:bg-gray-900 border-2 border-blue-100 dark:border-blue-800 shadow"
    >
      <h2 class="font-bold text-lg mb-2 text-blue-700 dark:text-blue-300">
        Historique des séances
      </h2>
      <ul class="divide-y divide-blue-100 dark:divide-blue-800">
        <li
          v-for="session in stats.history"
          :key="session.id"
          class="py-2 flex flex-col md:flex-row md:items-center md:justify-between"
        >
          <div>
            <span class="font-mono text-blue-600 dark:text-blue-300">{{ session.date }}</span>
            <span class="ml-2 font-semibold"
              >Semaine {{ session.week }} - Séance {{ session.session }}</span
            >
          </div>
          <div class="text-xs text-gray-500 mt-1 md:mt-0">{{ session.label }}</div>
        </li>
      </ul>
    </div>
    <!-- 3. Chrono & temps cumulé -->
    <div
      class="mb-8 p-4 rounded-xl bg-blue-50 dark:bg-gray-800 border-2 border-blue-200 dark:border-blue-700 shadow"
    >
      <h2 class="font-bold text-lg mb-2 text-blue-700 dark:text-blue-300">Temps cumulé</h2>
      <ul class="flex flex-wrap gap-6">
        <li v-for="(time, type) in stats.timeByType" :key="type" class="flex flex-col items-center">
          <span class="font-mono text-lg">{{ time }}</span>
          <span class="text-xs text-gray-600 dark:text-gray-300">{{ type }}</span>
        </li>
      </ul>
    </div>
    <!-- 4. Distances (optionnel) -->
    <div
      v-if="stats.totalDistance"
      class="mb-8 p-4 rounded-xl bg-white dark:bg-gray-900 border-2 border-blue-100 dark:border-blue-800 shadow"
    >
      <h2 class="font-bold text-lg mb-2 text-blue-700 dark:text-blue-300">Distance totale</h2>
      <div class="font-mono text-xl">{{ stats.totalDistance }} km</div>
    </div>
    <!-- 5. Rythme & régularité -->
    <div
      class="mb-8 p-4 rounded-xl bg-blue-50 dark:bg-gray-800 border-2 border-blue-200 dark:border-blue-700 shadow"
    >
      <h2 class="font-bold text-lg mb-2 text-blue-700 dark:text-blue-300">Régularité</h2>
      <div class="flex flex-wrap gap-4 items-center">
        <div>
          <span class="font-bold text-xl">{{ stats.sessionsPerWeek }}</span>
          <span class="ml-1">séances/semaine</span>
        </div>
        <div>
          <span class="font-bold text-xl">{{ stats.activeWeeks }}</span>
          <span class="ml-1">semaines actives</span>
        </div>
      </div>
    </div>
    <!-- 6. Ressenti & notes -->
    <div
      class="mb-8 p-4 rounded-xl bg-white dark:bg-gray-900 border-2 border-blue-100 dark:border-blue-800 shadow"
    >
      <h2 class="font-bold text-lg mb-2 text-blue-700 dark:text-blue-300">Ressenti</h2>
      <ul class="flex flex-wrap gap-4">
        <li v-for="note in stats.feelings" :key="note.label" class="flex flex-col items-center">
          <span class="font-mono text-lg">{{ note.value }}</span>
          <span class="text-xs text-gray-600 dark:text-gray-300">{{ note.label }}</span>
        </li>
      </ul>
    </div>
    <!-- 7. Records personnels -->
    <div
      class="mb-8 p-4 rounded-xl bg-blue-50 dark:bg-gray-800 border-2 border-blue-200 dark:border-blue-700 shadow"
    >
      <h2 class="font-bold text-lg mb-2 text-blue-700 dark:text-blue-300">Records personnels</h2>
      <ul class="flex flex-wrap gap-6">
        <li v-for="record in stats.records" :key="record.label" class="flex flex-col items-center">
          <span class="font-mono text-lg">{{ record.value }}</span>
          <span class="text-xs text-gray-600 dark:text-gray-300">{{ record.label }}</span>
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useUserStore } from '@/stores/userStore'
import NavbarPage from '@/components/NavbarPage.vue'

const userStore = useUserStore()
const base_url = 'http://localhost:8888/cockpit-core/api'
const bearer_token = 'VOTRE_TOKEN_ICI' // Remplace par ton vrai token Cockpit

const stats = ref({
  progression: { completedSessions: 0, totalSessions: 0, percent: 0 },
  history: [],
  timeByType: {},
  totalDistance: 0,
  sessionsPerWeek: 0,
  activeWeeks: 0,
  feelings: [],
  records: [],
})

async function fetchStats(userId) {
  if (!userId) return
  const res = await fetch(`${base_url}/collections/get/userstats`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${bearer_token}`,
    },
    body: JSON.stringify({ filter: { 'user.link': userId } }),
  })
  const data = await res.json()
  if (data && data.entries && data.entries.length > 0) {
    const entries = data.entries
    const completedSessions = entries.length
    const totalSessions = entries[0]?.cumulative?.totalSessions || completedSessions
    const percent = totalSessions ? Math.round((completedSessions / totalSessions) * 100) : 0
    const history = entries.map((e, i) => ({
      id: i + 1,
      date: e.date_completed ? e.date_completed.split('T')[0] : '',
      week: e.week,
      session: e.session,
      label: e.notes || e.feeling || 'Séance',
    }))
    const timeByType = {}
    entries.forEach((e) => {
      if (e.steps && Array.isArray(e.steps)) {
        e.steps.forEach((step) => {
          const type = step.step || 'Autre'
          if (!timeByType[type]) timeByType[type] = 0
          timeByType[type] += step.realDuration || step.duration || 0
        })
      }
    })
    const formatTime = (s) => {
      const h = Math.floor(s / 3600)
      const m = Math.floor((s % 3600) / 60)
      return h > 0 ? `${h}h${m > 0 ? m : ''}` : `${m}min`
    }
    const timeByTypeDisplay = {}
    Object.keys(timeByType).forEach((type) => {
      timeByTypeDisplay[type] = formatTime(timeByType[type])
    })
    const totalDistance = entries.reduce((acc, e) => acc + (e.distance || 0), 0)
    const sessionsPerWeek = Math.round(
      completedSessions / (entries[completedSessions - 1]?.week || 1),
    )
    const activeWeeks = [...new Set(entries.map((e) => e.week))].length
    const feelings = entries.map((e) => ({
      label: e.date_completed ? e.date_completed.split('T')[0] : '',
      value: e.feeling || '',
    }))
    const longestSession = Math.max(...entries.map((e) => e.totalTime || 0))
    const longestDistance = Math.max(...entries.map((e) => e.distance || 0))
    const bestSprint = Math.min(
      ...entries.flatMap((e) =>
        (e.steps || [])
          .filter((s) => s.step === 'S')
          .map((s) => s.realDuration || s.duration || 9999),
      ),
    )
    const records = [
      { label: 'Plus longue séance', value: formatTime(longestSession) },
      { label: 'Plus longue distance', value: longestDistance + ' km' },
      { label: 'Meilleur temps sprint', value: bestSprint !== 9999 ? bestSprint + 's' : '-' },
    ]
    stats.value = {
      progression: { completedSessions, totalSessions, percent },
      history,
      timeByType: timeByTypeDisplay,
      totalDistance: Math.round(totalDistance * 100) / 100,
      sessionsPerWeek,
      activeWeeks,
      feelings,
      records,
    }
  }
}

onMounted(() => {
  fetchStats(userStore.currentUser?._id)
})

watch(
  () => userStore.currentUser?._id,
  (id) => {
    fetchStats(id)
  },
)
</script>
