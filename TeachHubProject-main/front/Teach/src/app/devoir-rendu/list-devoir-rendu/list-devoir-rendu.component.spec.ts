import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDevoirRenduComponent } from './list-devoir-rendu.component';

describe('ListDevoirRenduComponent', () => {
  let component: ListDevoirRenduComponent;
  let fixture: ComponentFixture<ListDevoirRenduComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListDevoirRenduComponent]
    });
    fixture = TestBed.createComponent(ListDevoirRenduComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
