import { TestBed } from '@angular/core/testing';

import { PickupTimesService } from './pickup-times.service';

describe('PickupTimesService', () => {
  let service: PickupTimesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PickupTimesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
