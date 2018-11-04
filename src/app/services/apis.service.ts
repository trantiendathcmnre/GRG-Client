import { Injectable } from '@angular/core';

@Injectable()
export class ApisService {

constructor() { }
    baseUrl = "http://18.224.135.207:8000/";

    authentication = { 
        login: { method: 'POST', url: this.baseUrl + 'users' }
    };

    baoGiaCong = {
        getAll:  { method: 'GET',    url: this.baseUrl + 'baogiacong' },
        get:     { method: 'GET',    url: this.baseUrl + 'baogiacong/' },
        add:     { method: 'POST',   url: this.baseUrl + 'baogiacong' },
        update:  { method: 'PUT',    url: this.baseUrl + 'baogiacong/' },
        delete:  { method: 'DELETE', url: this.baseUrl + 'baogiacong/' },
        getMBGC: { method: 'GET',    url: this.baseUrl + 'baogiacong/taoma/mabaogiacong' }
    };

    danhMucPhuTung = {
        getAll: { method: 'GET',    url: this.baseUrl + 'danhmucphutung' },
        get:    { method: 'GET',    url: this.baseUrl + 'danhmucphutung/' },
        add:    { method: 'POST',   url: this.baseUrl + 'danhmucphutung' },
        update: { method: 'PUT',    url: this.baseUrl + 'danhmucphutung/' },
        delete: { method: 'DELETE', url: this.baseUrl + 'danhmucphutung/' },
        search: { method: 'GET',    url: this.baseUrl + 'danhmucphutung/search/' },
        export: { method: 'GET',    url: this.baseUrl + 'danhmucphutung/export-csv' },
    };

    donViLamViec = {
        getAll: { method: 'GET',    url: this.baseUrl + 'donvilamviec' },
        get:    { method: 'GET',    url: this.baseUrl + 'donvilamviec/' },
        add:    { method: 'POST',   url: this.baseUrl + 'donvilamviec' },
        update: { method: 'PUT',    url: this.baseUrl + 'donvilamviec/' },
        delete: { method: 'DELETE', url: this.baseUrl + 'donvilamviec/' }
    };

    donViTinh={
        getAll: { method: 'GET',      url: this.baseUrl + 'donvitinh' },
        get:    { method: 'GET',      url: this.baseUrl + 'donvitinh/' },
        add:    { method: 'POST',     url: this.baseUrl + 'donvitinh' },
        update: { method: 'PUT',      url: this.baseUrl + 'donvitinh/' },
        delete: { method: 'DELETE',   url: this.baseUrl + 'donvitinh/' }
    };

    dongXe = {
        getAll: { method: 'GET',     url: this.baseUrl + 'dongxe' },
        get:    { method: 'GET',     url: this.baseUrl + 'dongxe/' },
        add:    { method: 'POST',    url: this.baseUrl + 'dongxe' },
        update: { method: 'PUT',     url: this.baseUrl + 'dongxe/' },
        delete: { method: 'DELETE',  url: this.baseUrl + 'dongxe/' },
        search: { method: 'GET',     url: this.baseUrl + 'dongxe/search/' }
    };

    hangXe = {
        getAll: { method: 'GET',     url: this.baseUrl + 'hangxe' },
        get:    { method: 'GET',     url: this.baseUrl + 'hangxe/' },
        add:    { method: 'POST',    url: this.baseUrl + 'hangxe' },
        update: { method: 'PUT',     url: this.baseUrl + 'hangxe/' },
        delete: { method: 'DELETE',  url: this.baseUrl + 'hangxe/' }
    };

    nhaCungCap = {
        getAll: { method: 'GET',      url: this.baseUrl + 'nhacungcap' },
        get:    { method: 'GET',      url: this.baseUrl + 'nhacungcap/' },
        add:    { method: 'POST',     url: this.baseUrl + 'nhacungcap' },
        update: { method: 'PUT',      url: this.baseUrl + 'nhacungcap/' },
        delete: { method: 'DELETE',   url: this.baseUrl + 'nhacungcap/' },
        disable:{ method: 'PUT',      url: this.baseUrl + 'nhacungcap/disable/' },
        enable: { method: 'PUT',      url: this.baseUrl + 'nhacungcap/enable/' },
        getEnable: { method: 'GET',   url: this.baseUrl + 'nhacungcap/enable' },
    };

    lapPhieuDat = {
        getAll:   { method: 'GET',    url: this.baseUrl + 'lapphieudat'},
        get:      { method: 'GET',    url: this.baseUrl + 'lapphieudat/'},
        getNCC:   { method: 'GET',    url: this.baseUrl + 'lapphieudat/ncc/'},
        getMPD:   { method: 'GET',    url: this.baseUrl + 'lapphieudat/taoma/maphieudat'},
        add:      { method: 'POST',   url: this.baseUrl + 'lapphieudat'},
        update:   { method: 'PUT',    url: this.baseUrl + 'lapphieudat'},
        delete:   { method: 'DELETE', url: this.baseUrl + 'lapphieudat/'},
        xacnhanPD:{ method: 'POST',   url: this.baseUrl + 'lapphieudat/dsphieudat/xacnhan'},
        getPD:    { method: 'GET',    url: this.baseUrl + 'lapphieudat/phieu/'},
        generate: { method: 'GET',    url: this.baseUrl + 'lapphieudat/generate'}
    };

    phuTung = {
        getAll:     { method: 'GET',    url: this.baseUrl + 'phutung' },
        get:        { method: 'GET',    url: this.baseUrl + 'phutung/' },
        getNCC:     { method: 'GET',    url: this.baseUrl + 'phutung/ncc/' },
        add:        { method: 'POST',   url: this.baseUrl + 'phutung' },
        update:     { method: 'PUT',    url: this.baseUrl + 'phutung/' },
        delete:     { method: 'DELETE', url: this.baseUrl + 'phutung/' },
        getDVT:     { method: 'GET',    url: this.baseUrl + 'phutung/DVT/DVT' },
        getMPT:     { method: 'GET',    url: this.baseUrl + 'phutung/taoma/maphutung' },
        searchPT:   { method: 'GET',    url: this.baseUrl + 'phutung/admin/' },
        searchAllPT:{ method: 'GET',    url: this.baseUrl + 'phutung/all/admin/' },
    };

    khachHang = {
        getAll:     { method: 'GET',    url: this.baseUrl + 'khachhang' },
        get:        { method: 'GET',    url: this.baseUrl + 'khachhang/' },
        add:        { method: 'POST',   url: this.baseUrl + 'khachhang' },
        update:     { method: 'PUT',    url: this.baseUrl + 'khachhang/' },
        delete:     { method: 'DELETE', url: this.baseUrl + 'khachhang/' },
        generate:   { method: 'GET',    url: this.baseUrl + 'khachhang/generate'}
    };

    generateID(length = null) {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      
        for (var i = 0; i < length; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));
      
        return text;
    }
      
      

}
