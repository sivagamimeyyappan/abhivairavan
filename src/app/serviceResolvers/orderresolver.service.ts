import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
}                                 from '@angular/router';
import { Observable, of, EMPTY }  from 'rxjs';
import { mergeMap, take }         from 'rxjs/operators';
import { OrderService } from '../services/order.service';
import { ResponseData } from '../Models/response';
import { MatSnackBar } from '@angular/material/snack-bar';


@Injectable({
  providedIn: 'root'
})
export class OrderresolverService implements Resolve<any>{

  colHeadings: any;
  viewType: string;

  constructor(private os: OrderService, private router: Router, private snackbar: MatSnackBar) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {

    var userId = route.paramMap.get('userId');

    if(userId == undefined){
      return this.os.getAllOrders().pipe(
        mergeMap((response: ResponseData)=> {
          this.colHeadings = ['Order ID','Order Name','Customer ID','Order Date','Order Status','Actions'];
          if(response.Status == 1){
            return of({orders:response.Data, colHeadings:this.colHeadings});
          }
          else{
            this.snackbar.open(response.Message, '', {panelClass: ['error-snackbar'], verticalPosition: 'top', horizontalPosition:'center', duration:2000});

            return of({orders:[], colHeadings:this.colHeadings});
          }
        })
      );
    }
    else{
      return this.os.getCustomerOrders(userId).pipe(
        mergeMap((response: any)=> {
          this.colHeadings = ['Order ID','Order Name','Order Date','Order Status','Actions'];
          if(response.Status == 1){
            return of({orders:response.Data, colHeadings:this.colHeadings});
          }
          else{
            this.snackbar.open(response.Message, '', {panelClass: ['error-snackbar'], verticalPosition: 'top', horizontalPosition:'center', duration:2000});
            return of({orders:[], colHeadings:this.colHeadings});
          }
        })
      );
    }

  }
}
