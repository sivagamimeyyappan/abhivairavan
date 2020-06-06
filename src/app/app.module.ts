import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContactusComponent } from './contactus/contactus.component';
import { SignupComponent } from './signup/signup.component';
import { CartComponent } from './cart/cart.component';
import { ProductsComponent } from './products/products.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductComponent } from './product/product.component';
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
import {MatSnackBarModule} from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    AppComponent,
    ContactusComponent,
    SignupComponent,
    CartComponent,
    ProductsComponent,
    ProductComponent,
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
    HomeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatSnackBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }