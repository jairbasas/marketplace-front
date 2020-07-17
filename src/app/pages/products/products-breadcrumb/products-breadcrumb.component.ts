import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { CategoriesService } from '../../../services/categories.service';
import { SubCategoriesService } from '../../../services/sub-categories.service';

@Component({
  selector: 'app-products-breadcrumb',
  templateUrl: './products-breadcrumb.component.html',
  styleUrls: ['./products-breadcrumb.component.css']
})
export class ProductsBreadcrumbComponent implements OnInit {

  breadCrumb: String = null;
  constructor(private categoriesService: CategoriesService, 
              private subCategoriesService: SubCategoriesService,
              private activateRoute: ActivatedRoute) { }

  ngOnInit(): void {

    let params = this.activateRoute.snapshot.params["param"];
    this.categoriesService.getFilterData("url", params)
        .subscribe( response => {
          let i;

          if(Object.keys(response).length > 0){
            for(i in response){
              this.breadCrumb = response[i].name;
            }
          }else{
            this.subCategoriesService.getFilterData("url", params)
                .subscribe( resp => {
                  for(i in resp){
                    this.breadCrumb = resp[i].name;
                  }
                });
          }         
          
        });

  }

}
