import { Component } from '@angular/core';
import { User } from '../../../services/user';
import { Auth } from '../../../services/auth';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashad',
  imports: [CommonModule, FormsModule],
  templateUrl: './dashad.html',
  styleUrl: './dashad.css',
})
export class Dashad {
 utilisateurs: any[] = [];
 specialites: any[] = [];
 nom = '';
 prenom = '';
 email = '';
 password = '';
 role = '';
 specialiteId = '';
 nomSpecialite = '';

 constructor(private user: User , private auth: Auth , private router: Router){}

 ngOnInit(): void {
  if (!this.auth.isAuth()) {
    this.router.navigate(['/login']);
    return;
  }

  this.user.getUtilisateurs().subscribe((data: any) => {
    this.utilisateurs = data.utilisateurs;
  });
  this.user.getSpecialite().subscribe((data: any) => {
    this.specialites = data;
  });
}

createUtilisateur(){
  const utilisateur = {
    noms_complet: this.nom,
    prenom: this.prenom,
    email: this.email,
    motdepasse: this.password,
    type: this.role,
    specialiteId: this.specialiteId
  };

  this.user.createUtilisateur(utilisateur).subscribe({
    next: () => {
      this.utilisateurs.push(utilisateur);
      this.nom = '';
      this.prenom = '';
      this.email = '';
      this.password = '';
      this.role = '';
      this.specialiteId = '';
    },
    error: (err) => console.error(err),
  });
}


createSpecialite(){
  const specialite = {
    nom: this.nomSpecialite,
  };

  this.user.createSpecialite(specialite).subscribe({
    next: () => {
      this.specialites.push(specialite);
      this.nomSpecialite = '';
    },
    error: (err) => console.error(err),
  });
}


activerUser(id: any){
  this.user.activerUser(id).subscribe({
    next: () => {
      this.utilisateurs = this.utilisateurs.map((user: any) => {
        if (user.id === id) {
          user.actif = !user.actif;
        }
        return user;
      });
    },
    error: (err) => console.error(err),
  });
}
dec(){
    this.auth.logoutUser();
    this.router.navigate(['/login']);
  }
}