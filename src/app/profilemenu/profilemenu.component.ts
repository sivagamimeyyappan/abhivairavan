import { Component, OnInit } from '@angular/core';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-profilemenu',
  templateUrl: './profilemenu.component.html',
  styleUrls: ['./profilemenu.component.css']
})
export class ProfilemenuComponent implements OnInit {

  constructor( public commonService: CommonService) { }

  ngOnInit(): void {
  }

}
