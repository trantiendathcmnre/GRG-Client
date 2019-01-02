import { Injectable } from '@angular/core';

@Injectable()
export class ApisService {

    constructor() { }
    baseUrl = 'http://18.224.135.207:8000/';

    authentication = {
        login: { method: 'POST', url: this.baseUrl + 'users' }
    };

    baoGiaCong = {
        getAll: { method: 'GET', url: this.baseUrl + 'bao-gia-cong' },
        get: { method: 'GET', url: this.baseUrl + 'bao-gia-cong/' },
        add: { method: 'POST', url: this.baseUrl + 'bao-gia-cong' },
        update: { method: 'PUT', url: this.baseUrl + 'bao-gia-cong/' },
        delete: { method: 'DELETE', url: this.baseUrl + 'bao-gia-cong/' },
        getMaBaoGiaCong: { method: 'GET', url: this.baseUrl + 'bao-gia-cong/tao-ma/ma-bao-gia-cong' }
    };

    danhMucPhuTung = {
        getAll: { method: 'GET', url: this.baseUrl + 'danh-muc-phu-tung' },
        get: { method: 'GET', url: this.baseUrl + 'danh-muc-phu-tung/' },
        add: { method: 'POST', url: this.baseUrl + 'danh-muc-phu-tung' },
        update: { method: 'PUT', url: this.baseUrl + 'danh-muc-phu-tung/' },
        delete: { method: 'DELETE', url: this.baseUrl + 'danh-muc-phu-tung/' },
        search: { method: 'GET', url: this.baseUrl + 'danh-muc-phu-tung/search/' },
        export: { method: 'GET', url: this.baseUrl + 'danh-muc-phu-tung/export-csv' }
    };

    donViLamViec = {
        getAll: { method: 'GET', url: this.baseUrl + 'don-vi-lam-viec' },
        get: { method: 'GET', url: this.baseUrl + 'don-vi-lam-viec/' },
        add: { method: 'POST', url: this.baseUrl + 'don-vi-lam-viec' },
        update: { method: 'PUT', url: this.baseUrl + 'don-vi-lam-viec/' },
        delete: { method: 'DELETE', url: this.baseUrl + 'don-vi-lam-viec/' }
    };

    donViTinh = {
        getAll: { method: 'GET', url: this.baseUrl + 'don-vi-tinh' },
        get: { method: 'GET', url: this.baseUrl + 'don-vi-tinh/' },
        add: { method: 'POST', url: this.baseUrl + 'don-vi-tinh' },
        update: { method: 'PUT', url: this.baseUrl + 'don-vi-tinh/' },
        delete: { method: 'DELETE', url: this.baseUrl + 'don-vi-tinh/' }
    };

    dongXe = {
        getAll: { method: 'GET', url: this.baseUrl + 'dong-xe' },
        get: { method: 'GET', url: this.baseUrl + 'dong-xe/' },
        add: { method: 'POST', url: this.baseUrl + 'dong-xe' },
        update: { method: 'PUT', url: this.baseUrl + 'dong-xe/' },
        delete: { method: 'DELETE', url: this.baseUrl + 'dong-xe/' },
        search: { method: 'GET', url: this.baseUrl + 'dong-xe/search/' }
    };

    hangXe = {
        getAll: { method: 'GET', url: this.baseUrl + 'hang-xe' },
        get: { method: 'GET', url: this.baseUrl + 'hang-xe/' },
        add: { method: 'POST', url: this.baseUrl + 'hang-xe' },
        update: { method: 'PUT', url: this.baseUrl + 'hang-xe/' },
        delete: { method: 'DELETE', url: this.baseUrl + 'hang-xe/' },
        generate: { method: 'GET', url: this.baseUrl + 'hang-xe/generate' }
    };

    nhaCungCap = {
        getAll: { method: 'GET', url: this.baseUrl + 'nha-cung-cap' },
        get: { method: 'GET', url: this.baseUrl + 'nha-cung-cap/' },
        add: { method: 'POST', url: this.baseUrl + 'nha-cung-cap' },
        update: { method: 'PUT', url: this.baseUrl + 'nha-cung-cap/' },
        delete: { method: 'DELETE', url: this.baseUrl + 'nha-cung-cap/' },
        disable: { method: 'PUT', url: this.baseUrl + 'nha-cung-cap/disable/' },
        enable: { method: 'PUT', url: this.baseUrl + 'nha-cung-cap/enable/' },
        getEnable: { method: 'GET', url: this.baseUrl + 'nha-cung-cap/enable' },
    };

