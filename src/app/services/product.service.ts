import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../Models/Product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  products: any;

  public GetProductsByCategoryUrl = "https://avwebapi.abhivairavan.online/products/GetProductsByCategory/";
  public GetProductsByFilterUrl = "https://avwebapi.abhivairavan.online/products/GetProductsByFilter";
  public GetProductsBySearchUrl = "https://avwebapi.abhivairavan.online/products/GetProductsBySearch/";
  public GetFilterOptionsUrl = "https://avwebapi.abhivairavan.online/filterOptions/GetFilterOptions/";
  public GetHomePageUrl = "https://avwebapi.abhivairavan.online/essentialdata/GetHomePage/"

  constructor(private http: HttpClient) {
    /* let obs = this.http.get('assets/products.json');
    obs.subscribe((response) => {
      this.products = response;
    }); */
  }

  getHomePage(){
    return this.http.get(this.GetHomePageUrl);
  }

  GetProductsBySearch(searchText: string){
    return this.http.get(this.GetProductsBySearchUrl+searchText);
  }

  GetFilterOptions(){
    return this.http.get(this.GetFilterOptionsUrl);
  }

  GetProductsByFilter(filterCriteria){
    return this.http.post(this.GetProductsByFilterUrl, filterCriteria);
  }

  getProducts(category: string) {

    
    return this.http.get(this.GetProductsByCategoryUrl+category);

    // switch (category) {
    //   case "Bathroom CP Fittings":
    //     return this.http.get('assets/BathroomCPFittings.json');
    //     break;
    //   case "DomesticPumpsAndMotors":
    //     return this.http.get('assets/DomesticPumpsAndMotors.json');
    //     break;
    //   case "PipesandFittings":
    //     return this.http.get('assets/PipesandFittings.json');
    //     break;
    //   case "Sanitaryware":
    //     return this.http.get('assets/Sanitaryware.json');
    //     break;
    //   case "WaterTanks":
    //     return this.http.get('assets/WaterTanks.json');
    //     break;
    //   case "KitchenSink":
    //     return this.http.get('assets/KitchenSink.json');
    //     break;
    //   case "BathTub":
    //     return this.http.get('assets/BathTub.json');
    //     break;
    //   case "ShowerEnclosure":
    //     return this.http.get('assets/ShowerEnclosure.json');
    //     break;
    //   case "ShowerPanel":
    //     return this.http.get('assets/ShowerPanel.json');
    //     break;
    //   case "BrassValvesandFittings":
    //     return this.http.get('assets/BrassValvesandFittings.json');
    //     break;
    //   case "WaterHeaters":
    //     return this.http.get('assets/WaterHeaters.json');
    //     break;
    //   case "MirrorCabinet":
    //     return this.http.get('assets/MirrorCabinet.json');
    //     break;
    //   case "Accessories":
    //     return this.http.get('assets/Accessories.json');
    //     break;
    //   default:
    //     return this.http.get('assets/products.json');

    // }

  }
}
