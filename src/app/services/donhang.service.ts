import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import {ApisService} from './apis.service';

@Injectable()
export class DonHangService {

  private headerOptions;
  constructor( 
    private apiService : ApisService, 
    private http : Http
  ) { }

  getAll() {  
    // this.createHeader();  
    let url = this.apiService.donHang.getAll.url;
    return this.http.get(url, this.headerOptions).map(response => response.json());
  }

  get(id) {
    // this.createHeader();
    let url = this.apiService.donHang.get.url + id;
    return this.http.get(url, this.headerOptions).map(response => response.json());
  }

  add(data) {
    // this.createHeader();
    let url = this.apiService.donHang.add.url;
    return this.http.post(url, data, this.headerOptions).map(response => response.json());
  }

  update(data) {
    // this.createHeader();
    let url = this.apiService.donHang.update.url;
    return this.http.put(url, data, this.headerOptions).map(response => response.json());
  }

  delete(id) {
    // this.createHeader();
    let url = this.apiService.donHang.delete.url + id;
    return this.http.delete(url, this.headerOptions).map(response => response.json());
  }

  createMaDonHang()
  {
    // this.createHeader();
    let url = this.apiService.donHang.getMDH.url;
    return this.http.get(url, this.headerOptions).map(response => response.json());
  }

  getDH_PT(id)
  {
    // this.createHeader();
    let url = this.apiService.donHang.getDH_PT.url + id;
    return this.http.get(url, this.headerOptions).map(response => response.json());
  }

  getDH_CONG(id)
  {
    // this.createHeader();
    let url = this.apiService.donHang.getDH_CONG.url + id;
    return this.http.get(url, this.headerOptions).map(response => response.json());
  }

  updateNV(data)
  {
    // this.createHeader();
    let url = this.apiService.donHang.updateNV.url;
    return this.http.put(url, data, this.headerOptions).map(response => response.json());
  }

  getDH_DangSua()
  {
    // this.createHeader();
    let url = this.apiService.donHang.getDH_DangSua.url;
    return this.http.get(url, this.headerOptions).map(response => response.json());
  }

  huyDH(data)
  {
    // this.createHeader();
    let url = this.apiService.donHang.huyDH.url;
    return this.http.post(url, data, this.headerOptions).map(response => response.json());
  }

  getDH_HoanThanh()
  {
    // this.createHeader();
    let url = this.apiService.donHang.getDH_HoanThanh.url;
    return this.http.get(url, this.headerOptions).map(response => response.json());
  }

  getDHHT_BSX(id)
  {
    // this.createHeader();
    let url = this.apiService.donHang.getDHHT_BSX.url + id;
    return this.http.get(url, this.headerOptions).map(response => response.json());
  }

  getDH_NV(id) {
    // this.createHeader();
    let url = this.apiService.donHang.getDH_NV.url + id;
    return this.http.get(url, this.headerOptions).map(response => response.json());
  }

  getDH_NVDLV()
  {
    // this.createHeader();
    let url = this.apiService.donHang.getDH_NVDLV.url;
    return this.http.get(url, this.headerOptions).map(response => response.json());
  }

  getDH_KH(id)
  {
    // this.createHeader();
    let url = this.apiService.donHang.getDH_KH.url+id;
    return this.http.get(url, this.headerOptions).map(response => response.json());
  }

  updateCN_NCC(data)
  {
    // this.createHeader();
    let url = this.apiService.donHang.updateCN_NCC.url;
    return this.http.post(url, data, this.headerOptions).map(response => response.json());
  }

  getCT_TT(id)
  {
    // this.createHeader();
    let url = this.apiService.donHang.getCT_TT.url+id;
    return this.http.get(url, this.headerOptions).map(response => response.json());
  }

  sendMail(data)
  {
    // this.createHeader();
    let url = this.apiService.donHang.sendMail.url;
    return this.http.post(url, data, this.headerOptions).map(response => response.json());
  }

  luutam(data)
  {
    // this.createHeader();
    let url = this.apiService.donHang.luuTamDH.url;
    return this.http.put(url, data, this.headerOptions).map(response => response.json());
  }

  getDH_TTKH(id)
  {
    // this.createHeader();
    let url = this.apiService.donHang.getDH_TTKH.url+id;
    return this.http.get(url, this.headerOptions).map(response => response.json());
  }

  capnhatphieuhen(data)
  {
    // this.createHeader();
    let url = this.apiService.donHang.capnhatphieuhen.url;
    return this.http.post(url, data, this.headerOptions).map(response => response.json());
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
