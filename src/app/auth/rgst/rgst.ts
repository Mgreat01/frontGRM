import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-rgst',
  standalone: true,
  imports: [FormsModule], 
  templateUrl: './rgst.html',
  styleUrl: './rgst.css',
})
export class Rgst {
  noms_complet = '';
  email = '';
  motdepasse = '';
  type = '';
  specialiteId = '';

  constructor(private auth: Auth, private router: Router) {}

  register(): void {
    const user: any = {
      noms_complet: this.noms_complet,
      email: this.email,
      motdepasse: this.motdepasse,
      type: this.type,
      specialiteId: this.type === 'medecin' ? this.specialiteId : null
    };

    this.auth.registerUser(user).subscribe(() => {
      console.log(user);
      
      console.log('User registered successfully');
      this.router.navigate(['/login']);
    });
  }

  onTypeChange(): void {
    if (this.type !== 'medecin') {
      this.specialiteId = '';
    }
  }
}
