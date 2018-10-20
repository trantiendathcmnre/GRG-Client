import { Injectable } from '@angular/core';

@Injectable()
export class ApisService {

constructor() { }
    baseUrl = "http://18.224.135.207:8000/";

    authentication = { 
        login: { method: 'POST', url: this.baseUrl + 'users' }
    };

    baoGiaCong = {
        getAll  : { method: 'GET',    url : this.baseUrl + 'baogiacong' },
        get     : { method: 'GET',    url : this.baseUrl + 'baogiacong/' },
        add     : { method: 'POST',   url : this.baseUrl + 'baogiacong' },
        update  : { method: 'PUT',    url : this.baseUrl + 'baogiacong/' },
        delete  : { method: 'DELETE', url : this.baseUrl + 'baogiacong/' },
        getMBGC : { method: 'GET',    url : this.baseUrl + 'baogiacong/taoma/mabaogiacong' }
    };

    danhMucPhuTung = {
        getAll  : { method: 'GET',    url: this.baseUrl + 'danhmucphutung' },
        get     : { method: 'GET',    url: this.baseUrl + 'danhmucphutung/' },
        add     : { method: 'POST',   url: this.baseUrl + 'danhmucphutung' },
        update  : { method: 'PUT',    url: this.baseUrl + 'danhmucphutung/' },
        delete  : { method: 'DELETE', url: this.baseUrl + 'danhmucphutung/' },
        search  : { method: 'GET',    url: this.baseUrl + 'danhmucphutung/search/' },
        export  : { method: 'GET',   url: this.baseUrl + 'danhmucphutung/export-csv' },
    };

    donViLamViec = {
        getAll: { method: 'GET',    url: this.baseUrl + 'donvilamviec' },
        get   : { method: 'GET',    url: this.baseUrl + 'donvilamviec/' },
        add   : { method: 'POST',   url: this.baseUrl + 'donvilamviec' },
        update: { method: 'PUT',    url: this.baseUrl + 'donvilamviec/' },
        delete: { method: 'DELETE', url: this.baseUrl + 'donvilamviec/' }
    };

    donViTinh={
        getAll  : { method: 'GET',      url : this.baseUrl + 'donvitinh' },
        get     : { method: 'GET',      url : this.baseUrl + 'donvitinh/' },
        add     : { method: 'POST',     url : this.baseUrl + 'donvitinh' },
        update  : { method: 'PUT',      url : this.baseUrl + 'donvitinh/' },
        delete  : { method: 'DELETE',   url : this.baseUrl + 'donvitinh/' }
    };

    dongXe = {
        getAll          :  { method: 'GET',     url: this.baseUrl + 'dongxe' },
        get             :  { method: 'GET',     url: this.baseUrl + 'dongxe/' },
        add             :  { method: 'POST',    url: this.baseUrl + 'dongxe' },
        update          :  { method: 'PUT',     url: this.baseUrl + 'dongxe/' },
        delete          :  { method: 'DELETE',  url: this.baseUrl + 'dongxe/' },
        search          :  { method: 'GET',     url: this.baseUrl + 'dongxe/search/' }
    };

    hangXe = {
        getAll  : { method: 'GET',     url: this.baseUrl + 'hangxe' },
        get     : { method: 'GET',     url: this.baseUrl + 'hangxe/' },
        add     : { method: 'POST',    url: this.baseUrl + 'hangxe' },
        update  : { method: 'PUT',     url: this.baseUrl + 'hangxe/' },
        delete  : { method: 'DELETE',  url: this.baseUrl + 'hangxe/' }
    };

    nhaCungCap = {
        getAll  : { method: 'GET',      url : this.baseUrl + 'nhacungcap' },
        get     : { method: 'GET',      url : this.baseUrl + 'nhacungcap/' },
        add     : { method: 'POST',     url : this.baseUrl + 'nhacungcap' },
        update  : { method: 'PUT',      url : this.baseUrl + 'nhacungcap/' },
        delete  : { method: 'DELETE',   url : this.baseUrl + 'nhacungcap/' },
        disable  : { method: 'PUT',      url : this.baseUrl + 'nhacungcap/disable/' },
        enable  : { method: 'PUT',      url : this.baseUrl + 'nhacungcap/enable/' },
    };

}
