import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
}                                 from '@angular/router';
import { Observable, of, EMPTY }  from 'rxjs';
import { mergeMap, take }         from 'rxjs/operators';
import { ProductService } from '../services/product.service';
import { CommonService } from '../services/common.service';
import { Product } from '../Models/Product';
import { ResponseData } from '../Models/response';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductsData } from '../Models/ProductsData';

@Injectable({
  providedIn: 'root'
})
export class ProductByCategoryResolver implements Resolve<any>{

  category: string;

  constructor(private ps: ProductService, private router: Router,  public commonService: CommonService, private snackbar: MatSnackBar) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {

    this.category = route.paramMap.get('category');
     if(Object.keys(this.commonService.products[this.category].filterOptions).length != 0){
       return of({});
    }
    else{
      return this.ps.GetFilterOptions().pipe(
        mergeMap((response: ResponseData)=> {

          if (response.Status == 1) {
            var result = response.Data;
            for(var i=0; i< result.length;i++){
              //this.commonService.products[result[i].category] = new ProductsData();
              this.commonService.products[result[i].category].filterOptions = result[i].fltrOptns;
            }
            return of({});
          }
          else{
            this.snackbar.open(response.Message, 'Dimiss', {panelClass: ['error-snackbar'], verticalPosition: 'top', horizontalPosition:'center'});
          }
        })
      );
    }
  }
}
