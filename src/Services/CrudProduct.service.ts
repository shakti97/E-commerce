import { Http } from '@angular/http';
import { Injectable } from "../../node_modules/@angular/core";
import { isArray } from 'util';

@Injectable()
export default class{
    option : any;
    constructor(private _http:Http){
        this.option = {
            withCredentials:true,
        }
    }
    AddProduct(pDetails){
        console.log('addProduct function is running');
        pDetails.SellerId = localStorage.getItem("userId");
        let Url = 'http://localhost:1234/addProduct';
        return this._http.post(Url,pDetails,this.option).toPromise()
                   .then(data=> { return data.json()})
                   .catch(error=>{return error})
    }
    ShowProduct(){
        console.log('show PRoducts function is running');
        let Url='http://localhost:1234/GetProductSeller/'+ localStorage.getItem("userId");
        return this._http.get(Url,this.option).toPromise()
            .then(data=>{console.log('Products data.json()',data.json()); return data.json()})
            .catch(error=>{return error});
    }
    DeleteProduct(productId :String[]){
        console.log(productId);
        console.log(isArray(productId));
        console.log('service delete fucntion trigger');
        console.log('options',this.option);
        let Url='http://localhost:1234/deleteProducts/'+productId;
        return this._http.delete(Url,this.option).toPromise()
                .then(data=>{console.log('isProduct Deleted'+ data); return data.json()})
                .catch(error=>{ return error});
    }
    UpdateProduct(productDetails : any){
        console.log("Hello ",productDetails);
        let Url='http://localhost:1234/updateProducts/'+productDetails.ProductId;
        return this._http.put(Url,productDetails,this.option).toPromise()
                .then(data=>{console.log('Product Updated'); return data.json()})
                .catch(error=>{return error});
    }
}