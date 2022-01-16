import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { timeStamp } from 'console';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public LoginUrl = "https://abhivairavan.online/webapi/users/Login";
  public SignUpUrl = "https://abhivairavan.online/webapi/users/PostUser";
  //public LoginUrl =  "http://localhost:5000/webapi/users/Login";
  //public SignUpUrl = "http://localhost:5000/webapi/users/PostUser";

  constructor(private http: HttpClient) { }

  Login(data: any){
    return this.http.post(this.LoginUrl, data);
  }

  SignUp(data: any){
    return this.http.post(this.SignUpUrl, data);
  }
}
