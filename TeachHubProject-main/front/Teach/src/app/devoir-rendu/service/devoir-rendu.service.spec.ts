import { TestBed } from '@angular/core/testing';

import { DevoirRenduService } from './devoir-rendu.service';

describe('DevoirRenduService', () => {
  let service: DevoirRenduService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DevoirRenduService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