    lapPhieuDat = {
        getAll: { method: 'GET', url: this.baseUrl + 'lap-phieu-dat' },
        get: { method: 'GET', url: this.baseUrl + 'lap-phieu-dat/' },
        getNhaCungCap: { method: 'GET', url: this.baseUrl + 'lap-phieu-dat/nha-cung-cap/' },
        getMaPhieuDat: { method: 'GET', url: this.baseUrl + 'lap-phieu-dat/tao-ma/ma-phieu-dat' },
        add: { method: 'POST', url: this.baseUrl + 'lap-phieu-dat' },
        update: { method: 'PUT', url: this.baseUrl + 'lap-phieu-dat' },
        delete: { method: 'DELETE', url: this.baseUrl + 'lap-phieu-dat/' },
        xacnhanPhieuDat: { method: 'POST', url: this.baseUrl + 'lap-phieu-dat/ds-phieu-dat/xac-nhan' },
        getPhieuDat: { method: 'GET', url: this.baseUrl + 'lap-phieu-dat/phieu/' },
        generate: { method: 'GET', url: this.baseUrl + 'lap-phieu-dat/generate' }
    };

    phuTung = {
        getAll: { method: 'GET', url: this.baseUrl + 'phu-tung' },
        get: { method: 'GET', url: this.baseUrl + 'phu-tung/' },
        getNhaCungCap: { method: 'GET', url: this.baseUrl + 'phu-tung/nha-cung-cap/' },
        add: { method: 'POST', url: this.baseUrl + 'phu-tung' },
        update: { method: 'PUT', url: this.baseUrl + 'phu-tung/' },
        delete: { method: 'DELETE', url: this.baseUrl + 'phu-tung/' },
        getDonViTinh: { method: 'GET', url: this.baseUrl + 'phu-tung/don-vi-tinh/don-vi-tinh' },
        getMaPhuTung: { method: 'GET', url: this.baseUrl + 'phu-tung/tao-ma/ma-phu-tung' },
        searchPhuTung: { method: 'GET', url: this.baseUrl + 'phu-tung/admin/' },
        searchAllPhuTung: { method: 'GET', url: this.baseUrl + 'phu-tung/all/admin/' },
    };

    khachHang = {
        getAll: { method: 'GET', url: this.baseUrl + 'khach-hang' },
        get: { method: 'GET', url: this.baseUrl + 'khach-hang/' },
        add: { method: 'POST', url: this.baseUrl + 'khach-hang' },
        update: { method: 'PUT', url: this.baseUrl + 'khach-hang/' },
        delete: { method: 'DELETE', url: this.baseUrl + 'khach-hang/' },
        generate: { method: 'GET', url: this.baseUrl + 'khach-hang/generate' },
        getKhachHangTheoSdt: { method: 'GET', url: this.baseUrl + 'khach-hang/dien-thoai/' }
    };

    xe = {
        getAll: { method: 'GET', url: this.baseUrl + 'xe' },
        getTrangThaiXe: { method: 'GET', url: this.baseUrl + 'xe/trang-thai/' },
        get: { method: 'GET', url: this.baseUrl + 'xe/' },
        add: { method: 'POST', url: this.baseUrl + 'xe' },
        update: { method: 'PUT', url: this.baseUrl + 'xe' },
        delete: { method: 'DELETE', url: this.baseUrl + 'xe/' },
        getXeKhachHang: { method: 'GET', url: this.baseUrl + 'xe/ma-khach-hang/' },
        getMaXe: { method: 'GET', url: this.baseUrl + 'xe/tao-ma/ma-xe' },
        pheDuyetXe: { method: 'POST', url: this.baseUrl + 'xe/xac-nhan-xe' },
        dienThoaiKhachHang: { method: 'GET', url: this.baseUrl + 'xe/so-dien-thoai-khach-hang/' },
        dsXeDangSua: { method: 'GET', url: this.baseUrl + 'xe/ds-xe/dang-sua' }
    };

    nhanVien = {
        getAll: { method: 'GET', url: this.baseUrl + 'nhan-vien' },
        getNVHoatDong: { method: 'GET', url: this.baseUrl + 'nhan-vien/hoat-dong' },
        get: { method: 'GET', url: this.baseUrl + 'nhan-vien/' },
        add: { method: 'POST', url: this.baseUrl + 'nhan-vien' },
        update: { method: 'PUT', url: this.baseUrl + 'nhan-vien' },
        delete: { method: 'DELETE', url: this.baseUrl + 'nhan-vien/' },
        getNhanVienDonVi: { method: 'GET', url: this.baseUrl + 'nhan-vien/don-vi/' },
        getMaNhanVien: { method: 'GET', url: this.baseUrl + 'nhan-vien/tao-ma/ma-nhan-vien' },
    };

