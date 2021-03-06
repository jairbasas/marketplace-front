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
  rating:Array<any> = [];
  reviews:Array<any> = [];
  price:Array<any> = [];
  cargando:Boolean = false;
  constructor(private productService: ProductsService,
              private acivatedRouter: ActivatedRoute) { }

  ngOnInit(): void {
    this.cargando = true;
    let i;
    let params = this.acivatedRouter.snapshot.params["param"].split('&')[0];
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
        this.rating.push(this.dinamicRating(this.bestSalesItem[index]));
        this.reviews.push(this.dinamicReviews(this.rating[index]));
        this.price.push(this.dinamicPrice(this.bestSalesItem[index]));
        this.cargando = false;
      }
    });

  }

  dinamicRating(response){
    let totalReview = 0;
    let rating = 0;
    for(let i = 0; i < JSON.parse(response.reviews).length; i++){
      totalReview += Number(JSON.parse(response.reviews)[i]["review"]);
    }
    rating = Math.round(totalReview/JSON.parse(response.reviews).length);
    return rating;
  }

  dinamicReviews(response){
    let reviews = [];
    for(let r = 0; r < 5; r++){
      if(response < (r + 1)){
        reviews[r] = 2;
      }else{
        reviews[r] = 1;
      }
    }

    return reviews;
  }

  dinamicPrice(response){
    let type;
    let value;
    let offer;
    let price;
    let disccount;
    let arrayPrice = [];

    if(response.offer != ""){
      type = JSON.parse(response.offer)[0];
      value = JSON.parse(response.offer)[1];

      if(type == "Disccount"){
        offer = (response.price - (response.price * value /100)).toFixed(2);
      }

      if(type == "Fixed"){
        offer = value;
        value = Math.round(offer*100/response.price);
      }

      disccount = `<div class = "ps-product__badge">-${value}%</div>`;
      price = `<p class = "ps-product__price sale">$${offer} <del>$${response.price}</del></p>`;
    }else{
      price = `<p class = "ps-product__price sale">$${response.price}</p>`;
    }

    if(response.stock == 0){
      disccount = `<div class = "ps-product__badge">Out of Stock</div>`;
    }
    arrayPrice[0] = price;
    arrayPrice[1] = disccount;

    return arrayPrice;
  }

  callback(){
    if(this.render){
      this.render = false;
      OwlCarouselConfig.fnc();
      CarouselNavigation.fnc();
      Rating.fnc();
    }
  }

}
