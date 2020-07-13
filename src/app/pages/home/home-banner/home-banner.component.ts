import { Component, OnInit } from '@angular/core';
import { Path } from "../../../config";
import { OwlCarouselConfig, BackgroundImage } from "../../../function";

import { ProductsService } from '../../../services/products.service';

@Component({
  selector: 'app-home-banner',
  templateUrl: './home-banner.component.html',
  styleUrls: ['./home-banner.component.css']
})
export class HomeBannerComponent implements OnInit {

  path: String = Path.url;
  banner_home: Array<any> = [];
  category:Array<any> = [];
  url:Array<any> = [];
  render:Boolean = true;
  preload:Boolean = false;
  constructor(private productService: ProductsService) { }

  ngOnInit(): void {
    this.preload = true;
    let index = 0;
    this.productService.getData()
        .subscribe( response => {
          let i;
          let size = 0;
          for(i in response){ size++; }
          if(size > 5){
            index = Math.floor(Math.random() * (size - 5));
          }
          this.productService.getLimitData(Object.keys(response)[index], 5)
              .subscribe(response => {
                let i;
                for(i in response){
                  this.banner_home.push(JSON.parse(response[i].horizontal_slider));
                  this.category.push(response[i].category);
                  this.url.push(response[i].url);
                  this.preload = false;
                }
                
              } );
          
        });
  }

  callback(){
    if(this.render){
      this.render = false;
      OwlCarouselConfig.fnc();
      BackgroundImage.fnc();
    }
  }

}
