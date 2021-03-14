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

  apiURL = environment.apiURL +'brands/getall';

  constructor(private httpClient:HttpClient) { }

  getBrands():Observable<ListResponseModel<Brand>>{
    return this.httpClient
    .get<ListResponseModel<Brand>>(this.apiURL);
  }

}