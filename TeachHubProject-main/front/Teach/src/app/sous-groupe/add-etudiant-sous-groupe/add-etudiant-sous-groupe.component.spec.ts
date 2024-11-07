import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEtudiantSousGroupeComponent } from './add-etudiant-sous-groupe.component';

describe('AddEtudiantSousGroupeComponent', () => {
  let component: AddEtudiantSousGroupeComponent;
  let fixture: ComponentFixture<AddEtudiantSousGroupeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddEtudiantSousGroupeComponent]
    });
    fixture = TestBed.createComponent(AddEtudiantSousGroupeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
