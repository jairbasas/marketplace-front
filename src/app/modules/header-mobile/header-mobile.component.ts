import { Component, OnInit } from '@angular/core';

import { Path } from "../../config.js";
import { CategoriesService } from '../../services/categories.service';
import { SubCategoriesService } from '../../services/sub-categories.service';

declare var jQuery: any;
declare var $:any;

@Component({
  selector: 'app-header-mobile',
  templateUrl: './header-mobile.component.html',
  styleUrls: ['./header-mobile.component.css']
})
export class HeaderMobileComponent implements OnInit {

  path: String =  Path.url;
  categories: Object = null;
  render: boolean = true;
  categoriesList:Array<any> = [];
  constructor(private categoriesService: CategoriesService, private subCategoriesService: SubCategoriesService) { }

  ngOnInit(): void {
    this.categoriesService.getData()
        .subscribe( response => {
          this.categories = response;
          let i;
          for(i in response){
            this.categoriesList.push(response[i].name);
          }
        });
      

    $(document).on('click', '.sub-toggle', function(){
      $(this).parent().children('ul').toggle();
    });
  }

  callback(){

		if(this.render){

			this.render = false;
			let arraySubCategories = [];

			/*=============================================
			Separar las categorías
			=============================================*/

			this.categoriesList.forEach(category=>{
				
				/*=============================================
				Tomamos la colección de las sub-categorías filtrando con los nombres de categoría
				=============================================*/

				this.subCategoriesService.getFilterData("category", category)
				.subscribe(resp=>{
					
					/*=============================================
					Hacemos un recorrido por la colección general de subcategorias y clasificamos las subcategorias y url
					de acuerdo a la categoría que correspondan
					=============================================*/

					let i;

					for(i in resp){

						arraySubCategories.push({

							"category": resp[i].category,
							"subcategory": resp[i].name,
							"url": resp[i].url

						})

					}

					/*=============================================
					Recorremos el array de objetos nuevo para buscar coincidencias con los nombres de categorías
					=============================================*/

					for(i in arraySubCategories){

						if(category == arraySubCategories[i].category){
							

							$(`[category='${category}']`).append(

								`<li class="current-menu-item ">
		                        	<a href="products/${arraySubCategories[i].url}">${arraySubCategories[i].subcategory}</a>
		                        </li>`

		                    )
						}
					}
				})

			})			
			
		}

	}

}
