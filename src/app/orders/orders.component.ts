import { Component, OnInit } from '@angular/core';
import { CommonService } from '../services/common.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  colHeadings = [];
  orders: any ;
  customerId: string;

  constructor(private route: ActivatedRoute, public commonService: CommonService) { }

  ngOnInit(): void {

    this.route.paramMap.subscribe(params => {
      this.customerId = params.get('customerId');
    });

    this.route.data.subscribe((data) => {
      this.colHeadings = data.response.colHeadings;
      this.orders = data.response.orders;
    });
  }
  ngOnDestroy(){
  }
}
