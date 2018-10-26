import { UpdateProductsComponent } from './UpdateProducts/UpdateProducts.component';
import { ShowProductsComponent } from './ShowProducts/showProducts.component';
import { MainDashBoardComponent } from './MainDashBoard/mainDashBoard.component';
import { DashBoardComponent } from './DashBoard/DashBoard.component';
import {  AppRoutingModule } from './../../Routes/appRouting.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SellerComponent } from './seller/seller.component';
import { CrudComponent } from './Crud/crud.component';
import { ProfileComponent } from './Profile/Profile.component';
import { BootstrapModalModule } from 'ng2-bootstrap-modal';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    BootstrapModalModule,
    BootstrapModalModule.forRoot({container:document.body})
  ],
  declarations: [SellerComponent,DashBoardComponent,CrudComponent,ProfileComponent,MainDashBoardComponent,ShowProductsComponent, UpdateProductsComponent],
  exports :  [SellerComponent],
  entryComponents: [
    UpdateProductsComponent
  ],
})
export class SellerModule { }
