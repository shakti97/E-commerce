// import { DashBoardRoutingModule } from './../Routes/DashBoardRouting.module';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { SellerModule } from './seller/seller.module';
import { Router } from '../../node_modules/@angular/router';
import { AppRoutingModule } from 'Routes/appRouting.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    SellerModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
