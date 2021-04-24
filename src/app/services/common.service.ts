import { Injectable } from '@angular/core';
import { AsyncSubject, BehaviorSubject, forkJoin, Observable, of } from 'rxjs';
import { Subject } from 'rxjs/internal/Subject';
import { User } from '../Models/User';
import { ProductService } from '../services/product.service';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  showFilterIcon: boolean = false;
  showSidepanel: boolean = false;
  user: User = new User();
  redirectUrl: any =  [];
  products: any={};
  homepage: any;
  filterText: string = "";
  resetScrollPosition: any = {'X':0, 'Y':0};

  categories = ['BathroomCPFittings', 'DomesticPumpsAndMotors', 'PipesandFittings', 'Sanitaryware',
     'WaterTanks', 'KitchenSink', 'BathTub', 'ShowerEnclosure', 'ShowerPanel', 'BrassValvesandFittings',
    'WaterHeaters', 'MirrorCabinet', 'Accessories'];

  statusColors: object = {
    'Pending':{'color': 'orange'}, 
    'Completed':{'color':'Green'}, 
    'Cancelled':{'color':'red'},
    'In Cart':{'color':'blue'},
    'Submitted':{'color':'deepskyblue'}
  };

  private filterIcon = new BehaviorSubject<boolean>(this.showFilterIcon);
  public observeFilterIcon = this.filterIcon.asObservable();

  private sidePanel = new BehaviorSubject<boolean>(this.showSidepanel);
  public observeSidepanel = this.sidePanel.asObservable();

  public allProductsLoaded = new AsyncSubject<boolean>();
  // private FilterTextSubject = new BehaviorSubject<string>(this.FilterText);
  // public observeFilterText = this.FilterTextSubject.asObservable();

  constructor(private ps: ProductService) { 
  }

  setShowFilterIcon(value: boolean) {
    this.showFilterIcon = value;
    this.filterIcon.next(value);
  }

  setShowSidepanel(value: boolean) {
    this.showSidepanel = value;
    this.sidePanel.next(value);
  }

  // FilterTextChange(value: string){
  //   this.FilterText = value;
  //   this.FilterTextSubject.next(value);
  // }
  
  getDateObject(date){
    return new Date(JSON.parse(date))
  }
  confirm(message?: string): Observable<boolean> {
    const confirmation = window.confirm(message || 'Is it OK?');

    return of(confirmation);
  };

  GetAllProducts()
  {
    
    var pullData = [];
    var pullDataCategory = [];

    for(var i=0; i<this.categories.length; i++){
      if(this.products[this.categories[i]] == undefined){
        pullData.push(this.ps.getProducts(this.categories[i]));
        pullDataCategory.push(this.categories[i]);
      }
    }

    if(pullData.length == 0){
      this.allProductsLoaded.next(true);
      this.allProductsLoaded.complete();
      return;
    }

    forkJoin(pullData).subscribe(
        results => {
          for(var i=0; i<pullDataCategory.length; i++){
            this.products[pullDataCategory[i]] = {products:results[i]};
          }
          this.allProductsLoaded.next(true);
          this.allProductsLoaded.complete();
          console.log("Retrieved all Products");
      });
  }
}
