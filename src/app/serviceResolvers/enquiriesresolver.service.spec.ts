import { TestBed } from '@angular/core/testing';

import { EnquiriesresolverService } from './enquiriesresolver.service';

describe('EnquiriesresolverService', () => {
  let resolver: EnquiriesresolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(EnquiriesresolverService);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
