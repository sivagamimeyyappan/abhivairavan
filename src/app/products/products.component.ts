import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { Event, Router, NavigationStart, NavigationEnd, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  showSpinner: boolean = true;
  
  constructor(private route: Router, private activatedRoute: ActivatedRoute) { 
    this.route.events.subscribe((routerEvent: Event)=> {
      if(routerEvent instanceof NavigationStart){
        this.showSpinner = true;
      }

      if(routerEvent instanceof NavigationEnd){
        this.showSpinner = false;
      }

    });
  }

  ngOnInit(): void {

  }
}
