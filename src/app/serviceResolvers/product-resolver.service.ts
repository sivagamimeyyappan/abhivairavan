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
  filterText: string;
  brand: string;
  // productsbycategory: any = [];
  // filterOptions: any = [];
  data: any = {products:[], filterOptions:[]};

  constructor(private ps: ProductService, private router: Router,  public commonService: CommonService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {

    var productsbycategory = [];
    var filterOptions = [];

    console.log(route.paramMap);
    this.category = route.paramMap.get('category');
    console.log(this.category);
    this.model = route.paramMap.get('model');
    console.log(this.model);
    this.brand = route.paramMap.get('brand');
    console.log(this.brand);
    this.filterText = route.paramMap.get('searchText');
    console.log(this.filterText);

    if(this.category == undefined){
      return this.ps.getProducts('').pipe(
        take(1),
        mergeMap((products: any)=> {
          return of({products:products});
        }));
    }
    if(this.commonService.products[this.category] != undefined){
      var productsbycat = this.commonService.products[this.category];
      return of({products:productsbycat.products, filterOptions:productsbycat.filterOptions, retainProducts: productsbycat.retainProducts});
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
                    filterOptions.push({"brand":products[i].brand, "show": false, "models":[{modelname:'All Models',selected:false},{modelname:products[i].model,selected:false}]});
              }
              else if(filterOption.models.find(function(item){if(products[i].model == item.modelname){return true}}) == undefined){
                filterOption.models.push({modelname:products[i].model,selected:false});
              }
        }
        this.commonService.products[this.category] = {products:products, filterOptions:filterOptions, retainProducts:[]};
        return of({products:products, filterOptions:filterOptions, retainProducts:[]});
        
        }
        return EMPTY;
      })
    );
  }
}
