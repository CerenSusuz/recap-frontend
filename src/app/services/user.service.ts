import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable, Input } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ItemResponseModel } from '../models/itemResponseModel';
import { User } from '../models/user';
import { LocalStorageService } from './local-storage.service';

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

}
