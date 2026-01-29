<template>
  <div class="min-h-screen animated-bg flex items-center justify-center p-4">
    <div class="fixed inset-0 overflow-hidden pointer-events-none">
      <div class="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl"></div>
      <div class="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-600/5 rounded-full blur-3xl"></div>
    </div>

    <div class="glass-card w-full max-w-md p-8 relative z-10">
      <div class="text-center mb-8">
        <div class="flex justify-center mb-4">
          <img 
            :src="logoTT" 
            alt="Logo du club" 
            class="h-20 w-auto logo-club"
          />
        </div>
        <h1 class="text-4xl font-bold mb-2 bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
          Connexion
        </h1>
        <p class="text-white/60 text-sm">Accédez à votre espace club</p>
      </div>

      <form @submit.prevent="handleLogin" class="space-y-6">
        <div>
          <label for="email" class="block text-sm font-medium text-white/80 mb-2">
            Email
          </label>
          <input
            id="email"
            v-model="email"
            type="email"
            required
            class="glass-input w-full"
            placeholder="vous@example.com"
          />
        </div>

        <div>
          <label for="password" class="block text-sm font-medium text-white/80 mb-2">
            Mot de passe
          </label>
          <input
            id="password"
            v-model="password"
            type="password"
            required
            class="glass-input w-full"
            placeholder="••••••••"
          />
        </div>

        <div v-if="errorMessage" class="glass-card bg-red-500/10 border-red-500/30 p-3 rounded-xl">
          <p class="text-sm text-red-400 flex items-center gap-2">
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
            </svg>
            {{ errorMessage }}
          </p>
        </div>

        <button
          type="submit"
          :disabled="loading"
          class="glass-button w-full glow-orange"
        >
          <span v-if="!loading" class="flex items-center justify-center gap-2">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
            </svg>
            Se connecter
          </span>
          <span v-else class="flex items-center justify-center gap-2">
            <svg class="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Connexion...
          </span>
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useSupabaseClient } from '#imports';
import type { UserRole, Profile } from '@/types';
import logoTT from '@/assets/img/logoTT.png';

const supabase = useSupabaseClient();

const email = ref('');
const password = ref('');
const loading = ref(false);
const errorMessage = ref('');

const redirectByRole = (role: UserRole) => {
  if (role === 'admin') {
    return navigateTo('/admin/dashboard');
  }
  if (role === 'comite') {
    return navigateTo('/comite/dashboard');
  }
  return navigateTo('/joueur/dashboard');
};

const handleLogin = async () => {
  errorMessage.value = '';
  loading.value = true;

  try {
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email: email.value,
      password: password.value,
    });

    if (authError) {
      errorMessage.value = 'Identifiants incorrects. Veuillez réessayer.';
      return;
    }

    if (!authData?.user?.id) {
      errorMessage.value = "Erreur lors de la récupération de l'utilisateur.";
      return;
    }

    const userId = authData.user.id;

    const session = await supabase.auth.getSession();
    if (!session.data.session) {
      errorMessage.value = 'Erreur: Session non initialisée.';
      return;
    }

    if (!userId) {
      errorMessage.value = 'Erreur: ID utilisateur manquant.';
      return;
    }

    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('id, role')
      .eq('id', userId)
      .single<Pick<Profile, 'id' | 'role'>>();

    if (profileError) {
      errorMessage.value = `Erreur: ${profileError.message || 'Impossible de récupérer le profil. Vérifiez vos permissions.'}`;
      return;
    }

    if (!profile) {
      errorMessage.value = 'Profil introuvable. Contactez un administrateur.';
      return;
    }

    await new Promise(resolve => setTimeout(resolve, 500));

    const targetPath = profile.role === 'admin' 
      ? '/admin/dashboard' 
      : profile.role === 'comite' 
      ? '/comite/dashboard' 
      : '/joueur/dashboard';
    
    await navigateTo(targetPath, { external: false, replace: true });
  } catch (e) {
    errorMessage.value = 'Une erreur inattendue est survenue. Veuillez réessayer.';
  } finally {
    loading.value = false;
  }
};
</script>
