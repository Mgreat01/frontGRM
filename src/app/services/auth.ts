import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Utilisateur } from '../models/utilisateur';

@Injectable({
  providedIn: 'root',
})
export class Auth {
   private apiUrl = "http://localhost:5000/api/"

  constructor( private http : HttpClient){}


  // creation compte ustilisateur 

  registerUser(user : Utilisateur){
    return this.http.post(this.apiUrl + "admin/utilisateurs",user)
  }

  // authentification 

  loginUser(user : Utilisateur){
    return this.http.post(`${this.apiUrl}utilisateurs/login`,user)
  }

  //  recuperer le token 

  getToken(){
    return localStorage.getItem('token')
  }

  // stocker le token

  setToken(token : string){
    return localStorage.setItem('token',token)
  }

  // supprimer le token 

  removeToken(){
    return localStorage.removeItem('token')
  }

  // verification de l'authentification 

  isAuth(){
    return this.getToken() !== null
  }
}
