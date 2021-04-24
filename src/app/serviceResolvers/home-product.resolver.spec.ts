import { TestBed } from '@angular/core/testing';

import { HomeProductResolver } from './home-product.resolver';

describe('HomeProductResolver', () => {
  let resolver: HomeProductResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(HomeProductResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
