import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpClientJsonpModule } from '@angular/common/http';
import { enquiry } from '../Models/enquiry';
import { HttpHeaders } from '@angular/common/http';
import { ResponseData } from '../Models/response';
import { MatSnackBar } from '@angular/material/snack-bar';

// const httpOptions = {
//   headers: new HttpHeaders({
//     'Content-Type':  'application/json',
//     'Access-Control-Allow-Origin': '*'
//   })
// };

@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.css']
})
export class ContactusComponent implements OnInit {
  public useremail: string;
  public userPhone: string;
  public userrequest: string;
  public mobNumberPattern = "^((\\+91-?)|0)?[0-9]{10}$"; 
  public postEnquiryUrl = "https://avwebapi.abhivairavan.online/enquiries/PostEnquiry";
  public postData: enquiry = new enquiry();
  private response: ResponseData  = new ResponseData();

  constructor(private http: HttpClient, private snackbar: MatSnackBar) {
  }

  ngOnInit(): void {
  }

  onSubmit() { 
    this.postData.question = this.userrequest;
    this.postData.email = this.useremail;
    this.postData.phone = this.userPhone;
    this.postData.date = new Date();
    this.postData.status = "Pending";
    this.http.post(this.postEnquiryUrl, this.postData).subscribe(data => {
    this.response = data as ResponseData;
     if(this.response.Status == 1){
      this.snackbar.open('Your Enquiry Submitted Successfully..We will contact you shortly', '', {panelClass: ['success-snackbar'], verticalPosition: 'top', horizontalPosition:'center', duration:2000});
     }
     else{
      this.snackbar.open('Error While Processing Request. '+ this.response.Message+ ' Please try after some time or call us on 08048428253', 'Dimiss', {panelClass: ['error-snackbar'], verticalPosition: 'top', horizontalPosition:'center'});
     }
    })
   };
  
}
