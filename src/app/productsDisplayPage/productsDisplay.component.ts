import { Component, OnInit,HostListener, ElementRef,Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../services/cart.service';
import { CommonService } from '../services/common.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-product',
  templateUrl: './productsDisplay.component.html',
  styleUrls: ['./productsDisplay.component.css']
})
export class ProductsDisplayComponent implements OnInit {
  products: any = [];
  allProducts: any;
  filterOptions: any = [];
  filteredOptions:any = [];
  category: string;
  model: string;
  filterText: string;
  brand: string;
  currentPage: string;
  showSidepanel: boolean;
  snackbarRef: any;
  onScreenProducts: any = [];
  title:string = 'Preview';
  showModal: boolean = false;
  @Input() imagepath: string; 

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
  
  constructor(private route: ActivatedRoute, public cs: CartService, public commonService: CommonService, private snackbar: MatSnackBar, private ele: ElementRef) {
    
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

      this.allProducts = data.response.products;
      this.filterOptions = data.response.filterOptions;
      this.products = [];
      this.filteredOptions = [];
      var self = this;
      
      if(this.currentPage == 'productsByCategory'){
        this.products = this.commonService.products[this.category].retainProducts;
        this.commonService.setShowSidepanel(true);
        this.commonService.setShowFilterIcon(true);
      }
      else{
        this.products = this.allProducts;
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

  setFilter(filteredOption, selected, filterOption){

    if(!this.filteredOptions.includes(filteredOption) && selected){

      if(!filteredOption.includes('All Models')){
        var index = this.filteredOptions.indexOf(filterOption.brand+'-All Models');
        if(index != -1){
          this.filteredOptions.splice(index,1);
          filterOption.models[0].selected = false;
        }
      }

      if(filteredOption.includes('All Models')){
        for(var i=1; i<filterOption.models.length; i++){
          filterOption.models[i].selected = false;
          var index = this.filteredOptions.indexOf(filterOption.brand+'-'+filterOption.models[i].modelname);
          if(index != -1){
            this.filteredOptions.splice(index,1);
          }
        }
      }
      this.filteredOptions.push(filteredOption);
    }
    else{
      var index = this.filteredOptions.indexOf(filteredOption);
      this.filteredOptions.splice(index,1);
    }
    
    var self = this;
    this.products = this.allProducts.filter(function(product){
      if(self.filteredOptions.includes(product.brand+'-'+product.model) || self.filteredOptions.includes(product.brand+'-All Models'))
      {
         return true;
      }
    });

    this.commonService.products[this.category].retainProducts = this.products;
    this.onScreenProducts = [];
    this.getNextItems();

  }

  onScrollingFinished() {
    this.getNextItems();
  }

  getNextItems() {
    //console.log(this.onScreenProducts.length+" "+this.products.length);
    if (this.onScreenProducts.length < this.products.length) {
      const remainingLength = Math.min(20, this.products.length - this.onScreenProducts.length);
      this.onScreenProducts.push(...this.products.slice(this.onScreenProducts.length, this.onScreenProducts.length + remainingLength));
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
