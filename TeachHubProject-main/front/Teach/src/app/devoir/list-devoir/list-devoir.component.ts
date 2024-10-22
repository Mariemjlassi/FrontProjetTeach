import { Component, OnInit } from '@angular/core';
import { IDevoir } from '../model/idevoir';
import { DevoirService } from '../service/devoir.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-list-devoir',
  templateUrl: './list-devoir.component.html',
  styleUrls: ['./list-devoir.component.css']
})
export class ListDevoirComponent implements OnInit {
  devoirs: IDevoir[] = [];

  constructor(private devoirService: DevoirService,private activatedRoute: ActivatedRoute) {}

  
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((parametres) => {
      this.devoirService.getAllDevoirs(+parametres['id']).subscribe((d) => {
        localStorage.setItem("idCours",parametres['id'])
        if (d) {
          this.devoirs = d;
          
        }
      });
    });
  
  }


  

  downloadPDF(devoirId: number): void {
    this.devoirService.downloadDevoirPDF(devoirId).subscribe((blob: Blob) => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `devoir_${devoirId}.pdf`;
      a.click();
    });
  }
  
}
