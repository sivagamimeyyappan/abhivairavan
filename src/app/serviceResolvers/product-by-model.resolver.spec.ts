import { TestBed } from '@angular/core/testing';

import { ProductByModelResolver } from './product-by-model.resolver';

describe('ProductByModelResolver', () => {
  let resolver: ProductByModelResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(ProductByModelResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
