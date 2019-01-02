import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { ApisService } from './apis.service';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class NhaCungCapService {

  private headerOptions;
  public url: string;
  constructor(private apisService: ApisService, private http: Http, private auth: AuthenticationService) {
  }

  getAll() {
    this.headerOptions = this.auth.createHeader();
    this.url = this.apisService.nhaCungCap.getAll.url;
    return this.http.get(this.url, this.headerOptions).map(response => response.json());
  }

  get(id) {
    this.headerOptions = this.auth.createHeader();
    this.url = this.apisService.nhaCungCap.get.url + id;
    return this.http.get(this.url, this.headerOptions).map(response => response.json());
  }

  add(data) {
    this.headerOptions = this.auth.createHeader();
    this.url = this.apisService.nhaCungCap.add.url;
    return this.http.post(this.url, data, this.headerOptions).map(response => response.json());
  }

  update(data) {
    this.headerOptions = this.auth.createHeader();
    this.url = this.apisService.nhaCungCap.update.url;
    return this.http.put(this.url, data, this.headerOptions).map(response => response.json());
  }

  delete(id) {
    this.headerOptions = this.auth.createHeader();
    this.url = this.apisService.nhaCungCap.delete.url + id;
    return this.http.delete(this.url, this.headerOptions).map(response => response.json());
  }

  disable(id) {
    this.headerOptions = this.auth.createHeader();
    this.url = this.apisService.nhaCungCap.disable.url + id;
    return this.http.put(this.url, this.headerOptions).map(response => response.json());
  }

  enable(id) {
    this.headerOptions = this.auth.createHeader();
    this.url = this.apisService.nhaCungCap.enable.url + id;
    return this.http.put(this.url, this.headerOptions).map(response => response.json());
  }

  getEnable() {
    this.headerOptions = this.auth.createHeader();
    this.url = this.apisService.nhaCungCap.getEnable.url;
    return this.http.get(this.url, this.headerOptions).map(response => response.json());
  }
}
