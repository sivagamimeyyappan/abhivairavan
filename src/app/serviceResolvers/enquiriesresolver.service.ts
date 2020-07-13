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
import { EnquiriesService } from '../services/enquiries.service';

@Injectable({
  providedIn: 'root'
})
export class EnquiriesresolverService  implements Resolve<any>{

  colHeadings: any;

  constructor(private es: EnquiriesService, private router: Router, private snackbar: MatSnackBar) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.es.getEnquiries().pipe(
      take(1),
      mergeMap((response: ResponseData)=> {
        this.colHeadings = ['Question','Email','Phone','Enquiry Date'];
        if(response.Status == 1){
          return of({enquiries:response.Data, colHeadings:this.colHeadings});
        }
        else{
          this.snackbar.open(response.Message, '', {panelClass: ['error-snackbar'], verticalPosition: 'top', horizontalPosition:'center', duration:2000});

          return of({enquiries:[], colHeadings:this.colHeadings});
        }
      })
    );
  }
}
