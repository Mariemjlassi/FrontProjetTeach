import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DevoirService } from '../service/devoir.service';
import { IDevoir } from '../model/idevoir';
import { IDevoirDTO } from '../model/idevoir-dto';

@Component({
    selector: 'app-update-devoir',
    templateUrl: './update-devoir.component.html',
    styleUrls: ['./update-devoir.component.css']
})
export class UpdateDevoirComponent implements OnInit {
    UpdateDevoirForm!: FormGroup;
    devoir!: IDevoir;

    constructor(
        private formBuilder: FormBuilder,
        private activatedRoute: ActivatedRoute,
        private service: DevoirService,
        private router: Router
    ) {}

    ngOnInit(): void {
      this.activatedRoute.params.subscribe((params) => {
          this.service.getDevoirById(+params['id']).subscribe((d) => {
              if (d) {
                  this.devoir = d;
                  console.log(d);
                  this.initializeForm(); // Déplacer ici pour s'assurer que les données sont chargées
              }
          });
      });
  }
  
  initializeForm(): void {
      this.UpdateDevoirForm = this.formBuilder.group({
          description: [this.devoir.description, Validators.required],
          typedevoir: [this.devoir.typedevoir, Validators.required],
          ponderation: [this.devoir.ponderation, Validators.required],
          bareme: [this.devoir.bareme, Validators.required],
          statut: [this.devoir.statut, Validators.required],
          dateLimite: [this.devoir.dateLimite, Validators.required],
      });
  }
  

    updateDevoir(): void {
        if (this.UpdateDevoirForm.invalid) {
            return;
        }

        const values = this.UpdateDevoirForm.value;
        const updatedDevoir: IDevoirDTO = {
            description: values.description,
            typedevoir: values.typedevoir,
            ponderation: values.ponderation,
            bareme: values.bareme,
            statut:values.statut,
            dateLimite: new Date(values.dateLimite),
        };

        this.service.updateDevoir(updatedDevoir, this.devoir.idDevoir).subscribe(() => {
            this.router.navigate(['devoirs']);
        });
    }
}
