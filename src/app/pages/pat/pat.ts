import { Component, OnInit } from '@angular/core';
import { User } from '../../services/user';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-patient-rdv',
  templateUrl: './pat.html',
  styleUrl: './pat.css',
  imports: [CommonModule, FormsModule]
})
export class PatientRdvComponent implements OnInit {

  form = {
    nom_patient: '',
    email_patient: '',
    numero_patient: '',
    date_rdv: '',
    heure_rdv: ''
  };

  listeSymptomes: any[] = [];
  symptomeIds: number[] = [];
  isLoading = false;
  successMessage = '';

  constructor(private user: User) {} 

  ngOnInit() {
    this.fetchSymptomes();
  }

  fetchSymptomes() {
    this.user.getAllSymptomes().subscribe({
      next: (res: any) => {
        this.listeSymptomes = res.map((s: any) => ({ ...s, selected: false }));
      },
      error: (err) => console.error("Erreur symptômes", err)
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
    if (this.symptomeIds.length === 0) {
      alert("Veuillez sélectionner au moins un symptôme.");
      return;
    }

    this.isLoading = true;
  
    const rdvData = {
      ...this.form,
      symptomeIds: this.symptomeIds
    };

   
    this.user.createRdvPatient(rdvData).subscribe({
      next: (res: any) => {
        this.successMessage = "Analyse effectuée. Votre rendez-vous a été planifié avec le spécialiste adapté.";
        this.isLoading = false;
        this.resetForm();
      },
      error: (err) => {
        console.error(err);
        alert("Erreur lors de l'auto-scheduling. Veuillez réessayer.");
        this.isLoading = false;
      }
    });
  }

  resetForm() {
    this.form = { nom_patient: '', email_patient: '', numero_patient: '', date_rdv: '', heure_rdv: '' };
    this.listeSymptomes.forEach(s => s.selected = false);
    this.symptomeIds = [];
  }
}