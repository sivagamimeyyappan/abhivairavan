import { Component, OnInit } from '@angular/core';
import { CommonService } from '../services/common.service';
import { User } from '../Models/User';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Order } from '../Models/order';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-profilemenu',
  templateUrl: './profilemenu.component.html',
  styleUrls: ['./profilemenu.component.css']
})
export class ProfilemenuComponent implements OnInit {

  constructor( public commonService: CommonService, private router: Router, private snackbar: MatSnackBar, public cartService: CartService) { }

  ngOnInit(): void {
  }

  signOut(): void{
    this.commonService.user = new User();
    this.cartService.order = new Order();
    this.router.navigate(['/products']);
    this.snackbar.open('you SignedOut Successfully.', '', {panelClass: ['success-snackbar'], verticalPosition: 'top', horizontalPosition:'center', duration:3000});
  }
}
