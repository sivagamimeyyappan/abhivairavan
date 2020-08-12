import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ResponseData } from '../Models/response';

@Injectable({
  providedIn: 'root'
})
export class EnquiriesService {

  private response: ResponseData  = new ResponseData();
  public GetEnquiriesUrl = "https://avwebapi.abhivairavan.online/enquiries/GetEnquiries";

  constructor(private http: HttpClient) { }

  getEnquiries(){
    return this.http.get(this.GetEnquiriesUrl);
  }
}
