import { CdkTextareaAutosize } from "@angular/cdk/text-field";
import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, FormGroupDirective, NgForm, ValidatorFn, Validators } from '@angular/forms';
import { MatSnackBar } from "@angular/material/snack-bar";
import { ActivatedRoute } from "@angular/router";
import { Observable } from 'rxjs';
import { map, startWith, take } from 'rxjs/operators';
import { Product } from "../Models/Product";
import { ResponseData } from "../Models/response";
import { CommonService } from "../services/common.service";
import { ManageProductsService } from "../services/manage-products.service";

@Component({
  selector: 'app-manage-products',
  templateUrl: './manage-products.component.html',
  styleUrls: ['./manage-products.component.css']
})
export class ManageProductsComponent implements OnInit {

  adminActions: string[] =['Add Product','Update Product','Add Category','Delete Category', 'Add Brand', 'Delete Brand', 'Add Model', 'Delete Model'];
  currentAction: string = 'Add Product';
  AddMode: boolean = true;
  ShowPrdtFlds: boolean = true;
  oldData: any;
  imgFile: File;
  imgExt: string;
  prdtPic: any;
  imgPrvew: boolean = false;
  
  fltrdCtgrys_slctCtgry: Observable<string[]>;
  fltrdBrnds_slctBrnd: Observable<string[]>;
  fltrdMdls_slctMdl: Observable<string[]>;

  prdtSrchCtrl= new FormControl('',[Validators.required]);
  dActCtrl= new FormControl();

  @ViewChild('formDirective') private adminForm: NgForm;
  public adPrdtFrm: FormGroup = new FormGroup({
    //prdtIDCtrl: new FormControl('',[Validators.required,Validators.pattern('^[a-zA-Z0-9]+[a-zA-Z0-9&\\/\\-.!@()#$%&*_ ]*$')]),
    prdtIDCtrl: new FormControl('',[Validators.required,Validators.pattern('^[a-zA-Z0-9]+[a-zA-Z0-9&-.!@()#$%&*_ ]*$')]),
    mrpCtrl: new FormControl('',[Validators.required, Validators.pattern('^[0-9]+(.[0-9]+)?$')]),
    ctgryCtrl: new FormControl(),
    brndCtrl: new FormControl(),
    mdlCtrl: new FormControl(),
    descCtrl: new FormControl('',[Validators.required, Validators.maxLength(100)]),
    qtyTypeCtrl: new FormControl('',[Validators.required,Validators.pattern('[a-zA-Z]{1,3}')]),
    taxCtrl: new FormControl('', [Validators.required, Validators.pattern('[0-9]+')]),
    minUnitCtrl: new FormControl('', [Validators.required, Validators.pattern('[0-9]+')]),
    imgCtrl: new FormControl()
    
  });

  /*categories: string[] = ['Bathroom CP Fittings','Sanitaryware','Shower Enclosure','Shower Panel','Bath Tub',
  'Kitchen Sink','Pipes and Fittings','Brass Valves and Fittings','Water Tanks','Domestic Pumps And Motors',
  'Water Heaters','Accessories'];
  brands: string[] = ['Hindware','Jaquar','Watermen','Queo','Grohe','Kolher','American Standard'];
  models: string[] = ['Contessa Plus','Classik','Flora','Monroe','Nebula','Oros','Armada'];*/

  categories: string[];
  brands: string[];
  models: string[];

  fltrdCtgrys_dActCtgry: Observable<string[]>;

  public rmvCtgryFrm: FormGroup = new FormGroup({
    rmvCtgryCtrl: new FormControl()
  });

  public adCtgryFrm: FormGroup = new FormGroup({
    adCtgryCtrl: new FormControl('', [Validators.required, Validators.minLength(2), Validators.pattern('^[a-zA-Z0-9]+[a-zA-Z0-9&\\-._ ]*$')])
  });

  
 
  fltrdBrnds_dActBrnd: Observable<string[]>;
  public rmvBrndFrm: FormGroup = new FormGroup({
    rmvBrndCtrl: new FormControl()
  });

