import { Component, OnInit } from '@angular/core';
import { Path } from "../../../config";
import { CategoriesService } from '../../../services/categories.service';

@Component({
  selector: 'app-home-categories',
  templateUrl: './home-categories.component.html',
  styleUrls: ['./home-categories.component.css']
})
export class HomeCategoriesComponent implements OnInit {

  path: String = Path.url;
  categories : Array<any> = [];
  cargando:Boolean = false;
  constructor(private categoriesService: CategoriesService) { }

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

}
