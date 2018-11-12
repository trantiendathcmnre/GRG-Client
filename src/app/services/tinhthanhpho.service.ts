import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
let url, headers, data;

@Injectable()
export class TinhThanhPhoService {

  private headerOptions;
  constructor(private http : Http) { }
  
  goShip = 'http://sandbox.goship.io/api/v2/';
  login = 'http://sandbox.goship.io/api/v2/login';

  /**
   * fn get all province 
   */
  allTinhThanh( headerOptions ) {
    url = this.goShip + 'cities';
    return this.http.get(url, headerOptions).map(response => response.json());
  }

  /**
   * fn get quan huyen thao tinh thanh pho
   */
  getQuanHuyenTheoTinhThanh(code, headerOptions) {
    url = this.goShip + 'cities/' + code + '/districts';
    return this.http.get(url, headerOptions).map(response => response.json());
  }

  getPhuongXaTheoQuanHuyen(code, headerOptions) {
    url = this.goShip + 'districts/' + code + '/wards';
    return this.http.get(url, headerOptions).map(response => response.json());
  }

  /**
   * fn login go ship 
   */
  loginGoShip() {
    data = {
      "username": "tr.tiendat.hcmunre@gmail.com",
      "password": "20101996",
      "client_id": 37,
      "client_secret" : "NoWMAtHlZeNS52nNgLh3fjxprWPWuOYvjl67B3ld"
    };

    headers = new Headers({
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    });
    url = this.login;
    this.headerOptions = new RequestOptions({ headers: headers });
    return this.http.post(url, data, this.headerOptions).map(response => response.json());
  }
}