  public adBrndFrm: FormGroup = new FormGroup({
    adBrndCtrl: new FormControl('', [Validators.required, Validators.minLength(2),Validators.pattern('^[a-zA-Z0-9]+[a-zA-Z0-9&\\-._ ]*$')])
  });

  

  fltrdMdls_dActMdl: Observable<string[]>;
  public rmvMdlFrm: FormGroup = new FormGroup({
    rmvMdlCtrl: new FormControl()
  });

  public adMdlFrm: FormGroup = new FormGroup({
    adMdlCtrl: new FormControl('', [Validators.required, Validators.minLength(2),Validators.pattern('^[a-zA-Z0-9]+[a-zA-Z0-9&\\-._ ]*$')])
  });
  
  constructor(private route: ActivatedRoute, private snackbar: MatSnackBar, private commonSrvc: CommonService, private mngProductSrvc: ManageProductsService) { }

  @ViewChild("autosize") autosize: CdkTextareaAutosize;

  ngOnInit(): void {

    // this.route.data.subscribe((data) => {
    //   this.categories = data.response.categories;
    //   this.models = data.response.models;
    //   this.brands = data.response.brands;
    // });
    this.categories = this.commonSrvc.primaryData.getCategories();
    this.models = this.commonSrvc.primaryData.getModels();
    this.brands = this.commonSrvc.primaryData.getBrands();
    
    this.commonSrvc.primaryData.observecategories.subscribe(value => {
      this.categories = value;
      this.setFilters();
    });
    this.commonSrvc.primaryData.observebrands.subscribe(value => {
      this.brands = value;
      this.setFilters();
    });
    this.commonSrvc.primaryData.observemodels.subscribe(value => {
      this.models = value;
      this.setFilters();
    });
    this.setFilters();
  }

  private setFilters(){

    this.fltrdCtgrys_dActCtgry = this.rmvCtgryFrm.get("rmvCtgryCtrl")!.valueChanges
    .pipe(
      startWith(''),
      map(value => this._filterCategories(value))
    );
    
    this.fltrdCtgrys_slctCtgry = this.adPrdtFrm.get("ctgryCtrl")!.valueChanges
    .pipe(
      startWith(''),
      map(value => this._filterCategories(value))
    );

    this.fltrdBrnds_dActBrnd = this.rmvBrndFrm.get("rmvBrndCtrl")!.valueChanges
    .pipe(
      startWith(''),
      map(value => this._filterBrands(value))
    );

    this.fltrdBrnds_slctBrnd = this.adPrdtFrm.get("brndCtrl")!.valueChanges
    .pipe(
      startWith(''),
      map(value => this._filterBrands(value))
    );

    this.fltrdMdls_dActMdl = this.rmvMdlFrm.get("rmvMdlCtrl")!.valueChanges
    .pipe(
      startWith(''),
      map(value => this._filterModels(value))
    );

    this.fltrdMdls_slctMdl = this.adPrdtFrm.get("mdlCtrl")!.valueChanges
    .pipe(
      startWith(''),
      map(value => this._filterModels(value))
    );

  }

  private _filterCategories(value: string): string[] {
    if(value != null){
      const filterValue = value.toLowerCase();
      return this.categories.filter(option => option.toLowerCase().includes(filterValue));
    }
  }

  private _filterBrands(value: string): string[] {
    if(value != null){
      const filterValue = value.toLowerCase();
      return this.brands.filter(option => option.toLowerCase().includes(filterValue));
    }
  }

  private _filterModels(value: string): string[] {
    if(value != null){
      const filterValue = value.toLowerCase();
      return this.models.filter(option => option.toLowerCase().includes(filterValue));
    }
  }

  adminActionChanged(){
    if(this.currentAction == 'Add Product'){
      this.imgPrvew = false;
      this.AddMode = true;
      this.ShowPrdtFlds = true;
    }
    else if(this.currentAction == 'Update Product'){
      this.AddMode = false;
      this.ShowPrdtFlds = false;
      this.imgPrvew = true;
    }
    this.imgExt = "";
    this.prdtSrchCtrl.reset();
    this.dActCtrl.reset();
    if(this.adminForm){
      this.adminForm.resetForm();
    }
    this.setFilters();
  }

