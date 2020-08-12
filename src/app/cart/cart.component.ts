import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { CommonService } from '../services/common.service';
import { ActivatedRoute, RouterStateSnapshot, Router } from '@angular/router';
import { Order } from '../Models/order';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient, HttpClientJsonpModule } from '@angular/common/http';
import { ResponseData } from '../Models/response';
import {FormControl, FormGroupDirective, NgForm, Validators, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})

export class CartComponent implements OnInit {

  public order: Order;
  private OrderId: string;
  colHeadings = ['S.No','Image','Item Name','Tax','Qty','MRP','Disc','Discounted Rate','Total',''];

  constructor(private route: ActivatedRoute, private router: Router, public commonService: CommonService, public cartService: CartService, private http: HttpClient, private snackbar: MatSnackBar) { }
  public mode: string;
  private postOrderUrl: string = "https://avwebapi.abhivairavan.online/orders/PostOrder";
  private response: ResponseData  = new ResponseData();
  public cartForm: FormGroup = new FormGroup({
    orderName: new FormControl(this.cartService.order.name, Validators.required)
  });

  ngOnInit(): void {

    this.route.paramMap.subscribe(params => {
      this.mode = params.get('mode');
      this.OrderId = params.get('orderId');
    });

    this.route.data.subscribe((data) => {
      this.order = data.response.order;
      console.log(this.order);
    });
  }

  qtyChange(product){

    if(product.qty == null){
      product.qty = 0;
    }
    
    if(product.qty % product.unit != 0){
      this.snackbar.open(product.brand+"~"+product.model+"~"+product.productId+" Quantity should be in multiple of "+product.unit,'dismiss',
      {panelClass: ['error-snackbar'], verticalPosition: 'top'});
      product.qty = product.qty - (product.qty % product.unit);
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
    return Math.round(this.order.cartTotal + this.getTotalTax() - this.order.cashDiscount);
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

  ngOnDestroy(){
    this.order.name = this.cartForm.value.orderName;
  }

  clearCart(){
    this.order = new Order();
    this.cartService.order = new Order();
  }

  getQuote(){
    console.log(this.cartService.order);
    if(this.commonService.user.loggedIn){
      this.order.date = new Date();
      if(this.OrderId == undefined)
        this.order.status = 'Submitted';
      this.order.name = this.cartForm.value.orderName;
      if(this.order.userId == undefined || this.order.userId == '')
        this.order.userId = this.commonService.user.userId;
      this.order.lastModifiedBy = this.commonService.user.userId;
      this.http.post(this.postOrderUrl, this.order).subscribe(data => {
        this.response = data as ResponseData;
         if(this.response.Status == 1){
            this.clearCart();
            var successMsg = (this.order.status == 'Submitted')?'GetQuoteRequest Placed Successfully.':'Order updated Successfully';
            this.snackbar.open(successMsg, '', {panelClass: ['success-snackbar'], verticalPosition: 'top', horizontalPosition:'center', duration:2000});
            if(this.commonService.user.isAdmin){
              this.router.navigate(['/orders']);
            }else{
              this.router.navigate(['/orders/'+this.commonService.user.userId]);
            }
         }
         else{
          this.snackbar.open('Error While Processing Request. '+ this.response.Message + ' Please try after some time or call us on 08048428253.', 'Dimiss', {panelClass: ['error-snackbar'], verticalPosition: 'top', horizontalPosition:'center'});
         }
        })
    }else{
      this.commonService.redirectUrl = ['/cart',{mode:'edit'}];
      this.router.navigate(['/login']);
    }
  }
  print(){
    window.print();
  }
}
