import { Component, OnInit } from '@angular/core';
import { OwlCarouselConfig, CarouselNavigation, Select2Config, Pagination, SlickConfig, ProductLightbox, CountDown, Rating, ProgressBar, DinamicRating, DinamicPrice, DinamicReviews } from "../../../function";
import { Path } from "../../../config";
import { ProductsService } from '../../../services/products.service';
import { ActivatedRoute } from '@angular/router';

declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-products-showcase',
  templateUrl: './products-showcase.component.html',
  styleUrls: ['./products-showcase.component.css']
})
export class ProductsShowcaseComponent implements OnInit {

  path:String = Path.url;
  products:Array<any> = [];
  render:Boolean = true;
  rating:Array<any> = [];
  reviews:Array<any> = [];
  price:Array<any> = [];
  cargando:Boolean = false;
  params: String = null;
  page;
  productFound:Number = 0;
  currentRoute:String = null;
  totalPage:Number = 0;
  sort;
  sortItems:Array<any> = [];
  sortValues:Array<any> = [];

  constructor(private productsService: ProductsService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.cargando = true;
    this.params = this.activatedRoute.snapshot.params["param"].split('&')[0];
    this.sort = this.activatedRoute.snapshot.params["param"].split('&')[1];
    this.page = this.activatedRoute.snapshot.params["param"].split('&')[2];

    if(Number.isInteger(Number(this.sort))){
      this.page = this.sort;
      this.sort = undefined;
    }

    if(this.sort == undefined){
      this.currentRoute = `products/${this.params}`;
    }else{
      this.currentRoute = `products/${this.params}&${this.sort}`;
    }
    

    let i;
    this.productsService.getFilterData("category", this.params)
        .subscribe(response => {
          if(Object.keys(response).length > 0){
            for(i in response){
              this.productsFnc(response);
            }
          }else{
            this.productsService.getFilterData("sub_category", this.params)
                .subscribe(resp => {
                  for(i in resp){
                    this.productsFnc(resp);
                  }
                });
          }
        });
  }

  productsFnc(response){
    this.products = [];
    let i;
    let getProducts = [];
    let total = 0;
    for(i in response){
      getProducts.push(response[i]);
      total++;
    }

    this.productFound = total;
    this.totalPage = Math.ceil(Number(this.productFound) / 6);

    if(this.sort == undefined || this.sort == "first"){
      getProducts.sort(function(a, b){
        return (b.date_create - a.date_create);
      });

      this.sortItems = [
        "Sort by first", 
        "Sort by latest",               
        "Sort by popularity",
        "Sort by prices: low to high",
        "Sort by prices: high to low"
      ];

      this.sortValues = [
        "first", 
        "latest",               
        "popularity",
        "low",
        "high"
      ];

    }

    if(this.sort == "latest"){
      getProducts.sort(function(a, b){
        return (a.date_create - b.date_create);
      });

      this.sortItems = [
        "Sort by latest",
        "Sort by first",        
        "Sort by popularity",
        "Sort by prices: low to high",
        "Sort by prices: high to low"
      ];

      this.sortValues = [
        "latest",
        "first",        
        "popularity",
        "low",
        "high"
      ];

    }

    if(this.sort == "popularity"){
      getProducts.sort(function(a, b){
        return (b.views - a.views);
      });

      this.sortItems = [
        "Sort by popularity",
        "Sort by latest",
        "Sort by first",
        "Sort by prices: low to high",
        "Sort by prices: high to low"
      ];
      this.sortValues = [
        "popularity",
        "latest",
        "first",        
        "low",
        "high"
      ];
    }

    if(this.sort == "low"){
      getProducts.sort(function(a, b){
        return (a.price - b.price);
      });

      this.sortItems = [
        "Sort by prices: low to high",
        "Sort by popularity",
        "Sort by latest",
        "Sort by first",
        "Sort by prices: high to low"
      ];

      this.sortValues = [
        "low",
        "popularity",
        "latest",
        "first",        
        "high"
      ];
    }

    if(this.sort == "high"){
      getProducts.sort(function(a, b){
        return (b.price - a.price);
      });

      this.sortItems = [
        "Sort by prices: high to low",
        "Sort by prices: low to high",
        "Sort by popularity",
        "Sort by latest",
        "Sort by first"        
      ];

      this.sortValues = [
        "high",
        "low",
        "popularity",
        "latest",
        "first"
      ];
    }

    getProducts.forEach((product, index) => {

      if(this.page == undefined)
        this.page = 1;
      
      let first = Number(index) + (this.page * 6) - 6;
      let last = 6 * this.page;

      if(first < last){
        if(getProducts[first] != undefined){
          this.products.push(getProducts[first]);
          this.rating.push(DinamicRating.fnc(getProducts[first]));
          this.reviews.push(DinamicReviews.fnc(getProducts[first]));
          this.price.push(DinamicPrice.fnc(getProducts[first]));
          this.cargando = false;
        }
        
      }
    });

  }

  callback(params){
    if(this.render){
      this.render = false;
      Rating.fnc();
      Pagination.fnc();
      Select2Config.fnc();

      $(".sortItems").change(function(){
        window.open(`products/${params}&${$(this).val()}`, '_top');
      });

    }
  }

}
