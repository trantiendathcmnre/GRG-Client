import { Component, OnInit } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { XeService } from '../../@services/xe.service';
import { KhachHangService } from '../../@services/khachhang.service';
import { DonViLamViecService } from '../../@services/donvilamviec.service';
import { NhanVienService } from '../../@services/nhanvien.service';
import { LapPhieuKhamService } from '../../@services/lapphieukham.service';
import { HangXeService } from '../../@services/hangxe.service';
import { DongXeService } from '../../@services/dongxe.service';
import { DonHangService } from '../../@services/donhang.service';
import * as moment from 'moment';

declare var $, toastr:any;
var tbl, tbl1, tbl2, td, headers, self, validatorHangXe, validatorDongXe, validatorThongTinXe, validatorThongTinKhachHang: any;
var id_xe, id_khach_hang, id_dong_xe, id_hang_xe = null;
var ten_khach_hang, bien_so, so_khung, so_may, mau_xe, so_vin, nhan_vien, ten_hang_xe, ten_quan_huyen, dien_thoai = '';
var so_km = 0;
var dataXeKH = {};

@Component({
  selector: 'app-tiepnhansuachua',
  templateUrl: './tiepnhansuachua.component.html',
  styleUrls: ['./tiepnhansuachua.component.css']
})
export class TiepNhanSuaChuaComponent implements OnInit {

  public checkBienSo = false;
  public checkSdt = false; 
  public dataHangXe:any = [];
  public dataDonVi:any = [];
  public dataTTDongXe:any = [];
  public dataKhachHang:any = [];
  public dataXe:any = [];
  public dataTinhThanh:any = [];
  public dataQuanHuyen:any = [];
  public dataPhuongXa:any = [];
  public dataNhanVien1:any = [];
  public dataNhanVien2:any = [];
  public dataNhanVien3:any = [];
  public bienSo:string;
  public noiDungKham1:string;
  public noiDungKham2:string;
  public noiDungKham3:string;
  public yeuCauKiemTra:string;
  public maXe:string;
  private headerOptions;

  constructor(
    private donHangService: DonHangService,
    private dongXeService: DongXeService,
    private hangXeService: HangXeService, 
    private xeService: XeService,
    private khachHangService: KhachHangService,
    private donViLamViecService: DonViLamViecService,
    private nhanVienService: NhanVienService,
    private lapPhieuKhamService: LapPhieuKhamService,
    private http: Http,
    private router: Router
  ) { }

