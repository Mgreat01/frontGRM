import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class User {
  private apiUrl = "http://localhost:5000/api/"

  constructor(private http : HttpClient){}

// medecin methodes 
  createDisponibilite(horaire: any){
    return this.http.post(this.apiUrl + "medecins/disponibilites",horaire)
  }

  getDisponibilite(id: string){
    return this.http.get(this.apiUrl +`medecins/${id}/disponibilites`)
  }

  updateDisponibilite(id: string, horaire: string){
    return this.http.put(this.apiUrl + "medecins/disponibilites/" + id, horaire)
  }

  deleteDisponibilite(id: string){
    return this.http.delete(this.apiUrl + "medecins/disponibilites/" + id)
  }


  getRdv(id: string){
    return this.http.get(this.apiUrl + "medecins/"+id+"/rendezvous")
  }
  
  getSpecialite(){
    return this.http.get(this.apiUrl + "admin/specialites")
  }


}
