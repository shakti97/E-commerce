import { Http } from '@angular/http';
import { Injectable } from "@angular/core";

@Injectable()
export default class LoginAuth{
    option :any;
    constructor(private _http : Http){
        this.option={
            withCredentials :true
        }
    }
    LoginAuth(url : string,Data : any){
        console.log('hey LoginAuth');
       return this._http.post(url,Data,this.option).toPromise()
        .then(data=> { localStorage.setItem("userId",(data.json()).userId);console.log('islOgin',data.json()); return data.json()})
        .catch(error=> {return error})
    }
    isLoggedIn(url:string){
        let Data={}
        console.log('isLogin Function called');
        return this._http.post(url,Data,this.option).toPromise()
        .then(data=>{ return data.json()})
        .catch(error=>{return error})
    }
}