  ngOnInit() {
    // construct params 
    self = this;
    // loader display
    $("#loader").css("display", "block");
    // generate new customer code
    self.createMaKhachHang();
    // get info automakers
    self.getHangXe();
    // get info unit of works
    //self.getDonVi();
    // get info all vehicles
    //self.getAllDongXe();
    // get info all customers
    //self.getKhachHang();
    // get cars info
    //self.getXe();
    // get province
    //self.getTinhThanh();

    // disabled quan huyen phuong xa
    $('select[name=quanhuyen]').prop('disabled', true);
    $('select[name=phuongxa]').prop('disabled', true);

    $('#btn_XemDatLich').click(function(){
      $('#modaldatlich').modal('show');
    });

    $('#btn_LapBaoGia').click(function(){
      self.router.navigate(['/admin/donhang']);
    });

    $('input[type="checkbox"].flat-red, input[type="radio"].flat-red').iCheck({
      checkboxClass: 'icheckbox_flat-green',
      radioClass   : 'iradio_flat-green'
    })

    /* 
     * ***************************************
     *             Datetimepicker            *
     * ***************************************
     */
    // datetimepicker ngay lap phieu
    $('#ngay_lap_phieu').daterangepicker({
      singleDatePicker: true,
      locale: {
        format: 'YYYY-MM-DD HH:mm:ss',   
      },
      timePicker: true,
      timePicker24Hour: true,
      timePickerSeconds:true
    });
    // datetimepicker ngay sinh 
    $('#ngay_sinh').daterangepicker({
      singleDatePicker: true,
      showDropdowns: true,
      autoUpdateInput: true,
      locale: {
        format: 'YYYY-MM-DD'
      }
    });
    // datetimepicker ngay lap phieu
    $('#ngay_lap_phieu').daterangepicker({
      singleDatePicker: true,
      startDate: new Date(),
      showDropdowns: true,
      timePicker: true,
      timePicker24Hour: true,
      timePickerIncrement: 10,
      autoUpdateInput: true,
      locale: {
        format: 'DD-MM-YYYY HH:mm:ss'
      }
    });

    // select 2 thong tin khach hang
    $('#thong_tin_khach_hang').select2();

    // select 2 dong xe
    $('.dong_xe').select2({
      placeholder: "Chọn dòng xe",
    });
    // select2 hang xe
    $('.hang_xe').select2({
      placeholder: "Chọn hãng xe",
    }).on('select2:select', function (e) {
      id_hang_xe = $(this).val();
      self.getDongXe(id_hang_xe);
      $('.dong_xe').prop('disabled', false);
    });
    // select 2 hang xe dong xe 
    $('#MAHANGXE_ADD_DX').select2({
      placeholder: "Choose Automaker",
      allowClear: true
    });
    // select 2 dong xe 
    $('#ma_dong_xe').select2({
      placeholder: "Choose Vehicle",
      allowClear: true
      });
    // select 2 gioi tinh 
    $('#gioi_tinh').select2({
        placeholder: "Choose Gender",
        allowClear: true
    });
    // select 2 don vi 
    $('select[name=ma_don_vi]').select2({
      placeholder: "Choose Unit Of Work",
      allowClear: true
    });
    // select 2 nhan vien 
    $('select[name=nhan_vien]').select2({
      placeholder: "Choose Staff",
      allowClear: true
    });
    // select 2 loai phieu kham
    $('select[name=loai_phieu_kham]').select2({
      placeholder: "Choose Style Of Checklist",
      allowClear: true
    });

    /*****************************************
     *             Validation                *
     *****************************************
     */
    // $.validator.addMethod("valueNotEquals", function(value, element, arg){
    //   return arg !== value;
    // }, "Value must not equal arg.");

    // $('#form-khach-hang').validate({
    //   debug: true,
    //   rules: {
    //     ten_khach_hang: { required : true },
    //     tinhthanh: { valueNotEquals: "0" },
    //     sdt: { required : true },
    //     quanhuyen : { valueNotEquals: "0" },
    //     phuongxa : { valueNotEquals: "0" }
    //   },
    //   messages: { 
    //     ten_khach_hang: { required: "Vui lòng nhập tên khách hàng."},
    //     tinhthanh: { valueNotEquals: "Vui lòng chọn Tỉnh/Thành."},
    //     quanhuyen: { valueNotEquals: "Vui lòng chọn Quận/Huyện."},
    //     sdt: { required: "Vui lòng nhập số điện thoại."},
    //     phuongxa: { valueNotEquals: "Vui lòng chọn Phường/Xã."}
    //   },
    //   highlight : function (element) {
    //       $(element).closest('.form-control').addClass('has-error');
    //       $(element).closest('.form-group').addClass('has-error');
    //       $('.no_error').removeClass('has-error');
    //   },
    //   unhighlight : function (element) {
    //       $(element).closest('.form-control').removeClass('has-error');
    //       $(element).closest('.form-group').removeClass('has-error');
    //   }
    // });

    // validate form them hang xe
    validatorHangXe = $('#form-them-hang-xe').validate();

    // validate from thong tin xe
    validatorThongTinXe = $('.form-thong-tin-xe').validate();

    // validate form thong tin khach hang
    validatorThongTinKhachHang = $('#form-khach-hang').validate();

    // validate d=from them dong xe
    validatorDongXe = $('#form-them-dong-xe').validate();
    
    // add medthod validation
    $.validator.addMethod("valueNotEquals", function(value, element, arg){
      return arg !== value;
    }, "Value must not equal arg.");

    // click button them moi hang xe tab1
    $('.btn-them-hang-xe').off('click').click(function(){
      validatorHangXe.resetForm();
      $('input').removeClass('error');
      $('#modal-them-hang-xe').modal('show');
    });

    // click button them moi dong xe
    $('.btn-them-dong-xe').off('click').click(function () {
      validatorDongXe.resetForm();
      $('input').removeClass('error');
      $('#modal-them-dong-xe').modal('show');
    });

    $('.them_khach_hang').click(function() {
      validatorThongTinKhachHang.resetForm();
      $('input').removeClass('error');
    });

    // click button luu hang xe
    $('#luu_hang_xe').click(function() {
      if( validatorHangXe.checkForm()) {
        self.themHangXe({"ten": $('#hangxe').val(), "trang_thai_hang_xe": $('#trangthai').val()});
      }
    });

    // click button luu dong xe
    $('#luu-dong-xe').click(function() {
      if(validatorDongXe.checkForm()) {
        self.themDongXe({
          "ten": $('#dongxe').val(), 
          "trang_thai_dong_xe": $('select[name=trang_thai_dong_xe]').val(), 
          "hangxe_id": $('#them_hang_xe').val()
        });
      }
    });

    // enter ten khach hang
    $('#sdt').keypress(function (e) {
      var key = e.which;
      if(key == 13) {
        $("#loader").css("display", "block");
        dien_thoai = $(this).val();
        self.getKhachHangBySdt(dien_thoai);
      }
    });
    
    /* 
     * ***************************************
     *      Datatable Phieu Kiem Tra         *
     * ***************************************
     */
    tbl1 = $("#dsphieukiemtra").DataTable({
      "ordering": false,
      "info": false,
      "searching": false,
      "paging":   false,
      columnDefs: [
          { orderable: false, targets: [0] }
      ],
      iDisplayLength: 10,
      order: [[1, "asc"]],
      aaData: null,
      rowId: "id_phieu_kham",
      columns: [
        {data: "ngay_lap",className: "text-center",render:function(data){
          if( data ) {
            return moment(data).format("DD-MM-YYYY HH:mm:ss"); 
          }
          return '';
          
        }},
        { data: "bien_so" },  
        {data: "ten_dong_xe",className: "text-center"}, 
        {data: "nguoi_lap",className: "text-center"}, 
        {data: "id_phieu_kham",className: "text-center",render: function (data, type, row){
          return '';
        }},
        {data: "noi_dung_kham",className: "text-center"},          
        {data: "trang_thai_phieu_kham",className: "text-center",render: function (data, type, row){
          if(data=='0')
          return 'Canceled';
          else
          if(data=='1')
          return '<span class="badge badge-warning">Pending</span>';
          else
          if(data=='2')
          return '<span class="badge badge-success">Processed</span>';
        }}
      ],
      initComplete: function (settings, json) {
      },
      drawCallback: function( settings ) {
        //self.bindTableEvents();
      },
      rowCallback: function(row, data, index) {
        self.lapPhieuKhamService.getPK_NV(data.id_phieu_kham).subscribe(res=>{
          if( res.data ) {
            for(let i of res.data) {
              nhan_vien += i.ten_nhan_vien + '-';             
            }
            tbl1.cell(index,4).nodes()[0].textContent = nhan_vien;
          }
        });
      }
    });

    /* 
     * ***************************************
     *      Datatable Danh Sach Sua Chua     *
     * ***************************************
     */
    tbl2 = $("#dssuachua").DataTable({
      "ordering": false,
      "info": false,
      iDisplayLength: 10,
      order: [[1, "asc"]],
      aaData: null,
      rowId: "id",
      columns: [
        { data: null, className: "text-center" },
        {data: "ngay_lap",className: "text-center",render:function(data){
          //var k= moment(data,"YYYY-MM-DD HH:mm");
          return moment(data).format("DD-MM-YYYY HH:mm:ss"); 
        }},
        { data: "bien_so",className:"font-weight-bold" },  
        {data: "tien_phu_tung",className: "text-center", render: function (data) {
          data = data.toLocaleString('vi', {style : 'currency', currency : 'VND'});
          return data;
        }}, 
        {data: "tien_nhan_cong",className: "text-center", render: function (data){
          data = data.toLocaleString('vi', {style : 'currency', currency : 'VND'});
          return data;
        }},
        {data: "tong_tien",className: "text-center",render:function(data){
          data = data.toLocaleString('vi', {style : 'currency', currency : 'VND'});
          return data;
        }},
        {data: "thanh_toan",className: "text-center text-success",render:function(data){
          data = data.toLocaleString('vi', {style : 'currency', currency : 'VND'});
          return data;
        }},
        {data: null,className: "text-center text-danger"},     
        {data: "trang_thai_don_hang",className: "text-center",render: function (data, type, row){
          if(data == 0)
            return '<span class="badge bg-red">Canceled</span>';
          else if(data == 1)
            return '<span class="badge bg-yellow">Pending</span>'
          else if(data == 2 || data == 3)
            return '<span class="badge bg-blue">Repairing</span>';
          else
            return '<span class="badge bg-green">Completed</span>';
        }}
      ],
      rowCallback: function(row, data, index) {
        // tinh tien con no dua vao tong tien va so tien da thanh toan
        tbl2.cell(index,7).nodes()[0].textContent = (data.tong_tien - data.thanh_toan).toLocaleString('vi', {style : 'currency', currency : 'VND'});
      }
    });
     //append stt for table tbl2
    tbl2.on('order.dt search.dt', function () {
      tbl2.column(0, { search: 'applied', order: 'applied' }).nodes().each(function (cell, i) {
        cell.innerHTML = i + 1;
      });
    }).draw();


    $('#btn_UpdateData').click(function(){
      id_xe = $('#id_thong_tin_xe').val();
      id_khach_hang = $('#thong_tin_khach_hang').val();
      bien_so = $('#bien_so').val();
      so_khung = $('#so_khung').val();
      so_may = $('#so_may').val();
      so_km = $('#so_km').val();
      mau_xe = $('#mau_xe').val();
      so_vin = $('#so_vin').val();
      id_dong_xe = $('#id_dong_xe').val();
      dataXeKH = {
        "id_xe": id_xe,
        "id_dong_xe": id_dong_xe,
        "bien_so": bien_so,
        "SOVIN": so_vin,
        "so_khung": so_khung,
        "so_may": so_may,
        "so_km": so_km,
        "mau_xe": mau_xe,
        "id_khach_hang": id_khach_hang
      };

      self.xeService.update(dataXeKH).subscribe(res => {
        if(res.errorCode==0) {
          $('#modalThongTinXe').modal('hide');
          //self.PNotify('Cập nhật xe thành công !','success');
          self.loadTable();
        }
        else {
          $('#exampleModal').modal('hide');
          //self.PNotify('Thêm Xe không thành công !','error');
        }
      });
    });

    $('#plus_HX').click(function(){
      $('#modalHangXe').modal('show');
    });
    $('#plus_DX').click(function(){
      $('#modalDongXe').modal('show');
    });
    $('#btn_LuuHangXe').click(function(){
      var MAHANGXE= $('#MAHANGXE_ADD').val();
      var TENHANGXE= $('#TENHANGXE_ADD').val();
      var MOTAHANGXE= $('#MOTAHANGXE_ADD').val();
      var dataHX={
        "MAHANGXE":MAHANGXE,
        "TENHANGXE":TENHANGXE,
        "MOTAHANGXE":MOTAHANGXE
      }
      self.hangxeService.add(dataHX).subscribe(res=>{
        if(res.errorCode==0)
        {
          $('#modalHangXe').modal('hide');
          self.PNotify('Thêm hãng xe thành công !','success');
          self.getHangXe();
        }
        else
        console.log(res.message);
      });
    });
    $('#btn_LuuDongXe').click(function(){
      var MADONGXE= $('#MADONGXE_ADD').val();
      var TENDONGXE= $('#TENDONGXE_ADD').val();
      var MOTADONGXE= $('#MOTADONGXE_ADD').val();
      var MAHANGXE=$('#MAHANGXE_ADD_DX').val();
      var dataDX={
        "MADONGXE":MADONGXE,
        "TENDONGXE":TENDONGXE,
        "MOTADONGXE":MOTADONGXE,
        "MAHANGXE":MAHANGXE
      }
      self.dongxeService.add(dataDX).subscribe(res=>{
        if(res.errorCode==0)
        {
          $('#modalDongXe').modal('hide');
          self.PNotify('Thêm dòng xe thành công !','success');
          var MAHANGXE=$('#MAHANGXE').val();
          self.getDongXe(MAHANGXE);
        }
        else
        console.log(res.message);
      });
    });
    // $('#MAHANGXE').on('select2:select', function (e) {
    //   var MAHANGXE=$('#MAHANGXE').val();
    //  self.getDongXe(MAHANGXE);
    // });
    $('#lichsukiemtraxe').hide();
    $('#lichsusuachua').hide();
    $('#khachhang tbody').on('click', '.lichsu', function () {
      $("#loader").css("display", "block");
      self.bienSo = ($(this).closest('tr').children().eq(2)[0].textContent);
      var maXe = $(this).closest('tr').attr('id');
      self.loadTableLSKT(maXe);
    });
    $('#khachhang tbody').on('click', '.lapphieukiemtra', function () {
      $("#loader").css("display", "block");
      self.bienSo = ($(this).closest('tr').children().eq(2)[0].textContent);
      $('#bien_so_kiem_tra').val(self.bienSo);
      self.maXe = $(this).closest('tr').attr('id');
      $('#modelPhieuKiemTra').modal('show');
      $("#loader").css("display", "none");
    });
    // $('#bien_so').keyup(function(){
    //  var bienSo = $('#bien_so').val();
    //   var vt=self.dataXe.findIndex(i=>i.bienSo==bienSo);
    //   if(vt!=-1 && $('#bien_so').val()!=self.bienSo)
    //   $('#errorbienSo').removeClass('d-none');
    //   else
    //   $('#errorbienSo').addClass('d-none');
    // });
    // $('#bienSo').keyup(function(){
    //   var bienSo= $('#bienSo').val();
    //    var vt=self.dataXe.findIndex(i=>i.bienSo==bienSo);
    //    if(vt!=-1)
    //    {
    //    $('#errorbienSo').removeClass('d-none');
    //    self.checkBienSo=true;
    //    }
    //    else
    //    {
    //    $('#errorbienSo').addClass('d-none');
    //    self.checkBienSo=false;
    //    }
    //  });
    // $('#SDT_KH').keyup(function(){
    // var SDT_KH= $('#SDT_KH').val();
    //   var vt=self.dataKhachHang.findIndex(i=>i.SDT_KH==SDT_KH);
    //   if(vt!=-1)
    //   {
    //     self.checkSdt=true;
    //   $('#errorSDT_KH').removeClass('d-none');

    //   }
    //   else
    //   {
    //   $('#errorSDT_KH').addClass('d-none');
    //   self.checkSdt=false;
    //   }
    // });
    $('#khachhang tbody').on('click', '.thongtinxe', function () {
      $("#loader").css("display", "block");
      self.bienSo = ($(this).closest('tr').children().eq(2)[0].textContent);
      self.maXe = $(this).closest('tr').attr('id');
      $('#id_thong_tin_xe').val(self.maXe);
      $('#bien_so').val(self.bienSo);
      self.xeService.get(self.maXe).subscribe(res=>{
        if(res.errorCode == 0 ) {
          $('#so_khung').val(res.data[0].so_khung);
          $('#so_may').val(res.data[0].so_may);
          $('#so_km').val(res.data[0].so_km);
          $('#so_vin').val(res.data[0].so_vin);
          $('#mau_xe').val(res.data[0].mau_xe);
          $('#id_dong_xe').val(res.data[0].id_dong_xe).change();
          $('#thong_tin_khach_hang').val(res.data[0].id_khach_hang).change();
          $('#modalThongTinXe').modal('show');
          $("#loader").css("display", "none");
        }
        else {
          console.log(res.message);
          $("#loader").css("display", "none");
        }
      });
    });

    $('#ma_don_vi_1').on('select2:select', function (e) {
      var ma_don_vi_1 = $('#ma_don_vi_1').val();
      self.getNhanVien1(ma_don_vi_1);

    });

    $('#ma_don_vi_2').on('select2:select', function (e) {
      var ma_don_vi_2 = $('#ma_don_vi_2').val();
      self.getNhanVien2(ma_don_vi_2);
    });

    $('#ma_don_vi_3').on('select2:select', function (e) {
      var ma_don_vi_3 = $('#ma_don_vi_3').val();
      self.getNhanVien3(ma_don_vi_3);
    });

    $('#btn_LapPhieu').click(function(){
      var kq= $('#NGAYLAPPHIEU').val();
      var k= moment(kq,"DD-MM-YYYY HH:mm");
      var NGAYLAPPHIEU=moment(k).format("YYYY-MM-DD HH:mm");
      var idNhanVien1=$('#idNhanVien1').val();
      if(idNhanVien1=='')
      {
        self.PNotify('Vui lòng chọn 1 nhân viên kiểm tra xe','error');
        return;
      }
      console.log(self.noiDungKham1);
      if(!self.noiDungKham1)
      {
        self.PNotify('Vui lòng nhập nội dung kiểm tra !','error');
        return;
      }
      var idNhanVien2=$('#idNhanVien2').val();
      var idNhanVien3=$('#idNhanVien3').val();
      var LOAIPHIEUKHAM=$('#LOAIPHIEUKHAM').val();
      var noiDungKham='';
      if(self.noiDungKham1)
      noiDungKham+=self.noiDungKham1;
      if(self.noiDungKham2)
      noiDungKham+='-'+self.noiDungKham2;
      if(self.noiDungKham3)
      noiDungKham+='-'+self.noiDungKham3;
      var data={"maXe":self.maXe,"NGAYLAPPHIEU":NGAYLAPPHIEU,"LOAIPHIEUKHAM":LOAIPHIEUKHAM,"yeuCauKiemTra":self.yeuCauKiemTra,"noiDungKham":noiDungKham,"NHANVIEN":[]};
      if(idNhanVien1!='')
      data.NHANVIEN.push({"MANHANVIEN":idNhanVien1});
      if(idNhanVien2!='')
      data.NHANVIEN.push({"MANHANVIEN":idNhanVien2});
      if(idNhanVien3!='')
      data.NHANVIEN.push({"MANHANVIEN":idNhanVien3});
      self.lapphieukhamService.add(data).subscribe(res => {
        if(res.errorCode==0)
        {
          self.PNotify('Lập phiếu kiểm tra thành công !','success');
        }
        else
        {
          self.PNotify('Lập phiếu kiểm tra không thành công !','error');
        }
        $('#modelPhieuKiemTra').modal('hide');
        self.loadTableLSKT(self.maXe);
       });
    });

    // $('#btn_AddData').click(function(){
    // var hideId =  $('#hideId').val();
    // var maXe = $('#maXe').text();
    // var bienSo = $('#bienSo').val();
    // if(bienSo == '')
    // {
    // self.PNotify('Vui lòng nhập biển số xe','error');
    // return;
    // }
    // if(self.checkSdt)
    // {
    //   self.PNotify('Số điện thoại này đã tồn tại','error');
    //   return;
    // }
    // if(self.checkBienSo)
    // {
    //   self.PNotify('Biển số xe này đã tồn tại','error');
    //   return;
    // }

    // var so_vin = $('#so_vin').val();
    // var so_khung = $('#so_khung').val();
    // var so_may = $('#so_may').val();
    // var so_km = $('#so_km').val();
    // var mau_xe = $('#mau_xe').val();
    // var id_hang_xe = $('#id_hang_xe').val();
    // var id_dong_xe = $('#id_dong_xe').val();

    // if(id_dong_xe == '') {
    //   self.PNotify('Vui lòng chọn dòng xe','error');
    //   return;
    // }

    // if( hideId == '0' ) {
    //   var ma_khach_hang = $('#ma_khach_hang').val();
      
    //   if( ten_khach_hang == '') {
    //     self.PNotify('Vui lòng nhập tên khách hàng','error');
    //     return;
    //   }

    //   var kq = $('#NGAYSINH').val();
    //   var k= moment(kq,"DD-MM-YYYY");
    //   var ngay_sinh = moment(k).format("DD-MM-YYYY");
    //   var gioi_tinh = $('#gioi_tinh').val();
    //   var email = $('#email').val();
    //   var sdt = $('#sdt').val();
    //   if(sdt == '') {
    //     self.PNotify('Vui lòng nhập số điện thoại khách hàng','error');
    //     return;
    //   }
    //   var dia_chi = $('#dia_chi').val();
    //   var dataKH = {
    //     "ma_khach_hang": ma_khach_hang,
    //     "ten_khach_hang": ten_khach_hang,
    //     "ngay_sinh": ngay_sinh,
    //     "sdt": sdt,
    //     "email": email,
    //     "dia_chi": dia_chi,
    //     "gioi_tinh": gioi_tinh
    //   };

    //   self.khachHangService.add(dataKH).subscribe(res=>{
    //     if(res.errorCode == 0 ) {
    //       var dataXeKH = {
    //         "maXe": maXe,
    //         "id_dong_xe": id_dong_xe,
    //         "bien_so":bienSo,
    //         "so_vin":so_vin,
    //         "so_khung": so_khung,
    //         "so_may": so_may,
    //         "so_km": so_km,
    //         "mau_xe": mau_xe,
    //         "ma_khach_hang": ma_khach_hang
    //       };
          
    //       self.xeService.add(dataXeKH).subscribe(respone => {
    //         if(respone.errorCode==0) {         
    //           $('#exampleModal').modal('hide');
    //           self.PNotify('Thêm thông tin thành công !','success');
    //           self.loadTable();

    //         }
    //         else
    //         {
    //           $('#exampleModal').modal('hide');
    //           self.PNotify('Thêm thông tin không thành công !','error');
    //         }
    //        });
    //     }
    //     else
    //       console.log(res);
    //   });
    // }
    // else
    // {
    //   var dataXeKH = {
    //     "maXe": maXe,
    //     "id_dong_xe": id_dong_xe,
    //     "bien_so":bienSo,
    //     "so_vin":so_vin,
    //     "so_khung": so_khung,
    //     "so_may": so_may,
    //     "so_km": so_km,
    //     "mau_xe": mau_xe,
    //     "ma_khach_hang": hideId
    //   };

    //   self.xeService.add(dataXeKH).subscribe(res => {
    //     if(res.errorCode==0) {
    //       $('#exampleModal').modal('hide');
    //       // self.PNotify('Thêm Xe thành công !','success');
    //       var tr = td.closest('tr');
    //       var row = tbl.row( tr );
    //       child(hideId,row,tr);
    //     } else {
    //       $('#exampleModal').modal('hide');
    //       // self.PNotify('Thêm Xe không thành công !','error');
    //     }
    //   });
    // }
    // });

    $('.btnNext').click(function(){
      var s = $('.nav-tabs > .active').next('li');
      s.find('a').trigger('click');
      s.addClass('active');
      s.prev('li').removeClass('active');
      
      
      });
    $('.btnPrevious').click(function(){
      var s= $('.nav-tabs > .active').prev('li');
      s.find('a').trigger('click');
      s.addClass('active');
      s.next('li').removeClass('active');
      });
      $('#item tfoot th').each( function () {
      var title = $(this).text();
      $(this).html( '<input type="text" placeholder="Tìm '+title+'" />' );
    } );
    $('#btn_Add').click(function(){
      self.checkBienSo=false;
      self.checkSdt=false;
    $('#lblxe').text('THÔNG TIN XE');
    $('.modalkhachhang').removeClass('d-none');
    $('#hideId').val('0');
      $('#exampleModal').modal('show');
      self.createMaXe();
    });

    // them khach hang tab 1
    $('.them_khach_hang').on('click', function () {
      // $('.tab-1').removeClass('active');
      // $('#activity').removeClass('active');
      // $('.tab-2').addClass('active');
      // $('#timeline').addClass('active');

    });

    // them xe tab 2 
    $('.them_xe').on('click', function (){
      self.themXe();
    });
    
  }

