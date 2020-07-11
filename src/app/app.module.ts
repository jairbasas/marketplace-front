import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { HttpClientModule } from "@angular/common/http";

import { AppComponent } from './app.component';
import { HeaderComponent } from './modules/header/header.component';
import { HeaderPromotionComponent } from './modules/header-promotion/header-promotion.component';
import { NewLetterComponent } from './modules/new-letter/new-letter.component';
import { FooterComponent } from './modules/footer/footer.component';
import { HeaderMobileComponent } from './modules/header-mobile/header-mobile.component';
import { HomeComponent } from './pages/home/home.component';
import { ProductsComponent } from './pages/products/products.component';
import { ProductComponent } from './pages/product/product.component';
import { SearchComponent } from './pages/search/search.component';
import { PagenofoundComponent } from './pages/pagenofound/pagenofound.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HeaderPromotionComponent,
    NewLetterComponent,
    FooterComponent,
    HeaderMobileComponent,
    HomeComponent,
    ProductsComponent,
    ProductComponent,
    SearchComponent,
    PagenofoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
