import { Component } from '@angular/core';
import { ICours } from '../model/icours';
import { CoursService } from '../service/cours.service';
import { Router } from '@angular/router';
import { IEnseignant } from 'src/app/auth/model/ienseignant';
@Component({
  selector: 'app-list-cours',
  templateUrl: './list-cours.component.html',
  styleUrls: ['./list-cours.component.css']
})
export class ListCoursComponent {
  btStyle={'border-radius': '4px','text-align':'center'}
  coursList: any[] = []
  role=localStorage.getItem("role");
  
  coursMap: Map<IEnseignant, ICours> = new Map();
  constructor(private service:CoursService,private router:Router){}
  test!:boolean;
  ngDoCheck(): void {
    let currentroute = this.router.url;
    let role=localStorage.getItem('role');
    let jwt=localStorage.getItem('jwt');
    if(role=='etudiant'){
      this.test=false;
    }
    else{
      this.test=true
    }}
    ngOnInit(): void {
      this.service.getAllCours().subscribe( (cours) => {
        console.log(cours)
            this.coursList = cours;
            },
          
         
      (error) => {
        console.error('Error fetching cours', error);
      });
     
    }
  
    deleteCours(id:number){
      this.service.deleteCours(id).subscribe((response)=>{
        this.router.navigate(['cours']);
        this.ngOnInit();
      })
    }
}
