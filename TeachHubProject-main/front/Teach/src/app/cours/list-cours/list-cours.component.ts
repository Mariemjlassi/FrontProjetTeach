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
  documentsList: any[] = [];
  errorMessage: string = '';
  successMessage: string = '';

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
    const userEmail = localStorage.getItem('email');
  
    if (role === 'enseignant' && userId) {
      // Récupération des cours en tant qu'enseignant principal
      this.service.getCoursByEnseignantId(+userId).subscribe(
        (cours) => {
          console.log('Cours reçus en tant qu\'enseignant principal:', cours);
          this.coursList = cours;
        },
        (error) => {
          console.error('Erreur lors de la récupération des cours pour l\'enseignant principal', error);
        }
      );
  
      // Vérification des cours en tant qu'enseignant invité
      if (userEmail) {
        this.getCoursesForInvitedTeacher(userEmail);
      } else {
        console.error('E-mail de l\'enseignant non trouvé dans le stockage local.');
      }
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
  
  getCoursesForInvitedTeacher(teacherEmail: string) {
    this.service.getCoursesForInvitedTeacher(teacherEmail).subscribe(
      (cours) => {
        this.coursList = cours;
      },
      (error) => {
        console.error("Erreur lors de la récupération des cours pour l'enseignant invité", error);
      }
    );
  }
  

  deleteCours(id: number) {
    this.service.deleteCours(id).subscribe((response) => {
      this.ngOnInit();
    });
  }

  joinCourse() {
    this.errorMessage = ''; // Réinitialise le message d'erreur avant de rejoindre
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
            this.errorMessage = 'Code de cours incorrect ou vous n\'avez pas la permission de rejoindre ce cours.';
          }
        );
      }
    }
  }

  inviteStudentByEmail() {
    this.successMessage = ''; // Réinitialiser le message de succès
    this.errorMessage = '';   // Réinitialiser le message d'erreur
    if (this.courseCode.trim() && this.studentEmail.trim()) {
      this.service.inviteStudentByEmail(this.courseCode, this.studentEmail).subscribe(
        (response) => {
          console.log('Invitation envoyée avec succès à :', this.studentEmail);
          this.successMessage = 'Invitation envoyée avec succès à ' + this.studentEmail;
          this.studentEmail = '';  // Réinitialiser le champ d'email
        },
        (error) => {
          console.error('Erreur lors de l\'envoi de l\'invitation :', error);
          this.errorMessage = 'Une erreur est survenue lors de l\'envoi de l\'invitation.';
        }
      );
    } else {
      console.warn('Veuillez remplir le code du cours et l\'email de l\'étudiant.');
      this.errorMessage = 'Veuillez remplir tous les champs.';
    }
  }
  onSelectCourse(coursId: number) {
    localStorage.setItem("courId", coursId.toString());
    
    const enseignant = this.coursList.find(c => c.idCours === coursId)?.enseignantId; // Assurez-vous que 'enseignantId' est bien la clé
    if (enseignant) {
      

        localStorage.setItem("enseignantId", enseignant.toString());
    } else {
        console.error('Aucun enseignant trouvé pour le cours:', coursId);
    }

    this.router.navigate(['/cours/deposer-document']);
}


  }