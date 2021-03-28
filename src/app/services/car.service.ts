import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Car } from '../models/car';
import { ItemResponseModel } from '../models/itemResponseModel';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';

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
    let newPath = this.apiURL +'cars/getcarsbybrandandcolor?brandId'+brandId+'&colorId'+colorId;
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }

  add(car:Car):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiURL+"cars/add",car);
  }

  update(car:Car):Observable<ResponseModel>{
    console.log(car);
    return this.httpClient.post<ResponseModel>(this.apiURL+"cars/update",car);
  }

  delete(car:Car):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiURL+"cars/delete",car);
  }




}
