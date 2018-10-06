import { Injectable } from '@angular/core';

@Injectable()
export class ApisService {

  constructor() { }
  baseUrl = "http://localhost:4201/";

  authentication = { 
      login: { method: 'POST', url: this.baseUrl + 'users' }
  };

  donViLamViec = {
      getAll: { method: 'GET',    url: this.baseUrl + 'donvilamviec' },
      get   : { method: 'GET',    url: this.baseUrl + 'donvilamviec/' },
      add   : { method: 'POST',   url: this.baseUrl + 'donvilamviec' },
      update: { method: 'PUT',    url: this.baseUrl + 'donvilamviec' },
      delete: { method: 'DELETE', url: this.baseUrl + 'donvilamviec/' }
  };

  danhMucPhuTung = {
      getAll  : { method: 'GET',    url: this.baseUrl + 'danhmucphutung' },
      get     : { method: 'GET',    url: this.baseUrl + 'danhmucphutung/' },
      add     : { method: 'POST',   url: this.baseUrl + 'danhmucphutung' },
      update  : { method: 'PUT',    url: this.baseUrl + 'danhmucphutung' },
      delete  : { method: 'DELETE', url: this.baseUrl + 'danhmucphutung/' }
  };

  hangXe={
      getAll  : { method: 'GET',     url: this.baseUrl + 'hangxe' },
      get     : { method: 'GET',     url: this.baseUrl + 'hangxe/' },
      add     : { method: 'POST',    url: this.baseUrl + 'hangxe' },
      update  : { method: 'PUT',     url: this.baseUrl + 'hangxe' },
      delete  : { method: 'DELETE',  url: this.baseUrl + 'hangxe/' }
  };

  dongXe={
      getAll          :  { method: 'GET',     url: this.baseUrl + 'dongxe' },
      get             :  { method: 'GET',     url: this.baseUrl + 'dongxe/' },
      add             :  { method: 'POST',    url: this.baseUrl + 'dongxe' },
      update          :  { method: 'PUT',     url: this.baseUrl + 'dongxe' },
      delete          :  { method: 'DELETE',  url: this.baseUrl + 'dongxe/' },
      getDongXeHangXe :  { method: 'GET',     url: this.baseUrl + 'dongxe/mahangxe/' }
  };

}
