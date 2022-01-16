import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AsyncSubject, BehaviorSubject, forkJoin, Observable, of } from 'rxjs';
import { Subject } from 'rxjs/internal/Subject';
import { mergeMap } from 'rxjs/operators';
import { PrimaryData } from '../Models/PrimaryData';
import { Product } from '../Models/Product';
import { ProductsData } from '../Models/ProductsData';
import { ResponseData } from '../Models/response';
import { User } from '../Models/User';
import { ProductService } from '../services/product.service';
// import { ManageProductsService } from './manage-products.service';

@Injectable()
export class CommonService {

  showFilterIcon: boolean = false;
  showSidepanel: boolean = false;
  user: User = new User();
  redirectUrl: any =  [];
  products: any = {};
  homepage: any;
  filterText: string = "";
  resetScrollPosition: any = {'X':0, 'Y':0};
  primaryData: PrimaryData = new PrimaryData();

  public GetModelsDataUrl = "https://abhivairavan.online/webapi/essentialdata/GetModels";
  public GetBrandsDataUrl = "https://abhivairavan.online/webapi/essentialdata/GetBrands";
  public GetCategoriesDataUrl = "https://abhivairavan.online/webapi/essentialdata/GetCategories";

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

  constructor(private ps: ProductService, private snackbar: MatSnackBar, private http: HttpClient) { 
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

  getPrimaryData(){

    var GetPrimaryData = [];
    GetPrimaryData.push(this.http.get(this.GetModelsDataUrl));
    GetPrimaryData.push(this.http.get(this.GetBrandsDataUrl));
    GetPrimaryData.push(this.http.get(this.GetCategoriesDataUrl));

    return forkJoin(GetPrimaryData).toPromise().then((results: ResponseData[]) => {
      for(var i=0; i<GetPrimaryData.length; i++){
        if(results[i].Status == 0){
          this.snackbar.open(results[i].Message, '', {panelClass: ['error-snackbar'], verticalPosition: 'top', horizontalPosition:'center', duration:2000});
          this.primaryData = new PrimaryData();
          return;
        }
      }
      this.primaryData.setBrands(results[1].Data);
      this.primaryData.setModels(results[0].Data);
      this.primaryData.setCategories(results[2].Data);
      for(var i=0; i<this.primaryData.getCategories().length; i++){
        this.products[this.primaryData.getCategories()[i]] = new ProductsData();
      }
      this.products["productsBySearch"] = new ProductsData();
      this.products["productsByModel"] = new ProductsData();
    });
  }

  GetAllProducts()
  {
    
    var pullData = [];
    var pullDataCategory = [];
    var result: Product[];

    for(var i=0; i<this.primaryData.getCategories().length; i++){
      if(this.products[this.primaryData.getCategories()[i]] == undefined){
        pullData.push(this.ps.getProducts(this.primaryData.getCategories()[i]));
        pullDataCategory.push(this.primaryData.getCategories()[i]);
      }
    }

    if(pullData.length == 0){
      this.allProductsLoaded.next(true);
      this.allProductsLoaded.complete();
      return;
    }

    forkJoin(pullData).subscribe(
      (results: ResponseData[]) => {
          for(var i=0; i<pullDataCategory.length; i++){
            result = results[i].Data as Product[];
            result = result.map(product => new Product(product,pullDataCategory[i]));
            this.products[pullDataCategory[i]] = new ProductsData();
            this.products[pullDataCategory[i]].products = result;
          }
          this.allProductsLoaded.next(true);
          this.allProductsLoaded.complete();
          console.log("Retrieved all Products");
      });
  }
}
