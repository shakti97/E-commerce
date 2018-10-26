import { UpdateProductsComponent } from './../UpdateProducts/UpdateProducts.component';
import CrudProductService from 'Services/CrudProduct.service';
import { Component,OnInit} from "../../../../node_modules/@angular/core";
import { DialogService } from "ng2-bootstrap-modal";

@Component({
    selector : 'ShowProductComponent',
    templateUrl : './showProducts.component.html',
    styleUrls : ['./showProducts.component.css'],
    providers : [CrudProductService,DialogService]
})
export class ShowProductsComponent implements OnInit{
    products : any;
    productIdArray : String[];
    constructor(private crudProduct : CrudProductService,private dialogService : DialogService){
        this.products=[];
        this.productIdArray=[];
    }
    SelectedProduct(value){
        console.log('Selected the product');
        this.productIdArray.push(value);
        console.log('total product Selected',this.productIdArray);
    }
    DeleteProduct(){
        console.log('function delete product trigger');
        this.crudProduct.DeleteProduct(this.productIdArray)
            .then((Data)=>{
                if(Data.isProductDeleted){
                    alert('Product Deleted SuccessFully');
                    this.ngOnInit();
                }
                else{
                    alert('Some Error Occured while deleting');
                }
            })
    }
    UpdateProduct(){
        console.log('function update product trigger');
        this.products.forEach(product=>{
            if(product.ProductID==this.productIdArray[0]){
                console.log("productsDetails", product.ProductName);
                let disposable = this.dialogService.addDialog(UpdateProductsComponent, {
                    ProductId : product.ProductID,
                    ProductName : product.ProductName,
                    ProductQuantity : product.ProductQuantity,
                    ProductPrice : product.ProductPrice,
                    ProductDescription : product.ProductDescription,
                    ProductImage : product.ProductImage, 
                    })
                    .subscribe((isConfirmed)=>{
                        //We get dialog result
                        if(isConfirmed) {
                            alert('Product Updates');
                            this.ngOnInit();
                        }
                        else {
                            alert('declined');
                        }
                    });
            }
        })
        
          }
    
    ngOnInit(){
            let showProducts=this.crudProduct.ShowProduct();
            showProducts.then((Data)=>{
                console.log("Data",Data);
                this.products=Data.products;
            })
    
        }
    
}