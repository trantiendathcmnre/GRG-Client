import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { ApisService } from './apis.service';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class LapPhieuDatService {

  private headerOptions;
  public url: string;
  constructor(
    private apisService: ApisService,
    private http: Http,
    private auth: AuthenticationService
  ) { }
  getAll() {
    this.headerOptions = this.auth.createHeader();
    this.url = this.apisService.lapPhieuDat.getAll.url;
    return this.http.get(this.url, this.headerOptions).map(response => response.json());
  }

  get(id) {
    this.headerOptions = this.auth.createHeader();
    this.url = this.apisService.lapPhieuDat.get.url + id;
    return this.http.get(this.url, this.headerOptions).map(response => response.json());
  }

  add(data) {
    this.headerOptions = this.auth.createHeader();
    this.url = this.apisService.lapPhieuDat.add.url;
    return this.http.post(this.url, data, this.headerOptions).map(response => response.json());
  }

  update(data) {
    this.headerOptions = this.auth.createHeader();
    this.url = this.apisService.lapPhieuDat.update.url;
    return this.http.put(this.url, data, this.headerOptions).map(response => response.json());
  }

  delete(id) {
    this.headerOptions = this.auth.createHeader();
    this.url = this.apisService.lapPhieuDat.delete.url + id;
    return this.http.delete(this.url, this.headerOptions).map(response => response.json());
  }

  getNhaCungCap(id) {
    this.headerOptions = this.auth.createHeader();
    this.url = this.apisService.lapPhieuDat.getNhaCungCap.url + id;
    return this.http.get(this.url, this.headerOptions).map(response => response.json());
  }

  createMaPhieuDat() {
    this.headerOptions = this.auth.createHeader();
    this.url = this.apisService.lapPhieuDat.getMaPhieuDat.url;
    return this.http.get(this.url, this.headerOptions).map(response => response.json());
  }

  xacnhanPhieuDat(data) {
    this.headerOptions = this.auth.createHeader();
    this.url = this.apisService.lapPhieuDat.xacnhanPhieuDat.url;
    return this.http.post(this.url, data, this.headerOptions).map(response => response.json());
  }

  getPhieuDat(id) {
    this.headerOptions = this.auth.createHeader();
    this.url = this.apisService.lapPhieuDat.getPhieuDat.url + id;
    return this.http.get(this.url, this.headerOptions).map(response => response.json());
  }

  generate() {
    this.headerOptions = this.auth.createHeader();
    this.url = this.apisService.lapPhieuDat.generate.url;
    return this.http.get(this.url, this.headerOptions).map(response => response.json());
  }
}
