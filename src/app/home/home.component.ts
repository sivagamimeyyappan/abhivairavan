import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  products: any;
  Filteredproducts: any;
  onScreenProducts: any;
  constructor(private route: ActivatedRoute, public commonService: CommonService) { }

  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      this.commonService.setShowSearchIcon(true);
      this.products = data.response.products;
      this.Filteredproducts = this.products;
      this.onScreenProducts= [];
      this.getNextItems();
    });

    this.commonService.observeFilterText.subscribe(FltrTxt => {
      var lclFilteredProducts = [];
      
      if(FltrTxt!=''){
        this.products.filter(function(product){
          lclFilteredProducts.push({brand:product.brand,category:product.category,models:[]});
          for(var i=0;i<product.models.length; i++){
            var searchtext=product.brand+product.models[i].name;
            searchtext = searchtext.toLowerCase();
            FltrTxt = FltrTxt.toLowerCase();
            if(searchtext.includes(FltrTxt)){
              lclFilteredProducts[lclFilteredProducts.length-1].models.push({name:product.models[i].name, img:product.models[i].img});
              //return true;
            }
          }
          if(lclFilteredProducts[lclFilteredProducts.length-1].models.length == 0)
          {
            lclFilteredProducts.pop();
          }
        });
        this.Filteredproducts=lclFilteredProducts;
      }
      else{
        this.Filteredproducts=this.products;
      }
      this.onScreenProducts = [];
      window.scrollTo(0, 0);
      this.getNextItems();
    });
    
  }

  onScrollingFinished() {
    this.getNextItems();
  }

  getNextItems() {
    //console.log(this.onScreenProducts.length+" "+this.Filteredproducts.length);
    if (this.onScreenProducts.length < this.Filteredproducts.length) {
      const remainingLength = Math.min(2, this.Filteredproducts.length - this.onScreenProducts.length);
      this.onScreenProducts.push(...this.Filteredproducts.slice(this.onScreenProducts.length, this.onScreenProducts.length + remainingLength));
    }
  }

  ngOnDestroy(){
    this.commonService.setShowSearchIcon(false);
    this.commonService.FilterTextChange("");
  }

}
