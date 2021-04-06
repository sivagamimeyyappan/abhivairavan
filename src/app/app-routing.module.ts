import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContactusComponent } from './contactus/contactus.component';
import { SignupComponent } from './signup/signup.component';
import { CartComponent } from './cart/cart.component';
import { ProductsComponent } from './products/products.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductComponent } from './product/product.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ProductResolverService } from './serviceResolvers/product-resolver.service';
import { LoginComponent } from './login/login.component';
import { OrdersComponent } from './orders/orders.component';
import { EnquiriesComponent } from './enquiries/enquiries.component';
import { HomeComponent } from './home/home.component';
import { OrderresolverService } from './serviceResolvers/orderresolver.service';
import { CartresolverService } from './serviceResolvers/cartresolver.service';
import { CanActivatecartGuard } from './guards/can-activatecart.guard';
import { EnquiriesresolverService } from './serviceResolvers/enquiriesresolver.service';
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';


const routes: Routes = [{path: 'contactus', component: ContactusComponent},
{path: 'login', component: LoginComponent},
{path: 'cart/:orderId', component: CartComponent, resolve: {response: CartresolverService}, canActivate: [AuthGuard, CanActivatecartGuard]},
{path: 'cart', component: CartComponent, resolve: {response: CartresolverService}},
{path: 'enquiries', component: EnquiriesComponent, resolve: {response: EnquiriesresolverService}, canActivate: [AdminGuard]},
{path: 'orders', component: OrdersComponent, resolve: {response: OrderresolverService}, canActivate: [AdminGuard]},
{path: 'orders/:userId', component: OrdersComponent, resolve: {response: OrderresolverService}, canActivate: [AuthGuard]},
{path: 'signup', component: SignupComponent},

{path: 'products', component: ProductsComponent,
children: [
  {path: '', component: HomeComponent , resolve: {response: ProductResolverService}},
  {path: 'search', component: ProductComponent , resolve: {response: ProductResolverService}},
  {path: 'productlist', component: ProductComponent , resolve: {response: ProductResolverService}},
  {path: 'product', component: ProductDetailComponent }
]},
{
  // path: '', redirectTo:'/products/productlist;category=All', pathMatch:'full'
  path: '', redirectTo:'/products', pathMatch:'full'
},
{ path: '**', component: PageNotFoundComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
