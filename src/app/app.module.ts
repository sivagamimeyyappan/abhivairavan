import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContactusComponent } from './contactus/contactus.component';
import { SignupComponent } from './signup/signup.component';
import { CartComponent } from './cart/cart.component';
import { ProductsLoaderComponent } from './productsLoaderPage/productsLoader.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductsDisplayComponent } from './productsDisplayPage/productsDisplay.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ProductMenuComponent } from './product-menu/product-menu.component';
import { BrandmenuComponent } from './brandmenu/brandmenu.component';
import { LoginComponent } from './login/login.component';
import { cnfrmpaswrdDirective } from './shared/cnfrmpaswrd.directive';
import { AdminmenuComponent } from './adminmenu/adminmenu.component';
import { ProfilemenuComponent } from './profilemenu/profilemenu.component';
import { OrdersComponent } from './orders/orders.component';
import { EnquiriesComponent } from './enquiries/enquiries.component';
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ScrollTrackerDirective } from './shared/scrollTracker.directive';
import { ManageProductsComponent } from './manage-products/manage-products.component';
import { autocompleteStringValidatorDirective } from './shared/autocompleteStringValidator';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { CommonService } from './services/common.service';

const getEssentialData = (primryDtaSrvc: CommonService) =>{
  return () =>{
    return primryDtaSrvc.getPrimaryData();
  }
}

@NgModule({
  declarations: [
    AppComponent,
    ContactusComponent,
    SignupComponent,
    CartComponent,
    ProductsLoaderComponent,
    ProductsDisplayComponent,
    ProductDetailComponent,
    PageNotFoundComponent,
    ProductMenuComponent,
    BrandmenuComponent,
    LoginComponent,
    cnfrmpaswrdDirective,
    AdminmenuComponent,
    ProfilemenuComponent,
    OrdersComponent,
    EnquiriesComponent,
    HomeComponent,
    ScrollTrackerDirective,
    ManageProductsComponent,
    autocompleteStringValidatorDirective 
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    MatSelectModule,
    MatInputModule,
    MatAutocompleteModule,
    MatIconModule,
    MatButtonModule,
    MatCheckboxModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [CommonService, {
    provide: APP_INITIALIZER,
    useFactory: getEssentialData,
    multi: true,
    deps:[CommonService]
  }],
  bootstrap: [AppComponent]
})
export class AppModule {
  // constructor(router: Router, viewportScroller: ViewportScroller) {
  //   router.events.pipe(
  //     filter((e): e is Scroll => e instanceof Scroll)
  //   ).subscribe(e => {
  //     console.log("i am e"+ e);
      
  //     if(e.position){
  //       viewportScroller.scrollToPosition(e.position);
  //     }
  //   });
  // }
}