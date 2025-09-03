<template>
  <header class="bg-green-600 text-white p-4 flex justify-between items-center">
    <h1 class="text-xl font-bold">Runnerz</h1>
    <nav>
      <button @click="$emit('show-login')" class="mr-2 bg-white text-green-600 px-4 py-1 rounded">Se connecter</button>
      <button @click="$emit('show-signup')" class="bg-white text-green-600 px-4 py-1 rounded">S'inscrire</button>
    </nav>
  </header>
</template>

<script setup>
// On émet des événements pour afficher login/signup modals
</script>
