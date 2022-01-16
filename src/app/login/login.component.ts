import { Component, OnInit } from '@angular/core';
import { User } from '../Models/User';
import { ResponseData } from '../Models/response';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient, HttpClientJsonpModule } from '@angular/common/http';
import { CommonService } from '../services/common.service';
import { Router } from '@angular/router';
import { UserService } from '../services/user-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public userid: string;
  public userpassword: string;
  public postData: User = new User();
  private response: ResponseData  = new ResponseData();

  constructor(private http: HttpClient, private router: Router, private snackbar: MatSnackBar, private commonService: CommonService, private usrSrvc: UserService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    var redirectUrl = this.commonService.redirectUrl;
    this.postData.userId = this.userid;
    this.postData.password = btoa(this.userpassword);
    this.usrSrvc.Login(this.postData).subscribe(data => {
    this.response = data as ResponseData;
     if(this.response.Status == 1){
      this.commonService.user.userId = this.userid;
      this.commonService.user.loggedIn = true;
      this.commonService.user.isAdmin = this.response.Data.isAdmin;
      if(this.commonService.redirectUrl.length == 0){
        this.router.navigate(['/products']);
      }
      else{
        this.commonService.redirectUrl = [];
        this.router.navigate(redirectUrl);
      }
      this.snackbar.open('SignedIn Successfully.', '', {panelClass: ['success-snackbar'], verticalPosition: 'top', horizontalPosition:'center', duration:2000});
     }
     else{
      this.snackbar.open(this.response.Message, 'Dimiss', {panelClass: ['error-snackbar'], verticalPosition: 'top', horizontalPosition:'center'});
     }
    })
   };

}
