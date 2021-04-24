import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { CommonService } from '../services/common.service';

@Injectable({
  providedIn: 'root'
})
export class SearchResolver implements Resolve<any> {

  filterText: string;
  searchKeys: Array<string>;

  constructor(public commonService: CommonService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {

    console.log('searchText');
    this.commonService.GetAllProducts();
    this.filterText = route.paramMap.get('searchText');
    this.commonService.filterText = this.filterText;
    this.searchKeys = this.filterText.split(' ');
    this.searchKeys = this.removeSpace(this.searchKeys);
    var products = [];
    var self = this;

    return this.commonService.allProductsLoaded.pipe(mergeMap(loaded => {

      for(var i=0; i< this.commonService.categories.length; i++){
        if(this.commonService.products[this.commonService.categories[i]] != undefined)
        {
          products = products.concat(this.commonService.products[this.commonService.categories[i]].products.filter(
            function(product){
              var prodText=product.brand+product.model+product.productId+product.desc;
              prodText = prodText.toLowerCase();
              prodText = prodText.replace(/ /g, '');
              return self.hasSearchText(prodText);
            }
          ));
          console.log(this.commonService.categories[i]+" filtered "+products.length);
        }
      }
      console.log("Total products" + products.length);
      return of({products: products});
    }))
  }

  hasSearchText(prodText){
    var wordMatchCount = 0;
    for(var j=0; j<this.searchKeys.length;j++){
      if(prodText.includes(this.searchKeys[j].toLowerCase())){
        wordMatchCount++;
      }
    }
    if(wordMatchCount == this.searchKeys.length){
      return true;
    }
    else
    {
      return false;
    }
  }

  removeSpace(searchKeys){

    if(searchKeys.includes('')){
      var index = searchKeys.indexOf('');
      searchKeys.splice(index,1);
      this.removeSpace(searchKeys);
    }
    return searchKeys;
    
  }
}
