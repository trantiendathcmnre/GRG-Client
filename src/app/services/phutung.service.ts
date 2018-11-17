import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { ApisService } from './apis.service';

@Injectable()
export class PhuTungService {

  private headerOptions;
  constructor(
    private apisService : ApisService, 
    private http : Http) { 
  }

  getAll() {  
    // this.createHeader();    
    let url = this.apisService.phuTung.getAll.url;
    return this.http.get(url, this.headerOptions).map(response => response.json());
  }

  get(id) {
    // this.createHeader();  
    let url = this.apisService.phuTung.get.url + id;
    return this.http.get(url, this.headerOptions).map(response => response.json());
  }

  get_ncc(id) {
    // this.createHeader();  
    let url = this.apisService.phuTung.getNCC.url + id;
    return this.http.get(url, this.headerOptions).map(response => response.json());
  }

  add(data) {
    // this.createHeader();  
    let url = this.apisService.phuTung.add.url;
    return this.http.post(url, data, this.headerOptions).map(response => response.json());
  }

  update(data) {
    // this.createHeader();  
    let url = this.apisService.phuTung.update.url;
    return this.http.put(url, data, this.headerOptions).map(response => response.json());
  }

  delete(id) {
    // this.createHeader();  
    let url = this.apisService.phuTung.delete.url + id;
    return this.http.delete(url, this.headerOptions).map(response => response.json());
  }

  getDVT() {
    // this.createHeader();  
    let url = this.apisService.phuTung.getDVT.url;
    return this.http.get(url, this.headerOptions).map(response => response.json());
  }

  createMaphuTung() {
    // this.createHeader();  
    let url = this.apisService.phuTung.getMPT.url;
    return this.http.get(url, this.headerOptions).map(response => response.json());
  }

  searchPhuTung(hx, dx, dm, ncc) {
    // this.createHeader();  
    let url = this.apisService.phuTung.searchPT.url + hx + "/" + dx + "/" + dm + "/" + ncc;
    return this.http.get(url, this.headerOptions).map(response => response.json());
  }

  searchPT_ALL(hx,dx,dm) {
    // this.createHeader();  
    let url = this.apisService.phuTung.searchAllPT.url +hx+"/"+dx+"/"+dm;
    return this.http.get(url, this.headerOptions).map(response => response.json());
  }
  
  // createHeader()
  // {
  //   let user: any = this.cookies.getObject('user');
  //   console.log(user);
  //   if(user)
  //     var headers = new Headers({
  //       'Authorization':'Bearer ' + user.accessToken,
  //       'Content-Type': 'application/json'
  //     });
  //   else
  //   {
  //     var headers = new Headers({
  //       'Authorization':'Bearer ',
  //       'Content-Type': 'application/json'
  //     });
  //   }
  //     this.headerOptions = new RequestOptions({headers: headers});
  // }
}
