import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Rental } from '../models/rental';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  apiURL=environment.apiURL;
  constructor(private httpClient:HttpClient) { }

  payment(rental:Rental,amount:number):Observable<ResponseModel>{
    let newPath=this.apiURL+'rentals/payment';
    rental.returnDate = undefined;
    return this.httpClient.post<ResponseModel>(newPath,{payment:{amount:amount},rental:rental});
  }
}
