import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BrandResponseModel } from '../models/brandResponseModel';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class BrandService {
  apiURL = environment.apiURL +'brands/getall';
  constructor(private httpClient:HttpClient) { }

  getBrands():Observable<BrandResponseModel>{
    return this.httpClient.get<BrandResponseModel>(this.apiURL);
  }

}