import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ResponseData } from '../Models/response';

@Injectable({
  providedIn: 'root'
})
export class EnquiriesService {

  private response: ResponseData  = new ResponseData();
  public GetEnquiriesUrl = "https://abhivairavan.online/webapi/enquiries/GetEnquiries";
  public postEnquiryUrl = "https://abhivairavan.online/webapi/enquiries/PostEnquiry";

  constructor(private http: HttpClient) { }

  getEnquiries(){
    return this.http.get(this.GetEnquiriesUrl);
  }

  postEnquiries(data: any){
    return this.http.post(this.postEnquiryUrl, data);
  }
}