  /**
   * fn get data lich su kiem tra by id xe
   * @param maXe 
   */
  private loadTableLSKT(maXe) {
    self.lapPhieuKhamService.getPK_SC_XE(maXe).subscribe(res => {
      if (res.errorCode == 0) {
        tbl1.clear().draw();
        tbl1.rows.add(res.data); 
        tbl1.columns.adjust().draw();
        $('#lichsukiemtraxe').show();
        $("#loader").css("display", "none");
      } else {
        console.log(res.message);
        $("#loader").css("display", "none");
      }
    });
  }

  /**
   * fn get data lich su cua chua by id khach hang 
   * @param id_khach_hang 
   */
  private loadTableLSSC(id_khach_hang) {
    self.donHangService.getDH_KH(id_khach_hang).subscribe(res => {
      if (res.errorCode == 0) {
        tbl2.clear().draw();
        tbl2.rows.add(res.data); 
        tbl2.columns.adjust().draw();
        $('#lichsusuachua').show();
        $("#loader").css("display", "none");
      } else {
        console.log(res.errorMessage);
        $("#loader").css("display", "none");
      }
    });
  }

  /**
   * fn get data hang xe
   */
  private getHangXe() {
    self.hangXeService.getAll().subscribe(res => {
      if(res.errorCode == 0) {
        self.dataHangXe = res.data;
        $("#loader").css("display", "none");
      } else {
        console.log(res.message);
        $("#loader").css("display", "none");
      }
    });
  }

