import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import {tokenNotExpired} from 'angular2-jwt';


@Injectable()
export class AuthService {
  authToken:any;
  user:any;
  isDev:boolean;

  constructor(private http:Http) { }

  registerUser(user){

      let headers=new Headers();
      headers.append('Content-Type','application/json');
      return this.http.post('users/signup',user,{headers:headers})
            .map(res=>res.json());
  }

  authenticateUser(user){

      let headers=new Headers();
      headers.append('Content-Type','application/json');
      return this.http.post('users/authenticate',user,{headers:headers})
            .map(res=>res.json());
  }

  getProfile(){
      let headers = new Headers();
      this.loadToken();
      headers.append('Authorization', this.authToken);
      headers.append('Content-Type','application/json');
    //  let ep = this.prepEndpoint('users/profile');
      return this.http.get('users/profile',{headers: headers})
        .map(res => res.json());
    }

    storeUserData(token, user){
      localStorage.setItem('id_token', token);
      localStorage.setItem('user', JSON.stringify(user));
      this.authToken = token;
      this.user = user;
    }

    loadToken(){
      const token = localStorage.getItem('id_token');
      this.authToken = token;
    }

    loggedIn(){
      console.log("in logged in");
      return tokenNotExpired();
    }

    logout(){
      this.authToken = null;
      this.user = null;
      localStorage.clear();
    }

    prepEndpoint(ep){
      if(this.isDev){
        return ep;
      } else {
        return 'http://localhost:3000/'+ep;
      }
    }

}
