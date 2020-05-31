import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }

  getOrder(orderId){
    return this.http.get('assets/Order.json');
  }

  getAllOrders(){
    return this.http.get('assets/AllOrders.json');
  }

  getCustomerOrders(customerId){
    return this.http.get('assets/CustomerOrders.json');
  }
}