  /**
   * fn get data dong xe by id hang xe
   * @param id_hang_xe 
   */
  private getDongXe(id_hang_xe) {
      self.dongXeService.search(id_hang_xe).subscribe(res=> {
        if(res.errorCode == 0 ) {
          self.dataDongXe = res.data;
        }
      });
  }

  /**
   * fn get all dong xe
   */
  private getAllDongXe() {
    self.dongXeService.getAll().subscribe(res=> {
      if(res.errorCode == 0 ) {
        self.dataTTDongXe = res.data;
      }
    });
  }

  /**
   * fn get all data khach hang 
   */
  private getKhachHang() {
    self.khachHangService.getAll().subscribe(res=> {
      if(res.errorCode == 0 ) {
        self.dataKhachHang = res.data;
      }
      else
      console.log(res.message);
    });
  }
  
  /**
   * fn get nhan vien theo don vi lam viec 1
   * @param id_don_vi_lam_viec 
   */
  private getNhanVien1(id_don_vi_lam_viec) {
    self.nhanVienService.getNV_DV(id_don_vi_lam_viec).subscribe(res=>{
      if(res.errorCode == 0 ) {
        self.dataNhanVien1= res.data;
        var idNhanVien2=$('#idNhanVien2').val();
        var idNhanVien3=$('#idNhanVien3').val();
        let vt = self.dataNhanVien1.findIndex(i=>i.id == idNhanVien2);
        if(vt!=-1)
          self.dataNhanVien1.splice(vt,1);
        vt = self.dataNhanVien1.findIndex(i=>i.id == idNhanVien3);
        if(vt!=-1)
          self.dataNhanVien1.splice(vt,1);
      }
    });
  }

