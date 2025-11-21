import { Utilisateur } from "./utilisateur";

export interface Disponibilite {
  id: number;
  medecinId: number;
  date: Date;
  heure_debut: string;
  heure_fin: string;
  medecin?: Utilisateur;

}
