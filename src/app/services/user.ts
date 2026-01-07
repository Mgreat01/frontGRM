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
  

  // receptionniste methodes 
  createRdv(rdv: any){
    return this.http.post(this.apiUrl + "receptionnistes/rendezvous",rdv)
  }

  getAllrdv(){
    return this.http.get(this.apiUrl + "receptionnistes/rendezvous")
  }

  updateRdv(id: string, rdv: string){
    return this.http.put(this.apiUrl + "receptionnistes/rendezvous/" + id, rdv)
  }
  deleteRdv(id: string){
    return this.http.delete(this.apiUrl + "receptionnistes/rendezvous/" + id)
  }
  getAllMdc(){
    return this.http.get(this.apiUrl + "receptionnistes/medecins")
  }
  getAllSymptomes(){
    return this.http.get(this.apiUrl + "receptionnistes/symptomes")
  }

  // patient methodes

  createRdvPatient(rdv: any){
    return this.http.post(this.apiUrl + "auto-schedule",rdv)
  }

  // admin methodes 
  getUtilisateurs(){
    return this.http.get(this.apiUrl + "admin/users")
  }

  getSpecialite(){
    return this.http.get(this.apiUrl + "admin/specialites")
  }

  createUtilisateur(utilisateur: any){
    return this.http.post(this.apiUrl + "admin/utilisateurs",utilisateur)
  }
  createSpecialite(specialite: any){
    return this.http.post(this.apiUrl + "admin/specialites",specialite)
  }
 activerUser(id: number){
  return this.http.patch(this.apiUrl + "admin/utilisateurs/" + id + "/activer", {});
}

}
