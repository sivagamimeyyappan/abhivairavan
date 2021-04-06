import { Component, OnInit,HostListener, ElementRef,Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../services/cart.service';
import { CommonService } from '../services/common.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  products: any = [];
  allProducts: any;
  filterOptions: any = [];
  filteredOptions:any = [];
  category: string;
  model: string;
  filterText: string;
  brand: string;
  showSidepanel: boolean;
  snackbarRef: any;
  onScreenProducts: any = [];
  FilteredProducts: any = [];
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
    this.route.paramMap.subscribe(params => {
      
      this.category = params.get('category');
      this.model = params.get('model');
      this.brand = params.get('brand');

      if(this.model != undefined){
        this.commonService.setShowFilterIcon(false);
      }
      else{
        this.commonService.setShowSidepanel(true);
        this.commonService.setShowFilterIcon(true);
        this.commonService.setShowSearchIcon(true);
      }

      this.products = [];
      this.onScreenProducts = [];
      this.FilteredProducts = [];
      this.filteredOptions = [];
    });
    
    this.commonService.observeFilterText.subscribe(FltrTxt => {
      if(FltrTxt!=''){
        this.FilteredProducts = this.products.filter(function(product){
          var searchtext=product.brand+' '+product.model+' '+product.productId+' '+product.desc;
          searchtext = searchtext.toLowerCase();
          FltrTxt = FltrTxt.toLowerCase();
          console.log(searchtext.includes(FltrTxt));
          if(searchtext.includes(FltrTxt)){
            return true;
          }
        });
      }
      else{
        this.FilteredProducts = this.products;
      }
      this.onScreenProducts = [];
      this.getNextItems();
    });

    this.route.data.subscribe((data) => {

      this.allProducts = data.response.products;
      this.filterOptions = data.response.filterOptions;
      this.products = [];
      this.FilteredProducts = [];
      this.filteredOptions = [];
      var self = this;
      
    //   if(this.filterText != undefined){

    //     if(this.filterText != ''){
    //       var FltrTxt = this.filterText;
    //       this.FilteredProducts = this.allProducts.filter(function(product){
    //         console.log(product);
    //         var searchtext=product.brand+product.model+product.productId+product.desc;
    //         searchtext = searchtext.toLowerCase();
    //         FltrTxt = FltrTxt.toLowerCase();
    //         if(searchtext.includes(FltrTxt)){
    //           return true;
    //         }
    //       });
    //     }
    //     else{
    //       this.FilteredProducts = this.products;
    //     }
    //     this.onScreenProducts = [];
    //     this.getNextItems();
    //   }
      if(this.model != undefined){
        this.products = this.allProducts.filter(function(product){
          if(product.category == self.category && product.model == self.model && product.brand == self.brand)
          {
             return true;
          }
        });
        this.FilteredProducts = this.products;
        this.onScreenProducts = [];
        this.getNextItems();
      }
      else if(this.commonService.products[this.category].retainProducts.length > 0){
        this.products = this.commonService.products[this.category].retainProducts;
        this.FilteredProducts = this.products;
        this.onScreenProducts = [];
        this.getNextItems();
      }
      
    });
  }

  ngOnDestroy(){
    this.commonService.setShowFilterIcon(false);
    this.commonService.setShowSidepanel(false);
    this.commonService.setShowSearchIcon(false);
    this.commonService.FilterTextChange("");
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
    this.FilteredProducts = this.products;
    this.onScreenProducts = [];
    window.scrollTo(0, 0);
    this.getNextItems();

  }

  onScrollingFinished() {
    this.getNextItems();
  }

  getNextItems() {
    //console.log(this.onScreenProducts.length+" "+this.products.length);
    if (this.onScreenProducts.length < this.FilteredProducts.length) {
      const remainingLength = Math.min(20, this.FilteredProducts.length - this.onScreenProducts.length);
      this.onScreenProducts.push(...this.FilteredProducts.slice(this.onScreenProducts.length, this.onScreenProducts.length + remainingLength));
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

    // Add the "show" class to DIV
    x.className = "show";
  
    // After 3 seconds, remove the show class from DIV
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 500);
    
  }
  show(event, product)
  {
    this.imagepath = product.img;
    this.showModal = true; // Show-Hide Modal Check

  }
  //Bootstrap Modal Close event
  hide()
  {
    this.showModal = false;
  }

}
