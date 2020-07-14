import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import { Api } from "../config";

@Injectable({
  providedIn: 'root'
})
export class SubCategoriesService {

  private api:String = Api.url;
  constructor(private _http: HttpClient) { }

  getFilterData(orderBy, equalTo){
    return this._http.get(`${this.api}sub-categories.json?orderBy="${orderBy}"&equalTo="${equalTo}"&print=pretty`);
  }

  getLimitData(startAt:String, limitToFirst:Number){

		return this._http.get(`${this.api}products.json?orderBy="$key"&startAt="${startAt}"&limitToFirst=${limitToFirst}&print=pretty`);

	}

	getFilterDataWithLimit(orderBy:String, equalTo:String, limitToFirst:Number){

		return this._http.get(`${this.api}products.json?orderBy="${orderBy}"&equalTo="${equalTo}"&limitToFirst=${limitToFirst}&print=pretty`);

	}
}
