import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ResponseData } from '../Models/response';

@Injectable({
  providedIn: 'root'
})
export class OrderService {


  private response: ResponseData  = new ResponseData();
  public GetOrdersUrl = "https://abhivairavan.online/webapi/orders/GetOrders";
  public GetOrdersbyUserUrl = "https://abhivairavan.online/webapi/orders/GetOrdersbyUserId/";
  public GetOrderUrl = "https://abhivairavan.online/webapi/orders/GetOrder/";
  private postOrderUrl = "https://abhivairavan.online/webapi/orders/PostOrder";

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

  postOrder(data: any){
    return this.http.post(this.postOrderUrl, data);
  }
}
