import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { CommonService } from '../services/common.service';
import { ActivatedRoute } from '@angular/router';
import { Order } from './order';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  public order: Order;
  colHeadings = ['S.No','Image','Item Name','Tax','Qty','MRP','Disc','Discounted Rate','Total',''];
  constructor(private route: ActivatedRoute, public commonService: CommonService) { }
  public mode: string;

  ngOnInit(): void {

    this.route.paramMap.subscribe(params => {
      this.mode = params.get('mode');
      console.log(this.mode);
    });

    this.route.data.subscribe((data) => {
      this.order = data.response.order;
    });
  }

  qtyChange(product){

    if(product.qty == null){
      product.qty = 0;
    }

    if(product.qty == 0){
      this.remove(product);
      return;
    }
    this.applyChanges(product);
  }
  convertToInt(value){
    return parseInt(value);
  }

  getTax(item){
    return (((item.key/2)/100) * item.value).toFixed(2);
  }

  getTotalTax(){
    var taxTotal = 0;
    for(var taxPercentage in this.order.taxPercentages){
      taxTotal += (this.order.taxPercentages[taxPercentage] * (this.convertToInt(taxPercentage)/100));
    }
    return taxTotal;
  }

  getFinalAmount(){
    return Math.round(this.order.cartTotal + this.getTotalTax());
  }

  remove(product){
    product.qty = 0;
    this.applyChanges(product);
    // product.price = product.mrp;
    // product.qty = 1;
    this.order.items = this.order.items.filter(function(ele){ return ele.productId != product.productId; });
  }

  applyChanges(product){

    var DiscountedPrice = product.mrp - ((product.disc/100) * product.mrp);
    this.order.cartTotal -= product.price;
    if(this.order.taxPercentages.hasOwnProperty(product.tax.toString())){
      this.order.taxPercentages[product.tax.toString()] -= product.price;
      this.order.taxPercentages[product.tax.toString()] += (product.qty * DiscountedPrice);
      if(this.order.taxPercentages[product.tax.toString()] == 0){
        delete this.order.taxPercentages[product.tax.toString()];
      }
    }
    else{
      this.order.taxPercentages[product.tax.toString()] = (product.qty * DiscountedPrice);
    }
    product.price = product.qty * DiscountedPrice;
    this.order.cartTotal += product.price;
  }

  geQuote(){

    console.log(this.order);

  }
}
