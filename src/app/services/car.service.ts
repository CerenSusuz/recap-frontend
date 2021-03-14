import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Car } from '../models/car';
import { ListResponseModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root'
})

export class CarService {
  apiURL = environment.apiURL;

  constructor(private httpClient:HttpClient) { }

  getCars():Observable<ListResponseModel<Car>>{
    let newPath= this.apiURL+"cars/getcardetails"
    return this.httpClient
    .get<ListResponseModel<Car>>(newPath);
  }

  getCarsByBrand(brandid:number):Observable<ListResponseModel<Car>>{
    let newPath=this.apiURL+"cars/getbybrand?brandid="+brandid;
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }

  getCarsByColor(colorid:number):Observable<ListResponseModel<Car>>{
    let newPath = this.apiURL+"cars/getbycolor?colorid="+colorid;
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }

}
