import { TestBed } from '@angular/core/testing';

import { OpcService } from './opc.service';

describe('OpcService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OpcService = TestBed.get(OpcService);
    expect(service).toBeTruthy();
  });
});
