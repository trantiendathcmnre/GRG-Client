import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { ApisService } from './apis.service';
import { AuthenticationService } from './authentication.service';
 
@Injectable()
export class LapPhieuKhamService {

  private headerOptions;
  public url: string;
  constructor(
    private apisService: ApisService,
    private http: Http,
    private auth: AuthenticationService
  ) {}
  getAll() {
    this.headerOptions = this.auth.createHeader();
    this.url = this.apisService.phieuKham.getAll.url;
    return this.http.get(this.url, this.headerOptions).map(response => response.json());
  }
  get(id) {
    this.headerOptions = this.auth.createHeader();
    this.url = this.apisService.phieuKham.get.url + id;
    return this.http.get(this.url, this.headerOptions).map(response => response.json());
  }
  add(data) {
    this.headerOptions = this.auth.createHeader();
    this.url = this.apisService.phieuKham.add.url;
    return this.http.post(this.url, data, this.headerOptions).map(response => response.json());
  }
  update(data) {
    this.headerOptions = this.auth.createHeader();
    this.url = this.apisService.phieuKham.update.url;
    return this.http.put(this.url, data, this.headerOptions).map(response => response.json());
  }
  xacNhan(data) {
    this.headerOptions = this.auth.createHeader();
    this.url = this.apisService.phieuKham.xacNhan.url;
    return this.http.post(this.url, data, this.headerOptions).map(response => response.json());
  }
  getPhieuKhamLoaiPhieu(id) {
    this.headerOptions = this.auth.createHeader();
    this.url = this.apisService.phieuKham.getPhieuKhamLoaiPhieu.url + id;
    return this.http.get(this.url, this.headerOptions).map(response => response.json());
  }
  getPhieuKhamNhanVien(id) {
    this.headerOptions = this.auth.createHeader();
    this.url = this.apisService.phieuKham.getPhieuKhamNhanVien.url + id;
    return this.http.get(this.url, this.headerOptions).map(response => response.json());
  }
  getPhieuKhamThongTin(id) {
    this.headerOptions = this.auth.createHeader();
    this.url = this.apisService.phieuKham.getPhieuKhamThongTin.url + id;
    return this.http.get(this.url, this.headerOptions).map(response => response.json());
  }
  getPhieuKhamXe(id) {
    this.headerOptions = this.auth.createHeader();
    this.url = this.apisService.phieuKham.getPhieuKhamXe.url + id;
    return this.http.get(this.url, this.headerOptions).map(response => response.json());
  }
}
