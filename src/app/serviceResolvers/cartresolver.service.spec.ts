import { TestBed } from '@angular/core/testing';

import { CartresolverService } from './cartresolver.service';

describe('CartresolverService', () => {
  let resolver: CartresolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(CartresolverService);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
