import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { ApisService } from './apis.service';
import { AuthenticationService } from './authentication.service';
import 'rxjs/add/operator/map';

@Injectable()
export class DanhMucPhuTungService {

  private headerOptions;
  constructor(
    private apisService: ApisService,
    private http: Http,
    private auth: AuthenticationService
  ) { }

  getAll() {
    this.headerOptions = this.auth.createHeader();
    return this.http.get(this.apisService.danhMucPhuTung.getAll.url, this.headerOptions)
      .map(response => response.json());
  }

  get(id) {
    this.headerOptions = this.auth.createHeader();
    return this.http.get(this.apisService.danhMucPhuTung.get.url + id, this.headerOptions)
      .map(response => response.json());
  }

  add(data) {
    this.headerOptions = this.auth.createHeader();
    return this.http.post(this.apisService.danhMucPhuTung.add.url, data, this.headerOptions)
      .map(response => response.json());
  }

  update(data, id) {
    this.headerOptions = this.auth.createHeader();
    return this.http.put(this.apisService.danhMucPhuTung.update.url + id, data, this.headerOptions)
      .map(response => response.json());
  }

  delete(id) {
    this.headerOptions = this.auth.createHeader();
    return this.http.delete(this.apisService.danhMucPhuTung.delete.url + id, this.headerOptions)
      .map(response => response.json());
  }

  search(donvi) {
    this.headerOptions = this.auth.createHeader();
    return this.http.get(this.apisService.danhMucPhuTung.search.url + donvi, this.headerOptions)
      .map(response => response.json());
  }

  export() {
    this.headerOptions = this.auth.createHeader();
    return this.http.get(this.apisService.danhMucPhuTung.export.url, this.headerOptions)
      .map(response => response.json());
  }
}
