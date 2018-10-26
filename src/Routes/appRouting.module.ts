import { CrudComponent } from './../app/seller/Crud/crud.component';
import { ProfileComponent } from './../app/seller/Profile/Profile.component';
import { MainDashBoardComponent } from './../app/seller/MainDashBoard/mainDashBoard.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashBoardComponent } from 'app/seller/DashBoard/DashBoard.component';
import { LoginGaurd } from 'Gaurds/LoginGuard';
import { SellerComponent } from 'app/seller/seller/seller.component';
import LoginAuth from 'Services/LoginAuth.service';
import { ShowProductsComponent } from 'app/seller/ShowProducts/showProducts.component';

const routes: Routes = [
    {
        path : '', redirectTo : 'LoginPage', pathMatch : 'full', 
    },
    {
        path : 'LoginPage',
        component : SellerComponent,
    },
    {
        path : 'DashBoard' ,
        component : DashBoardComponent ,
        canActivate : [LoginGaurd],
        children : [
            {
                path : '',
                component : MainDashBoardComponent
            },
            {
                path : 'MainDashBoard',
                component : MainDashBoardComponent,
            },
            {
                path : 'Profile' ,
                component : ProfileComponent ,
            },
            {
                path : 'Crud',
                component : CrudComponent,
            },
            {
                path :'ShowProducts',
                component : ShowProductsComponent
            }

        ]
    }
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports : [RouterModule],
    providers :[LoginGaurd,LoginAuth]
})

export class AppRoutingModule{}