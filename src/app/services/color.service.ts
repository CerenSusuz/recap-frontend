import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Color } from '../models/color';
import { ListResponseModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root'
})

export class ColorService {

  apiURL = environment.apiURL +'colors/';
  constructor(private httpClient:HttpClient) { }

  getColors(): Observable<ListResponseModel<Color>>{
    let newUrl= this.apiURL+'getall';
    return this.httpClient
    .get<ListResponseModel<Color>>(newUrl);
  }

  getColorById(id: number): Observable<ListResponseModel<Color>> {
    let newUrl = this.apiURL+'getbyid'+id
    return this.httpClient.get<ListResponseModel<Color>>(newUrl);
  }
}