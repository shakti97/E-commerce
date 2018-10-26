import { Router } from '@angular/router';

import { Component, OnInit } from '@angular/core';
import LoginAuth from 'Services/LoginAuth.service';

@Component({
  selector: 'app-seller',
  templateUrl: './seller.component.html',
  styleUrls: ['./seller.component.css'],
  providers : [LoginAuth]
})
export class SellerComponent implements OnInit {
  email : string;
  password : string;
  LoginData : any;
  constructor(private Auth : LoginAuth,private router : Router) {
    this.email='';
    this.password='';
    this.LoginData={};
   }

  ngOnInit() {
  }
  Email(value){
    this.email=value;
  }
  Password(value){
    this.password=value;
  }
  getApi(){
    console.log('getApi called ');
    // let url : string= 'http://localhost:3000/api'
    // this._http.get(url).toPromise().then(res=> console.log(res));
  }
  LoginSeller(){
    console.log('LoginSeller Called');
    console.log('email',this.email);
    console.log('pwd',this.password);
    this.LoginData = { Email : this.email , Password : this.password };
    let url = 'http://localhost:1234/doLogin';
    let Data ={
      UserData : this.LoginData,
    } 
    let auth=this.Auth.LoginAuth(url,Data);
    auth.then((Data)=>{
      if(Data.isLogin){
        this.router.navigate(['/DashBoard']);
        console.log('hey  I m true');
      }});
    
  }


}
