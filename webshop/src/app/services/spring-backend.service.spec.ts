import { TestBed } from '@angular/core/testing';

import { SpringBackendService } from './spring-backend.service';

describe('SpringBackendService', () => {
  let service: SpringBackendService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpringBackendService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
