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
  coursList: any[] = [];
  courseCode: string = '';
  studentEmail: string = '';
  role=localStorage.getItem("role");
  
  
  coursMap: Map<IEnseignant, ICours> = new Map();
  constructor(private service:CoursService,private router:Router){}
  test!:boolean;
  ngDoCheck(): void {
    let role = localStorage.getItem('role');
    this.test = role !== 'etudiant';
  }

  ngOnInit(): void {
    const role = localStorage.getItem('role');
    const userId = localStorage.getItem('id');

    if (role === 'enseignant' && userId) {
        this.service.getCoursByEnseignantId(+userId).subscribe(
            (cours) => {
                console.log('Cours reçus:', cours);  // Log pour vérifier les données reçues
                this.coursList = cours;
            },
            (error) => {
                console.error('Erreur lors de la récupération des cours pour l\'enseignant', error);
            }
        );
    } else if (role === 'etudiant' && userId) {
        this.service.getCoursByStudentId(+userId).subscribe(
            (cours) => {
                this.coursList = cours;
            },
            (error) => {
                console.error('Erreur lors de la récupération des cours pour l\'étudiant', error);
            }
        );
    }
}


  deleteCours(id: number) {
    this.service.deleteCours(id).subscribe((response) => {
      this.ngOnInit();
    });
  }

  joinCourse() {
    if (this.courseCode.trim()) {
      const studentId = localStorage.getItem("id"); 
      if (studentId) {
        this.service.inviteStudentById(this.courseCode, +studentId).subscribe(
          (response) => {
            console.log('Cours rejoint avec succès :', response);
            this.ngOnInit(); 
          },
          (error) => {
            console.error('Erreur lors de la tentative de rejoindre le cours :', error);
          }
        );
      }
    }
  }

  inviteStudentByEmail() {
    if (this.courseCode.trim() && this.studentEmail.trim()) {
      this.service.inviteStudentByEmail(this.courseCode, this.studentEmail).subscribe(
        (response) => {
          console.log('Invitation envoyée avec succès à :', this.studentEmail);
          this.studentEmail = '';  // Réinitialiser le champ d'email
        },
        (error) => {
          console.error('Erreur lors de l\'envoi de l\'invitation :', error);
        }
      );
    } else {
      console.warn('Veuillez remplir le code de cours et l\'email de l\'étudiant.');
    }
  }
}