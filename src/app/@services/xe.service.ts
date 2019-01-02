import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { ApisService } from './apis.service';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class XeService {

  private headerOptions;
  public url: string;
  constructor(private apisService: ApisService, private http: Http, private auth: AuthenticationService ) { }

  getAll() {
    this.headerOptions = this.auth.createHeader();
    this.url = this.apisService.xe.getAll.url;
    return this.http.get(this.url, this.headerOptions).map(response => response.json());
  }

  getTrangThaiXe(id) {
    this.headerOptions = this.auth.createHeader();
    this.url = this.apisService.xe.getTrangThaiXe.url + id;
    return this.http.get(this.url, this.headerOptions).map(response => response.json());
  }

  get(id) {
    this.headerOptions = this.auth.createHeader();
    this.url = this.apisService.xe.get.url + id;
    return this.http.get(this.url, this.headerOptions).map(response => response.json());
  }

  add(data) {
    this.headerOptions = this.auth.createHeader();
    this.url = this.apisService.xe.add.url;
    return this.http.post(this.url, data, this.headerOptions).map(response => response.json());
  }

  update(data) {
    this.headerOptions = this.auth.createHeader();
    this.url = this.apisService.xe.update.url;
    return this.http.put(this.url, data, this.headerOptions).map(response => response.json());
  }

  delete(id) {
    this.headerOptions = this.auth.createHeader();
    this.url = this.apisService.xe.delete.url + id;
    return this.http.delete(this.url, this.headerOptions).map(response => response.json());
  }

  getXe_KH(id) {
    this.headerOptions = this.auth.createHeader();
    this.url = this.apisService.xe.getXeKhachHang.url + id;
    return this.http.get(this.url, this.headerOptions).map(response => response.json());
  }

  createMaXe() {
    this.headerOptions = this.auth.createHeader();
    this.url = this.apisService.xe.getMaXe.url;
    return this.http.get(this.url, this.headerOptions).map(response => response.json());
  }

  pheDuyetXe(data) {
    this.headerOptions = this.auth.createHeader();
    this.url = this.apisService.xe.pheDuyetXe.url;
    return this.http.post(this.url, data, this.headerOptions).map(response => response.json());
  }

  dienThoaiKhachHang(id) {
    this.headerOptions = this.auth.createHeader();
    this.url = this.apisService.xe.dienThoaiKhachHang.url + id;
    return this.http.get(this.url, this.headerOptions).map(response => response.json());
  }

  danhsachXeDangSua() {
    this.headerOptions = this.auth.createHeader();
    this.url = this.apisService.xe.dsXeDangSua.url;
    return this.http.get(this.url, this.headerOptions).map(response => response.json());
  }
}
