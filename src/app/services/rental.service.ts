import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ListResponseModel } from '../models/listResponseModel';
import { Rental } from '../models/rental';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})

export class RentalService {
  apiURL = environment.apiURL 
  constructor(private httpClient:HttpClient) { }
  
  getRental(): Observable<ListResponseModel<Rental>>{
    let newPath=this.apiURL+'rentals/getrentaldetails';
    return this.httpClient.get<ListResponseModel<Rental>>(newPath);

  }

  add(rental:Rental):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiURL+'rentals/add',rental);
  }
}