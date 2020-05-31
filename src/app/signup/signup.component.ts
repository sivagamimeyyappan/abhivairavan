import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public username:string;
  public userpassword:string;
  public useremail: string;
  public userPhone: string;
  public userconpassword: string;
  public mobNumberPattern = "^((\\+91-?)|0)?[0-9]{10}$"; 

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit() { alert('form submitted') };

}
