import { Component, OnInit } from '@angular/core'; // Ajout de OnInit
import { Auth } from '../../../services/auth';
import { Router } from '@angular/router';
import { User } from '../../../services/user';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashmdc',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashmdc.html',
  styleUrl: './dashmdc.css',
})
export class Dashmdc implements OnInit {
  medecinId: string = '';
  date: string = '';
  heure_debut: string = '';
  heure_fin: string = '';

  disponibilites: any[] = [];
  rdvs: any[] = [];
  medecin: any = { noms_complet: '' }; // Initialisation pour éviter l'erreur charAt(0)

  constructor(private auth: Auth, private router: Router, private user: User) {}

  ngOnInit(): void {
    if (!this.auth.isAuth()) {
      this.router.navigate(['/login']);
      return;
    }

    this.medecinId = this.auth.getId();
    this.medecin = this.auth.getName(); 

    this.loadData();
  }

  // Centralisation du chargement pour plus de clarté
  loadData(): void {
    if (this.medecinId) {
      this.user.getDisponibilite(this.medecinId).subscribe((data: any) => {
        this.disponibilites = data;
      });

      this.user.getRdv(this.medecinId).subscribe((data: any) => {
        this.rdvs = data;
      });
    }
  }

  createDsp(event: Event): void {
    event.preventDefault(); // Empêche le rechargement de la page

    if (!this.date || !this.heure_debut || !this.heure_fin) {
      alert("Veuillez remplir tous les champs (Date, Début, Fin).");
      return;
    }

    const horaire = {
      medecinId: this.medecinId,
      date: this.date,
      heure_debut: this.heure_debut,
      heure_fin: this.heure_fin,
    };

    this.user.createDisponibilite(horaire).subscribe({
      next: (res) => {
        console.log("Succès:", res);
        // Réinitialiser les champs après succès
        this.date = '';
        this.heure_debut = '';
        this.heure_fin = '';
        this.loadData(); // Rafraîchir la liste
      },
      error: (err) => {
        console.error("Erreur API:", err);
        alert(err.error?.error || "Une erreur est survenue");
      }
    });
  }

  deleteDsp(id: string) {
    if(confirm("Supprimer cette disponibilité ?")) {
      this.user.deleteDisponibilite(id).subscribe(() => {
        this.disponibilites = this.disponibilites.filter(d => d.id !== id);
      });
    }
  }

  dec() {
    this.auth.logoutUser();
    this.router.navigate(['/login']);
  }
}