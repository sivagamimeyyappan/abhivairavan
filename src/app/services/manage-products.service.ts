import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PrimaryData } from '../Models/PrimaryData';
import { Product } from '../Models/Product';
import { ProductsData } from '../Models/ProductsData';
import { ResponseData } from '../Models/response';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class ManageProductsService {

  public InsertModelUrl = "https://avwebapi.abhivairavan.online/essentialData/InsertModel/";
  public DeleteModelUrl = "https://avwebapi.abhivairavan.online/essentialData/DeleteModel";
  public InsertBrandUrl = "https://avwebapi.abhivairavan.online/essentialData/InsertBrand/";
  public DeleteBrandUrl = "https://avwebapi.abhivairavan.online/essentialData/DeleteBrand/";
  public InsertCategoryUrl = "https://avwebapi.abhivairavan.online/essentialData/InsertCategory/";
  public DeleteCategoryUrl = "https://avwebapi.abhivairavan.online/essentialData/DeleteCategory/";
  public AddProductUrl = "https://avwebapi.abhivairavan.online/products/PostProduct/";
  public UpdateProductUrl = "https://avwebapi.abhivairavan.online/products/UpdateProduct/";
  public GetProductUrl = "https://avwebapi.abhivairavan.online/products/GetProduct/"

  constructor(private http: HttpClient, private snackbar: MatSnackBar, private commonSrvc: CommonService) {

  }

  GetProduct(productId: string){
    return this.http.get(this.GetProductUrl+productId)
  }

  AddProduct(data: any){
    this.http.post(this.AddProductUrl, data).subscribe(
      (response: ResponseData) => {
        if (response.Status == 1){
          this.snackbar.open("Product "+ data.productId+ " Inserted Successfully", '', {panelClass: ['success-snackbar'], verticalPosition: 'top', horizontalPosition:'center', duration:2000});
        }
        else{
          this.snackbar.open(response.Message, 'Dimiss', {panelClass: ['error-snackbar'], verticalPosition: 'top', horizontalPosition:'center'});
        }
      });
  }

  UpdateProduct(newData: any, oldData: any){
    var data = {"newData": newData, "oldData": oldData};
    this.http.post(this.UpdateProductUrl, data).subscribe(
      (response: ResponseData) => {
        if (response.Status == 1){
          this.snackbar.open("Product "+ newData.productId+ " Updated Successfully", '', {panelClass: ['success-snackbar'], verticalPosition: 'top', horizontalPosition:'center', duration:2000});
        }
        else{
          this.snackbar.open(response.Message, 'Dimiss', {panelClass: ['error-snackbar'], verticalPosition: 'top', horizontalPosition:'center'});
        }
      });
  }

  InsertModel(data: any){

    this.http.post(this.InsertModelUrl, data).subscribe(
      (response: ResponseData) => {
        if (response.Status == 1){
          var models = this.commonSrvc.primaryData.getModels();
          models.push(data.model)
          this.commonSrvc.primaryData.setModels(models);
          this.snackbar.open("Model "+ data.model+ " Inserted Successfully", '', {panelClass: ['success-snackbar'], verticalPosition: 'top', horizontalPosition:'center', duration:2000});
        }else{
          this.snackbar.open(response.Message, 'Dimiss', {panelClass: ['error-snackbar'], verticalPosition: 'top', horizontalPosition:'center'});
        }
    });
  }

  DeleteModel(data: any){

    this.http.post(this.DeleteModelUrl, data).subscribe(
      (response: ResponseData) => {

        if (response.Status == 1){
          var models = this.commonSrvc.primaryData.getModels();
          var index = models.indexOf(data.model);
          models.splice(index, 1);
          this.commonSrvc.primaryData.setModels(models);
          this.snackbar.open("Model "+ data.model+ " Deleted Successfully", '', {panelClass: ['success-snackbar'], verticalPosition: 'top', horizontalPosition:'center', duration:2000});
        }else{
          this.snackbar.open(response.Message, 'Dimiss', {panelClass: ['error-snackbar'], verticalPosition: 'top', horizontalPosition:'center'});
        }
    });
  }

  InsertBrand(data: any){
    this.http.post(this.InsertBrandUrl, data).subscribe(
      (response: ResponseData) => {
        if (response.Status == 1){
          var brands = this.commonSrvc.primaryData.getBrands();
          brands.push(data.brand)
          this.commonSrvc.primaryData.setBrands(brands);
          this.snackbar.open("Brand "+ data.brand+ " Inserted Successfully", '', {panelClass: ['success-snackbar'], verticalPosition: 'top', horizontalPosition:'center', duration:2000});
        }else{
          this.snackbar.open(response.Message, 'Dimiss', {panelClass: ['error-snackbar'], verticalPosition: 'top', horizontalPosition:'center'});
        }
    });
  }

  DeleteBrand(data: any){

    this.http.post(this.DeleteBrandUrl, data).subscribe(
      (response: ResponseData) => {

        if (response.Status == 1){
          var brands = this.commonSrvc.primaryData.getBrands();
          var index = brands.indexOf(data.brand);
          brands.splice(index, 1);
          this.commonSrvc.primaryData.setBrands(brands);
          this.snackbar.open("Brand "+ data.brand+ " Deleted Successfully", '', {panelClass: ['success-snackbar'], verticalPosition: 'top', horizontalPosition:'center', duration:2000});
        }else{
          this.snackbar.open(response.Message, 'Dimiss', {panelClass: ['error-snackbar'], verticalPosition: 'top', horizontalPosition:'center'});
        }
    });
  }

  InsertCategory(data: any){
    this.http.post(this.InsertCategoryUrl, data).subscribe(
      (response: ResponseData) => {
        if (response.Status == 1){
          var categories = this.commonSrvc.primaryData.getCategories();
          categories.push(data.category)
          this.commonSrvc.primaryData.setCategories(categories);
          this.commonSrvc.products[data.category] = new ProductsData();
          this.snackbar.open("Category "+ data.category+ " Inserted Successfully", '', {panelClass: ['success-snackbar'], verticalPosition: 'top', horizontalPosition:'center', duration:2000});
        }else{
          this.snackbar.open(response.Message, 'Dimiss', {panelClass: ['error-snackbar'], verticalPosition: 'top', horizontalPosition:'center'});
        }
    });
  }

  DeleteCategory(data: any){
    this.http.post(this.DeleteCategoryUrl, data).subscribe(
      (response: ResponseData) => {

        if (response.Status == 1){
          var categories = this.commonSrvc.primaryData.getCategories();
          var index = categories.indexOf(data.category);
          categories.splice(index, 1);
          this.commonSrvc.primaryData.setCategories(categories);
          this.snackbar.open("Category "+ data.category+ " Deleted Successfully", '', {panelClass: ['success-snackbar'], verticalPosition: 'top', horizontalPosition:'center', duration:2000});
        }else{
          this.snackbar.open(response.Message, 'Dimiss', {panelClass: ['error-snackbar'], verticalPosition: 'top', horizontalPosition:'center'});
        }
    });
  }
}
