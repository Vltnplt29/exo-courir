<template>
  <section class="w-full max-w-3xl mx-auto sm:mt-4 px-4 pt-6 sm:pt-20">
    <div
      class="bg-gradient-to-r from-blue-500 to-green-400 rounded-3xl shadow-lg p-8 flex flex-col items-center text-white mb-8"
    >
      <img
        src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80"
        alt="Coureur motivé"
        class="w-32 h-32 object-cover rounded-full shadow-lg mb-4 border-4 border-white"
      />
      <h1 class="text-3xl md:text-4xl font-extrabold mb-2 text-center">
        Débute la course à pied et réussis ton premier 5km !
      </h1>
      <p class="text-lg md:text-xl mt-6 mb-6 text-center">
        Un programme progressif, des conseils concrets, et la motivation pour atteindre ton
        objectif, même si tu pars de zéro.
      </p>
      <router-link
        to="/user/program"
        class="mt-2 px-6 py-3 rounded-lg bg-white text-blue-600 font-bold text-lg shadow hover:bg-blue-50 transition"
        >Découvrir nos programmes</router-link
      >

      <!-- Flèche et texte d'incitation à scroller (mobile uniquement) -->
      <div class="flex sm:hidden flex-col items-center pt-6 mt-3">
        <span class="text-xs text-white/90 mt-1"
          ><strong>Fais défiler pour découvrir la suite</strong></span
        >
        <span class="mt-8 animate-bounce">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-9 h-9 text-white drop-shadow-lg"
            fill="none"
            viewBox="0 0 18 24"
            stroke="currentColor"
            stroke-width="3"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </span>
      </div>
    </div>
    <hr class="border-t-2 border-blue-500 dark:border-blue-400 mt-10 mb-5" />
    <div class="grid md:grid-cols-2 gap-6 mb-8">
      <div class="bg-white dark:bg-gray-900 rounded-2xl shadow p-6 flex flex-col gap-2">
        <h2 class="text-xl font-bold text-blue-600 dark:text-blue-400 mb-2">
          Les bases pour bien débuter
        </h2>
        <img
          src="https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=600&q=80"
          alt="Conseils running"
          class="w-full h-32 object-cover rounded-xl mb-2"
        />
        <ul class="list-disc list-inside text-gray-700 dark:text-gray-200 space-y-1">
          <li>Tout le monde peut courir, il suffit de respecter la progressivité.</li>
          <li>Alterner marche et course au début, c’est normal et conseillé.</li>
          <li>3 séances par semaine, toujours avec un jour de repos entre chaque.</li>
          <li>Privilégie l’endurance fondamentale : tu dois pouvoir parler en courant.</li>
          <li>Écoute ton corps : aucune honte à marcher si besoin !</li>
          <li>Investis dans de bonnes chaussures adaptées à ta foulée.</li>
          <li>Hydrate-toi, dors bien, mange équilibré, récupère.</li>
        </ul>
      </div>
      <hr class="border-t-2 border-blue-500 dark:border-blue-400 mt-2 mb-2" />
      <div class="bg-white dark:bg-gray-900 rounded-2xl shadow p-6 flex flex-col gap-2">
        <h2 class="text-xl font-bold text-green-600 dark:text-green-400 mb-2">Mon programme 5km</h2>
        <img
          src="https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=600&q=80"
          alt="Programme 5km"
          class="w-full h-32 object-cover rounded-xl mb-2"
        />
        <div class="text-gray-700 dark:text-gray-200 mb-2">
          <span class="font-semibold">Semaine 1 :</span> 1 min de course / 2 min de marche, à
          répéter 8 fois.<br />
          <span class="italic text-sm">(Exemple, adapte selon ton niveau et ton ressenti)</span>
        </div>
        <router-link
          to="/user/program"
          class="inline-block mt-2 px-4 py-2 rounded bg-green-500 text-white font-semibold hover:bg-green-600 transition"
          >Voir le plan complet</router-link
        >
      </div>
    </div>
    <hr class="border-t-2 border-blue-500 dark:border-blue-400 mb-10" />
    <div class="bg-blue-50 dark:bg-gray-800 rounded-2xl shadow p-6 flex flex-col items-center mb-8">
      <h2 class="text-lg font-bold text-blue-700 dark:text-blue-300 mb-2">Conseils essentiels</h2>

      <ul class="list-disc list-inside text-gray-700 dark:text-gray-200 mb-2 text-left max-w-xl">
        <li>La clé : la régularité, pas la performance immédiate.</li>
        <li>Ne brûle pas les étapes, la progression est naturelle si tu es patient.</li>
        <li>
          Le plaisir vient avec la persévérance : ne te décourage pas si c’est difficile au début !
        </li>
        <li>Partage tes progrès, motive-toi avec la communauté ou des amis.</li>
      </ul>
    </div>

    <div class="text-center text-gray-600 dark:text-gray-300 mt-8">
      <p class="text-lg font-semibold">
        Commence à courir, persévère, et profite de tes progrès !<br />Tu es capable de réussir ton
        5 km !
      </p>
    </div>
  </section>
</template>
