import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ResponseData } from '../Models/response';

@Injectable({
  providedIn: 'root'
})
export class OrderService {


  private response: ResponseData  = new ResponseData();
  public GetOrdersUrl = "http://216.10.249.130:5000/GetOrders";

  constructor(private http: HttpClient) { }

  getOrder(orderId){
    return this.http.get('assets/Order.json');
  }

  getAllOrders(){
    // return this.http.get('assets/AllOrders.json');
    return this.http.get(this.GetOrdersUrl)
  }

  getCustomerOrders(userId){
    return this.http.get('assets/CustomerOrders.json');
  }
}
