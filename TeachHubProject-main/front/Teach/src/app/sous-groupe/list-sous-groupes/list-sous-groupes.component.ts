import { Component, OnInit } from '@angular/core';
import { SousGroupeService } from '../service/sous-groupe.service';
import { Router } from '@angular/router';
import { ISousGroupe } from '../model/isous-groupe';
import { CoursService } from 'src/app/cours/service/cours.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-list-sous-groupes',
  templateUrl: './list-sous-groupes.component.html',
  styleUrls: ['./list-sous-groupes.component.css']
})
export class ListSousGroupesComponent implements OnInit{
 
  sgList!:any[];
  constructor(private service:SousGroupeService,private router:Router,private serviceCours:CoursService){}
  allEtudiants!:any[];
  allEtudiantsSg!:any[];
  etudiants!:any[];
  ngOnInit(): void {
   this.serviceCours.getCoursById(+localStorage.getItem("idCours")!).subscribe((c)=>{
    this.allEtudiants=c?.students!
   })
      this.service.getAllSousgroupes(+localStorage.getItem("idCours")!).subscribe( (sg) => {
        console.log(sg)
            this.sgList = sg;
            
            },
          
         
      (error) => {
        console.error('Error fetching cours', error);
      });
    
        
    }
    isPopupVisible = false;
    closePopup() {
      this.isPopupVisible = false;
    }
    selectedEtudiant: any; // Pour stocker l'étudiant sélectionné

ajouterEtudiant(f: NgForm) {
  if (this.selectedEtudiant) {
    this.service.addEtudiantSousGroupe(this.idSg, this.selectedEtudiant).subscribe(
      (response) => {
        console.log('Étudiant ajouté avec succès');
        this.closePopup(); // Fermer le popup après l'ajout
      },
      (error) => {
        console.error('Erreur lors de l\'ajout de l\'étudiant', error);
      }
    );
  }
}

onEtudiantSelect(etudiant: any) {
  this.selectedEtudiant = etudiant; // Assigne l'étudiant sélectionné
}

    idSg!:number
    showPopup(id: number) {
      this.isPopupVisible = true;
      this.idSg = id;
      this.service.getSousgroupeById(id).subscribe((sg) => {
        this.allEtudiantsSg = sg?.etudiants || [];
        
        // Filtrer pour obtenir les étudiants qui ne sont pas dans allEtudiantsSg
        this.etudiants = this.allEtudiants.filter(etudiant =>
          !this.allEtudiantsSg.some(sgEtudiant => sgEtudiant.id === etudiant.id)
        );
      });
    
    }
    
   
}