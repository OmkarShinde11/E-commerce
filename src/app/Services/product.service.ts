import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Product } from 'src/Models/products';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  Products:Product[]=[
    new Product(1,'Apple Watch','https://www.apple.com/newsroom/images/product/watch/standard/Apple_delivers-apple-watch-series-6_09152020_big.jpg.large.jpg','Apple Watch is a wearable smartwatch that allows users to accomplish a variety of tasks, including making phone calls, sending text messages and reading email.',37000,1),

    new Product(2,'Iphone13','https://img5.gadgetsnow.com/gd/images/products/additional/large/G306232_View_1/mobiles/smartphones/apple-iphone-13-pro-1-tb-sierra-blue-6-gb-ram-.jpg','The iPhone 13 display has rounded corners that follow a beautiful curved design, and these corners are within a standard rectangle. When measured as a standard rectangular shape, the screen is 6.06 inches diagonally',91000,1),

    new Product(3,'Beared Oil','https://m.media-amazon.com/images/I/51NvCO+Hr5L._SX679_.jpg','ForecastBeard Growth Oil For Men Fast Growth Advanced - 50ml - Beard Growth Oil for Patchy Beard, With Redensyl and DHT Booster, Nourishment & Moisturization, No Harmful Chemicals Hair Oil (30 ml)',210,1),

    new Product(4,'OnePlus Nord CE 3 Lite 5G','https://m.media-amazon.com/images/I/61QRgOgBx0L._SX679_.jpg','OnePlus Nord CE 3 Lite 5G (Pastel Lime, 8GB RAM, 128GB Storage)',19000,1),

    new Product(5,'MuscleBlaze ','https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcSSzjjMC1wxTp9HnwZFMdsQdUnZ2fZv5if5fQ4r1L25wCERQuzo21vINr-l60RBvExoVnH2zOvk534qFedGKD4jawXc_i02_XtMyYw5OXd2','100% Whey Protein Supplement Powder with Digestive Enzyme, 1.82 kg (4 lb), 54 Servings (Rich Milk Chocolate)',4849,1),

    new Product(6,'Study Table','https://m.media-amazon.com/images/I/51ucu0nCeSL._SX300_SY300_QL70_FMwebp_.jpg','Anjaney Enterprise Smart Multipurpose Foldable Laptop Table with Cup Holder, Study Table, Bed Table, Breakfast Table, Foldable and Portable/Ergonomic & Rounded Edges/Non-Slip (Black)',219,1)
  ];

  addCart=new Subject();
  productChange=new Subject<Product[]>();
  cartData:Product[]=[];
  constructor() { }

  getProducts(){
    return this.Products.slice();
  }
  getsingleProduct(id){
   let data =this.Products.filter(val=>val.productID==id)
    return data
  }

  addProduct(product){
    this.Products.push(product);
    this.productChange.next(this.Products.slice())
  }

  addToCart(data){
  //  this.cartData.push(data);
  let a:Product[]=JSON.parse(localStorage.getItem('addToCart')) || [];

  if(a.length != 0) {
    a.push(data);
    localStorage.setItem('addToCart',JSON.stringify(a));
  }
  else{

    a.push(data);
    localStorage.setItem('addToCart',JSON.stringify(a));
  }
  }

  getConutProduct(){
    let a:Product[]=JSON.parse(localStorage.getItem('addToCart')) || [];
    return a.length;
  }

  getCartData(){
    let a:Product[]=JSON.parse(localStorage.getItem('addToCart'));
    return a;
  }
  updateCartData(index,quantity){
    let oldData:Product[]=JSON.parse(localStorage.getItem('addToCart'));
    console.log("oldData",oldData)
    oldData[index].productQuantity=quantity;
    console.log("updateData",oldData)
    localStorage.setItem('addToCart',JSON.stringify(oldData));
  }
  removeCartData(index){
    let Data=JSON.parse(localStorage.getItem('addToCart'));
    let new_Data=Data.splice(index,1);
    localStorage.setItem('addToCart',JSON.stringify(Data));
  }
  getlargeId(){
    debugger;
   let length= this.Products.length - 1;
   let lastID=this.Products[length].productID +1;
   return lastID;
  }
}
