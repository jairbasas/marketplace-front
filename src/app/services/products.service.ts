import { Injectable, APP_ID } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import { Api } from "../config";

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private api:String = Api.url;
  constructor(private _http: HttpClient) { }

  getData(){
    return this._http.get(`${this.api}products.json`);
  }

}
