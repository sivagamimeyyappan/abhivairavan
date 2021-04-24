import { AfterViewChecked, AfterViewInit, Component, DoCheck, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterStateSnapshot, Scroll } from '@angular/router';
import { Observable, of } from 'rxjs';
import { filter } from 'rxjs/operators';
import { CommonService } from '../services/common.service';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewChecked {
  products: any;
  onScreenProducts: any = [];
  

  constructor(private route: ActivatedRoute, private router: Router, public commonService: CommonService, viewportScroller: ViewportScroller) {
    router.events.pipe(
      filter((e): e is Scroll => e instanceof Scroll)
    ).subscribe(e => {
      if(e.position){
        this.commonService.resetScrollPosition.X = e.position[0];
        this.commonService.resetScrollPosition.Y = e.position[1];
      }
    });
  }

  ngAfterViewChecked(): void {
    if(this.commonService.resetScrollPosition.Y != 0){
      if(window.scrollY < this.commonService.resetScrollPosition.Y){
        this.getNextItems();
        window.scrollTo(this.commonService.resetScrollPosition.X,this.commonService.resetScrollPosition.Y);
      }
      else{
        this.commonService.resetScrollPosition.X = 0;
        this.commonService.resetScrollPosition.Y = 0;
      }
    }
  }

  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      this.products = data.response.products;
      this.onScreenProducts= [];
      this.getNextItems();
    });

    // this.commonService.observeFilterText.subscribe(FltrTxt => {
    //   var lclFilteredProducts = [];
      
    //   if(FltrTxt!=''){
    //     this.products.filter(function(product){
    //       lclFilteredProducts.push({brand:product.brand,category:product.category,models:[]});
    //       for(var i=0;i<product.models.length; i++){
    //         var searchtext=product.brand+product.models[i].name;
    //         searchtext = searchtext.toLowerCase();
    //         FltrTxt = FltrTxt.toLowerCase();
    //         if(searchtext.includes(FltrTxt)){
    //           lclFilteredProducts[lclFilteredProducts.length-1].models.push({name:product.models[i].name, img:product.models[i].img});
    //           //return true;
    //         }
    //       }
    //       if(lclFilteredProducts[lclFilteredProducts.length-1].models.length == 0)
    //       {
    //         lclFilteredProducts.pop();
    //       }
    //     });
    //     this.Filteredproducts=lclFilteredProducts;
    //   }
    //   else{
    //     this.Filteredproducts=this.products;
    //   }
    //   this.onScreenProducts = [];
    //   //window.scrollTo(0, 0);
    //   this.getNextItems();
    // });
    
  }

  onScrollingFinished() {
    this.getNextItems();
  }

  getNextItems() {
    //console.log(this.onScreenProducts.length+" "+this.products.length);
    if (this.onScreenProducts.length < this.products.length) {
      const remainingLength = Math.min(2, this.products.length - this.onScreenProducts.length);
      this.onScreenProducts.push(...this.products.slice(this.onScreenProducts.length, this.onScreenProducts.length + remainingLength));
    }
  }

  ngOnDestroy(){
    // this.commonService.FilterTextChange("");
  }

}