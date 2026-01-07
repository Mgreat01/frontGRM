import { Component, OnInit } from '@angular/core';
import { Auth } from '../../../services/auth';
import { User } from '../../../services/user';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { forkJoin } from 'rxjs'; 

@Component({
  selector: 'app-dashrec',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './dashrec.html',
  styleUrl: './dashrec.css',
})
export class Dashrec implements OnInit {
  form = {
    nom_patient: '',
    email_patient: '',
    numero_patient: '',
    date_rdv: '',
    heure_rdv: '',
    medecinId: ''
  };

  symptomeIds: number[] = []; 
  rdvs: any[] = [];
  medecins: any[] = [];
  listeSymptomes: any[] = [];
  isLoading = false; 
  today: Date = new Date();

  constructor(private auth: Auth, private router: Router, private user: User) {}

  ngOnInit(): void {
    if (!this.auth.isAuth()) {
      this.router.navigate(['/login']);
      return;
    }
    this.loadInitialData();
  }

  
  loadInitialData() {
  this.isLoading = true;
  forkJoin({
    rdvs: this.user.getAllrdv(),
    medecins: this.user.getAllMdc(),
    symptomes: this.user.getAllSymptomes()
  }).subscribe({
    next: (res: any) => { 
      this.rdvs = res.rdvs as any[]; 
      this.medecins = res.medecins as any[];
      
      this.listeSymptomes = (res.symptomes as any[]).map((s: any) => ({ 
        ...s, 
        selected: false 
      }));
      
      this.isLoading = false;
    },
    error: (err) => {
      console.error("Erreur chargement:", err);
      this.isLoading = false;
    }
  });
}

  toggleSymptome(symptome: any) {
    symptome.selected = !symptome.selected;
    this.updateSymptomeIds();
  }

  private updateSymptomeIds() {
    this.symptomeIds = this.listeSymptomes
      .filter(s => s.selected)
      .map(s => s.id);
  }

  createRdv() {
    if (!this.form.nom_patient || !this.form.date_rdv || !this.form.heure_rdv || !this.form.medecinId || this.symptomeIds.length === 0) {
      alert(" Formulaire incomplet !");
      return;
    }

    const payload = {
      ...this.form,
      symptomeIds: this.symptomeIds,
      medecinId: parseInt(this.form.medecinId)
    };

    this.user.createRdv(payload).subscribe({
      next: () => {
        alert(" Rendez-vous enregistré");
        this.resetForm();
        this.refreshRdvs();
      },
      error: (err) => alert("Erreur : " + err.error?.message)
    });
  }

  refreshRdvs() {
  this.user.getAllrdv().subscribe((data: any) => {
    this.rdvs = data as any[];
  });
}

  resetForm() {
    this.form = {
      nom_patient: '',
      email_patient: '',
      numero_patient: '',
      date_rdv: '',
      heure_rdv: '',
      medecinId: ''
    };
    this.listeSymptomes.forEach(s => s.selected = false);
    this.symptomeIds = [];
  }

  dec() {
    this.auth.logoutUser();
    this.router.navigate(['/login']);
  }
}