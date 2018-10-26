import { Component, OnInit } from '@angular/core';
import { DialogComponent, DialogService } from "ng2-bootstrap-modal";
import CrudProductService from 'Services/CrudProduct.service';

export interface ConfirmModel {
  ProductId : string;
  ProductName : string,
  ProductQuantity : string,
  ProductPrice : string,
  ProductDescription : string,
  ProductImage : string,
}

@Component({
  selector: 'app-update-products',
  templateUrl: './UpdateProducts.component.html',
  styleUrls: ['./UpdateProducts.component.css']
})
export class UpdateProductsComponent extends DialogComponent<ConfirmModel, boolean> implements OnInit,ConfirmModel {
  ProductId :string;
  ProductName : string;
  ProductQuantity : string;
  ProductPrice : string;
  ProductDescription : string;
  ProductImage : string;
  constructor(dialogService : DialogService, private crudProduct :CrudProductService) {
    super(dialogService);
    this.ProductId ='';
   }
  UpdateProductDetails(UpName,UpQnty,UpPrice,UpImg,UpDesc) {
    // we set dialog result as true on click on confirm button, 
    // then we can get dialog result from caller code 
    let UpdateProductDetails  ={
      ProductId : this.ProductId,
      ProductName : UpName,
      ProductQuantity : UpQnty,
      ProductPrice : UpPrice,
      ProductImg : UpImg,
      ProductInfo : UpDesc
  }
  console.log('UpdateProductDetails',UpdateProductDetails);
  let UpdateProduct=this.crudProduct.UpdateProduct(UpdateProductDetails);
    UpdateProduct.then((Data)=>{
      console.log('Successfully Udated',Data);
      if(Data){
        this.result = true;
        this.close();
      }
    })
    
  }
  ngOnInit() {
    
  }
  Component

}