  /**
   * fn get data nhan vien theo don vi lam viec 2
   * @param id_don_vi_lam_viec 
   */
  private getNhanVien2(id_don_vi_lam_viec) {
    self.nhanVienService.getNV_DV(id_don_vi_lam_viec).subscribe(res=> {
      if(res.errorCode == 0 ) {
        self.dataNhanVien2 = res.data;
        var idNhanVien1 = $('#idNhanVien1').val();
        var idNhanVien3 = $('#idNhanVien3').val();
        let vt = self.dataNhanVien2.findIndex( i=> i.id == idNhanVien1 );
        if( vt != -1 )
          self.dataNhanVien2.splice(vt,1);
        vt = self.dataNhanVien2.findIndex(i=>i.id == idNhanVien3);
        if(vt != -1 )
          self.dataNhanVien2.splice(vt,1);
      }
    });
  }
  /**
   * fn get data nhan vien theo don vi lam viec 3
   * @param id_don_vi_lam_viec 
   */
  private getNhanVien3(id_don_vi_lam_viec)
  {
    self.nhanVienService.getNV_DV(id_don_vi_lam_viec).subscribe(res=>{
      if(res.errorCode == 0 ) {
        self.dataNhanVien3 = res.data;
        var idNhanVien1 = $('#idNhanVien1').val();
        var idNhanVien2 = $('#idNhanVien2').val();
        let vt = self.dataNhanVien3.findIndex(i=>i.id == idNhanVien1);
        if(vt != -1)
          self.dataNhanVien3.splice(vt,1);
        vt = self.dataNhanVien3.findIndex(i=>i.id == idNhanVien2);
        if(vt!=-1)
          self.dataNhanVien3.splice(vt,1);
      }
    });
  }
    
