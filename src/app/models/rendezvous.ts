import { Utilisateur } from "./utilisateur";

export interface Rendezvous {
    id: number;
  uuid: string;
  nom_patient: string;
  email_patient: string;
  numero_patient: string;
  symptome: string;
  statut: 'en_attente' | 'confirme' | 'annule';
  presence?: boolean;
  date_rdv?: Date;
  heure_rdv?: Date;
  specialiteId?: number;
  medecinId?: number;
  medecin?: Utilisateur;
  date_creation: Date;

}
