import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ResponseData } from '../Models/response';

@Injectable({
  providedIn: 'root'
})
export class EnquiriesService {

  private response: ResponseData  = new ResponseData();
  public GetEnquiriesUrl = "http://216.10.249.130:5000/GetEnquiries";

  constructor(private http: HttpClient) { }

  getEnquiries(){
    return this.http.get(this.GetEnquiriesUrl);
  }
}
