import { Component, DoCheck, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Product } from 'src/Models/products';
import { Events } from '../Services/events.service';
import { ProductService } from '../Services/product.service';

@Component({
  selector: 'app-add-to-cart',
  templateUrl: './add-to-cart.component.html',
  styleUrls: ['./add-to-cart.component.css']
})
export class AddToCartComponent implements OnInit,DoCheck {

  ProductCart:Product[]=[];
  productcount:number;
  prdQuantity:number=1;
  totalValue=0;
  constructor(private productservice:ProductService,public events:Events) { 
    // events.subscribe('getProduct',(resp)=>{
    //   this.ProductCart.push(this.productservice.getsingleProduct(resp));
    // })
    events.subscribe('getCartProduct',(product=>{
      product.forEach(val=>{
        this.totalValue +=(val.productPrice * val.productQuantity)
      })
    }))
  }
  ngDoCheck(): void {
    // debugger;
    // if(this.totalValue==0){

    //   this.ProductCart.forEach(product => {
    //     this.totalValue +=(product.productPrice * product.productQuantity);
    //   });
    // }
    
  }
  
  ngOnInit(): void {
    this.ProductCart=this.productservice.getCartData();
    console.log(this.ProductCart);
    this.events.publish('getCartProduct',this.ProductCart);
  }
  increaseCount(index){
    debugger;
    this.ProductCart[index].productQuantity = this.ProductCart[index].productQuantity + 1;
    this.prdQuantity = this.ProductCart[index].productQuantity;
     let price=this.ProductCart[index].productPrice*(this.prdQuantity)
     console.log(price);
     this.totalValue=0
     this.events.publish('getCartProduct',this.ProductCart);
     this.productservice.updateCartData(index,this.prdQuantity);
  }
  decreaseCount(index){
     this.ProductCart[index].productQuantity=this.ProductCart[index].productQuantity-1
     this.prdQuantity=this.ProductCart[index].productQuantity;
     let price=this.ProductCart[index].productPrice*this.prdQuantity;
     console.log(price);
     this.totalValue=0;
     this.events.publish('getCartProduct',this.ProductCart);
     this.productservice.updateCartData(index,this.prdQuantity);
  }
  // count=this.productservice.addCart.subscribe((resp)=>{
  //    this.ProductCart.push(this.productservice.getsingleProduct(resp));
  //    console.log(this.ProductCart);
  //    this.productcount=this.ProductCart.length;
  //    localStorage.setItem('ProductCount',JSON.stringify(this.productcount));
  //    console.log(this.ProductCart.length);
  //  })
  removeItem(index){
    debugger;
    this.productservice.removeCartData(index);
    this.ProductCart=this.productservice.getCartData();
    this.totalValue=0
    this.events.publish('getCartProduct',this.ProductCart);
  }

}
