import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  setItem<T>(key:string,object:T){
    localStorage.setItem(key,JSON.stringify(object));
  }

  getItem(key:string){
    return JSON.parse(localStorage.getItem(key)!);
  }

  removeItem(key:string){
    localStorage.removeItem(key);
  }

  isExist(key:string):boolean{
    if(JSON.parse(localStorage.getItem(key)!)){
      return true;
    }else{
      return false;
    }
  }

  
}
