import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  products: any;
  onScreenProducts: any = [];
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      this.products = data.response.products;
      this.onScreenProducts = [];
      this.getNextItems();
    });
  }

  onScrollingFinished() {
    this.getNextItems();
  }

  getNextItems() {
    console.log(this.onScreenProducts.length+" "+this.products.length);
    if (this.onScreenProducts.length < this.products.length) {
      const remainingLength = Math.min(2, this.products.length - this.onScreenProducts.length);
      this.onScreenProducts.push(...this.products.slice(this.onScreenProducts.length, this.onScreenProducts.length + remainingLength));
    }
  }

}
