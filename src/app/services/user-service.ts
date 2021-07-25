import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { timeStamp } from 'console';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public LoginUrl = "https://avwebapi.abhivairavan.online/users/Login";
  public SignUpUrl = "https://avwebapi.abhivairavan.online/users/PostUser";

  constructor(private http: HttpClient) { }

  Login(data: any){
    return this.http.post(this.LoginUrl, data);
  }

  SignUp(data: any){
    return this.http.post(this.SignUpUrl, data);
  }
}
