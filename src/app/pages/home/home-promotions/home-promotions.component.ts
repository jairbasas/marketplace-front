import { Component, OnInit } from '@angular/core';
import { Path } from "../../../config";
import { ProductsService } from '../../../services/products.service';

@Component({
  selector: 'app-home-promotions',
  templateUrl: './home-promotions.component.html',
  styleUrls: ['./home-promotions.component.css']
})
export class HomePromotionsComponent implements OnInit {

  path: String = Path.url;
  banner_default: Array<any> = [];
  category:Array<any> = [];
  url:Array<any> = [];
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
          if(size > 2){
            index = Math.floor(Math.random() * (size - 2));
          }
          this.productService.getLimitData(Object.keys(response)[index], 2)
              .subscribe(response => {
                let i;
                for(i in response){
                  this.banner_default.push(response[i].default_banner);
                  this.category.push(response[i].category);
                  this.url.push(response[i].url);
                  this.preload = false;
                }
                
              } );
          
        });
  }

}
