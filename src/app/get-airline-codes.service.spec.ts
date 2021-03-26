import { TestBed } from '@angular/core/testing';

import { GetAirlineCodesService } from './get-airline-codes.service';

describe('GetAirlineCodesService', () => {
  let service: GetAirlineCodesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetAirlineCodesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
