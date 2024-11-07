import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/auth/service/auth.service';

import { map, Observable } from 'rxjs';
import { ISousGroupe } from '../model/isous-groupe';


const BASE_URL = ["http://localhost:9090/"];
@Injectable({
  providedIn: 'root'
})
export class SousGroupeService {
  sousGroupes!:ISousGroupe[];
  constructor(private http:HttpClient,private service:AuthService) { }
  headers= this.service.createAuhtorizationHeader()
  getAllSousgroupes(idCours:number):Observable<ISousGroupe[]>{
    return this.http.get<ISousGroupe[]>(BASE_URL+"sousgroupe/"+idCours, { headers: this.headers! })
  }
  addSousgroupe(sg: ISousGroupe, id: number): Observable<ISousGroupe> {
    return this.http.post<ISousGroupe>(BASE_URL + 'addsousgroupe/' + id, sg, { headers: this.headers! });
  }
  updateSousgroupe(sg: ISousGroupe , id : number):Observable<ISousGroupe>{
    return this.http.put<ISousGroupe>(BASE_URL+"updatesousgroupe/"+id,sg,{headers:this.headers!})
  }
  deleteSousgroupe(id : number):Observable<string>{
    return this.http.delete(BASE_URL+"deletesousgroupe/"+id,{headers:this.headers!, responseType: 'text'})
  }
  getSousgroupeById(id: number): Observable<ISousGroupe | null> {
    return this.getAllSousgroupes(+localStorage.getItem("idCours")!).pipe(
      map(sg => {
        this.sousGroupes=sg;
        return this.sousGroupes.find( s=> s.idSousGroupe === id)||null;
       
      })
    );
  }
  addEtudiantSousGroupe(idSousGroupe: number,email:string){
    return this.http.post(BASE_URL + 'addEtudiantSousgroupe/' + idSousGroupe+'/'+ email , { headers: this.headers! })
  }
}