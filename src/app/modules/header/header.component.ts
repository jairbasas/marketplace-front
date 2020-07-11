import { Component, OnInit } from '@angular/core';

import { Path } from "../../config.js";
import { CategoriesService } from '../../services/categories.service';
import { SubCategoriesService } from '../../services/sub-categories.service';

declare var jQuery: any;
declare var $:any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  path: String = Path.url;
  caregories: Object = null;
  arrayTitleList: Array<any> = [];
  render: boolean = true;

  constructor(private categoriesService: CategoriesService, private subCategoriesService: SubCategoriesService) { }

  ngOnInit(): void {

    this.categoriesService.getData()
        .subscribe( response => {
          this.caregories = response;

          let i;
          for(i in response){
            this.arrayTitleList.push(JSON.parse(response[i].title_list));
          }

        } );
  }

  callback(){
    if(this.render){
        this.render = false;
        let arraySubCategories = [];
        this.arrayTitleList.forEach(titleList => {

          for(let i = 0; i < titleList.length; i++){
            this.subCategoriesService.getFilterData("title_list", titleList[i])
                .subscribe( response =>{
                  arraySubCategories.push(response);

                  let f;
                  let g;
                  let arrayTitleName = [];
                  for(f in arraySubCategories){
                    for(g in arraySubCategories[f]){
                      arrayTitleName.push({
                        "titleList": arraySubCategories[f][g].title_list,
                        "subcategory": arraySubCategories[f][g].name,
                        "url": arraySubCategories[f][g].url
                      });
                    }
                  }
                  for(f in arrayTitleName){
                    if(titleList[i] == arrayTitleName[f].titleList){
                      $(`[titleList='${titleList[i]}']`).append(
                        `
                        <li>
                          <a href="products/${arrayTitleName[f].url}">${arrayTitleName[f].subcategory}</a>
                        </li>
                        `
                      );
                    }
                  }
                });
          }
        });

      }
  }

}
