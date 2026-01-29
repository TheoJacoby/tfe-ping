
export type UserRole = 'admin' | 'comite' | 'joueur';

export type MatchStatus = 'a_venir' | 'en_cours' | 'termine';

export type AvailabilityStatus = 'absent' | 'blesse' | 'present';


export interface Profile {
  id: string; 
  email: string | null;
  role: UserRole;
  nom: string | null;
  prenom: string | null;
  classement: string | null;
  cotisation_statut: boolean;
  avatar_url: string | null;
  created_at: string | null;
}

// TABLES SPORTIVES
export interface Team {
  id: string; 
  nom: string;
  division: string | null;
  saison: string | null;
}

export interface Match {
  id: string; 
  team_id: string | null;
  adversaire: string;
  date_heure: string; 
  lieu: 'Domicile' | 'Exterieur';
  score_home: number;
  score_away: number;
  statut: MatchStatus;
}

export interface Selection {
  id: string;
  match_id: string | null;
  player_id: string | null;
  position: number;
}

export interface Availability {
  id: string; 
  player_id: string | null;
  date: string; 
  statut: AvailabilityStatus;
}

// TRESORERIE
export interface Product {
  id: string; 
  nom: string;
  prix: number; 
  categorie: string | null;
  actif: boolean;
}

export interface BarTransaction {
  id: string; 
  player_id: string | null;
  product_id: string | null;
  montant: number; 
  nom_produit: string | null;
  created_at: string | null; 
}

export interface ClubExpense {
  id: string; 
  titre: string;
  montant: number; 
  categorie: string | null;
  date: string | null; 
  preuve_url: string | null;
}
