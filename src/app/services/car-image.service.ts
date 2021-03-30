import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CarImage } from '../models/carImage';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})

export class CarImageService {

  apiUrl= environment.apiURL;

  constructor(private httpClient:HttpClient,) { }

  getCarImages():Observable<ListResponseModel<CarImage>>{
    let newPath=this.apiUrl+"carimages/getall"
    return this.httpClient.get<ListResponseModel<CarImage>>(newPath)
  }

  getCarImagesByCarId(carId:number):Observable<ListResponseModel<CarImage>>{
    let newPath=this.apiUrl+"carimages/getimagesbycarid?carId="+carId;
    return this.httpClient.get<ListResponseModel<CarImage>>(newPath)
  }

  uploadImage(image: File,carId:number):Observable<any> {

    console.log(image.name)
    console.log(carId)
    const formData:FormData = new FormData();

    formData.append('Image', image);
    formData.append('CarId',carId.toString());

    let newPath=this.apiUrl+'carImages/add';
    return this.httpClient.post<ResponseModel>(newPath,formData,{
      reportProgress: true,
      responseType: 'json',
    });
    
  }
}
