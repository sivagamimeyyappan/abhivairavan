import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { mergeMap, retry } from 'rxjs/operators';
import { Product } from '../Models/Product';
import { ProductsData } from '../Models/ProductsData';
import { ResponseData } from '../Models/response';
import { CommonService } from '../services/common.service';
import { ProductService } from '../services/product.service';

@Injectable({
  providedIn: 'root'
})
export class SearchResolver implements Resolve<any> {

  filterText: string;
  searchKeys: Array<string>;

  constructor(public commonService: CommonService, private ps: ProductService, private snackbar: MatSnackBar) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {

    //console.log('searchText');
    this.filterText = route.paramMap.get('searchText');
    if(this.filterText == ''){
      return of({products: []});
    }
    this.commonService.filterText = this.filterText;

    this.commonService.products["productsBySearch"].filterCriteria = this.filterText
    var reqBody = {};
    reqBody["filterCriteria"] = this.commonService.products["productsBySearch"].filterCriteria;
    reqBody["limit"] = 100;
    reqBody["skip"] = 0;

    return this.ps.GetProductsBySearch(reqBody).pipe(
      mergeMap((response: ResponseData)=> {

        if (response.Status == 0) {
          this.snackbar.open(response.Message, 'Dimiss', {panelClass: ['error-snackbar'], verticalPosition: 'top', horizontalPosition:'center'});
        }else{
          this.commonService.products["productsBySearch"].products=[];
          this.commonService.products["productsBySearch"].products.push(...response.Data.map((product: object) => new Product(product, undefined)));
          this.commonService.products["productsBySearch"].count = response.DataCount.fltrdCount;
        }
        return of({});
      })
    );
  }
}
