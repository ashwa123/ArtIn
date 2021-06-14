import { TestBed } from '@angular/core/testing';

import { ArtinService } from './artin.service';

describe('ArtinService', () => {
  let service: ArtinService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArtinService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
