import { ThrowStmt } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { Product } from '../Models/Product';
import { ResponseData } from '../Models/response';
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
  

  constructor(private ps: ProductService, private router: Router,  public commonService: CommonService, private snackbar: MatSnackBar) {}
  
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {

    this.category = route.paramMap.get('category');
    this.model = route.paramMap.get('model');
    this.brand = route.paramMap.get('brand');

    if(!this.category || !this.model || !this.brand){
      return of({});
    }

    var reqBody = {};
    this.commonService.products["productsByModel"].filterCriteria = {category:this.category,brand:this.brand,model:this.model};
    reqBody["filterCriteria"] = this.commonService.products["productsByModel"].filterCriteria;
    reqBody["limit"] = 100;
    reqBody["skip"] = 0;

    return this.ps.GetProductsByFilter(reqBody).pipe(
      mergeMap((response: ResponseData)=> {
      if (response.Status == 0) {
        this.snackbar.open(response.Message, 'Dimiss', {panelClass: ['error-snackbar'], verticalPosition: 'top', horizontalPosition:'center'});
      }else{
        this.commonService.products["productsByModel"].products.push(...response.Data.map((product: object) => new Product(product, undefined)));
        this.commonService.products["productsByModel"].count = response.DataCount ? response.DataCount.fltrdCount : 0;
      }
      return of({});
      })
    );
  }
}
