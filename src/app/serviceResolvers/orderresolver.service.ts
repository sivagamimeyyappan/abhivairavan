import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
}                                 from '@angular/router';
import { Observable, of, EMPTY }  from 'rxjs';
import { mergeMap, take }         from 'rxjs/operators';
import { OrderService } from '../services/order.service';


@Injectable({
  providedIn: 'root'
})
export class OrderresolverService implements Resolve<any>{

  colHeadings: any;
  viewType: string;

  constructor(private os: OrderService, private router: Router) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {

    var customerId = route.paramMap.get('customerId');

    if(customerId == undefined){
      return this.os.getAllOrders().pipe(
        take(1),
        mergeMap((orders: any)=> {
          this.colHeadings = ['Order No','Order Name','Customer ID','Customer Name','Order Date','Order Status','Actions'];
          return of({orders:orders, colHeadings:this.colHeadings});
        })
      );
    }
    else{
      return this.os.getCustomerOrders(customerId).pipe(
        take(1),
        mergeMap((orders: any)=> {
          this.colHeadings = ['Order No','Order Name','Order Date','Order Status','Actions'];
          return of({orders:orders, colHeadings:this.colHeadings});
        })
      );
    }

  }
}
