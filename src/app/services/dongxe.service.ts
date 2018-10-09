import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import {ApisService} from './apis.service';

@Injectable()
export class DongXeService {

  private headerOptions;
  constructor(
      private apisService : ApisService, 
      private http : Http
  ) { }

  getAll() {
    //this.createHeader();
    let url = this.apisService.dongXe.getAll.url;
    return this.http.get(url, this.headerOptions).map(response => response.json());
  }

  get(id) {
    //this.createHeader();
    let url = this.apisService.dongXe.get.url + id;
    return this.http.get(url, this.headerOptions).map(response => response.json());
  }

  add(data) {
    //this.createHeader();
    let url = this.apisService.dongXe.add.url;
    return this.http.post(url, data, this.headerOptions).map(response => response.json());
  }

  update(data, id) {
    //this.createHeader();
    let url = this.apisService.dongXe.update.url + id;
    return this.http.put(url, data, this.headerOptions).map(response => response.json());
  }

  delete(id) {
    //this.createHeader();
    let url = this.apisService.dongXe.delete.url + id;
    return this.http.delete(url, this.headerOptions).map(response => response.json());
  }

  search(hangxe) {
    let url = this.apisService.dongXe.search.url + hangxe;
    return this.http.get(url, this.headerOptions).map(response => response.json());
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
