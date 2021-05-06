import { CdkTextareaAutosize } from "@angular/cdk/text-field";
import { Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith, take } from 'rxjs/operators';

@Component({
  selector: 'app-manage-products',
  templateUrl: './manage-products.component.html',
  styleUrls: ['./manage-products.component.css']
})
export class ManageProductsComponent implements OnInit {

  adminActions: string[] =['Add Product','Update Product','Add Category','DeActivate Category', 'Add Brand', 'DeActivate Brand', 'Add Model', 'DeActivate Model'];
  currentAction: string = 'Add Product';
  
  fltrdCtgrys_slctCtgry: Observable<string[]>;
  fltrdBrnds_slctBrnd: Observable<string[]>;
  fltrdMdls_slctMdl: Observable<string[]>;

  public adPrdtFrm: FormGroup = new FormGroup({
    prdtIDCtrl: new FormControl('',[Validators.required]),
    mrpCtrl: new FormControl('',[Validators.required, Validators.pattern('^[0-9]+(.[0-9]+)?$')]),
    ctgryCtrl: new FormControl(),
    brndCtrl: new FormControl(),
    mdlCtrl: new FormControl(),
    descCtrl: new FormControl('',[Validators.required, Validators.maxLength(100)])
  });

  categories: string[] = ['Bathroom CP Fittings','Sanitaryware','Shower Enclosure','Shower Panel','Bath Tub',
  'Kitchen Sink','Pipes and Fittings','Brass Valves and Fittings','Water Tanks','Domestic Pumps And Motors',
  'Water Heaters','Accessories'];

  fltrdCtgrys_dActCtgry: Observable<string[]>;

  public rmvCtgryFrm: FormGroup = new FormGroup({
    rmvCtgryCtrl: new FormControl()
  });

  public adCtgryFrm: FormGroup = new FormGroup({
    adCtgryCtrl: new FormControl('', [Validators.required, Validators.minLength(2)])
  });

  brands: string[] = ['Hindware','Jaquar','Watermen','Queo','Grohe','Kolher','American Standard'];

  fltrdBrnds_dActBrnd: Observable<string[]>;
  public rmvBrndFrm: FormGroup = new FormGroup({
    rmvBrndCtrl: new FormControl()
  });

  public adBrndFrm: FormGroup = new FormGroup({
    adBrndCtrl: new FormControl('', [Validators.required, Validators.minLength(2)])
  });

  models: string[] = ['Contessa Plus','Classik','Flora','Monroe','Nebula','Oros','Armada'];

  fltrdMdls_dActMdl: Observable<string[]>;
  public rmvMdlFrm: FormGroup = new FormGroup({
    rmvMdlCtrl: new FormControl()
  });

  public adMdlFrm: FormGroup = new FormGroup({
    adMdlCtrl: new FormControl('', [Validators.required, Validators.minLength(2)])
  });
  
  constructor(private _ngZone: NgZone) { }

  @ViewChild("autosize", { static: false }) autosize: CdkTextareaAutosize;

  ngOnInit(): void {
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
    const filterValue = value.toLowerCase();
    return this.categories.filter(option => option.toLowerCase().includes(filterValue));
  }

  private _filterBrands(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.brands.filter(option => option.toLowerCase().includes(filterValue));
  }

  private _filterModels(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.models.filter(option => option.toLowerCase().includes(filterValue));
  }

  onSubmit() {
    if(this.currentAction == 'Add Category'){
      alert('Save Category ' + this.adCtgryFrm.get("adCtgryCtrl")!.value);
    }
    if(this.currentAction == 'Add Model'){
      alert('Save Model ' + this.adMdlFrm.get("adMdlCtrl")!.value);
    }
    if(this.currentAction == 'Add Brand'){
      alert('Save Brand ' + this.adBrndFrm.get("adBrndCtrl")!.value);
    }
    if(this.currentAction == 'DeActivate Category'){
      alert('DeActivate Category ' + this.rmvCtgryFrm.get("rmvCtgryCtrl")!.value);
    }
    if(this.currentAction == 'DeActivate Brand'){
      alert('DeActivate Brand ' + this.rmvBrndFrm.get("rmvBrndCtrl")!.value);
    }
    if(this.currentAction == 'DeActivate Model'){
      alert('DeActivate Model ' + this.rmvMdlFrm.get("rmvMdlCtrl")!.value);
    }
  }

}
