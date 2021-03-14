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
  apiURL = environment.apiURL +'colors/getall';
  constructor(private httpClient:HttpClient) { }

  getColors(): Observable<ListResponseModel<Color>>{
    return this.httpClient
    .get<ListResponseModel<Color>>(this.apiURL);
  }
}