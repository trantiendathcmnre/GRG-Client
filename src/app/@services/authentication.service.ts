import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { ApisService } from './apis.service';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class AuthenticationService {

  private headerOptions;
  private cookieValue = '';
  public headers = undefined;
  public data = null;
  constructor(private apisService: ApisService, private http: Http, private cookieService: CookieService) { }
  /**
   * fn login 
   * @param data 
   */
  login(data: any) {
    return this.http
      .post(this.apisService.authentication.login.url, data, this.headerOptions)
      .map(response => response.json());
  }

  /**
   * fn check user login 
   */
  public isAuthenticated(): any {
    this.cookieValue = this.cookieService.get('user');
    return this.cookieValue.length > 0 ? true : false;
  }

  /**
   * fn get user infor
   */
  public getUser() {
    if( !!this.isAuthenticated() ) {
      this.cookieValue = this.cookieService.get('user');
      this.cookieValue = this.cookieValue.length > 0 ? JSON.parse(this.cookieValue) : '';
      return this.cookieValue;
    }
  }

  public createHeader() {
    this.data = this.getUser();
    if( !!this.data && !!this.data.tokenType &&  !!this.data.accessToken) {
      this.headers = new Headers({
        'Authorization': this.data.tokenType + ' ' + this.data.accessToken,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      });
    } else {
      this.headers = new Headers({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      });
    }
    return new RequestOptions({headers: this.headers});
  }

  public logout() {
    this.cookieService.deleteAll();
    var logout =  this.cookieService.get('user');
    console.log(logout);
    if( logout == '' ) {
      return true;
    } else {
      this.cookieService.set('user', '');
      return true;
    }
  }
}
