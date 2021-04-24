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
export class ProductByCategoryResolver implements Resolve<any>{

  category: string;

  constructor(private ps: ProductService, private router: Router,  public commonService: CommonService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {

    this.category = route.paramMap.get('category');

    if(this.commonService.products[this.category] !=undefined && 
      this.commonService.products[this.category].filterOptions != undefined){

      console.log("products and filteroption available");
      var productsbycat = this.commonService.products[this.category];
      return of({products:productsbycat.products, filterOptions:productsbycat.filterOptions, retainProducts: productsbycat.retainProducts});

    }
    else if(this.commonService.products[this.category] != undefined){

      console.log("products available");
      return this.getProducts(this.commonService.products[this.category].products);

    }

    return this.ps.getProducts(this.category).pipe(
      mergeMap((products: any)=> {
        if (products) {
          console.log("products not available");
          return this.getProducts(products);
        }
        //return EMPTY;
      })
    );
  }
  getProducts(products: any)
  {
    if (products) {
      var filterOptions = [];
      for(var i=0; i<products.length;i++){
        
          var filterOption = filterOptions.find(
          function(item)
          {
            if(item.brand == products[i].brand){return true;}
          }
          );

          if(filterOption == undefined){
                filterOptions.push({"brand":products[i].brand, "show": false, "models":[{modelname:'All Models',selected:false},{modelname:products[i].model,selected:false}]});
          }
          else if(filterOption.models.find(function(item){if(products[i].model == item.modelname){return true}}) == undefined){
            filterOption.models.push({modelname:products[i].model,selected:false});
          }
    }
    this.commonService.products[this.category] = {products:products, filterOptions:filterOptions, retainProducts:[]};
    this.commonService.GetAllProducts();
    return of({products:products, filterOptions:filterOptions, retainProducts:[]});
    
    }
  }
}
