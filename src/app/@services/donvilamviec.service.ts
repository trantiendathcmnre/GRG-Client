import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { ApisService } from './apis.service';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class DonViLamViecService {

  private headerOptions;
  public url: string;
  constructor(
      private apiService: ApisService,
      private http: Http,
      private auth: AuthenticationService
  ) { }

  getAll() {
    this.headerOptions = this.auth.createHeader();
    this.url = this.apiService.donViLamViec.getAll.url;
    return this.http.get(this.url, this.headerOptions).map(response => response.json());
  }
  get(id) {
    this.headerOptions = this.auth.createHeader();
    this.url = this.apiService.donViLamViec.get.url + id;
    return this.http.get(this.url, this.headerOptions).map(response => response.json());
  }
  add(data) {
    this.headerOptions = this.auth.createHeader();
    this.url = this.apiService.donViLamViec.add.url;
    return this.http.post(this.url, data, this.headerOptions).map(response => response.json());
  }
  update(data , id) {
    this.headerOptions = this.auth.createHeader();
    this.url = this.apiService.donViLamViec.update.url + id;
    return this.http.put(this.url, data, this.headerOptions).map(response => response.json());
  }
  delete(id) {
    this.headerOptions = this.auth.createHeader();
    this.url = this.apiService.donViLamViec.delete.url + id;
    return this.http.delete(this.url, this.headerOptions).map(response => response.json());
  }
}
