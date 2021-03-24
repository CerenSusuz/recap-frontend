import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Customer } from '../models/customer';
import { ListResponseModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  apiURL = environment.apiURL;
  constructor(private httpClient:HttpClient) { }
  
  getCustomer(): Observable<ListResponseModel<Customer>>{
    let newPath = this.apiURL+'customers/getall';
    return this.httpClient.get<ListResponseModel<Customer>>(newPath);
  }
}