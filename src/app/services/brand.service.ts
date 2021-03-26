import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ListResponseModel } from '../models/listResponseModel';
import { Brand } from '../models/brand';
import { ResponseModel } from '../models/responseModel';

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

  getBrandById(id: number): Observable<ListResponseModel<Brand>> {
    let newUrl = this.apiURL+'brands/getbyid'+id;
    return this.httpClient.get<ListResponseModel<Brand>>(newUrl);
  }

  add(brand:Brand):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiURL+"brands/add",brand);
  }
}