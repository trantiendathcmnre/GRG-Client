import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { ApisService } from './apis.service';

@Injectable()
export class BaoGiaCongService {

  private headerOptions;
  constructor(private apisService : ApisService, private http : Http) { 
  }

  getAll() {  
    // this.createHeader();  
    let url = this.apisService.baoGiaCong.getAll.url;
    return this.http.get(url, this.headerOptions).map(response => response.json());
  }

  get(id) {
    // this.createHeader();
    let url = this.apisService.baoGiaCong.get.url + id;
    return this.http.get(url, this.headerOptions).map(response => response.json());
  }

  add(data) {
    // this.createHeader();
    let url = this.apisService.baoGiaCong.add.url;
    return this.http.post(url, data, this.headerOptions).map(response => response.json());
  }

  update(data) {
    // this.createHeader();
    let url = this.apisService.baoGiaCong.update.url;
    return this.http.put(url, data, this.headerOptions).map(response => response.json());
  }

  delete(id) {
    // this.createHeader();
    let url = this.apisService.baoGiaCong.delete.url + id;
    return this.http.delete(url, this.headerOptions).map(response => response.json());
  }

  createMabaoGiaCong()
  {
    // this.createHeader();
    let url = this.apisService.baoGiaCong.getMBGC.url;
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
