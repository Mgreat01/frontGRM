import { Component, OnInit } from '@angular/core';
import { User } from '../../services/user';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-patient-rdv',
  templateUrl: './pat.html',
  styleUrl: './pat.css',
  imports: [CommonModule, FormsModule, RouterLink,RouterModule]
})

export class PatientRdvComponent implements OnInit {
  form = {
    nom_patient: '',
    email_patient: '',
    numero_patient: ''
  };

  listeSymptomes: any[] = [];
  symptomeIds: number[] = [];
  isLoading = false;
  successMessage = '';

  constructor(private userService: User) {}

  ngOnInit() {
    this.fetchSymptomes();
  }

  fetchSymptomes() {
    this.userService.getAllSymptomes().subscribe({
      next: (res: any) => {
        this.listeSymptomes = res.map((s: any) => ({ ...s, selected: false }));
      }
    });
  }

  toggleSymptome(s: any) {
    s.selected = !s.selected;
    if (s.selected) {
      this.symptomeIds.push(s.id);
    } else {
      this.symptomeIds = this.symptomeIds.filter(id => id !== s.id);
    }
  }

  onSubmit() {
    if (this.symptomeIds.length === 0) return;

    this.isLoading = true;
    
    // Le payload ne contient plus date_rdv ni heure_rdv
    const rdvData = {
      ...this.form,
      symptomeIds: this.symptomeIds
    };

    this.userService.createRdvPatient(rdvData).subscribe({
      next: (res: any) => {
        // Le microservice renvoie probablement la date choisie dans 'res'
        this.successMessage = `Rendez-vous planifié avec succès !`;
        this.isLoading = false;
        this.resetForm();
      },
      error: (err) => {
        alert("Erreur d'affectation automatique.");
        this.isLoading = false;
      }
    });
  }

  resetForm() {
    this.form = { nom_patient: '', email_patient: '', numero_patient: '' };
    this.listeSymptomes.forEach(s => s.selected = false);
    this.symptomeIds = [];
  }
}