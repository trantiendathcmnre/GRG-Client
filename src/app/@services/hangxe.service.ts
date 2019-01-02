import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { ApisService } from './apis.service';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class HangXeService {

  private headerOptions;
  public url: string;
  constructor( private apisService: ApisService, private http: Http, private auth: AuthenticationService ) { }

  getAll() {
    this.headerOptions = this.auth.createHeader();
    this.url = this.apisService.hangXe.getAll.url;
    return this.http.get(this.url, this.headerOptions).map(response => response.json());
  }

  get(id) {
    this.headerOptions = this.auth.createHeader();
    this.url = this.apisService.hangXe.get.url + id;
    return this.http.get(this.url, this.headerOptions).map(response => response.json());
  }

  add(data) {
    this.headerOptions = this.auth.createHeader();
    this.url = this.apisService.hangXe.add.url;
    return this.http.post(this.url, data, this.headerOptions).map(response => response.json());
  }

  update(data, id) {
    this.headerOptions = this.auth.createHeader();
    this.url = this.apisService.hangXe.update.url + id;
    return this.http.put(this.url, data, this.headerOptions).map(response => response.json());
  }

  delete(id) {
    this.headerOptions = this.auth.createHeader();
    this.url = this.apisService.hangXe.delete.url + id;
    return this.http.delete(this.url, this.headerOptions).map(response => response.json());
  }

  generate() {
    this.headerOptions = this.auth.createHeader();
    this.url = this.apisService.hangXe.generate.url;
    return this.http.get(this.url, this.headerOptions).map(response => response.json());
  }
}
