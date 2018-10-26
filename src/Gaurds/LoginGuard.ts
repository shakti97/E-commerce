import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import LoginAuth from 'Services/LoginAuth.service';
import { resolve } from '../../node_modules/@types/q';

@Injectable()
export class LoginGaurd implements CanActivate {

  constructor(private loginService: LoginAuth,private router : Router) {}

  canActivate()  {
    // console.log('hey u r trying to change the route');
    // if(10>8){
    //   return this.loginService.isLogin();
    // }else{
    //   return false;
    // }
    console.log('hey u r trying to chnge the route');
    let url='http://localhost:1234/api';
    return this.loginService.isLoggedIn(url).then(data=>{
      if(data.isLogin){
        console.log('hey i got true');
        return true;
      }
      else{
        console.log('hey i got false');
        this.router.navigate(['/LoginPage']);
        return false;
      }
    });
    
   
};
}
