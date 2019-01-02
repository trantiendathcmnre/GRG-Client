import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { ApisService } from './apis.service';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class NhanVienService {

  private headerOptions;
  public url: string;
  constructor(private apisService: ApisService, private http: Http, private auth: AuthenticationService) {
  }

  getAll() {
    this.headerOptions = this.auth.createHeader();
    this.url = this.apisService.nhanVien.getAll.url;
    return this.http.get(this.url, this.headerOptions).map(response => response.json());
  }

  get(id) {
    this.headerOptions = this.auth.createHeader();
    this.url = this.apisService.nhanVien.get.url + id;
    return this.http.get(this.url, this.headerOptions).map(response => response.json());
  }

  getNVHoatDong() {
    this.headerOptions = this.auth.createHeader();
    this.url = this.apisService.nhanVien.getNVHoatDong.url;
    return this.http.get(this.url, this.headerOptions).map(response => response.json());
  }

  add(data) {
    this.headerOptions = this.auth.createHeader();
    this.url = this.apisService.nhanVien.add.url;
    return this.http.post(this.url, data, this.headerOptions).map(response => response.json());
  }

  update(data) {
    this.headerOptions = this.auth.createHeader();
    this.url = this.apisService.nhanVien.update.url;
    return this.http.put(this.url, data, this.headerOptions).map(response => response.json());
  }

  delete(id) {
    this.headerOptions = this.auth.createHeader();
    this.url = this.apisService.nhanVien.delete.url + id;
    return this.http.delete(this.url, this.headerOptions).map(response => response.json());
  }

  getNhanVienDonVi(id) {
    this.headerOptions = this.auth.createHeader();
    this.url = this.apisService.nhanVien.getNhanVienDonVi.url + id;
    return this.http.get(this.url, this.headerOptions).map(response => response.json());
  }

  createMaNhanVien() {
    this.headerOptions = this.auth.createHeader();
    this.url = this.apisService.nhanVien.getMaNhanVien.url;
    return this.http.get(this.url, this.headerOptions).map(response => response.json());
  }
}
