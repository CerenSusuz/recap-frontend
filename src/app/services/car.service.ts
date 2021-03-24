import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Car } from '../models/car';
import { ItemResponseModel } from '../models/itemResponseModel';
import { ListResponseModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root'
})

export class CarService {

  apiURL = environment.apiURL;

  constructor(private httpClient:HttpClient) { }

  getCars():Observable<ListResponseModel<Car>>{
    let newPath= this.apiURL+"cars/getcardetails";
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

  getCarDetail(carId:number):Observable<ItemResponseModel<Car>>{
    let newPath = this.apiURL + 'cars/getcardetailbyid?id='+carId;
    return this.httpClient.get<ItemResponseModel<Car>>(newPath)
  }

  getCarsByBrandAndColor(brandId:number,colorId:number):Observable<ListResponseModel<Car>>{
    let newPath = environment.apiURL +'cars/getcarsbybrandandcolor?brandId'+brandId+'&colorId'+colorId;
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }

}
