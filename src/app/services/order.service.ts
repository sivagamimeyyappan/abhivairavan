import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ResponseData } from '../Models/response';

@Injectable({
  providedIn: 'root'
})
export class OrderService {


  private response: ResponseData  = new ResponseData();
  public GetOrdersUrl = "https://216.10.249.130:5000/orders/GetOrders";
  public GetOrdersbyUserUrl = "https://216.10.249.130:5000/orders/GetOrdersbyUserId/";
  public GetOrderUrl = "https://216.10.249.130:5000/orders/GetOrder/";

  constructor(private http: HttpClient) { }

  getOrder(orderId){
    // return this.http.get('assets/Order.json');
    return this.http.get(this.GetOrderUrl+orderId);
  }

  getAllOrders(){
    // return this.http.get('assets/AllOrders.json');
    return this.http.get(this.GetOrdersUrl);
  }

  getCustomerOrders(userId){
    // return this.http.get('assets/CustomerOrders.json');
    return this.http.get(this.GetOrdersbyUserUrl+userId);
  }
}
