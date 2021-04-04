import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ItemResponseModel } from '../models/itemResponseModel';
import { TokenModel } from '../models/tokenModel';
import { LoginModel } from '../models/loginModel';
import { RegisterModel } from '../models/registerModel';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiURL=environment.apiURL+'auth/';

  constructor(private httpClient:HttpClient,
    private router:Router) { }

  login(user:LoginModel):Observable<ItemResponseModel<TokenModel>>{
    let newPath=this.apiURL+'login';
    return this.httpClient.post<ItemResponseModel<TokenModel>>(newPath,user);
  }

  isAuthenticated(){
    return localStorage.getItem("token");
  }

  register(registerModel: RegisterModel): Observable<ItemResponseModel<TokenModel>> {
    let newPath=this.apiURL+'register';
    return this.httpClient.post<ItemResponseModel<TokenModel>>(newPath,registerModel);
  }

  logOut(){
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("email");
  }
  
}
