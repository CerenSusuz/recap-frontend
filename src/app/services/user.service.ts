import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable, Input } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ItemResponseModel } from '../models/itemResponseModel';
import { User } from '../models/user';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiURL = environment.apiURL+'users/';

  constructor(private httpClient: HttpClient) { }

  getByEmail(email:string):Observable<ItemResponseModel<User>>{
    let newPath = this.apiURL+'getbymail?email='+email;
    return this.httpClient.get<ItemResponseModel<User>>(newPath);
  }

  getUserById(userId: number): Observable<ItemResponseModel<User>> {
    let newUrl = this.apiURL+'getbyid?id='+userId;
    return this.httpClient.get<ItemResponseModel<User>>(newUrl);
  }

  update(user:User):Observable<ResponseModel>{
    let newUrl= this.apiURL+"user/edit";
    return this.httpClient.post<ResponseModel>(newUrl,user);
  }

}
