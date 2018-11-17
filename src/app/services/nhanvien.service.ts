import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { ApisService } from './apis.service';

@Injectable()
export class NhanVienService {

  private headerOptions;
  constructor(private apisService : ApisService, private http : Http) { 
  }

  getAll() { 
    // this.createHeader();    
    let url = this.apisService.nhanVien.getAll.url;
    return this.http.get(url, this.headerOptions).map(response => response.json());
  }

  get(id) {
    // this.createHeader(); 
    let url = this.apisService.nhanVien.get.url + id;
    return this.http.get(url, this.headerOptions).map(response => response.json());
  }

  getNVHoatDong() {
    // this.createHeader();    
    let url = this.apisService.nhanVien.getNVHoatDong.url;
    return this.http.get(url, this.headerOptions).map(response => response.json());
  }

  add(data) {
    // this.createHeader(); 
    let url = this.apisService.nhanVien.add.url;
    return this.http.post(url, data, this.headerOptions).map(response => response.json());
  }

  update(data) {
    // this.createHeader(); 
    let url = this.apisService.nhanVien.update.url;
    return this.http.put(url, data, this.headerOptions).map(response => response.json());
  }

  delete(id) {
    // this.createHeader(); 
    let url = this.apisService.nhanVien.delete.url + id;
    return this.http.delete(url, this.headerOptions).map(response => response.json());
  }

  getNV_DV(id) {
    // this.createHeader(); 
    let url = this.apisService.nhanVien.getNV_DV.url + id;
    return this.http.get(url, this.headerOptions).map(response => response.json());
  }

  createMaNhanVien() {
    // this.createHeader();
    let url = this.apisService.nhanVien.getMNV.url;
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
