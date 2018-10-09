import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { ApisService } from './apis.service';
import 'rxjs/add/operator/map';

@Injectable()
export class DonViLamViecService {

  private headerOptions;
  constructor(
      private apiService : ApisService, 
      private http : Http
  ) { }

  getAll() {
    //this.createHeader();    
    let url = this.apiService.donViLamViec.getAll.url;
    return this.http.get(url, this.headerOptions).map(response => response.json());
  }
  get(id) {
    //this.createHeader();   
    let url = this.apiService.donViLamViec.get.url + id;
    return this.http.get(url, this.headerOptions).map(response => response.json());
  }
  add(data) {
    //this.createHeader();
    let url = this.apiService.donViLamViec.add.url;
    return this.http.post(url, data, this.headerOptions).map(response => response.json());
  }
  update(data , id) {
    //this.createHeader();   
    let url = this.apiService.donViLamViec.update.url + id;
    return this.http.put(url, data, this.headerOptions).map(response => response.json());
  }
  delete(id) {
    //this.createHeader();   
    let url = this.apiService.donViLamViec.delete.url + id;
    return this.http.delete(url, this.headerOptions).map(response => response.json());
  }
  
  // createHeader()
  // {
  //   let user: any = this.cookies.getObject('user');
  //   console.log(user);
  //   if(user)
  //     var headers = new Headers({
  //       'Authorization':'Bearer ' + user.accessToken,
  //       'Content-Type': 'application/json'
  //     });
  //   else
  //   {
  //     var headers = new Headers({
  //       'Authorization':'Bearer ',
  //       'Content-Type': 'application/json'
  //     });
  //   }
  //     this.headerOptions = new RequestOptions({headers: headers});
  // }

}
