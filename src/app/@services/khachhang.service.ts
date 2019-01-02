import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { ApisService } from './apis.service';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class KhachHangService {

  private headerOptions;
  public url: string; 
  constructor(
    private apisService: ApisService,
    private http: Http,
    private auth: AuthenticationService
  ) { }

  getAll() {
    this.headerOptions = this.auth.createHeader();
    this.url = this.apisService.khachHang.getAll.url;
    return this.http.get(this.url, this.headerOptions).map(response => response.json());
  }

  get(id) {
    this.headerOptions = this.auth.createHeader();
    this.url = this.apisService.khachHang.get.url + id;
    return this.http.get(this.url, this.headerOptions).map(response => response.json());
  }

  add(data) {
    this.headerOptions = this.auth.createHeader();
    this.url = this.apisService.khachHang.add.url;
    return this.http.post(this.url, data, this.headerOptions).map(response => response.json());
  }

  update( data, id ) {
    this.headerOptions = this.auth.createHeader();
    this.url = this.apisService.khachHang.update.url + id;
    return this.http.put(this.url, data, this.headerOptions).map(response => response.json());
  }

  delete(id) {
    this.headerOptions = this.auth.createHeader();
    this.url = this.apisService.khachHang.delete.url + id;
    return this.http.delete(this.url, this.headerOptions).map(response => response.json());
  }

  generate() {
    this.headerOptions = this.auth.createHeader();
    this.url = this.apisService.khachHang.generate.url;
    return this.http.get(this.url, this.headerOptions).map(response => response.json());
  }

  getKhachHangTheoSdt(id) {
    this.headerOptions = this.auth.createHeader();
    this.url = this.apisService.khachHang.getKhachHangTheoSdt.url + id;
    return this.http.get(this.url, this.headerOptions).map(response => response.json());
  }
}
