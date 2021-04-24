import { ThrowStmt } from '@angular/compiler';
import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { CommonService } from '../services/common.service';
import { ProductService } from '../services/product.service';

@Injectable({
  providedIn: 'root'
})
export class ProductByModelResolver implements Resolve<any> {

  category: string;
  model: string;
  brand: string;
  products: any;
  

  constructor(private ps: ProductService, private router: Router,  public commonService: CommonService) {}
  
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {

    this.category = route.paramMap.get('category');
    this.model = route.paramMap.get('model');
    this.brand = route.paramMap.get('brand');

    if(this.commonService.products[this.category] !=undefined){
      return this.getProducts(this.commonService.products[this.category].products);
    }
    return this.ps.getProducts(this.category).pipe(
      mergeMap((products: any) => {
        if (products) {
          console.log("products not available");
          this.commonService.products[this.category] = {products:products}
          this.commonService.GetAllProducts();
          return this.getProducts(products);
        }
      })
    );
  }

  getProducts(products){
    var self = this;
    products = products.filter(function(product){
      if(product.category == self.category && product.model == self.model && product.brand == self.brand)
      {
         return true;
      }
    });
    return of({products:products});
  }
}
