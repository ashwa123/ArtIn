import { TestBed } from '@angular/core/testing';

import { StateservicechapterService } from './stateservicechapter.service';

describe('StateservicechapterService', () => {
  let service: StateservicechapterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StateservicechapterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
