import { Component, OnInit } from '@angular/core';
import { Path } from "../../../config";
import { CategoriesService } from '../../../services/categories.service';
import { SubCategoriesService } from '../../../services/sub-categories.service';
import { ProductsService } from '../../../services/products.service';
import { OwlCarouselConfig, CarouselNavigation, SlickConfig, ProductLightbox, CountDown, Rating, ProgressBar } from "../../../function";

declare var jQuery: any;
declare var $:any;

@Component({
  selector: 'app-home-showcase',
  templateUrl: './home-showcase.component.html',
  styleUrls: ['./home-showcase.component.css']
})
export class HomeShowcaseComponent implements OnInit {

  path:String = Path.utl;
  categories: Array<any> = [];
  cargando:Boolean = false;
  render:Boolean = true;
  constructor(private categoriesService: CategoriesService, private subCategoriesService: SubCategoriesService, private productService: ProductsService) { }

  ngOnInit(): void {

    this.cargando = true;
    let getCategories = [];
    this.categoriesService.getData()
        .subscribe( response => {
          let i;
          for(i in response){
            getCategories.push(response[i]);
          }

          getCategories.sort(function(a, b){
            return(b.view - a.view);
          });

          getCategories.forEach((category, index)=> {
            if(index < 6)
              this.categories[index] = getCategories[index];
          });
          this.cargando = false;
        });

  }

  callback(indexes){
    if(this.render){
      this.render = false;
      let arraySubCategories = [];
      let arrayProducts = [];
      let preloadSV = 0;
      this.categories.forEach((category, index) => {

        this.subCategoriesService.getFilterData('category', category.name)
            .subscribe( response => {
              let i;
              for(i in response){

                arraySubCategories.push({
                  "category": response[i].category,
                  "subcategory": response[i].name,
                  "url": response[i].url
                });

              }

              for(i in arraySubCategories){
                if(category.name == arraySubCategories[i].category){
                  $(`[category-showcase='${category.name}']`).append(
                    `<li><a href="products/${arraySubCategories[i].url}">${arraySubCategories[i].subcategory}</a></li>`
                  );
                }
              }

            });

            this.productService.getFilterDataWithLimit("category", category.url, 6)
                .subscribe(response => { 
                  let i;
                  for(i in response){
                    arrayProducts.push({
                      "category": response[i].category,
                      "url": response[i].url,
                      "name": response[i].name,
                      "image": response[i].image,
                      "price": response[i].price,
                      "offer": response[i].offer,
                      "reviews": response[i].reviews,
                      "stock": response[i].stock,
                      "vertical_slider": response[i].vertical_slider
                    });
                  }

                  for(i in arrayProducts){
                    if(category.url == arrayProducts[i].category){

                      
                      let type;
                      let value;
                      let offer;
                      let price ;
                      let disccount;
                      if(arrayProducts[i].offer != ""){
                        type = JSON.parse(arrayProducts[i].offer)[0];
                        value = JSON.parse(arrayProducts[i].offer)[1];

                        if(type == "Disccount"){
                          offer = (arrayProducts[i].price - (arrayProducts[i].price * (value/100))).toFixed(2);
                        }
                        
                        if(type == "Fixed"){
                          offer = value;
                          value = Math.round(offer*100/ arrayProducts[i].price);
                        }
                        disccount = `<div class="ps-product__badge">-${value}%</div>`;
                        price = `<p class="ps-product__price sale">$${offer} <del>$${arrayProducts[i].price} </del></p>`;
                      }else
                        price = `<p class="ps-product__price ">$${arrayProducts[i].price} </p>`;

                        let totalReview = 0;
                        for(let f = 0; f < JSON.parse(arrayProducts[i].reviews).length; f++){
                          totalReview += Number(JSON.parse(arrayProducts[i].reviews)[f]["review"]);
                        }

                        let rating = Math.round(totalReview/JSON.parse(arrayProducts[i].reviews).length);
                        if(arrayProducts[i].stock == 0)
                          disccount = `<div class="ps-product__badge out-stock"></div>`;

                      $(`[category-pb='${arrayProducts[i].category}']`).append(
                        `
                        <div class="ps-product ps-product--simple">

                              <div class="ps-product__thumbnail">
          
                                  <a href="products/${arrayProducts[i].url}">
          
                                      <img src="assets/img/products/${arrayProducts[i].category}/${arrayProducts[i].image}" alt="">
          
                                  </a>
          
                                  ${disccount}
          
                              </div>
          
                              <div class="ps-product__container">
          
                                  <div class="ps-product__content" data-mh="clothing">
          
                                      <a class="ps-product__title" href="products/${arrayProducts[i].url}">${arrayProducts[i].name}</a>
          
                                      <div class="ps-product__rating">
          
                                          <select class="ps-rating productRating" data-read-only="true">          
                                          </select>
          
                                          <span>${rating}</span>
          
                                      </div>
                                      ${price}
                                  </div>
          
                              </div>
          
                          </div>
                        `);

                        let arrayRating = $(".productRating");
                        for(let i = 0; i < arrayRating.length; i++){
                          for(let f = 1; f <= 5; f++){
                            $(arrayRating[i]).append(`
                              <option value="2">${f}</option>
                            `);
                            if(rating == f){
                              $(arrayRating[i]).children('option').val(1);
                            }
                          }
                        }
                        Rating.fnc();

                        $(`[category-sl='${arrayProducts[i].category}']`).append(
                          `
                            <a href="product/${arrayProducts[i].url}">
                              <img src="assets/img/products/${arrayProducts[i].category}/vertical/${arrayProducts[i].vertical_slider}">
                            <a/>
                          `
                          );

                          preloadSV++;
                          if(preloadSV == (indexes + 1) * 6){
                            $(`[category-sl]`).addClass('ps-carousel--product-box')
								            $(`[category-sl]`).addClass('owl-slider')
                            $(`[category-sl]`).owlCarousel({

                              items: 1,
                              autoplay: true,
                              autoplayTimeout: 7000,
                              loop: true,
                                            nav: true,
                                            margin: 0,
                                            dots: true,
                                            navSpeed: 500,
                                            dotsSpeed: 500,
                                            dragEndSpeed: 500,
                                            navText: ["<i class='icon-chevron-left'></i>", "<i class='icon-chevron-right'></i>"],
           
                           });
                          }                            
                          //OwlCarouselConfig.fnc();
                    }
                  }

                 });
      });

    }
  }

}
