import { Component } from '@angular/core';
import { Auth } from '../../../services/auth';
import { Router} from '@angular/router';
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
export class Dashmdc {
  medecinId = '';
  date = '';
  heure_debut = '';
  heure_fin = '';

  disponibilites: any[] = [];
  rdvs: any[] = [];

  medecin: any = {};

  constructor(private auth: Auth, private router: Router, private user: User) {}

  ngOnInit(): void {
    if (!this.auth.isAuth()) {
      this.router.navigate(['/login']);
      return;
    }

    this.medecinId = this.auth.getId();
    this.medecin = this.auth.getName(); 

    this.user.getDisponibilite().subscribe((data: any) => {
      this.disponibilites = data;
    });

    this.user.getRdv(this.medecinId).subscribe((data: any) => {
      this.rdvs = data;
    });
  }

  createDsp(): void {
    const horaire = {
      medecinId: this.medecinId,
      date: this.date,
      heure_debut: this.heure_debut,
      heure_fin: this.heure_fin,
    };

    this.user.createDisponibilite(horaire).subscribe({
      next: () => {
        this.user.getDisponibilite().subscribe((data: any) => {
          this.disponibilites = data; 
        });
      },
      error: (err) => console.error(err),
    });
  }

  deleteDsp(id: string) {
    this.user.deleteDisponibilite(id).subscribe(() => {
      this.disponibilites = this.disponibilites.filter(d => d.id !== id);
    });
  }



  dec(){
    this.auth.logoutUser();
    this.router.navigate(['/login']);
  }
}