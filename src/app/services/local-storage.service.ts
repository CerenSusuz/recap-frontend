import { Injectable } from '@angular/core';
import { TokenModel } from '../models/tokenModel';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  setItem<T>(key:string,object:T){
    localStorage.setItem(key,JSON.stringify(object));
  }

  getItem(key:string){
    return localStorage.getItem(key);
  }

  removeItem(key:string){
    localStorage.removeItem(key);
  }

  isExist(key:string):boolean{
    if(localStorage.getItem(key)){
      return true;
    }else{
      return false;
    }
  }

  
}