  processFile(event) {
    if(event.target.files.length > 0){
      const file = event.target.files[0];
      this.imgFile = file;
      if (!this.imgFile.name.match(/\.(jpg|jpeg|png)$/)) {
        this.imgPrvew = false;
        this.snackbar.open("Please upload JPG or PNG or JPEG images only", 'Dimiss', {panelClass: ['error-snackbar'], verticalPosition: 'top', horizontalPosition:'center'});
        return;
      }
      this.imgExt = this.imgFile.name.split('.').pop();
      this.prdtPic = this.imgFile.name;
      this.imgPrvew = true;
      var reader = new FileReader();
      reader.readAsDataURL(this.imgFile); 
      reader.onload = (_event) => { 
        this.prdtPic = reader.result; 
      }
    }
  }

  searchProduct(){
    this.ShowPrdtFlds = false;
    if(this.prdtSrchCtrl.errors == null){
      this.mngProductSrvc.GetProduct(this.prdtSrchCtrl.value.trim()).subscribe(
        (response: ResponseData) => {
          if (response.Status == 1){
            var prdt = response.Data as Product;
            this.oldData = prdt;
            this.adPrdtFrm.get("prdtIDCtrl").setValue(prdt.productId);
            this.adPrdtFrm.get("mrpCtrl").setValue(prdt.mrp);
            this.adPrdtFrm.get("ctgryCtrl").setValue(prdt.category);
            this.adPrdtFrm.get("mdlCtrl").setValue(prdt.model);
            if(prdt.brand == ""){
              this.adPrdtFrm.get("brndCtrl").setValue("No Brand");
            }else{
              this.adPrdtFrm.get("brndCtrl").setValue(prdt.brand);
            }
            
            this.adPrdtFrm.get("descCtrl").setValue(prdt.desc);
            //this.adPrdtFrm.get("image").setValue("/assets/images/"+prdt.productId+".jpg");
            var timestamp = new Date().getTime();
            
            this.imgExt = prdt.img.split('.').pop();
            this.prdtPic = prdt.img+"?t="+timestamp;
            //this.prdtPic = "/assets/images/"+"806-120"+".jpg";
            this.adPrdtFrm.get("qtyTypeCtrl").setValue(prdt.qtyType);
            this.adPrdtFrm.get("taxCtrl").setValue(prdt.tax);
            this.adPrdtFrm.get("minUnitCtrl").setValue(prdt.unit);
            this.dActCtrl.setValue(!prdt.isActive);
            this.ShowPrdtFlds = true;
            this.imgPrvew = true;
            this.adPrdtFrm.markAllAsTouched();
          }
          else{
            this.snackbar.open(response.Message, 'Dimiss', {panelClass: ['error-snackbar'], verticalPosition: 'top', horizontalPosition:'center'});
          }
        });
      //this.adPrdtFrm.get("prdtIDCtrl").setValue("FR567R");
    }
    else{
      this.ShowPrdtFlds = false;
    }
  }

