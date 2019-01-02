import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { ApisService } from './apis.service';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class DonHangService {

  private headerOptions;
  public url: string;
  constructor(
    private apiService: ApisService,
    private http: Http,
    private auth: AuthenticationService
  ) { }

  getAll() {
    this.headerOptions = this.auth.createHeader();
    this.url = this.apiService.donHang.getAll.url;
    return this.http.get(this.url, this.headerOptions).map(response => response.json());
  }

  get(id) {
    this.headerOptions = this.auth.createHeader();
    this.url = this.apiService.donHang.get.url + id;
    return this.http.get(this.url, this.headerOptions).map(response => response.json());
  }

  add(data) {
    this.headerOptions = this.auth.createHeader();
    this.url = this.apiService.donHang.add.url;
    return this.http.post(this.url, data, this.headerOptions).map(response => response.json());
  }

  update(data) {
    this.headerOptions = this.auth.createHeader();
    this.url = this.apiService.donHang.update.url;
    return this.http.put(this.url, data, this.headerOptions).map(response => response.json());
  }

  delete(id) {
    this.headerOptions = this.auth.createHeader();
    this.url = this.apiService.donHang.delete.url + id;
    return this.http.delete(this.url, this.headerOptions).map(response => response.json());
  }

  createMaDonHang() {
    this.headerOptions = this.auth.createHeader();
    this.url = this.apiService.donHang.getMaDonHang.url;
    return this.http.get(this.url, this.headerOptions).map(response => response.json());
  }

  getDonHangPhuTung(id) {
    this.headerOptions = this.auth.createHeader();
    this.url = this.apiService.donHang.getDonHangPhuTung.url + id;
    return this.http.get(this.url, this.headerOptions).map(response => response.json());
  }

  getDonHangCong(id) {
    this.headerOptions = this.auth.createHeader();
    this.url = this.apiService.donHang.getDonHangCong.url + id;
    return this.http.get(this.url, this.headerOptions).map(response => response.json());
  }

  updateNhanVien(data) {
    this.headerOptions = this.auth.createHeader();
    this.url = this.apiService.donHang.updateNhanVien.url;
    return this.http.put(this.url, data, this.headerOptions).map(response => response.json());
  }

  getDonHangDangSua() {
    this.headerOptions = this.auth.createHeader();
    this.url = this.apiService.donHang.getDonHangDangSua.url;
    return this.http.get(this.url, this.headerOptions).map(response => response.json());
  }

  huyDonHang(data) {
    this.headerOptions = this.auth.createHeader();
    this.url = this.apiService.donHang.huyDonHang.url;
    return this.http.post(this.url, data, this.headerOptions).map(response => response.json());
  }

  getDonHangHoanThanh() {
    this.headerOptions = this.auth.createHeader();
    this.url = this.apiService.donHang.getDonHangHoanThanh.url;
    return this.http.get(this.url, this.headerOptions).map(response => response.json());
  }

  getDonHangHoanThanhBienSo(id) {
    this.headerOptions = this.auth.createHeader();
    this.url = this.apiService.donHang.getDonHangHoanThanhBienSo.url + id;
    return this.http.get(this.url, this.headerOptions).map(response => response.json());
  }

  getDonHangNhanVien(id) {
    this.headerOptions = this.auth.createHeader();
    this.url = this.apiService.donHang.getDonHangNhanVien.url + id;
    return this.http.get(this.url, this.headerOptions).map(response => response.json());
  }

  getDonHangNhanVienDangLamViec() {
    this.headerOptions = this.auth.createHeader();
    this.url = this.apiService.donHang.getDonHangNhanVienDangLamViec.url;
    return this.http.get(this.url, this.headerOptions).map(response => response.json());
  }

  getDonHangKhachHang(id) {
    this.headerOptions = this.auth.createHeader();
    this.url = this.apiService.donHang.getDonHangKhachHang.url + id;
    return this.http.get(this.url, this.headerOptions).map(response => response.json());
  }

  updateCongNoNhaCungCap(data) {
    this.headerOptions = this.auth.createHeader();
    this.url = this.apiService.donHang.updateCongNoNhaCungCap.url;
    return this.http.post(this.url, data, this.headerOptions).map(response => response.json());
  }

  getChiTietThanhToan(id) {
    this.headerOptions = this.auth.createHeader();
    this.url = this.apiService.donHang.getChiTietThongTin.url + id;
    return this.http.get(this.url, this.headerOptions).map(response => response.json());
  }

  sendMail(data) {
    this.headerOptions = this.auth.createHeader();
    this.url = this.apiService.donHang.sendMail.url;
    return this.http.post(this.url, data, this.headerOptions).map(response => response.json());
  }

  sendSms(data) {
    this.headerOptions = this.auth.createHeader();
    this.url = this.apiService.donHang.sendSms.url;
    return this.http.post(this.url, data, this.headerOptions).map(response => response.json());
  }

  luuTamDonHang(data) {
    this.headerOptions = this.auth.createHeader();
    this.url = this.apiService.donHang.luuTamDonHang.url;
    return this.http.put(this.url, data, this.headerOptions).map(response => response.json());
  }

  getDonHangThongTinKhachHang(id) {
    this.headerOptions = this.auth.createHeader();
    this.url = this.apiService.donHang.getDonHangThongTinKhachHang.url + id;
    return this.http.get(this.url, this.headerOptions).map(response => response.json());
  }

  capNhatPhieuHen(data) {
    this.headerOptions = this.auth.createHeader();
    this.url = this.apiService.donHang.capNhatPhieuHen.url;
    return this.http.post(this.url, data, this.headerOptions).map(response => response.json());
  }

  lichSuSuaChua(id) {
    this.headerOptions = this.auth.createHeader();
    this.url = this.apiService.donHang.lichSuSuaChua.url + id;
    return this.http.get(this.url, this.headerOptions).map(response => response.json());
  }
}
