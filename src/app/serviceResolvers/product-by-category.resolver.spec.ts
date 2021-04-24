import { TestBed } from '@angular/core/testing';

import { ProductByCategoryResolver } from './product-by-category.resolver';

describe('ProductByCategoryResolver', () => {
  let resolver: ProductByCategoryResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(ProductByCategoryResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
