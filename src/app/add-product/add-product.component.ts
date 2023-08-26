import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/Models/products';
import { ProductService } from '../Services/product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  productForms:FormGroup;
  NewProductId;

  constructor(private productservice:ProductService,private router:Router,private route:ActivatedRoute) { }

  ngOnInit(): void {
    debugger;
    this.login();
    this.NewProductId=this.productservice.getlargeId();
  }

  onSubmit(){
  debugger;
   console.log(this.productForms);
   let newProduct=new Product(this.NewProductId,this.productForms.value.productName,this.productForms.value.productImage,this.productForms.value.productDesc,this.productForms.value.productPrice,1)
   console.log(newProduct);
   this.productservice.addProduct(newProduct);

  
  }

  private login(){
    this.productForms=new FormGroup({
      productName:new FormControl(null,Validators.required),
      productDesc:new FormControl(null,Validators.required),
      productImage:new FormControl(null,Validators.required),
      productPrice:new FormControl(null,Validators.required),
    })
  }

  navigate(){
    this.router.navigate(['/products',],{relativeTo:this.route})
  }


}
