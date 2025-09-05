<template>
  <section class="w-full max-w-3xl mx-auto mt-8 px-2 sm:px-4">
    <h1 class="text-3xl font-bold mb-6 text-center text-blue-600 dark:text-blue-400">
      Statistiques de
      <span class="font-extrabold text-blue-400 dark:text-blue-200">{{
        userStore.currentUser?.name || '...'
      }}</span>
    </h1>
    <div v-if="userStats.length === 0" class="text-center text-gray-500 dark:text-gray-400 mt-10">
      Aucune statistique trouvée pour {{ userStore.currentUser?.name || '...' }}.
    </div>
    <div v-else class="flex flex-col gap-10 sm:gap-14">
      <!-- Badges virtuels et partage -->
      <div class="flex flex-col items-center gap-4 mb-2">
        <div class="flex flex-wrap justify-center gap-3">
          <template v-for="(badge, i) in visibleBadges" :key="badge.key">
            <span
              :title="badge.title"
              class="inline-flex items-center justify-center w-10 h-10 rounded-full text-2xl shadow cursor-pointer transition-opacity"
              :class="badge.bg"
              :style="!badge.show ? 'opacity:0.3;filter:grayscale(1);' : ''"
              @click="showAllBadges = true"
            >
              {{ badge.icon }}
            </span>
          </template>
          <button
            v-if="allBadges.length > 4"
            @click="showAllBadges = true"
            class="w-10 h-10 rounded-full bg-gray-200 text-gray-700 flex items-center justify-center text-xl shadow hover:bg-gray-300"
            title="Voir tous les badges"
          >
            +
          </button>
          <!-- Bouton partager icône dans la carte Statistiques globales -->
          <!-- Section modale tous les badges -->
          <div
            v-if="showAllBadges"
            class="fixed inset-0 z-50 flex items-center justify-center"
            style="backdrop-filter: blur(6px); background: rgba(0, 0, 0, 0.35)"
          >
            <div
              class="relative w-full max-w-md mx-auto bg-gradient-to-br from-blue-50 via-white to-blue-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 rounded-3xl shadow-2xl p-7 flex flex-col gap-6 border border-blue-200 dark:border-gray-700 animate-fadein"
            >
              <button
                @click="showAllBadges = false"
                class="absolute top-3 right-4 text-gray-400 hover:text-blue-600 dark:hover:text-blue-300 text-3xl font-bold focus:outline-none"
                aria-label="Fermer"
              >
                &times;
              </button>
              <h2
                class="text-2xl font-extrabold text-center text-blue-700 dark:text-blue-200 mb-2 tracking-tight"
              >
                <strong>Tous vos badges</strong>
              </h2>
              <div class="flex flex-wrap gap-6 justify-center items-center">
                <div
                  v-for="badge in allBadges"
                  :key="badge.key"
                  class="flex flex-col items-center gap-2 min-w-[80px]"
                >
                  <span
                    :class="
                      badge.bg +
                      ' w-16 h-16 rounded-full flex items-center justify-center text-4xl shadow-lg border-2 border-white dark:border-gray-800 transition-opacity'
                    "
                    :style="!badge.show ? 'opacity:0.3;filter:grayscale(1);' : ''"
                    :title="badge.title"
                    >{{ badge.icon }}</span
                  >
                  <span
                    class="text-xs text-center text-gray-700 dark:text-gray-200 font-semibold leading-tight"
                  >
                    {{ badge.title }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- Résumé global -->
        <div
          class="rounded-2xl shadow-lg bg-gradient-to-br from-green-50 via-white to-green-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-3 sm:p-5 border border-green-100 dark:border-gray-700 flex flex-col gap-4 sm:gap-6"
        >
          <div class="flex items-center justify-between mb-2">
            <div class="text-base sm:text-lg font-bold text-green-700 dark:text-green-300">
              Statistiques globales
            </div>
            <button
              @click="shareStatsGlobal"
              class="ml-2 flex items-center justify-center rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow focus:outline-none"
              style="width: 32px; height: 32px; min-width: 32px; min-height: 32px"
              title="Partager mes stats globales"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5-5m0 0l5 5m-5-5v12"
                />
              </svg>
            </button>
          </div>
          <div class="flex flex-wrap gap-2 sm:gap-3">
            <span
              class="inline-flex items-center gap-1 text-xs sm:text-xs font-semibold text-blue-700 dark:text-blue-300 bg-blue-100 dark:bg-blue-900 px-2 sm:px-3 py-1 rounded-full"
            >
              <svg
                class="w-4 h-4 text-blue-400"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M13 16h-1v-4h-1m1-4h.01M12 20.5C6.201 20.5 1 15.299 1 9.5S6.201-1.5 12-1.5 23 4.701 23 10.5 17.799 20.5 12 20.5z"
                />
              </svg>
              {{ totalSessions }} séances
            </span>
            <span
              class="inline-flex items-center gap-1 text-xs sm:text-xs font-semibold text-green-700 dark:text-green-300 bg-green-100 dark:bg-green-900 px-2 sm:px-3 py-1 rounded-full"
            >
              <svg
                class="w-4 h-4 text-green-400"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M13 16h-1v-4h-1m1-4h.01M12 20.5C6.201 20.5 1 15.299 1 9.5S6.201-1.5 12-1.5 23 4.701 23 10.5 17.799 20.5 12 20.5z"
                />
              </svg>
              {{ totalDistance }} km
            </span>
            <span
              class="inline-flex items-center gap-1 text-xs sm:text-xs font-semibold text-yellow-700 dark:text-yellow-300 bg-yellow-100 dark:bg-yellow-900 px-2 sm:px-3 py-1 rounded-full"
            >
              <svg
                class="w-4 h-4 text-yellow-400"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3" />
              </svg>
              {{ formatTime(totalTime) }}
            </span>
          </div>
        </div>
        <!-- Sélecteur séance -->
        <div class="flex flex-col gap-3 sm:gap-4">
          <label
            for="select-session"
            class="text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1 sm:mb-0"
            >Voir le détail d'une séance :</label
          >
          <select
            id="select-session"
            v-model="selectedId"
            class="rounded-lg border border-gray-300 dark:border-gray-700 px-2 sm:px-3 py-2 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 text-xs sm:text-sm"
          >
            <option v-for="stat in sortedStats" :key="stat._id" :value="stat._id">
              Semaine {{ stat.week }} — Séance {{ stat.session }}
            </option>
          </select>
        </div>
        <!-- Détail séance -->
        <div
          v-if="selectedStat"
          class="rounded-2xl shadow-lg bg-gradient-to-br from-blue-50 via-white to-blue-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-3 sm:p-5 border border-blue-100 dark:border-gray-700 mt-4 sm:mt-6 flex flex-col gap-4 sm:gap-6"
        >
          <div class="flex flex-row flex-wrap items-center gap-1 sm:gap-2 mb-2 w-full">
            <span
              class="inline-flex items-center gap-1 text-xs sm:text-xs font-semibold text-blue-600 dark:text-blue-300 bg-blue-100 dark:bg-blue-900 px-1.5 sm:px-2 py-0.5 rounded-full"
            >
              <svg
                class="w-4 h-4 text-blue-400"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M13 16h-1v-4h-1m1-4h.01M12 20.5C6.201 20.5 1 15.299 1 9.5S6.201-1.5 12-1.5 23 4.701 23 10.5 17.799 20.5 12 20.5z"
                />
              </svg>
              Semaine {{ selectedStat.week }}
            </span>
            <span
              class="inline-flex items-center gap-1 text-xs sm:text-xs font-semibold text-pink-600 dark:text-pink-300 bg-pink-100 dark:bg-pink-900 px-1.5 sm:px-2 py-0.5 rounded-full"
            >
              <svg
                class="w-4 h-4 text-pink-400"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M8 17l4 4 4-4m0-5V3m-8 9v6a2 2 0 002 2h4a2 2 0 002-2v-6"
                />
              </svg>
              Séance {{ selectedStat.session }}
            </span>
            <span
              class="inline-flex items-center gap-1 text-xs sm:text-xs font-semibold text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 px-1.5 sm:px-2 py-0.5 rounded-full"
            >
              <svg
                class="w-4 h-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              {{ formatDate(selectedStat.date_completed) }}
            </span>
            <button
              @click="shareStatsSession(selectedStat)"
              class="flex items-center justify-center rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow focus:outline-none ml-2"
              style="width: 32px; height: 32px; min-width: 32px; min-height: 32px"
              title="Partager cette séance"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5-5m0 0l5 5m-5-5v12"
                />
              </svg>
            </button>
          </div>

          <div class="flex flex-wrap gap-1 sm:gap-2 mb-2">
            <span
              class="inline-flex items-center gap-1 text-xs sm:text-xs font-semibold text-green-700 dark:text-green-300 bg-green-100 dark:bg-green-900 px-1.5 sm:px-2 py-0.5 rounded-full"
            >
              <svg
                class="w-4 h-4 text-green-400"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M13 16h-1v-4h-1m1-4h.01M12 20.5C6.201 20.5 1 15.299 1 9.5S6.201-1.5 12-1.5 23 4.701 23 10.5 17.799 20.5 12 20.5z"
                />
              </svg>
              {{ selectedStat.distance }} km
            </span>
            <span
              class="inline-flex items-center gap-1 text-xs sm:text-xs font-semibold text-yellow-700 dark:text-yellow-300 bg-yellow-100 dark:bg-yellow-900 px-1.5 sm:px-2 py-0.5 rounded-full"
            >
              <svg
                class="w-4 h-4 text-yellow-400"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3" />
              </svg>
              {{ formatTime(selectedStat.totalTime) }}
            </span>
          </div>
          <div class="mb-1 flex items-center gap-1 sm:gap-2">
            <span
              class="font-semibold text-blue-700 dark:text-blue-300 flex items-center gap-1 align-middle"
            >
              <svg
                class="w-4 h-4 text-blue-400 align-middle"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                viewBox="0 0 24 24"
                style="vertical-align: middle"
              >
                <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              <span class="align-middle whitespace-nowrap px-1">Feeling&nbsp;:</span>
            </span>
            <span class="text-gray-700 dark:text-gray-200 align-middle">{{
              selectedStat.feeling
            }}</span>
          </div>
          <div class="mb-1 flex items-center gap-1 sm:gap-2">
            <span
              class="font-semibold text-blue-700 dark:text-blue-300 flex items-center gap-1 align-middle"
            >
              <svg
                class="w-4 h-4 text-blue-400 align-middle"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                viewBox="0 0 24 24"
                style="vertical-align: middle"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
              <span class="align-middle whitespace-nowrap px-2">Notes&nbsp;:</span>
            </span>
            <span class="text-gray-700 dark:text-gray-200 align-middle">{{
              selectedStat.notes
            }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const allBadges = computed(() => [
  {
    key: 'first',
    icon: '🏅',
    title: 'Première séance',
    show: totalSessions.value >= 1,
    bg: 'bg-yellow-200',
  },
  {
    key: '10sessions',
    icon: '🥇',
    title: '10 séances',
    show: totalSessions.value >= 10,
    bg: 'bg-blue-200',
  },
  {
    key: 'marathon',
    icon: '🏆',
    title: 'Marathon (40 km cumulés)',
    show: totalDistance.value >= 40,
    bg: 'bg-green-200',
  },
  {
    key: '1h',
    icon: '⏱️',
    title: '1h de course cumulée',
    show: totalTime.value >= 3600,
    bg: 'bg-purple-200',
  },
  {
    key: '20sessions',
    icon: '🎖️',
    title: '20 séances',
    show: totalSessions.value >= 20,
    bg: 'bg-orange-200',
  },
  {
    key: 'ultra',
    icon: '🥈',
    title: 'Ultra (100 km cumulés)',
    show: totalDistance.value >= 100,
    bg: 'bg-pink-200',
  },
  {
    key: '2h',
    icon: '⌛',
    title: '2h de course cumulée',
    show: totalTime.value >= 7200,
    bg: 'bg-indigo-200',
  },
  {
    key: 'streak',
    icon: '🔥',
    title: '3 séances en 7 jours',
    show: streak3in7.value,
    bg: 'bg-red-200',
  },
])
// Badge streak : 3 séances en 7 jours
const streak3in7 = computed(() => {
  if (userStats.value.length < 3) return false
  // Trie par date
  const stats = [...userStats.value]
    .filter((s) => s.date_completed)
    .sort((a, b) => new Date(a.date_completed) - new Date(b.date_completed))
  for (let i = 0; i <= stats.length - 3; i++) {
    const d1 = new Date(stats[i].date_completed)
    const d3 = new Date(stats[i + 2].date_completed)
    if ((d3 - d1) / (1000 * 3600 * 24) <= 7) return true
  }
  return false
})
const visibleBadges = computed(() => allBadges.value.filter((b) => b.show).slice(0, 4))
const showAllBadges = ref(false)
// Partage global
function shareStatsGlobal() {
  const text = `J'ai couru ${totalSessions.value} séances pour un total de ${totalDistance.value} km (${formatTime(totalTime.value)}) sur l'app Exo-Courir ! 🏃‍♂️`
  if (navigator.share) {
    navigator.share({
      title: 'Mes stats running',
      text,
      url: window.location.href,
    })
  } else {
    alert(text)
  }
}
// Partage d'une séance
function shareStatsSession(stat) {
  if (!stat) return
  const text = `J'ai terminé la séance Semaine ${stat.week} - Séance ${stat.session} : ${stat.distance || 0} km en ${formatTime(stat.totalTime)}. Ressenti : ${stat.feeling || '—'}\nSur l'app Exo-Courir ! 🏃‍♂️`
  if (navigator.share) {
    navigator.share({
      title: 'Ma séance running',
      text,
      url: window.location.href,
    })
  } else {
    alert(text)
  }
}
import { useUserStore } from '@/stores/userStore'

const userStore = useUserStore()
const userStats = ref([])
const selectedId = ref(null)

function formatDate(dateStr) {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleDateString()
}
function formatTime(seconds) {
  if (!seconds) return ''
  const min = Math.floor(seconds / 60)
  const sec = seconds % 60
  return `${min}m${sec > 0 ? ' ' + sec + 's' : ''}`
}

const totalSessions = computed(() => userStats.value.length)
const totalDistance = computed(() => userStats.value.reduce((acc, s) => acc + (s.distance || 0), 0))
const totalTime = computed(() => userStats.value.reduce((acc, s) => acc + (s.totalTime || 0), 0))
const sortedStats = computed(() =>
  [...userStats.value].sort((a, b) => a.week - b.week || a.session - b.session),
)
const selectedStat = computed(
  () => sortedStats.value.find((s) => s._id === selectedId.value) || sortedStats.value[0],
)

onMounted(async () => {
  const userId = userStore.currentUser?._id
  const API_BASE = 'https://ingrwf12.cepegra-frontend.xyz/cockpit_val/'
  const API_TOKEN = 'API-7de5aeb31eecb18d31a429da6503f28ebee94c19'
  try {
    const res = await fetch(
      `${API_BASE}/content/items/userstats?filter={\"user.link\":\"${userId}\"}`,
      {
        headers: {
          Authorization: `Bearer ${API_TOKEN}`,
        },
      },
    )
    const data = await res.json()
    userStats.value = Array.isArray(data) ? data.filter((stat) => stat.user?.link === userId) : []
    if (userStats.value.length > 0) selectedId.value = userStats.value[0]._id
  } catch (e) {
    userStats.value = []
  }
})
</script>
