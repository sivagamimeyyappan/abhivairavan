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

    var userId = route.paramMap.get('userId');

    if(userId == undefined){
      return this.os.getAllOrders().pipe(
        take(1),
        mergeMap((orders: any)=> {
          this.colHeadings = ['Order ID','Order Name','Customer ID','Customer Name','Order Date','Order Status','Actions'];
          return of({orders:orders.Data, colHeadings:this.colHeadings});
        })
      );
    }
    else{
      return this.os.getCustomerOrders(userId).pipe(
        take(1),
        mergeMap((orders: any)=> {
          this.colHeadings = ['Order ID','Order Name','Order Date','Order Status','Actions'];
          return of({orders:orders, colHeadings:this.colHeadings});
        })
      );
    }

  }
}
