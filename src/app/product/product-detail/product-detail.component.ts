import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ProductService } from 'src/app/Services/product.service';
import { Product } from 'src/Models/products';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  productId:any;
  productDetail:Product[];
  
  constructor(private router:Router,private route:ActivatedRoute,private productservice:ProductService) { }

  ngOnInit(): void {
    debugger;
   this.route.params.subscribe((data:Params)=>{
    this.productId=data['id'];
    console.log(this.productId);
    this.productDetail=<Product[]>this.productservice.getsingleProduct(this.productId);
    console.log(this.productDetail)
   });

  }

  purchase(){
    debugger;
    this.productservice.addToCart(this.productDetail[0]);
  }
}
