import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import jwtDecode from 'jwt-decode';
import { BehaviorSubject, Observable } from 'rxjs';







@Injectable({
  providedIn: 'root'
})
export class AuthService {




  userData = new BehaviorSubject(null)

  constructor(private _HttpClient:HttpClient) {
    if(localStorage.getItem('userToken') != null){
      this.saveUserData();
    }
   }

  register(formData:object):Observable<any>{
    return this._HttpClient.post('https://route-egypt-api.herokuapp.com/signup',formData);
  }
  login(formData:object):Observable<any>{
    return this._HttpClient.post('https://route-egypt-api.herokuapp.com/signin',formData);
  }

  logOut(){
    localStorage.removeItem('userToken');
    this.userData.next(null);

  }

  saveUserData(){
    let token = JSON.stringify(localStorage.getItem('userToken'));
    this.userData.next(jwtDecode(token));
    
  }
 



}