  /**
   * fn get all don vi lam viec
   */
  private getDonVi() {
    self.donViLamViecService.getAll().subscribe(res=>{
      if(res.errorCode == 0) {
        self.dataDonVi = res.data;
      }
      else
        console.log(res.message);
    });
  }

  /**
   * fn get all data xe 
   */
  private getXe() {
    self.xeService.getAll().subscribe(res=> {
      if(res.errorCode==0) {
  
        self.dataXe=res.data;
      }
      else
        console.log(res.message);
    });
  }

  /**
   * fn create new customer code
   */
  private createMaKhachHang() {
    self.khachHangService.generate().subscribe(res => {
      if(res.errorCode == 0 ) {
        $('#ma_khach_hang').val(res.data).prop('readonly', true);
        $("#loader").css("display", "none");
      }
      else {
        $('#ma_khach_hang').val('').prop('readonly', false);
        $("#loader").css("display", "none");
      }
    });
  }

  /**
   * fn them hang xe 
   * @param data 
   */
  private themHangXe(data) {
    self.hangXeService.add(data).subscribe(res=>{
      if(res.errorCode == 0) {
        self.getHangXe();
        $('#modal-them-hang-xe').modal('hide');
        $("#loader").css("display", "none");
        toastr.success('Thêm hãng xe thành công', 'Thành công!');
      } else {
        $("#loader").css("display", "none");
        console.log(res.message);
        toastr.error('Thêm hãng xe thất bại!', 'Thất bại!');
      }
    });
  }

