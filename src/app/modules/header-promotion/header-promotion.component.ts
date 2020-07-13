import { Component, OnInit } from '@angular/core';
import { Path } from "../../config.js";
import { ProductsService } from "../../services/products.service";

@Component({
  selector: 'app-header-promotion',
  templateUrl: './header-promotion.component.html',
  styleUrls: ['./header-promotion.component.css']
})
export class HeaderPromotionComponent implements OnInit {

  path: String = Path.url;
  topBanner : Object = null;
  preLoad: boolean = false;

  constructor(private _productService: ProductsService) { }

  ngOnInit(): void {
    this._productService.getData()
        .subscribe(response => {
          this.preLoad = true;
          let i;
          let size = 0;
          for(i in response){size++}
          let index = Math.floor(Math.random() * size);
          //console.log(response[Object.keys(response)[index]]);
          this.topBanner = JSON.parse(response[Object.keys(response)[index]].top_banner);
          this.preLoad = false;
        });
  }

}
