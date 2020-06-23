import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CommonService } from '../services/common.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  url: Array<any> = [];
  constructor( private commonService: CommonService, private router: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if(this.commonService.user.loggedIn)
      return true;
    else 
    {
      console.log(state.url);

      var routeurl = state.url.split(";")[0];
      this.url.push(routeurl);
      var optionalParam = state.url.split(";")[1];
      console.log(optionalParam);
      if(optionalParam != undefined)
      {
        var optionalParamObj = {};
        var key = optionalParam.split("=")[0];
        console.log(key);
        var value = optionalParam.split("=")[1];
        console.log(value);
        optionalParamObj[key] = value;
        console.log(optionalParamObj);
        this.url.push(optionalParamObj);
      }

      this.commonService.redirectUrl = this.url;
      // this.commonService.redirectUrl = this.commonService.redirectUrl = ['/cart',{mode:'edit'}];
      //http://localhost:4200/cart/1592-836887-3577;mode=edit
      this.router.navigate(['/login']);
    }
  }
  
}
