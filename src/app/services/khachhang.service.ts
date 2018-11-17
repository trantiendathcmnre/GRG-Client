import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { ApisService } from './apis.service';

@Injectable()
export class KhachHangService {

  private headerOptions;
  constructor(
    private apisService: ApisService,
    private http: Http
  ) { }

  getAll() {  
    // this.createHeader();    
    let url = this.apisService.khachHang.getAll.url;
    return this.http.get(url, this.headerOptions).map(response => response.json());
  }

  get(id) {
    // this.createHeader();  
    let url = this.apisService.khachHang.get.url + id;
    return this.http.get(url, this.headerOptions).map(response => response.json());
  }

  add(data) {
    // this.createHeader();  
    let url = this.apisService.khachHang.add.url;
    return this.http.post(url, data, this.headerOptions).map(response => response.json());
  }

  update( data, id ) {
    // this.createHeader();  
    let url = this.apisService.khachHang.update.url + id;
    return this.http.put(url, data, this.headerOptions).map(response => response.json());
  }

  delete(id) {
    // this.createHeader();  
    let url = this.apisService.khachHang.delete.url + id;
    return this.http.delete(url, this.headerOptions).map(response => response.json());
  }

  generate() {
    let url = this.apisService.khachHang.generate.url;
    return this.http.get(url, this.headerOptions).map(response => response.json());
  }
}
