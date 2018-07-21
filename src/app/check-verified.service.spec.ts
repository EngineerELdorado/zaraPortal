import { TestBed, inject } from '@angular/core/testing';

import { CheckVerifiedService } from './check-verified.service';

describe('CheckVerifiedService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CheckVerifiedService]
    });
  });

  it('should be created', inject([CheckVerifiedService], (service: CheckVerifiedService) => {
    expect(service).toBeTruthy();
  }));
});
