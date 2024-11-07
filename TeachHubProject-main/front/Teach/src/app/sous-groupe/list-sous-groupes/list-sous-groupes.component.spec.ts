import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSousGroupesComponent } from './list-sous-groupes.component';

describe('ListSousGroupesComponent', () => {
  let component: ListSousGroupesComponent;
  let fixture: ComponentFixture<ListSousGroupesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListSousGroupesComponent]
    });
    fixture = TestBed.createComponent(ListSousGroupesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
