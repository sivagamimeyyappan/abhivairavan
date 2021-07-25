import { Component, OnInit } from '@angular/core';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-product-menu',
  templateUrl: './product-menu.component.html',
  styleUrls: ['./product-menu.component.css']
})
export class ProductMenuComponent implements OnInit {

  categories: any;
  itemsPerCol: number = 8;

  divideCols: Array<number> = [];
  noOfRowsPerCol: Array<number> = [];
  

  constructor(public cs: CommonService) { }

  ngOnInit(): void {
    this.categories = this.cs.primaryData.getCategories();
    var noOfCols = Math.ceil(this.categories.length/this.itemsPerCol);
    for(var i=0; i<noOfCols; i++){
      this.divideCols.push(i);
    }
    for(i=0; i<this.itemsPerCol; i++){
      this.noOfRowsPerCol.push(i);
    }
  }
}