  /**
   * fn them dong xe
   * @param data 
   */
  private themDongXe(data) {
    self.dongXeService.add(data).subscribe(res=> {
      if( res.errorCode == 0 ) {
        $('#modal-them-dong-xe').modal('hide');
        $("#loader").css("display", "none");
        id_hang_xe = $('select[name=thong_tin_xe_hang_xe]').val();
        self.getDongXe(id_hang_xe);
        toastr.success('Thêm dòng xe thành công', 'Thành công!');
      } else {
        console.log(res.message);
        $("#loader").css("display", "none");
        toastr.error('Thêm dòng xe thất bại', 'Thất bại!');
      }
    });
  }

  /**
   * fn them xe 
   */
  private themXe(data) {
    self.xeService.add(data).subscribe(res => {
      if( res.errorCode == 0 ) {
        $("#loader").css("display", "none");
        toastr.success('Thêm dòng xe thành công', 'Thành công!');
      } else {
        console.log(res.message);
        $("#loader").css("display", "none");
        toastr.error('Thêm dòng xe thất bại', 'Thất bại!');
      }
    });
  }

  /**
   * fn get khach hang by sdt
   * @param sdt 
   */
  private getKhachHangBySdt(sdt) {
    self.khachHangService.getKhachHangTheoSdt(sdt).subscribe(res=> {
      if(res.errorCode == 0 ) {
        validatorThongTinKhachHang.resetForm();
        $('input').removeClass('error');
        $('#ma_khach_hang').val(res.data[0].ma);
        $('#ten_khach_hang').val(res.data[0].ten);
        $('#sdt').val(res.data[0].sdt);
        if( res.data[0].gioi_tinh == 0) {
          $('#radio_nu').iCheck('check');
        } else {
          $('#radio_nam').iCheck('check');
        }
        $('#ngay_sinh').val( res.data[0].ngay_sinh == null ? '' : moment(res.data[0].ngay_sinh).format('YYYY-MM-DD') );
        $('#email').val(res.data[0].email);
        $('#dia_chi').val(res.data[0].dia_chi);

        $("#loader").css("display", "none");
      }
      else
      console.log(res.message);
    });
  }

  /**
   * fn get xe theo id khach hang
   * @param id_khach_hang 
   */
  private getXeTheoKhachHang(id_khach_hang) {
    self.xeService.getXe_KH(id_khach_hang).subscribe(res=> {
      if( res.errorCode == 0 ) {
        self.dataTable2 = res.data;
        tbl2.clear().draw();
        tbl2.rows.add(res.data);
        tbl2.columns.adjust().draw(); 
      }
    });
  }
}
