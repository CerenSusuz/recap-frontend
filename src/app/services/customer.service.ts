import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CustomerResponseModel } from '../models/customerResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  apiURL = environment.apiURL +'customers/getall'
  constructor(private httpClient:HttpClient) { }
  
  getCustomer(): Observable<CustomerResponseModel>{
    return this.httpClient.get<CustomerResponseModel>(this.apiURL);
  }
}