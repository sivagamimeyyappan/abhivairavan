import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContactusComponent } from './contactus/contactus.component';
import { SignupComponent } from './signup/signup.component';
import { CartComponent } from './cart/cart.component';
import { ProductsLoaderComponent } from './productsLoaderPage/productsLoader.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductsDisplayComponent } from './productsDisplayPage/productsDisplay.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ProductByCategoryResolver } from './serviceResolvers/product-by-category.resolver';
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
import { HomeProductResolver } from './serviceResolvers/home-product.resolver';
import { SearchResolver } from './serviceResolvers/search.resolver';
import { ProductByModelResolver } from './serviceResolvers/product-by-model.resolver';
import { ManageProductsComponent } from './manage-products/manage-products.component';


const routes: Routes = [{path: 'contactus', component: ContactusComponent},
{path: 'login', component: LoginComponent},
{path: 'cart/:orderId', component: CartComponent, resolve: {response: CartresolverService}, canActivate: [AuthGuard, CanActivatecartGuard]},
{path: 'cart', component: CartComponent, resolve: {response: CartresolverService}},
{path: 'enquiries', component: EnquiriesComponent, resolve: {response: EnquiriesresolverService}, canActivate: [AdminGuard]},
{path: 'ManageProducts', component: ManageProductsComponent, canActivate: [AdminGuard]},
{path: 'orders', component: OrdersComponent, resolve: {response: OrderresolverService}, canActivate: [AdminGuard]},
{path: 'orders/:userId', component: OrdersComponent, resolve: {response: OrderresolverService}, canActivate: [AuthGuard]},
{path: 'signup', component: SignupComponent},

{path: 'products', component: ProductsLoaderComponent,
children: [
  {path: '', component: HomeComponent , resolve: {response: HomeProductResolver}},
  {path: 'productsBySearch', component: ProductsDisplayComponent , resolve: {response: SearchResolver}},
  {path: 'productsByModel', component: ProductsDisplayComponent , resolve: {response: ProductByModelResolver}},
  {path: 'productsByCategory', component: ProductsDisplayComponent , resolve: {response: ProductByCategoryResolver}},
  {path: 'product', component: ProductDetailComponent }
]},
{
  // path: '', redirectTo:'/products/productlist;category=All', pathMatch:'full'
  path: '', redirectTo:'/products', pathMatch:'full'
},
{ path: '**', component: PageNotFoundComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy', scrollPositionRestoration: 'top'} )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
