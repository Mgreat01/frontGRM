import { Component } from '@angular/core';
import { Auth } from '../../../services/auth';
import { User } from '../../../services/user';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashrec',
  imports: [FormsModule, CommonModule],
  templateUrl: './dashrec.html',
  styleUrl: './dashrec.css',
})
export class Dashrec {
nom_patient = '';
email_patient = '';
numero_patient = '';
symptome = '';
date_rdv = '';
heure_rdv = '';
specialiteId = '';
medecinId = '';

disponibilites: any[] = [];
rdvs: any[] = [];
medecins: any[] = [];

constructor(private auth: Auth, private router: Router, private user: User) {}

ngOnInit(): void {
  if (!this.auth.isAuth()) {
    this.router.navigate(['/login']);
    return;
  }

  this.user.getAllrdv().subscribe((data: any) => {
    this.rdvs = data;
  });
  this.user.getDisponibilite(this.auth.getId()).subscribe((data: any) => {
    this.disponibilites = data;
  });
  this.user.getAllMdc().subscribe((data: any) => {
    this.medecins = data;
  });
}

createRdv() {
    if (!this.nom_patient || !this.date_rdv || !this.heure_rdv || !this.medecinId) {
      alert("Veuillez remplir tous les champs obligatoires !");
      return;
    }

    const rdv = {
      nom_patient: this.nom_patient,
      email_patient: this.email_patient,
      numero_patient: this.numero_patient,
      symptome: this.symptome,
      date_rdv: this.date_rdv,
      heure_rdv: this.heure_rdv,
      specialiteId: this.specialiteId ? parseInt(this.specialiteId) : null,
      medecinId: parseInt(this.medecinId), 
    };

    this.user.createRdv(rdv).subscribe({
      next: () => {
        
        this.user.getAllrdv().subscribe((data: any) => (this.rdvs = data));
        this.nom_patient = '';
        this.email_patient = '';
        this.numero_patient = '';
        this.symptome = '';
        this.date_rdv = '';
        this.heure_rdv = '';
        this.specialiteId = '';
        this.medecinId = '';
      },
      error: (err) => console.error("Erreur création RDV:", err),
    });
  }
dec(){
    this.auth.logoutUser();
    this.router.navigate(['/login']);
  }
}