    lapPhieuNhap = {
        getAll: { method: 'GET', url: this.baseUrl + 'phieu-nhap' },
        getAllTrangThai: { method: 'GET', url: this.baseUrl + 'phieu-nhap/phieu-nhap-xn' }, // get trang thai =2=3
        get: { method: 'GET', url: this.baseUrl + 'phieu-nhap/' },
        getPhieuNhapDanhSachPhuTung: { method: 'GET', url: this.baseUrl + 'phieu-nhap/ds-phu-tung/' },
        getMaPhieuNhap: { method: 'GET', url: this.baseUrl + 'phieu-nhap/tao-ma/ma-phieu-nhap' },
        getDanhSachPhieuNhap: { method: 'POST', url: this.baseUrl + 'phieu-nhap/ds-phieu-nhap' },
        add: { method: 'POST', url: this.baseUrl + 'phieu-nhap' },
        update: { method: 'PUT', url: this.baseUrl + 'phieu-nhap' },
        delete: { method: 'DELETE', url: this.baseUrl + 'phieu-nhap/' },
        xacnhanPhieuNhap: { method: 'POST', url: this.baseUrl + 'phieu-nhap/ds-phieu-nhap/xac-nhan' },
        updateCongNoNhaCungCap: { method: 'POST', url: this.baseUrl + 'phieu-nhap/cong-no-nha-cung-cap' },
        getThongTinPhieuNhapNhaCungCap: { method: 'GET', url: this.baseUrl + 'phieu-nhap/phieu-nhap-nha-cung-cap/' },
        getChiTietThongTin: { method: 'GET', url: this.baseUrl + 'phieu-nhap/cong-no-nha-cung-cap/' },
        getNhaCungCap: { method: 'GET', url: this.baseUrl + 'phieu-nhap/phieu-nhap/nha-cung-cap/' },
        capNhatGia: { method: 'POST', url: this.baseUrl + 'phieu-nhap/cap-nhat-gia' },
    };

    phieuKham = {
        getAll: { method: 'GET', url: this.baseUrl + 'phieu-kham' },
        get: { method: 'GET', url: this.baseUrl + 'phieu-kham/' },
        add: { method: 'POST', url: this.baseUrl + 'phieu-kham' },
        update: { method: 'PUT', url: this.baseUrl + 'phieu-kham' },
        xacNhan: { method: 'POST', url: this.baseUrl + 'phieu-kham/phieu-kham/xac-nhan' },
        getPhieuKhamLoaiPhieu: { method: 'GET', url: this.baseUrl + 'phieu-kham/loai-phieu/' },
        getPhieuKhamNhanVien: { method: 'GET', url: this.baseUrl + 'phieu-kham/nhan-vien/' },
        getPhieuKhamThongTin: { method: 'GET', url: this.baseUrl + 'phieu-kham/xe-khach-hang/' },
        getPhieuKhamXe: { method: 'GET', url: this.baseUrl + 'phieu-kham/xe/' },
    };

    donHang = {
        getAll: { method: 'GET', url: this.baseUrl + 'don-hang' },
        get: { method: 'GET', url: this.baseUrl + 'don-hang/' },
        getMaDonHang: { method: 'GET', url: this.baseUrl + 'don-hang/tao-ma/ma-don-hang' },
        add: { method: 'POST', url: this.baseUrl + 'don-hang' },
        update: { method: 'PUT', url: this.baseUrl + 'don-hang' },
        delete: { method: 'DELETE', url: this.baseUrl + 'don-hang/' },
        getDonHangPhuTung: { method: 'GET', url: this.baseUrl + 'don-hang/don-hang/phu-tung/' },
        getDonHangCong: { method: 'GET', url: this.baseUrl + 'don-hang/don-hang/cong/' },
        updateNhanVien: { method: 'PUT', url: this.baseUrl + 'don-hang/nhan-vien' },
        getDonHangDangSua: { method: 'GET', url: this.baseUrl + 'don-hang/dang-sua' },
        huyDonHang: { method: 'POST', url: this.baseUrl + 'don-hang/don-hang/xac-nhan' },
        getDonHangHoanThanh: { method: 'GET', url: this.baseUrl + 'don-hang/hoan-thanh' },
        getDonHangNhanVien: { method: 'GET', url: this.baseUrl + 'don-hang/nhan-vien/' },
        getDonHangNhanVienDangLamViec: { method: 'GET', url: this.baseUrl + 'don-hang/don-hang/nhan-vien/dang-lam-viec' },
        getDonHangKhachHang: { method: 'GET', url: this.baseUrl + 'don-hang/khach-hang/' },
        updateCongNoNhaCungCap: { method: 'POST', url: this.baseUrl + 'don-hang/cong-no-khach-hang' },
        getChiTietThongTin: { method: 'GET', url: this.baseUrl + 'don-hang/cong-no-khach-hang/' },
        sendMail: { method: 'POST', url: this.baseUrl + 'send-mail' },
        getDonHangHoanThanhBienSo: { method: 'GET', url: this.baseUrl + 'don-hang/hoan-thanh/bien-so-xe/' },
        luuTamDonHang: { method: 'PUT', url: this.baseUrl + 'don-hang/luu-tam' },
        getDonHangThongTinKhachHang: { method: 'GET', url: this.baseUrl + 'don-hang/bien-so-xe/' },
        capNhatPhieuHen: { method: 'POST', url: this.baseUrl + 'don-hang/cap-nhat/phieu-hen' },
        lichSuSuaChua: { method: 'GET', url: this.baseUrl + 'don-hang/lich-su-sua-chua/' },
        sendSms: { method: 'POST', url: this.baseUrl + 'send-sms' },
    };

    generateID(length = null) {
        let text = '';
        const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < length; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }

        return text;
    }



}
