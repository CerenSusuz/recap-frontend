import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Color } from '../models/color';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})

export class ColorService {

  apiURL = environment.apiURL;
  constructor(private httpClient:HttpClient) { }

  getColors(): Observable<ListResponseModel<Color>>{
    let newUrl= this.apiURL+'colors/getall';
    return this.httpClient
    .get<ListResponseModel<Color>>(newUrl);
  }

  getColorById(id: number): Observable<ListResponseModel<Color>> {
    let newUrl = this.apiURL+'colors/getbyid'+id
    return this.httpClient.get<ListResponseModel<Color>>(newUrl);
  }

  add(color:Color):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiURL+"colors/add",color);
  }
}