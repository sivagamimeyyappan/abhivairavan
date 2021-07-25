import { Component, OnInit,Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../services/cart.service';
import { CommonService } from '../services/common.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ResponseData } from '../Models/response';
import { HttpClient } from '@angular/common/http';
import { Product } from '../Models/Product';
import { ProductService } from '../services/product.service';


@Component({
  selector: 'app-product',
  templateUrl: './productsDisplay.component.html',
  styleUrls: ['./productsDisplay.component.css']
})
export class ProductsDisplayComponent implements OnInit {
  products: any = [];
  filterOptions: any = [];
  category: string;
  model: string;
  filterText: string;
  brand: string;
  currentPage: string;
  showSidepanel: boolean;
  snackbarRef: any;
  onScreenProducts: any = [];
  title:string = 'Preview';
  filterCriteria: any = {};
  showModal: boolean = false;
  @Input() imagepath: string; 
  showSpinner: boolean = false;

  imgWidthByCategory = {'BathroomCPFittings': {'min-width': '298px', 'min-height':'298px','max-width': '298px', 'max-height':'298px'},
  'Sanitaryware': {'min-width': '298px', 'min-height':'298px','max-width': '298px', 'max-height':'298px'},
  'ShowerEnclosure': {'min-width': '298px', 'min-height':'298px','max-width': '298px', 'max-height':'298px'},
  'ShowerPanel': {'min-width': '298px', 'min-height':'298px','max-width': '298px', 'max-height':'298px'},
  'BathTub': {'min-width': '298px', 'min-height':'298px','max-width': '298px', 'max-height':'298px'},
  'KitchenSink': {'min-width': '298px', 'min-height':'298px','max-width': '298px', 'max-height':'298px'},
  'PipesandFittings': {'min-width': '298px', 'min-height':'298px','max-width': '298px', 'max-height':'298px'},
  'BrassValvesandFittings': {'min-width': '298px', 'min-height':'298px','max-width': '298px', 'max-height':'298px'},
  'WaterTanks': {'min-width': '298px', 'min-height':'298px','max-width': '298px', 'max-height':'298px'},
  'DomesticPumpsAndMotors': {'min-width': '298px', 'min-height':'298px','max-width': '298px', 'max-height':'298px'},
  'WaterHeaters': {'min-width': '298px', 'min-height':'298px','max-width': '298px', 'max-height':'298px'},
  'Accessories': {'min-width': '298px', 'min-height':'298px','max-width': '298px', 'max-height':'298px'}
};

  cardWidthByCategory = {'BathroomCPFittings': {'width': '300px'},
  'Sanitaryware': {'width': '300px'},
  'ShowerEnclosure': {'width': '300px'},
  'ShowerPanel': {'width': '300px'},
  'BathTub': {'width': '300px'},
  'KitchenSink': {'width': '300px'},
  'PipesandFittings': {'width': '300px'},
  'BrassValvesandFittings': {'width': '300px'},
  'WaterTanks': {'width': '300px'},
  'DomesticPumpsAndMotors': {'width': '300px'},
  'WaterHeaters': {'width': '300px'},
  'Accessories': {'width': '300px'}
};
  
  constructor(private route: ActivatedRoute, public cs: CartService, public commonService: CommonService, private snackbar: MatSnackBar, private ps: ProductService) {
    
  }

  ngOnInit(): void {
    
    this.commonService.observeSidepanel.subscribe(value => {this.showSidepanel = value;});

    this.route.url.subscribe(url => {
      this.currentPage = url[0].path;
    });

    this.route.paramMap.subscribe((parameters) => {
      this.category = parameters.get('category');
      this.model = parameters.get('model');
      this.brand = parameters.get('brand');
      this.filterText = parameters.get('searchText');
    })

    this.route.data.subscribe((data) => {

      if(this.currentPage == 'productsByCategory'){
        this.products = this.commonService.products[this.category].products;
        this.filterOptions = this.commonService.products[this.category].filterOptions;
        this.filterCriteria = this.commonService.products[this.category].filterCriteria;
        this.commonService.setShowSidepanel(true);
        this.commonService.setShowFilterIcon(true);
      }
      else{
        this.category = this.currentPage;
        this.products = this.commonService.products[this.category].products;
        this.commonService.setShowFilterIcon(false);
        this.commonService.setShowSidepanel(false);
        if(this.currentPage == 'productsBySearch'){
          this.commonService.filterText = this.filterText;
        }
      }

      this.onScreenProducts = [];
      this.getNextItems();
      console.log("Products page getNextItems finished");
      
    });
  }

  ngOnDestroy(){
    this.commonService.setShowFilterIcon(false);
    this.commonService.setShowSidepanel(false);
    this.commonService.filterText = "";
  }

  setFilter(brand: string, model: string, selected: boolean, filterOption: any){

    var brcat = brand;
    if(brand == ""){
      brcat = this.category;
    }

    if(this.filterCriteria["$or"] == undefined){
      this.filterCriteria["$or"] = [];
    }

    var index = this.filterCriteria["$or"].findIndex(function(item){
      return item.brand == brand && item.model == model
    });

    if(index == -1 && selected){

      if(model != 'All '+ brcat +' Models'){

        index = this.filterCriteria["$or"].findIndex(function(item) {
          return item.brand == brand && item.model == undefined;
        });

        if(index != -1){
          this.filterCriteria["$or"].splice(index,1);
          filterOption.fltrs[0].selected = false;
        }

        this.filterCriteria["$or"].push({"brand":brand,"model":model});
      }
      else{

        for(var i=1; i<filterOption.fltrs.length; i++){

          filterOption.fltrs[i].selected = false;

          index = this.filterCriteria["$or"].findIndex(function(item) {
            return item.brand == filterOption.fltrTyp;
          });

          if(index != -1){
            this.filterCriteria["$or"].splice(index,1);
          }
        }

        this.filterCriteria["$or"].push({"brand":brand});
      }
    }
    else{

      if(model != 'All '+ brcat +' Models'){
        index = this.filterCriteria["$or"].findIndex(function(item) {
          return item.brand == brand && item.model == model;
        });
      }else{
        index = this.filterCriteria["$or"].findIndex(function(item) {
          return item.brand == brand && item.model == undefined;
        });
      }

      this.filterCriteria["$or"].splice(index,1);
    }

    this.filterCriteria["category"] = this.category;
    this.filterCriteria["isActive"] = true;

    this.resetData();

    if(this.filterCriteria["$or"].length !=0){
      this.showSpinner = true;
      this.loadData();
    }
  }

  loadData(){

    var reqBody = {};
    reqBody["filterCriteria"] = this.filterCriteria;
    reqBody["limit"] = 100;
    reqBody["skip"] = 100 * Math.round(this.products.length/100);


    this.ps.GetProductsByFilter(reqBody).subscribe((response: ResponseData)=> {
      if(response.Status == 1){
        if(response.DataCount == 0){
          this.resetData();
          this.snackbar.open('No Data Available for Selected Filter', 'Dimiss', {panelClass: ['error-snackbar'], verticalPosition: 'top', horizontalPosition:'center'});
        }else{
          this.commonService.products[this.category].count = response.DataCount ? response.DataCount.fltrdCount : 0;
          this.commonService.products[this.category].products.push(...response.Data.map((product: object) => new Product(product,this.category)));
          //this.products.push(...response.Data.map((product: object) => new Product(product,this.category)));
          this.products = this.commonService.products[this.category].products;
        }
        this.getNextItems();

      }else{
        this.resetData();
        this.snackbar.open(response.Message, 'Dimiss', {panelClass: ['error-snackbar'], verticalPosition: 'top', horizontalPosition:'center'});
      }
      this.showSpinner = false;
    });
  }

  highLightCart(data){
    for(var i=0; i<data.length; i++){
      data[i].hghLghtCart = false;
      data[i].qty = 0;
      this.cs.getItems().forEach(function(item){
        if(item.productId == data[i].productId){
          data[i].hghLghtCart = true;
          data[i].qty = item.qty;
        }
      })
    }
  }

  resetData(){
    this.commonService.products[this.category].count = 0;
    this.commonService.products[this.category].products = [];
    this.onScreenProducts = [];
    this.products = [];
  }

  onScrollingFinished() {
    if(this.products.length <  this.commonService.products[this.category].count){
      this.loadData();
    }
    this.getNextItems();
  }

  getNextItems() {
    //console.log(this.onScreenProducts.length+" "+this.products.length);
    if (this.onScreenProducts.length < this.products.length) {
      const remainingLength = Math.min(20, this.products.length - this.onScreenProducts.length);
      var dltaOnScrnPrdcts = this.products.slice(this.onScreenProducts.length, this.onScreenProducts.length + remainingLength);
      this.highLightCart(dltaOnScrnPrdcts);
      this.onScreenProducts.push(...dltaOnScrnPrdcts);
    }
  }

  closefilter(){
    this.commonService.setShowSidepanel(false);
  }

  qtyChange(product){
    if(product.qty % product.unit != 0){
      this.snackbarRef = this.snackbar.open(product.brand+"~"+product.model+"~"+product.productId+" Quantity should be in multiple of "+product.unit,'dismiss',
      {panelClass: ['error-snackbar'], verticalPosition: 'top'});
      this.snackbarRef.afterDismissed().subscribe(()=>{
        this.snackbarRef = null;
      });
      return;
    }
  }

  addToCart(product) {

    if(product.qty == 0){
      return;
    }

    if(product.qty % product.unit != 0){
      if(this.snackbarRef == null){
        this.snackbarRef = this.snackbar.open(product.brand+"~"+product.model+"~"+product.productId+" Quantity should be in multiple of "+product.unit,'dismiss',
        {panelClass: ['error-snackbar'], verticalPosition: 'top'});
        this.snackbarRef.afterDismissed().subscribe(()=>{
          this.snackbarRef = null;
      });
      }
      return;
    }

    let productExist = this.cs.order.items.filter(function(ele){ return ele.productId == product.productId; })[0];
    let DiscountedPrice;

    if(productExist === undefined)
    {
      DiscountedPrice = product.mrp - ((product.disc/100) * product.mrp);
      product.price = product.qty * DiscountedPrice;
      this.cs.order.cartTotal += (product.qty * DiscountedPrice);
      this.cs.addToCart(JSON.parse(JSON.stringify(product)));
    }
    else
    {
      DiscountedPrice = product.mrp - ((productExist.disc/100) * product.mrp);
      this.cs.order.cartTotal -= (productExist.qty * DiscountedPrice);
      if(this.cs.order.taxPercentages.hasOwnProperty(product.tax.toString()))
        this.cs.order.taxPercentages[product.tax.toString()] -= (productExist.qty * DiscountedPrice);
      productExist.qty = product.qty;
      productExist.price = product.qty * DiscountedPrice;
      this.cs.order.cartTotal +=  (product.qty * DiscountedPrice);
    }
    
    if(this.cs.order.taxPercentages.hasOwnProperty(product.tax.toString())){
      this.cs.order.taxPercentages[product.tax.toString()] += (product.qty * DiscountedPrice);
    }
    else{
      this.cs.order.taxPercentages[product.tax.toString()] = (product.qty * DiscountedPrice);
    }

    if(this.cs.order.taxPercentages.hasOwnProperty(product.tax.toString()) && this.cs.order.taxPercentages[product.tax.toString()] == 0){
      delete this.cs.order.taxPercentages[product.tax.toString()];
    }

    //product.qty = 0;
    product.hghLghtCart = true;

    this.snackbar.open('Added To Cart..', '', {panelClass: ['success-snackbar'], verticalPosition: 'top', horizontalPosition:'center', duration:1000});
  }

  toast(){
    var x = document.getElementById("snackbar");
    x.className = "show";
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 500);
  }
  show(event, product)
  {
    this.imagepath = product.img;
    this.showModal = true;

  }
  hide()
  {
    this.showModal = false;
  }

}
