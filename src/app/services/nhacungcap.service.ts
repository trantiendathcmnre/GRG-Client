import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { ApisService } from './apis.service';

@Injectable()
export class NhaCungCapService {

  private headerOptions;
  constructor(private apisService : ApisService, private http : Http) { 
  }

  getAll() {
    // this.createHeader();  
    let url = this.apisService.nhaCungCap.getAll.url;
    return this.http.get(url, this.headerOptions).map(response => response.json());
  }

  get(id) {
    // this.createHeader(); 
    let url = this.apisService.nhaCungCap.get.url + id;
    return this.http.get(url, this.headerOptions).map(response => response.json());
  }

  add(data) {
    // this.createHeader(); 
    let url = this.apisService.nhaCungCap.add.url;
    return this.http.post(url, data, this.headerOptions).map(response => response.json());
  }

  update(data) {
    // this.createHeader(); 
    let url = this.apisService.nhaCungCap.update.url;
    return this.http.put(url, data, this.headerOptions).map(response => response.json());
  }

  delete(id) {
    // this.createHeader(); 
    let url = this.apisService.nhaCungCap.delete.url + id;
    return this.http.delete(url, this.headerOptions).map(response => response.json());
  }

  disable(id) {
    // this.createHeader(); 
    let url = this.apisService.nhaCungCap.disable.url + id;
    return this.http.put(url, this.headerOptions).map(response => response.json());
  }

  enable(id) {
    // this.createHeader(); 
    let url = this.apisService.nhaCungCap.enable.url + id;
    return this.http.put(url, this.headerOptions).map(response => response.json());
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
