<script setup lang="ts">
const goToLogin = () => {
  navigateTo('/login')
}
</script>

<template>
  <div class="min-h-screen animated-bg flex items-center justify-center p-4">
    <div class="fixed inset-0 overflow-hidden pointer-events-none">
      <div class="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl"></div>
      <div class="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-600/5 rounded-full blur-3xl"></div>
    </div>

    <div class="glass-card w-full max-w-md p-8 relative z-10 text-center">
      <div class="flex justify-center mb-6">
        <img 
          src="/logoTT.png" 
          alt="Logo du club" 
          class="h-24 w-auto logo-club"
        />
      </div>
      
      <h1 class="text-5xl font-bold mb-4 bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
        Bienvenue
      </h1>
      
      <p class="text-white/80 text-lg mb-2">
        Bienvenue sur notre site
      </p>
      
      <p class="text-white/60 text-sm mb-8">
        Veuillez vous connecter pour accéder à votre espace
      </p>

      <button
        @click="goToLogin"
        class="glass-button w-full glow-orange"
      >
        <span class="flex items-center justify-center gap-2">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
          </svg>
          Se connecter
        </span>
      </button>
    </div>
  </div>
</template>
