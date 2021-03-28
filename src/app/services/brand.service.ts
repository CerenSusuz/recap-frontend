import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ListResponseModel } from '../models/listResponseModel';
import { Brand } from '../models/brand';
import { ResponseModel } from '../models/responseModel';
import { ItemResponseModel } from '../models/itemResponseModel';

@Injectable({
  providedIn: 'root'
})

export class BrandService {
  apiURL = environment.apiURL;

  constructor(private httpClient:HttpClient) { }

  getBrands():Observable<ListResponseModel<Brand>>{
    let newUrl = this.apiURL+'brands/getall';
    return this.httpClient
    .get<ListResponseModel<Brand>>(newUrl);
  }

  getBrandById(brandId: number): Observable<ItemResponseModel<Brand>> {
    let newUrl = this.apiURL+'brands/getbyid?id='+brandId;
    return this.httpClient.get<ItemResponseModel<Brand>>(newUrl);
  }

  add(brand:Brand):Observable<ResponseModel>{
    let newUrl = this.apiURL+"brands/add";
    return this.httpClient.post<ResponseModel>(newUrl,brand);
  }

  update(brand:Brand):Observable<ResponseModel>{
    let newUrl= this.apiURL+"brands/update";
    return this.httpClient.post<ResponseModel>(newUrl,brand);
  }

  delete(brand:Brand):Observable<ResponseModel>{
    let newUrl= this.apiURL+"brands/delete";
    return this.httpClient.post<ResponseModel>(newUrl,brand);
  }

}