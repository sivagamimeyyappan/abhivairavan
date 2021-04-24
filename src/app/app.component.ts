import { Component } from '@angular/core';
import { CartService } from './services/cart.service';
import { CommonService } from './services/common.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  showFilterIcon: boolean = false;
  showSearchIcon: boolean = false;

  constructor(private route: ActivatedRoute,public cartService: CartService, public commonService: CommonService){
  }

  ngOnInit(): void {
    this.commonService.observeFilterIcon.subscribe(value => {setTimeout(() => {this.showFilterIcon = value})});
  }

}
