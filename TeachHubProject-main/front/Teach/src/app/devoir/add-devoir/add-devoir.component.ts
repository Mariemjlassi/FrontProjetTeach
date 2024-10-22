import { Component } from '@angular/core';
import { DevoirService } from '../service/devoir.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { IDevoir } from '../model/idevoir';
import { IDevoirDTO } from '../model/idevoir-dto';

@Component({
  selector: 'app-add-devoir',
  templateUrl: './add-devoir.component.html',
  styleUrls: ['./add-devoir.component.css']
})
export class AddDevoirComponent {

  constructor(private service:DevoirService,private router:Router){}
  subbmited=false;
  pdfFile?: File; 
onFileChange(event: Event) {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files.length) {
    this.pdfFile = input.files[0]; // Stocke le fichier PDF
  }
}
  onSubmit(f:NgForm){
    this.subbmited=true;
    
      if(f.invalid){
        return
      }
      else{
  this.addDevoir(f)
  }
  }
  
  addDevoir(f: NgForm) {
    const formData = new FormData();
    
    // Ajouter les autres champs du formulaire
    formData.append('typedevoir', f.value.typedevoir);
    formData.append('description', f.value.description);
    formData.append('ponderation', f.value.ponderation);
    formData.append('bareme', f.value.bareme);
    formData.append('dateLimite', f.value.dateLimite);
    formData.append('statut', f.value.statut);
    
    // Ajouter le fichier PDF s'il est présent
    if (this.pdfFile) {
      formData.append('pdf', this.pdfFile);
    }

    // Appel du service pour ajouter le devoir avec le fichier
    this.service.addDevoir(formData, 5).subscribe(response => {
      this.router.navigate(['/devoirs']);
    });
  }
}
