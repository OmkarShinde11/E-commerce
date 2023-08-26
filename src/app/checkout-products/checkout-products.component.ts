import { Component, OnInit } from '@angular/core';
import { Product } from 'src/Models/products';
import { ProductService } from '../Services/product.service';

@Component({
  selector: 'app-checkout-products',
  templateUrl: './checkout-products.component.html',
  styleUrls: ['./checkout-products.component.css']
})
export class CheckoutProductsComponent implements OnInit {

  checkOutCarts:Product[];
  totalValue:number=0
  constructor(private productservice:ProductService) { }

  ngOnInit(): void {
    this.checkOutCarts=this.productservice.getCartData();
    this.checkOutCarts.forEach(product=>{
      this.totalValue+=(product.productPrice * product.productQuantity)
    })
  }

}
