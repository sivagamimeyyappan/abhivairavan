import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
  ActivatedRoute
}                                 from '@angular/router';
import { Observable, of, EMPTY }  from 'rxjs';
import { mergeMap, take }         from 'rxjs/operators';
import { CartService } from '../services/cart.service';
import { OrderService } from '../services/order.service';

@Injectable({
  providedIn: 'root'
})
export class CartresolverService {

  constructor(private cs: CartService, private router: Router,  private os: OrderService) { }


  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    
    var orderId = route.paramMap.get('orderId');
    var mode = route.paramMap.get('mode');
    if(orderId == undefined){
      return of({order: this.cs.order});
    }
    else{
      return this.os.getOrder(orderId).pipe(
        take(1),
        mergeMap((order: any)=> {
          if(mode == "edit"){
            console.log(order);
            this.cs.order = order;
            return of({order:this.cs.order});
          }
          else
            return of({order:order});
        })
      );
    }

  }
}
