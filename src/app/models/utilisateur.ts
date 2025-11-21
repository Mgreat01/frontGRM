import { Disponibilite } from "./disponibilite";
import { Rendezvous } from "./rendezvous";
import { Specialite } from "./specialite";

export interface Utilisateur {
  id: number;
  noms_complet: string;
  email: string;
  motdepasse: string;
  type: 'medecin' | 'patient' | 'receptionniste';
  specialiteId?: number;
  specialite?: Specialite;
  disponibilites?: Disponibilite[];
  rendezVous?: Rendezvous[];
  estActif: boolean;

}
