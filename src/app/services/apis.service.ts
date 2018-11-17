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

    xe = {
        getAll :    { method: 'GET',    url : this.baseUrl + 'xe' },
        getTrangThaiXe:   { method: 'GET',    url : this.baseUrl + 'xe/trangthai/' },
        get :       { method: 'GET',    url : this.baseUrl + 'xe/'},
        add :       { method: 'POST',   url : this.baseUrl + 'xe' },
        update :    { method: 'PUT',    url : this.baseUrl + 'xe' },
        delete :    { method: 'DELETE', url : this.baseUrl + 'xe/' },
        getXe_KH:   { method: 'GET',    url : this.baseUrl + 'xe/makhachhang/' },
        getMX :     { method: 'GET',    url : this.baseUrl + 'xe/taoma/maxe' },
        pheDuyetXe: { method: 'POST',   url : this.baseUrl + 'xe/xacnhanxe' },
        dienThoaiKhachHang:     { method: 'GET',    url : this.baseUrl + 'xe/SDT_KH/' },
        dsxedangsua:{ method: 'GET',    url : this.baseUrl + 'xe/dsxe/dangsua' }
    };

    nhanVien = {
        getAll :        { method: 'GET',    url : this.baseUrl + 'nhanvien' },
        getNVHoatDong : { method: 'GET',    url : this.baseUrl + 'nhanvien/hoatdong' },
        get :           { method: 'GET',    url : this.baseUrl + 'nhanvien/' },
        add :           { method: 'POST',   url : this.baseUrl + 'nhanvien' },
        update :        { method: 'PUT',    url : this.baseUrl + 'nhanvien' },
        delete :        { method: 'DELETE', url : this.baseUrl + 'nhanvien/'},
        getNV_DV:       { method: 'GET',    url : this.baseUrl + 'nhanvien/donvi/' },
        getMNV:         { method: 'GET',    url : this.baseUrl + 'nhanvien/taoma/manhanvien' },
    };

    lapPhieuNhap = {
        getAll :            { method: 'GET',     url : this.baseUrl + 'phieunhap' },
        getAllTRANGTHAI :   { method: 'GET',     url : this.baseUrl + 'phieunhap/phieunhapxn' },//get trang thai =2=3
        get :               { method: 'GET',     url : this.baseUrl + 'phieunhap/' },
        getPN_DSPhuTung:    { method: 'GET',     url : this.baseUrl + 'phieunhap/dsphutung/' },
        getMPN :            { method: 'GET',     url : this.baseUrl + 'phieunhap/taoma/maphieunhap' },
        getDSPhieuNhap:     { method: 'POST',    url : this.baseUrl + 'phieunhap/dsphieunhap' },
        add :               { method: 'POST',    url : this.baseUrl + 'phieunhap' },
        update :            { method: 'PUT',     url : this.baseUrl + 'phieunhap' },
        delete :            { method: 'DELETE',  url : this.baseUrl + 'phieunhap/' },
        xacnhanPN:          { method: 'POST',    url : this.baseUrl + 'phieunhap/dsphieunhap/xacnhan' },
        updateCN_NCC:       { method: 'POST',    url : this.baseUrl + 'phieunhap/congnoncc' },
        getTTPN_NCC:        { method: 'GET',     url : this.baseUrl + 'phieunhap/phieuhap_ncc/' },
        getCT_TT:           { method: 'GET',     url : this.baseUrl + 'phieunhap/congnoncc/' },
        getNCC:             { method: 'GET',     url : this.baseUrl + 'phieunhap/pn/ncc/' },
        capnhatgia:         { method: 'POST',    url : this.baseUrl + 'phieunhap/capnhatgia' },
      };
    
    phieuKham = {
        getAll :    { method: 'GET',    url : this.baseUrl + 'phieukham' },
        get :       { method: 'GET',    url : this.baseUrl + 'phieukham/' },
        add :       { method: 'POST',   url : this.baseUrl + 'phieukham' },
        update :    { method: 'PUT',    url : this.baseUrl + 'phieukham' },
        xacnhan :   { method: 'POST',   url : this.baseUrl + 'phieukham/phieukham/xacnhan' },
        getPK_LP:   { method: 'GET',    url : this.baseUrl + 'phieukham/loaiphieu/' },
        getPK_NV:   { method: 'GET',    url : this.baseUrl + 'phieukham/nhanvien/' },
        getPK_TT:   { method: 'GET',    url : this.baseUrl + 'phieukham/xe-khachhang/' },
        getPK_SC_XE:{ method: 'GET',    url : this.baseUrl + 'phieukham/xe/' },
    };
    
    donHang = {
        getAll :    { method: 'GET',    url : this.baseUrl + 'donhang' },
        get :       { method: 'GET',    url : this.baseUrl + 'donhang/' },
        getMDH :    { method: 'GET',    url : this.baseUrl + 'donhang/taoma/madonhang' },
        add :       { method: 'POST',   url : this.baseUrl + 'donhang' },
        update :    { method: 'PUT',    url : this.baseUrl + 'donhang' },
        delete :    { method: 'DELETE', url : this.baseUrl + 'donhang/' },
        getDH_PT:   { method: 'GET',    url : this.baseUrl + 'donhang/donhang/phutung/' },
        getDH_CONG: { method: 'GET',    url : this.baseUrl + 'donhang/donhang/cong/' },
        updateNV:   { method: 'PUT',    url : this.baseUrl + 'donhang/nhanvien' },
        getDH_DangSua:  { method: 'GET',    url : this.baseUrl + 'donhang/dangsua' },
        huyDH:          { method: 'POST',   url : this.baseUrl + 'donhang/donhang/xacnhan' },
        getDH_HoanThanh:{ method: 'GET',    url : this.baseUrl + 'donhang/hoanthanh' },
        getDH_NV:       { method: 'GET',    url : this.baseUrl + 'donhang/nhanvien/' },
        getDH_NVDLV:    { method: 'GET',    url : this.baseUrl + 'donhang/donhang/nhanvien/danglamviec' },
        getDH_KH:       { method: 'GET',    url : this.baseUrl + 'donhang/khachhang/' },
        updateCN_NCC:   { method: 'POST',   url : this.baseUrl + 'donhang/congnokh' },
        getCT_TT:       { method: 'GET',    url : this.baseUrl + 'donhang/congnokh/' },
        sendMail:       { method: 'POST',   url : this.baseUrl + 'sendmail' },
        getDHHT_BSX:    { method: 'GET',    url : this.baseUrl + 'donhang/hoanthanh/biensoxe/' },
        luuTamDH:       { method: 'PUT',    url : this.baseUrl + 'donhang/luutam' },
        getDH_TTKH:     { method: 'GET',    url : this.baseUrl + 'donhang/biensoxe/' },
        capnhatphieuhen:{ method: 'POST',   url : this.baseUrl + 'donhang/capnhat/phieuhen' },
        lichSuSuaChua:  { method: 'GET',    url : this.baseUrl + 'donhang/lichsusuachua/' },
    };

    generateID(length = null) {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      
        for (var i = 0; i < length; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));
      
        return text;
    }
      
      

}
