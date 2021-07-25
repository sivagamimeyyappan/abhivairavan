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
import { ResponseData } from '../Models/response';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class HomeProductResolver implements Resolve<any> {

  constructor(private ps: ProductService, private router: Router, public commonService: CommonService, private snackbar: MatSnackBar) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {

    //this.commonService.GetAllProducts();

    if(this.commonService.homepage != null){
      return of(this.commonService.homepage);
    }

    return this.ps.getHomePage().pipe(
      mergeMap((response: ResponseData)=> {
        if (response.Status == 0) {
          this.snackbar.open(response.Message, 'Dimiss', {panelClass: ['error-snackbar'], verticalPosition: 'top', horizontalPosition:'center'});
        }else{
          this.commonService.homepage = {products:response.Data};
          return of(this.commonService.homepage);
        }
      }));
  }
}
