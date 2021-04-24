import { TestBed } from '@angular/core/testing';

import { OrderresolverService } from './orderresolver.service';

describe('OrderresolverService', () => {
  let resolver: OrderresolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(OrderresolverService);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
