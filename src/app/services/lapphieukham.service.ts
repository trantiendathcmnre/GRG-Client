import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { ApisService } from './apis.service';

@Injectable()
export class LapPhieuKhamService {

  private headerOptions;
  constructor(
    private apisService : ApisService, 
    private http : Http
    ) {}
  getAll() {  
    // this.createHeader();  
    let url = this.apisService.phieuKham.getAll.url;
    return this.http.get(url, this.headerOptions).map(response => response.json());
  }
  get(id) {
    // this.createHeader();
    let url = this.apisService.phieuKham.get.url + id;
    return this.http.get(url, this.headerOptions).map(response => response.json());
  }
  add(data) {
    // this.createHeader();
    let url = this.apisService.phieuKham.add.url;
    return this.http.post(url, data, this.headerOptions).map(response => response.json());
  }
  update(data) {
    // this.createHeader();
    let url = this.apisService.phieuKham.update.url;
    return this.http.put(url, data, this.headerOptions).map(response => response.json());
  }
  xacnhan(data) {
    // this.createHeader();
    let url = this.apisService.phieuKham.xacnhan.url;
    return this.http.post(url, data, this.headerOptions).map(response => response.json());
  }
  getPK_LP(id) {
    // this.createHeader();
    let url = this.apisService.phieuKham.getPK_LP.url + id;
    return this.http.get(url, this.headerOptions).map(response => response.json());
  }

  getPK_NV(id) {
    // this.createHeader();
    let url = this.apisService.phieuKham.getPK_NV.url + id;
    return this.http.get(url, this.headerOptions).map(response => response.json());
  }

  getPK_TT(id) {
    // this.createHeader();
    let url = this.apisService.phieuKham.getPK_TT.url + id;
    return this.http.get(url, this.headerOptions).map(response => response.json());
  }

  getPK_SC_XE(id) {
    // this.createHeader();
    let url = this.apisService.phieuKham.getPK_SC_XE.url + id;
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
