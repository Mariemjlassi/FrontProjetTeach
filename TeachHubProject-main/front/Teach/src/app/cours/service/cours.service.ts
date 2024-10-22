import { Injectable } from '@angular/core';
import { ICours } from '../model/icours';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/auth/service/auth.service';
import { map, Observable } from 'rxjs';
import { ICoursDTO } from '../model/icours-dto';
import { IEnseignant } from 'src/app/auth/model/ienseignant';
const BASE_URL = ["http://localhost:9090/"];
@Injectable({
  providedIn: 'root'
})
export class CoursService {
  cours!:ICours[];
  headers= this.service.createAuhtorizationHeader()
  
  
  constructor(private http:HttpClient,private service:AuthService) { }

  getAllCours():Observable<ICours[]>{
    return this.http.get<ICours[]>(BASE_URL+"cours/"+localStorage.getItem("id"),{headers:this.headers!});
  }
  addCours(cours:ICours):Observable<ICours> {
    return this.http.post<ICours>(BASE_URL + "addcour/"+localStorage.getItem("username"),cours,{headers:this.headers!});
  }
  updateCours(cours:ICoursDTO , id : number):Observable<ICours> {
    return this.http.put<ICours>(BASE_URL + "updatecours/"+id,cours,{headers:this.headers!});
  }
  deleteCours(id: number): Observable<string> {
    return this.http.delete(BASE_URL + 'deletecours/'+ id, { headers: this.headers!, responseType: 'text' });
  }
  getCoursById(id: number): Observable<ICours | null> {
    return this.getAllCours().pipe(
      map(cour => {
        this.cours=cour;
        return this.cours.find(c => c.idCours === id)||null;
  
       
      })
    );
  }
  
}
