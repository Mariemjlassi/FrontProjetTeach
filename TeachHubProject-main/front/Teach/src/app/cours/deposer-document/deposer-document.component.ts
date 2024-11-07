import { Component } from '@angular/core';
import { CoursService } from '../service/cours.service';

@Component({
  selector: 'app-deposer-document',
  templateUrl: './deposer-document.component.html',
  styleUrls: ['./deposer-document.component.css']
})
export class DeposerDocumentComponent {
  selectedFile: File | null = null;
  courId: number = 0; // Vous devez définir cela en fonction de votre logique
  enseignantId: number = 0; // Vous devez définir cela en fonction de votre logique
  isUploading: boolean = false;
  uploadMessage: string = '';
  uploadSuccess: boolean = false;

  constructor(private coursService: CoursService) {}

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  ngOnInit(): void {
    const courIdString = localStorage.getItem('courId');
    const enseignantIdString = localStorage.getItem('enseignantId');
    this.courId = courIdString ? Number(courIdString) : 0;
    this.enseignantId = enseignantIdString ? Number(enseignantIdString) : 0;

    console.log('Cour ID:', this.courId);
    console.log('Enseignant ID:', this.enseignantId);

    if (!this.courId || !this.enseignantId) {
      console.error('Les ID du cours ou de l\'enseignant sont invalides');
    }
  }

  onUpload() {
    if (this.selectedFile) {
      this.isUploading = true;
      this.coursService.uploadDocument(this.selectedFile, this.courId, this.enseignantId)
        .subscribe(
          response => {
            console.log('Error uploading document:', response);
            this.uploadMessage = 'Error uploading document, please try again.';
            this.uploadSuccess = true;
            this.isUploading = false;
          },
          error => {
            console.error( 'Document uploaded successfully:', error);
            this.uploadMessage = 'Document uploaded successfully!';
            this.uploadSuccess = false;
            this.isUploading = false;
          }
        );
    } else {
      alert('Please select a file first.');
    }
  }
}
