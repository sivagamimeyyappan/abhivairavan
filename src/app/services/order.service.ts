import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ResponseData } from '../Models/response';

@Injectable({
  providedIn: 'root'
})
export class OrderService {


  private response: ResponseData  = new ResponseData();
  public GetOrdersUrl = "http://216.10.249.130:5000/GetOrders";
  public GetOrdersbyUserUrl = "http://216.10.249.130:5000/GetOrdersbyUserId/";
  public GetOrderUrl = "http://216.10.249.130:5000/GetOrder/";

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
