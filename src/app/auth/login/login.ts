import { Component, OnInit } from '@angular/core';
import { Auth } from '../../services/auth';
import { Router, RouterModule } from '@angular/router';
import { Utilisateur } from '../../models/utilisateur';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  email = '';
  motdepasse = '';
  errorMessage = '';

  constructor(private auth: Auth, private router: Router) {}

  login(): void {
    
    const user: any = {
      email: this.email,
      motdepasse: this.motdepasse
    };

    this.auth.loginUser(user).subscribe({
      next: (res: any) => {
        if (res?.token) {
          this.auth.setToken(res.token);
          this.auth.setId(res.user.id);
          this.auth.setName(res.user.name);
          this.auth.setType(res.user.type);
          if (res.user.type === 'medecin') {
            this.router.navigate(['/medecin']);
          } else if (res.user.type === 'receptionniste') {
            this.router.navigate(['/receptionniste']);
          } else if (res.user.type === 'admin') {
            this.router.navigate(['/admin']);
          } else if (res.type === 'patient') {
            this.router.navigate(['/patient']);
          }
        }
      },
      error: (err) => {
        console.error('Erreur de connexion', err);
        this.errorMessage = 'Email ou mot de passe incorrect';
      }
    });
  }
}