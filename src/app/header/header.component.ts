import { DoCheck, OnChanges, SimpleChanges } from '@angular/core';
import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/Models/products';
import { Events } from '../Services/events.service';
import { ProductService } from '../Services/product.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit,OnChanges{
  ProductCart:Product[]=[];
  productcount:any=0;
  productID:any;
  constructor(private productservice:ProductService,private router:Router,public events:Events) {

    // events.subscribe('Count',(id)=>{
    //   console.log(id);
    //   this.productID=id
    //   this.ProductCart.push(this.productservice.getsingleProduct(id));
    //     console.log(this.ProductCart);
    //     console.log(this.ProductCart.length);
    //     this.productcount=this.ProductCart.length;
    // })


   }
  ngOnChanges(changes: SimpleChanges): void {
    // if(this.productcount==0){
    //     this.productcount=this.productservice.getConutProduct();
    //    }
  }
  ngDoCheck(): void {
    // this.productcount=JSON.parse(localStorage.getItem('ProductCount'))
   if(this.productcount==0){
    this.productcount=this.productservice.getConutProduct();
   }
   else{
    this.productcount=this.productservice.getConutProduct();
   }
  }

  ngOnInit(): void {
  //  this.productservice.addCart.subscribe(resp=>{
  //   this.productcount=resp;
  //  })
  }

  // count=this.productservice.addCart.subscribe((resp)=>{
  //   console.log(resp);
  //   this.ProductCart.push(this.productservice.getsingleProduct(resp));
  //   console.log(this.ProductCart);
  //   console.log(this.ProductCart.length);
  //   this.productcount=this.ProductCart.length;
  // })
  


  navigation(){
    this.router.navigate(['add-to-cart'])
  }

}
