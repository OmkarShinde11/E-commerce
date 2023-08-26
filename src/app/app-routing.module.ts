import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutUsComponent } from './about-us/about-us.component';
import { AddProductComponent } from './add-product/add-product.component';
import { AddToCartComponent } from './add-to-cart/add-to-cart.component';
import { CheckoutProductsComponent } from './checkout-products/checkout-products.component';
import { HomeComponent } from './home/home.component';
import { ProductDetailComponent } from './Product/product-detail/product-detail.component';
import { ProductComponent } from './product/product.component';

const routes: Routes = [
  {
    path:'',
    redirectTo:'home',
    pathMatch:'full'
  },
  {
    path:'home',
    component:HomeComponent
  },
  {
    path:'about-us',
    component:AboutUsComponent
  },
  {
    path:'products',
    component:ProductComponent,
    children:[
     {
      path:':id',
      component:ProductDetailComponent
     }
    ]
  },
  {
    path:'add-to-cart',
    component:AddToCartComponent
  },
  {
    path:'all-Product',
    component:AddProductComponent
  },
  {
    path:'checkout',
    component:CheckoutProductsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
