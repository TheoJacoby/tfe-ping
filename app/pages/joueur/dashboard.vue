<template>
  <div class="min-h-screen animated-bg p-6">
    <div class="fixed inset-0 overflow-hidden pointer-events-none">
      <div class="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl"></div>
      <div class="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-600/5 rounded-full blur-3xl"></div>
    </div>

    <div class="max-w-7xl mx-auto relative z-10">
      <div class="glass-card p-8 mb-6">
        <div class="flex items-center justify-between mb-6">
          <div class="flex items-center gap-4">
            <img 
              :src="logoTT" 
              alt="Logo du club" 
              class="h-12 w-auto logo-club"
            />
            <div>
              <h1 class="text-4xl font-bold mb-2 bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
                Dashboard Joueur
              </h1>
              <p class="text-white/60">Bienvenue dans votre espace</p>
            </div>
          </div>
          <button
            @click="handleLogout"
            class="glass-button glow-orange"
          >
            <svg class="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Se déconnecter
          </button>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div class="glass-card p-6 hover:bg-white/10 transition-all duration-300">
            <h3 class="text-lg font-semibold text-orange-400 mb-2">Ma note de bar</h3>
            <p class="text-white/60 text-sm">À venir</p>
          </div>
          <div class="glass-card p-6 hover:bg-white/10 transition-all duration-300">
            <h3 class="text-lg font-semibold text-orange-400 mb-2">Mes matchs</h3>
            <p class="text-white/60 text-sm">À venir</p>
          </div>
          <div class="glass-card p-6 hover:bg-white/10 transition-all duration-300">
            <h3 class="text-lg font-semibold text-orange-400 mb-2">Disponibilités</h3>
            <p class="text-white/60 text-sm">À venir</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import logoTT from '@/assets/img/logoTT.png';

const supabase = useSupabaseClient();

const handleLogout = async () => {
  await supabase.auth.signOut();
  await navigateTo('/login');
};
</script>
