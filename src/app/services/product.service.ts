import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  products: any;

  constructor(private http: HttpClient, public commonService: CommonService) {
    /* let obs = this.http.get('assets/products.json');
    obs.subscribe((response) => {
      this.products = response;
    }); */
  }

  getProducts(category) {

    if(this.commonService.products[category] != undefined)
    {
      console.log("value available");
      return this.commonService.products[category];
    }

    switch (category) {
      case "BathroomCPFittings":
        return this.http.get('assets/BathroomCPFittings.json');
        break;
      case "DomesticPumpsAndMotors":
        return this.http.get('assets/DomesticPumpsAndMotors.json');
        break;
      case "PipesandFittings":
        return this.http.get('assets/PipesandFittings.json');
        break;
      case "Sanitaryware":
        return this.http.get('assets/Sanitaryware.json');
        break;
      case "WaterTanks":
        return this.http.get('assets/WaterTanks.json');
        break;
      case "KitchenSink":
        return this.http.get('assets/KitchenSink.json');
        break;
      case "BathTub":
        return this.http.get('assets/BathTub.json');
        break;
      case "ShowerEnclosure":
        return this.http.get('assets/ShowerEnclosure.json');
        break;
      case "ShowerPanel":
        return this.http.get('assets/ShowerPanel.json');
        break;
      case "BrassValvesandFittings":
        return this.http.get('assets/BrassValvesandFittings.json');
        break;
      case "WaterHeaters":
        return this.http.get('assets/WaterHeaters.json');
        break;
      case "MirrorCabinet":
        return this.http.get('assets/MirrorCabinet.json');
        break;
      case "SteamGenerator":
        return this.http.get('assets/SteamGenerator.json');
        break;
      default:
        return this.http.get('assets/products.json');

    }

  }
}
