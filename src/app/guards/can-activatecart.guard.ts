import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { CommonService } from '../services/common.service';
import { CartService } from '../services/cart.service';

@Injectable({
  providedIn: 'root'
})
export class CanActivatecartGuard implements CanActivate {

  constructor(private cs: CommonService, private cartservice: CartService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      var mode = next.paramMap.get('mode');
      if(mode == "view" || this.cartservice.order.items.length == 0)
        return true;
      else
        return this.cs.confirm("Please save cart before editing order.\n\nAre you sure you want clear the cart?");
  }
}
