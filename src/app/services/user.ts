import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class User {
  private apiUrl = "http://localhost:5000/api/"

  constructor(private http : HttpClient){}

// medecin methodes 
  createDisponibilite(horaire: string){
    return this.http.post(this.apiUrl + "disponibilites",horaire)
  }

  getDisponibilite(){
    return this.http.get(this.apiUrl + "disponibilites")
  }

  updateDisponibilite(id: string, horaire: string){
    return this.http.put(this.apiUrl + "disponibilites/" + id, horaire)
  }

  deleteDisponibilite(id: string){
    return this.http.delete(this.apiUrl + "disponibilites/" + id)
  }


  getRdv(id: string){
    return this.http.get(this.apiUrl + "/medecins/"+id+"/rendezvous")
  }


  
}
