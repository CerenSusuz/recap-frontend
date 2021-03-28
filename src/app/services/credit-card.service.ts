import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CreditCard } from '../models/creditCard';
import { ResponseModel } from '../models/responseModel';
import { Observable } from 'rxjs';
import { ItemResponseModel } from '../models/itemResponseModel';
import { ListResponseModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CreditCardService {

  apiURL = environment.apiURL;

  constructor(private httpClient:HttpClient) { }

  add(card:CreditCard):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiURL+"creditcards/add",card);
  }

  getByCustomerId(id:number):Observable<ListResponseModel<CreditCard>>{
    return this.httpClient.get<ListResponseModel<CreditCard>>(this.apiURL+"creditcards/getbycustomer?id="+id);
  }
  
  update(card:CreditCard):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiURL+"creditcards/update",card);
  }
  
  delete(card:CreditCard):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiURL+"creditcards/delete",card);
  }








}
