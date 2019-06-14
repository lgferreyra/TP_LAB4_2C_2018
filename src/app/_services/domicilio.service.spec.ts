import { TestBed, inject } from '@angular/core/testing';

import { DomicilioService } from './domicilio.service';

describe('DomicilioService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DomicilioService]
    });
  });

  it('should be created', inject([DomicilioService], (service: DomicilioService) => {
    expect(service).toBeTruthy();
  }));
});
