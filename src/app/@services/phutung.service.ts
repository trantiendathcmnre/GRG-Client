import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { ApisService } from './apis.service';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class PhuTungService {

  private headerOptions;
  public url: string;
  constructor(
    private apisService: ApisService,
    private http: Http,
    private auth: AuthenticationService  
  ) {
  }

  getAll() {
    this.headerOptions = this.auth.createHeader();
    this.url = this.apisService.phuTung.getAll.url;
    return this.http.get(this.url, this.headerOptions).map(response => response.json());
  }

  get(id) {
    this.headerOptions = this.auth.createHeader();
    this.url = this.apisService.phuTung.get.url + id;
    return this.http.get(this.url, this.headerOptions).map(response => response.json());
  }

  getNhaCungCap(id) {
    this.headerOptions = this.auth.createHeader();
    this.url = this.apisService.phuTung.getNhaCungCap.url + id;
    return this.http.get(this.url, this.headerOptions).map(response => response.json());
  }

  add(data) {
    this.headerOptions = this.auth.createHeader();
    this.url = this.apisService.phuTung.add.url;
    return this.http.post(this.url, data, this.headerOptions).map(response => response.json());
  }

  update(data) {
    this.headerOptions = this.auth.createHeader();
    this.url = this.apisService.phuTung.update.url;
    return this.http.put(this.url, data, this.headerOptions).map(response => response.json());
  }

  delete(id) {
    this.headerOptions = this.auth.createHeader();
    this.url = this.apisService.phuTung.delete.url + id;
    return this.http.delete(this.url, this.headerOptions).map(response => response.json());
  }

  getDonViTinh() {
    this.headerOptions = this.auth.createHeader();
    this.url = this.apisService.phuTung.getDonViTinh.url;
    return this.http.get(this.url, this.headerOptions).map(response => response.json());
  }

  createMaphuTung() {
    this.headerOptions = this.auth.createHeader();
    this.url = this.apisService.phuTung.getMaPhuTung.url;
    return this.http.get(this.url, this.headerOptions).map(response => response.json());
  }

  searchPhuTung(hx, dx, dm, ncc) {
    this.headerOptions = this.auth.createHeader();
    this.url = this.apisService.phuTung.searchPhuTung.url + hx + '/' + dx + '/' + dm + '/' + ncc;
    return this.http.get(this.url, this.headerOptions).map(response => response.json());
  }

  searchAllPhuTung(hx, dx, dm) {
    this.headerOptions = this.auth.createHeader();
    this.url = this.apisService.phuTung.searchAllPhuTung.url + hx + '/' + dx + '/' + dm;
    return this.http.get(this.url, this.headerOptions).map(response => response.json());
  }
}
