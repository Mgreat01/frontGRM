import { Utilisateur } from "./utilisateur";

export interface Specialite {
  id: number;
  nom: string;
  utilisateur?: Utilisateur[];

}
