import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { ApisService } from './apis.service';
import 'rxjs/add/operator/map';

@Injectable()
export class LapPhieuDatService {

  private headerOptions;

  constructor(
    private apisService : ApisService, 
    private http : Http) { }
  getAll() { 
    // this.createHeader();   
    let url = this.apisService.lapPhieuDat.getAll.url;
    return this.http.get(url, this.headerOptions).map(response => response.json());
  }
  get(id) {
    // this.createHeader();
    let url = this.apisService.lapPhieuDat.get.url + id;
    return this.http.get(url, this.headerOptions).map(response => response.json());
  }
  add(data) {
    // this.createHeader();
    let url = this.apisService.lapPhieuDat.add.url;
    return this.http.post(url, data, this.headerOptions).map(response => response.json());
  }
  update(data) {
    // this.createHeader();
    let url = this.apisService.lapPhieuDat.update.url;
    return this.http.put(url, data, this.headerOptions).map(response => response.json());
  }
  delete(id) {
    // this.createHeader();
    let url = this.apisService.lapPhieuDat.delete.url + id;
    return this.http.delete(url, this.headerOptions).map(response => response.json());
  }
  getNCC(id)
  {
    // this.createHeader();
    let url = this.apisService.lapPhieuDat.getNCC.url + id;
    return this.http.get(url, this.headerOptions).map(response => response.json()); 
  }
  createMaPhieuDat()
  {
    // this.createHeader();
    let url = this.apisService.lapPhieuDat.getMPD.url;
    return this.http.get(url, this.headerOptions).map(response => response.json());
  }
  xacnhanPD(data)
  {
    // this.createHeader();
    let url = this.apisService.lapPhieuDat.xacnhanPD.url;
    return this.http.post(url, data, this.headerOptions).map(response => response.json());
  }
  getPD(id)
  {
    // this.createHeader();
    let url = this.apisService.lapPhieuDat.getPD.url + id;
    return this.http.get(url, this.headerOptions).map(response => response.json());
  }
  /*createHeader()
  {
    let user: any = this.cookies.getObject('user');
    console.log(user);
    if(user)
      var headers = new Headers({
        'Authorization':'Bearer ' + user.accessToken,
        'Content-Type': 'application/json'
      });
    else
    {
      var headers = new Headers({
        'Authorization':'Bearer ',
        'Content-Type': 'application/json'
      });
    }
      this.headerOptions = new RequestOptions({headers: headers});
  }*/
}
