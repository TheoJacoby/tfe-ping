import type { UserRole } from '@/types';

export default defineNuxtRouteMiddleware(async (to) => {
  if (to.path === '/login' || to.path === '/') return;

  const user = useSupabaseUser();
  const supabase = useSupabaseClient();

  const { data: { session } } = await supabase.auth.getSession();
  
  if (!session?.user?.id) {
    return navigateTo('/login');
  }

  const userId = session.user.id;

  if (to.path.startsWith('/admin') || to.path.startsWith('/comite')) {
    const { data: profile, error } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', userId)
      .single<{ role: UserRole }>();

    if (error || !profile) {
      return navigateTo('/login');
    }

    if (profile.role === 'joueur') {
      return navigateTo('/joueur/dashboard');
    }

    if (to.path.startsWith('/admin') && profile.role !== 'admin') {
      return navigateTo(`/${profile.role}/dashboard`);
    }
  }
});