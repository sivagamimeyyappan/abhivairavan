import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpClientJsonpModule } from '@angular/common/http';
import { enquirydata } from './enquirydata';
import { HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Access-Control-Allow-Origin': '*'
  })
};

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
  public postEnquiryUrl = "http://localhost:5000/Api/ContactUs";
  public postData: enquirydata = new enquirydata();

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
  }

  onSubmit() { 
    this.postData.Description = this.userrequest;
    this.postData.Email = this.useremail;
    this.postData.Phone = this.userPhone;
    var data = {"Description":this.userrequest,"Email":this.useremail,"Phone":this.userPhone};
    this.http.post(this.postEnquiryUrl, data,httpOptions).subscribe(data => {
      alert('data posted successfully');
    })
   };
  
}
