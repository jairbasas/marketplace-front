import { Component, OnInit } from '@angular/core';
import { Path } from "../../../config";
import { ProductsService } from '../../../services/products.service';
import { OwlCarouselConfig, CarouselNavigation, SlickConfig, ProductLightbox, CountDown, Rating } from "../../../function";

declare var jQuery: any;
declare var $:any;

@Component({
  selector: 'app-home-hot-today',
  templateUrl: './home-hot-today.component.html',
  styleUrls: ['./home-hot-today.component.css']
})
export class HomeHotTodayComponent implements OnInit {

  path: String = Path.url;
  indexes: Array<any> = [];
  render: Boolean= true;
  products: Array<any> = [];
  cargando:Boolean = false;
  constructor(private productService: ProductsService) { }

  ngOnInit(): void {
    this.cargando = true;
    let getProducts = [];
    let hoy = new Date();
    let fechaOferta = null;
    this.productService.getData()
        .subscribe( response => {
          
          let i;
          for(i in response){
            getProducts.push({
              "offer": JSON.parse(response[i].offer),
              "stock": response[i].stock
            });
            this.products.push(response[i]);
          }

          for(i in getProducts){
            fechaOferta = new Date(
              parseInt(getProducts[i]["offer"][2].split("-")[0]),
              parseInt(getProducts[i]["offer"][2].split("-")[1]) - 1,
              parseInt(getProducts[i]["offer"][2].split("-")[2])
            );

              if(getProducts[i]["stock"] > 0){
                this.indexes.push(i);
                this.cargando = false;
              }

          }

        });
  }

  callback(){

		if(this.render){

			this.render = false;

			/*=============================================
			Seleccionar del DOM los elementos de la galería mixta
			=============================================*/	

			let galleryMix_1 = $(".galleryMix_1");
			let galleryMix_2 = $(".galleryMix_2");
      let galleryMix_3 = $(".galleryMix_3");
      
      let offer_1 = $(".offer_1");
      let offer_2 = $(".offer_2");
      let offer_3 = $(".offer_3");

      let review_1 = $(".review_1");
      let review_2 = $(".review_2");
      let review_3 = $(".review_3");

			/*=============================================
			Recorremos todos los índices de productos
			=============================================*/

			for(let i = 0; i < galleryMix_1.length; i++){

				/*=============================================
				Recorremos todos las fotografías de la galería de cada producto
				=============================================*/	

				for(let f = 0; f < JSON.parse($(galleryMix_1[i]).attr("gallery")).length; f++){

					/*=============================================
					Agregar imágenes grandes
					=============================================*/	

					$(galleryMix_2[i]).append(

						`<div class="item">
	                    	<a href="assets/img/products/${$(galleryMix_1[i]).attr("category")}/gallery/${JSON.parse($(galleryMix_1[i]).attr("gallery"))[f]}">
	                    		
	                    		<img src="assets/img/products/${$(galleryMix_1[i]).attr("category")}/gallery/${JSON.parse($(galleryMix_1[i]).attr("gallery"))[f]}">
	                    	</a>
	                    </div>`

                    )

                    /*=============================================
					Agregar imágenes pequeñas
					=============================================*/

					$(galleryMix_3[i]).append(

						`<div class="item">
	                    	<img src="assets/img/products/${$(galleryMix_1[i]).attr("category")}/gallery/${JSON.parse($(galleryMix_1[i]).attr("gallery"))[f]}">
	                    </div>`

                    )
				}
        
        let offer = JSON.parse($(offer_1[i]).attr("offer"));
        let price = Number($(offer_1[i]).attr("price"));
        if(offer[0]== "Disccount"){
          let amount = price- (price * offer[1]/100);
          $(offer_1[i]).html(
            `<span>Save <br> $${(price * offer[1]/100).toFixed(2)}</span>`
          );

          $(offer_2[i]).html(`$${amount.toFixed(2)}`);
          
        }

        if(offer[0]== "Fixed"){
          let amount = (price * offer[1]/100);
          $(offer_1[i]).html(
            `<span>Save <br> $${amount.toFixed(2)}</span>`
          );

          $(offer_2[i]).html(`$${offer[1]}`);
        }

        
        $(offer_3[i]).attr("data-time",
            new Date(
              parseInt(offer[2].split("-")[0]),
              parseInt(offer[2].split("-")[1]) - 1,
              parseInt(offer[2].split("-")[2])
            )
        );

              let totalReview = 0;
              for(let f = 0; f < JSON.parse($(review_1[i]).attr("reviews")).length; f++){
                totalReview += Number(
                  JSON.parse($(review_1[i]).attr("reviews"))[f]["review"]
                  );
              }
              let rating = Math.round(totalReview / JSON.parse($(review_1[i]).attr("reviews")).length);
              $(review_3[i]).html(rating);

              for(let f = 1; f <= 5; f++){
                $(review_2[i]).append(
                  `<option value="2">${f}</option>`
                );
                if(rating == f){
                  $(review_2[i]).children('option').val(1);
                }
              }

			}
	
			OwlCarouselConfig.fnc();
			CarouselNavigation.fnc();
      SlickConfig.fnc();
      ProductLightbox.fnc();
      CountDown.fnc();
      Rating.fnc();
		}

	}

}
