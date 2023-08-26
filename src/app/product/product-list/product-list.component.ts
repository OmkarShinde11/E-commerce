import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Events } from 'src/app/Services/events.service';
import { ProductService } from 'src/app/Services/product.service';
import { Product } from 'src/Models/products';
import {MessageService} from 'primeng/api'

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  product_list:Product[]=[];
  totalRecords=[];
  paginatedData=[];
  first:number=0;
  rows:number=4;
  constructor(private productservice:ProductService,private router:Router,private route:ActivatedRoute,public events:Events,private messageService: MessageService) { 
    
  }
  
  ngOnInit(): void {
    this.product_list=this.productservice.getProducts();
    console.log('Product-List',this.product_list);
    this.totalRecords.push(this.product_list.length);
    for(let i=0;i<4;i++){
      this.paginatedData.push(this.product_list[i])
    }
    this.productservice.productChange.subscribe(resp=>{
      this.product_list=resp
    })
  }

  showDetails(id){
    this.router.navigate([id],{relativeTo:this.route})
  }

  log1(){
    console.log('button clicked')
  }

  addToCart(product:Product){
    debugger;
    // this.productservice.addCart.next(id);
    this.productservice.addToCart(product);
    this.messageService.add({severity:'success', summary:'Product Add', detail:'Product added sucessfully in cart'});

    // this.router.navigate(['/add-to-cart'],{relativeTo:this.route})
    // this.events.publish('Count',id);
    // this.events.publish('getProduct',id)
  }
  paginate(event){
    console.log(event);
    this.first=event.first;
    this.rows=event.rows
    this.paginatedData=[];
    this.paginatedData=<any[]>this.product_list.slice(this.first,(this.first + this.rows))
  }

  search(data){
    debugger
    if(data==''){
      this.paginatedData=[];
      this.paginatedData=<any[]>this.product_list.slice(this.first,(this.first + this.rows))
    }
    else{
      this.paginatedData=this.product_list.filter(product=>product.productName.toLowerCase().includes(data.toLowerCase()));
    }
  }
}
