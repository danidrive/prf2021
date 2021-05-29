import { TestBed } from '@angular/core/testing';

import { NodeBackendService } from './node-backend.service';

describe('NodeBackendService', () => {
  let service: NodeBackendService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NodeBackendService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
