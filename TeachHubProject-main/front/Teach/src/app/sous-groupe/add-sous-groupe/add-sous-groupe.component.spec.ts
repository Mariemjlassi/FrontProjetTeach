import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSousGroupeComponent } from './add-sous-groupe.component';

describe('AddSousGroupeComponent', () => {
  let component: AddSousGroupeComponent;
  let fixture: ComponentFixture<AddSousGroupeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddSousGroupeComponent]
    });
    fixture = TestBed.createComponent(AddSousGroupeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
