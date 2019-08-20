import { TestBed } from '@angular/core/testing';

import { DbMgrService } from './db-mgr.service';

describe('DbMgrService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DbMgrService = TestBed.get(DbMgrService);
    expect(service).toBeTruthy();
  });
});
