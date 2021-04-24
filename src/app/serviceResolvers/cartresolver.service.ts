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
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonService } from '../services/common.service';

@Injectable({
  providedIn: 'root'
})
export class CartresolverService {

  constructor(private cs: CartService, private router: Router,  private os: OrderService, private snackbar: MatSnackBar, private commonService: CommonService) { }


  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    
    var orderId = route.paramMap.get('orderId');
    var mode = route.paramMap.get('mode');
    if(orderId == undefined){
      console.log(this.cs.order);
      return of({order: this.cs.order});
    }
    else{
      return this.os.getOrder(orderId).pipe(
        take(1),
        mergeMap((response: any)=> {
          if(response.Status == 1){
            if(mode == "edit"){
              this.cs.order = response.Data;
              console.log(response);
              console.log(this.cs.order);
              if((this.cs.order.status == 'Submitted'|| this.cs.order.status == 'Cancelled') && this.commonService.user.isAdmin){
                this.cs.order.status = 'Pending';
              }
              return of({order:this.cs.order});
            }
            else
              return of({order:response.Data});
          }
          else{
            this.snackbar.open(response.Message, '', {panelClass: ['error-snackbar'], verticalPosition: 'top', horizontalPosition:'center', duration:2000});
            return of({order:[]});
          }
        })
      );
    }

  }
}
