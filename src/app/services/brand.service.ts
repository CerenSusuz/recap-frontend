import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ListResponseModel } from '../models/listResponseModel';
import { Brand } from '../models/brand';


@Injectable({
  providedIn: 'root'
})
export class BrandService {

  apiURL = environment.apiURL +'brands/';

  constructor(private httpClient:HttpClient) { }

  getBrands():Observable<ListResponseModel<Brand>>{
    let newUrl = this.apiURL+'getall';
    return this.httpClient
    .get<ListResponseModel<Brand>>(newUrl);
  }

  getBrandById(id: number): Observable<ListResponseModel<Brand>> {
    let newUrl = this.apiURL+'getbyid'+id;
    return this.httpClient.get<ListResponseModel<Brand>>(newUrl);
  }
}