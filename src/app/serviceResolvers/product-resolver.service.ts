import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
}                                 from '@angular/router';
import { Observable, of, EMPTY }  from 'rxjs';
import { mergeMap, take }         from 'rxjs/operators';
import { ProductService } from '../services/product.service';
import { CommonService } from '../services/common.service';

@Injectable({
  providedIn: 'root'
})
export class ProductResolverService implements Resolve<any>{

  category: string;
  model: string;
  // productsbycategory: any = [];
  // filterOptions: any = [];
  data: any = {products:[], filterOptions:[]};

  constructor(private ps: ProductService, private router: Router,  public commonService: CommonService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {

    var productsbycategory = [];
    var filterOptions = [];

    this.category = route.paramMap.get('category');
    this.model = route.paramMap.get('model');

    if(this.category == undefined){

      return this.ps.getProducts('').pipe(
        take(1),
        mergeMap((products: any)=> {
          return of({products:products});
        }));
    }
    return this.ps.getProducts(this.category).pipe(
      take(1),
      mergeMap((products: any)=> {

        if (products) {

          for(var i=0; i<products.length;i++){
            
              var filterOption = filterOptions.find(
              function(item)
              {
                if(item.brand == products[i].brand){return true;}
              }
              );
    
              if(filterOption == undefined){
                    filterOptions.push({"brand":products[i].brand, "show": true, "models":[{modelname:'All Models',selected:false},{modelname:products[i].model,selected:false}]});
              }
              else if(filterOption.models.find(function(item){if(products[i].model == item.modelname){return true}}) == undefined){
                filterOption.models.push({modelname:products[i].model,selected:false});
              }
        }
        return of({products:products, filterOptions:filterOptions});
        
        }
        return EMPTY;

    
      })
    );
  }
}
