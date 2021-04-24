import { Component, OnInit,HostListener } from '@angular/core';
import { Event, Router, NavigationStart, NavigationEnd, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './productsLoader.component.html',
  styleUrls: ['./productsLoader.component.css']
})
export class ProductsLoaderComponent implements OnInit {

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
