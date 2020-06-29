import { Component, OnInit } from '@angular/core';
import { User } from '../Models/User';
import { ResponseData } from '../Models/response';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient, HttpClientJsonpModule } from '@angular/common/http';
import { CommonService } from '../services/common.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public userid:string;
  public userpassword:string;
  public useremail: string;
  public userPhone: string;
  public userconpassword: string;
  public mobNumberPattern = "^((\\+91-?)|0)?[0-9]{10}$"; 
  public postData: User = new User();
  private response: ResponseData  = new ResponseData();
  public SignUpUrl = "http://216.10.249.130:5000/PostUser";

  constructor(private http: HttpClient, private router: Router, private snackbar: MatSnackBar, private commonService: CommonService) { }

  ngOnInit(): void {
  }

  onSubmit() { 
    var redirectUrl = this.commonService.redirectUrl;
    this.postData.userId = this.userid.trim();
    this.postData.password = this.userpassword.trim();
    this.postData.email = this.useremail.trim();
    this.postData.phone = this.userPhone.trim();
    this.postData.signupDate = new Date();
    this.postData.accessDate = new Date();
    this.http.post(this.SignUpUrl, this.postData).subscribe(data => {
    this.response = data as ResponseData;
     if(this.response.Status == 1){
      this.commonService.user.userId = this.userid;
      this.commonService.user.loggedIn = true;
      if(this.commonService.redirectUrl.length == 0){
        this.router.navigate(['/products']);
      }
      else{
        this.commonService.redirectUrl = [];
        this.router.navigate(redirectUrl);
      }
      this.snackbar.open('SignedUp Successfully.', '', {panelClass: ['success-snackbar'], verticalPosition: 'top', horizontalPosition:'center', duration:3000});
     }
     else{
      this.snackbar.open(this.response.Message, 'Dimiss', {panelClass: ['error-snackbar'], verticalPosition: 'top', horizontalPosition:'center'});
     }
    })
  };

}
