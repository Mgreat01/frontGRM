import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from '../../services/auth';
import { User } from '../../services/user';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-rgst',
  standalone: true,
  imports: [FormsModule, CommonModule], 
  templateUrl: './rgst.html',
  styleUrl: './rgst.css',
})
export class Rgst {
  noms_complet = '';
  email = '';
  motdepasse = '';
  type = '';
  specialiteId = '';

  specialite: any[] = [];

  constructor(private auth: Auth, private router: Router , private user : User) {}

  ngOnInit(): void {
    this.user.getSpecialite().subscribe((data: any) => {
      this.specialite = data;
    });
  }

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
