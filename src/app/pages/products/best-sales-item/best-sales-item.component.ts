import { Component, OnInit } from '@angular/core';

import { OwlCarouselConfig, CarouselNavigation, SlickConfig, ProductLightbox, CountDown, Rating, ProgressBar } from "../../../function";
import { Path } from "../../../config";
import { ProductsService } from '../../../services/products.service';
import { ActivatedRoute } from '@angular/router';

declare var JQuery:any;
declare var $:any;

@Component({
  selector: 'app-best-sales-item',
  templateUrl: './best-sales-item.component.html',
  styleUrls: ['./best-sales-item.component.css']
})
export class BestSalesItemComponent implements OnInit {

  path:String = Path.url;
  bestSalesItem: Array<any> = [];
  render:Boolean = true;
  constructor(private productService: ProductsService,
              private acivatedRouter: ActivatedRoute) { }

  ngOnInit(): void {

    let i;
    let params = this.acivatedRouter.snapshot.params["param"];
    this.productService.getFilterData("category", params)
        .subscribe(response => {
          if(Object.keys(response).length > 0){
            for(i in response){
              this.productsFnc(response);
            }
          }else{
            this.productService.getFilterData("sub_category", params)
                .subscribe(resp => {
                  for(i in resp){
                    this.productsFnc(resp);
                  }
                });
          }
        });

    OwlCarouselConfig.fnc();
    CarouselNavigation.fnc();
  }

  productsFnc(response){
    let i;
    let getSales = [];
    for(i in response){
      getSales.push(response[i]);
    }
    getSales.sort(function(a, b){
      return (b.sales - a.sales);
    });

    getSales.forEach((product, index) => {
      if(index < 10){
        this.bestSalesItem.push(product);
      }
    });

  }

  callback(){
    if(this.render){
      this.render = false;
      OwlCarouselConfig.fnc();
      CarouselNavigation.fnc();
    }
  }

}
