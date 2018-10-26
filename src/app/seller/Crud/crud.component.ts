import { Component} from "../../../../node_modules/@angular/core";
import CrudProductService from "Services/CrudProduct.service";

@Component({
    selector : 'crudComponent',
    templateUrl : './crud.component.html',
    styleUrls : ['./crud.component.css'],
    providers : [CrudProductService]
})
export class CrudComponent{
    constructor(private crudProduct :CrudProductService){

    }
    AddProduct(PCtg,PBrd,PName,PQnt,PPrice,PImg,PInfo){
        let ProductDetails  ={
            ProductCategory : PCtg,
            ProductBrand : PBrd,
            ProductName : PName,
            ProductQuantity :PQnt,
            ProductPrice : PPrice,
            ProductImg : PImg,
            ProductInfo : PInfo
        }
        console.log('ProductDetails',ProductDetails);
        let productAdd=this.crudProduct.AddProduct(ProductDetails);
        productAdd.then((Data)=>{
            console.log("Data"+Data);
            if(Data.isProductDetailsAdded){
                alert('Product Added Successfully');
            }
            else{
                alert('some Error  while adding');
            }
        })

    }
}