  format(str) {
    str = str.toLowerCase().split(' ');
    for (var i = 0; i < str.length; i++) {
      str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1); 
    }
    str = str.join(' ');
    return str.trim();
  }

  onSubmit(formData: any, formDirective: FormGroupDirective) {
    var data: any;
    if(this.currentAction == 'Add Category'){
      data = {category: this.format(this.adCtgryFrm.get("adCtgryCtrl")!.value)};
      this.mngProductSrvc.InsertCategory(data);
    }
    else if(this.currentAction == 'Add Model'){
      data = {model: this.format(this.adMdlFrm.get("adMdlCtrl")!.value)};
      this.mngProductSrvc.InsertModel(data);
    }
    else if(this.currentAction == 'Add Brand'){
      data = {brand: this.format(this.adBrndFrm.get("adBrndCtrl")!.value)};
      this.mngProductSrvc.InsertBrand(data);
    }
    else if(this.currentAction == 'Delete Category'){
      data = {category: this.rmvCtgryFrm.get("rmvCtgryCtrl")!.value};
      this.mngProductSrvc.DeleteCategory(data);
    }
    else if(this.currentAction == 'Delete Brand'){
      data = {brand: this.rmvBrndFrm.get("rmvBrndCtrl")!.value};
      this.mngProductSrvc.DeleteBrand(data);
    }
    else if(this.currentAction == 'Delete Model'){
      data = {model: this.rmvMdlFrm.get("rmvMdlCtrl")!.value};
      this.mngProductSrvc.DeleteModel(data);
    }

    else if(this.currentAction == 'Add Product' || this.currentAction == 'Update Product'){
      const formdata = new FormData();
      formdata.append('productId',this.adPrdtFrm.get("prdtIDCtrl")!.value.trim());
      console.log(this.adPrdtFrm.get("mrpCtrl")!.value);
      formdata.append('mrp',this.adPrdtFrm.get("mrpCtrl")!.value);
      formdata.append('category',this.adPrdtFrm.get("ctgryCtrl")!.value);
      formdata.append('model',this.adPrdtFrm.get("mdlCtrl")!.value);
      var brandVal = this.adPrdtFrm.get("brndCtrl")!.value;
      if(brandVal == "No Brand"){
        brandVal = "";
      }
      formdata.append('brand',brandVal);
      formdata.append('desc',this.adPrdtFrm.get("descCtrl")!.value);
      formdata.append('img',"/assets/images/"+this.adPrdtFrm.get("prdtIDCtrl")!.value.trim()+'.'+this.imgExt);
      formdata.append('qtyType',this.format(this.adPrdtFrm.get("qtyTypeCtrl")!.value));
      formdata.append('tax',this.adPrdtFrm.get("taxCtrl")!.value);
      formdata.append('unit',this.adPrdtFrm.get("minUnitCtrl")!.value);
      formdata.append('isActive',((this.dActCtrl.value == null) ?  true : !this.dActCtrl.value).toString());
      formdata.append('lastModifiedBy',this.commonSrvc.user.userId);
      formdata.append('upImg',this.imgFile);
      // data = {
      //   "productId": this.adPrdtFrm.get("prdtIDCtrl")!.value.trim(),
      //   "mrp": this.adPrdtFrm.get("mrpCtrl")!.value,
      //   "category": this.adPrdtFrm.get("ctgryCtrl")!.value,
      //   "model": this.adPrdtFrm.get("mdlCtrl")!.value,
      //   "brand": this.adPrdtFrm.get("brndCtrl")!.value,
      //   "desc": this.adPrdtFrm.get("descCtrl")!.value,
      //   "img": "/assets/images/"+this.adPrdtFrm.get("prdtIDCtrl")!.value.trim()+".jpg",
      //   "qtyType": this.format(this.adPrdtFrm.get("qtyTypeCtrl")!.value),
      //   "tax": this.adPrdtFrm.get("taxCtrl")!.value,
      //   "unit": this.adPrdtFrm.get("minUnitCtrl")!.value,
      //   "isActive": (this.dActCtrl.value == null) ?  true : !this.dActCtrl.value,
      //   "lastModifiedBy": this.commonSrvc.user.userId,
      //   "upImg":formdata
      // }
      if(this.currentAction == 'Add Product'){
        this.mngProductSrvc.AddProduct(formdata);
      }else{
        //data.img = this.oldData.img;
        formdata.append("oldData",JSON.stringify(this.oldData));
        this.mngProductSrvc.UpdateProduct(formdata);
        this.ShowPrdtFlds = false;
        this.prdtSrchCtrl.reset();
      }
    }
    this.imgExt = "";
    this.imgPrvew = false;
    formDirective.resetForm();
    this.dActCtrl.reset();
    this.setFilters();
  }
}
