import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { forkJoin, Observable, of } from 'rxjs';
import { mergeMap, take } from 'rxjs/operators';
import { ProductService } from '../services/product.service';
import { CommonService } from '../services/common.service';

@Injectable({
  providedIn: 'root'
})
export class HomeProductResolver implements Resolve<any> {

  constructor(private ps: ProductService, private router: Router, public commonService: CommonService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {

    this.commonService.GetAllProducts();

    if(this.commonService.homepage != null){
      return of(this.commonService.homepage);
    }

    return this.ps.getProducts('').pipe(
      mergeMap((products: any)=> {
        this.commonService.homepage = {products:products};
        return of(this.commonService.homepage);
      }));
  }
}
