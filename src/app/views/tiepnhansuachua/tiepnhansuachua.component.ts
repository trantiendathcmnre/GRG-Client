import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { XeService } from '../../services/xe.service';
import { KhachHangService } from '../../services/khachhang.service';
import { DonViLamViecService } from '../../services/donvilamviec.service';
import { NhanVienService } from '../../services/nhanvien.service';
import { LapPhieuKhamService } from '../../services/lapphieukham.service';
import { HangXeService } from '../../services/hangxe.service';
import { DongXeService } from '../../services/dongxe.service';
import { DonHangService } from '../../services/donhang.service';
import * as moment from 'moment';

declare var $:any;
var self : any;
var tbl,tbl1,tbl2: any;
//tbl1 ds phieu kiem tra
//tbl2 ds phieu sua chua
var td:any;

@Component({
  selector: 'app-tiepnhansuachua',
  templateUrl: './tiepnhansuachua.component.html',
  styleUrls: ['./tiepnhansuachua.component.css']
})
export class TiepNhanSuaChuaComponent implements OnInit {

  checkBienSo=false;
  checkSdt=false;
  dataDongXe:any=[];
  dataHangXe:any=[];
  dataDonVi:any=[];
  dataTTDongXe:any=[];
  dataKhachHang:any=[];
  dataXe:any=[];
  dataNhanVien1:any[];
  dataNhanVien2:any[];
  dataNhanVien3:any[];
  bienSo:string;
  noiDungKham1:string;
  noiDungKham2:string;
  noiDungKham3:string;
  yeuCauKiemTra:string;
  maXe:string;

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
    self = this;
    self.getHangXe();
    self.getDonVi();
    self.getAllDongXe();
    self.getKhachHang();
    self.getXe();

    $('#btn_XemDatLich').click(function(){
      $('#modaldatlich').modal('show');
    });

    $('#btn_LapBaoGia').click(function(){
      self.router.navigate(['/admin/donhang']);
    });

    $('#ngay_lap_phieu').daterangepicker({
      singleDatePicker: true,
      // autoApply: false,
      locale: {
        format: 'YYYY-MM-DD HH:mm:ss',   
      },
      timePicker: true,
      timePicker24Hour: true,
      timePickerSeconds:true
    });
    /**
     * table khach hang 
     */
    tbl = $("#khachhang").DataTable({
      columnDefs: [
          { orderable: false, targets: [0,2,3,4,5,6,7]}
      ],
      iDisplayLength: 10,
      rowId: "id",
      columns: [
        { data: "ma" ,className: "d-none"}, 
        { data: "ten" },
        {data: "ngay_sinh",render:function(data){
          return data;
        }}, 
        {data: "gioi_tinh",render:function(data){
          if(data == '1')
            return 'Male';
          return 'Female';
        }},
        { data: "sdt" }, 
        { data: "email" }, 
        { data: "dia_chi" }, 
        {data: null,className: "text-center" ,render: function (data, type, row){
            return '<a class="btn btn-primary-action m-r-xs" data-group="grpTTKH" title="View Info Customer" ><i class="fa fa-eye"></i></a>'+
            '<a class="btn btn-primary-action m-r-xs" data-group="grpLSSC" title="Repair History" ><i class="fa fa-book"></i></a>'+
            '<a class="btn btn-primary-action m-r-xs details-control" title="View Car List" ><i class="fa fa-angle-double-down"></i></a>';
        }}
      ],
      initComplete: function (settings, json) {
        self.loadTable();
      },
      drawCallback: function( settings ) {
        self.bindTableEvents();
      }
    });
    

    /**
     * tbl phieu kiem tra
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
        { data: null, className: "text-center" },
        {data: "ngay_lap",className: "text-center",render:function(data){
          //var k= moment(data,"YYYY-MM-DD HH:mm");
          return moment(data).format("DD-MM-YYYY"); 
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
        var s = '';
        self.lapPhieuKhamService.getPK_NV(data.id_phieu_kham).subscribe(res=>{
          
          if( res.data ) {
            for(let i of res.data) {
              s += i.TENNHANVIEN+'-';             
            }
            tbl1.cell(index,5).nodes()[0].textContent=s;
            }
        });
      }
    });

    /**
     * append stt for tbl1
     */
    tbl1.on('order.dt search.dt', function () {
      tbl1.column(0, { search: 'applied', order: 'applied' }).nodes().each(function (cell, i) {
          cell.innerHTML = i + 1;
      });
    }).draw();

    /**
     * table danh sach sua chua
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
        /**
         * tinh tien con no dua vao tong tien va so tien da thanh toan
         */
        tbl2.cell(index,7).nodes()[0].textContent = (data.tong_tien - data.thanh_toan).toLocaleString('vi', {style : 'currency', currency : 'VND'});
      }
    });
    
    /**
     * append stt for table tbl2
     */
    tbl2.on('order.dt search.dt', function () {
      tbl2.column(0, { search: 'applied', order: 'applied' }).nodes().each(function (cell, i) {
        cell.innerHTML = i + 1;
      });
    }).draw();

    $('#btn_UpdateData').click(function(){
      var maXe=$('#id_thong_tin_xe').val();
      var MAKHACHHANG=$('#thong_tin_khach_hang').val();
      var bienSo=$('#bien_so').val();
      var SOKHUNG=$('#so_khung').val();
      var SOMAY=$('#so_may').val();
      var SO_KILOMET=$('#so_km').val();
      var MAUXE=$('#mau_xe').val();
      var SOVIN=$('#so_vin').val();
      var MADONGXE=$('#id_dong_xe').val();
      var dataXeKH={"maXe":maXe,"MADONGXE":MADONGXE,"bienSo":bienSo,"SOVIN":SOVIN,"SOKHUNG":SOKHUNG,"SOMAY":SOMAY,"SO_KILOMET":SO_KILOMET,"MAUXE":MAUXE,"MAKHACHHANG":MAKHACHHANG};
      console.log(dataXeKH);
        self.xeService.update(dataXeKH).subscribe(res => {
        if(res.errorCode==0)
        {
          $('#modalThongTinXe').modal('hide');
          self.PNotify('Cập nhật xe thành công !','success');
          self.loadTable();
        }
        else
        {
          $('#exampleModal').modal('hide');
          self.PNotify('Thêm Xe không thành công !','error');
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
    $('#MAHANGXE').on('select2:select', function (e) {
      var MAHANGXE=$('#MAHANGXE').val();
     self.getDongXe(MAHANGXE);
    });
    $('#lichsukiemtraxe').hide();
    $('#lichsusuachua').hide();
    $('#khachhang tbody').on('click', '.lichsu', function () {
      self.bienSo = ($(this).closest('tr').children().eq(2)[0].textContent);
      var maXe = $(this).closest('tr').attr('id');
      self.loadTableLSKT(maXe);
    });
    $('#khachhang tbody').on('click', '.lapphieukiemtra', function () {
      self.bienSo = ($(this).closest('tr').children().eq(2)[0].textContent);
      $('#bien_so_kiem_tra').val(self.bienSo);
      self.maXe = $(this).closest('tr').attr('id');
      $('#modelPhieuKiemTra').modal('show');
    });
    $('#bien_so').keyup(function(){
     var bienSo = $('#bien_so').val();
      var vt=self.dataXe.findIndex(i=>i.bienSo==bienSo);
      if(vt!=-1 && $('#bien_so').val()!=self.bienSo)
      $('#errorbienSo').removeClass('d-none');
      else
      $('#errorbienSo').addClass('d-none');
    });
    $('#bienSo').keyup(function(){
      var bienSo= $('#bienSo').val();
       var vt=self.dataXe.findIndex(i=>i.bienSo==bienSo);
       if(vt!=-1)
       {
       $('#errorbienSo').removeClass('d-none');
       self.checkBienSo=true;
       }
       else
       {
       $('#errorbienSo').addClass('d-none');
       self.checkBienSo=false;
       }
     });
    $('#SDT_KH').keyup(function(){
    var SDT_KH= $('#SDT_KH').val();
      var vt=self.dataKhachHang.findIndex(i=>i.SDT_KH==SDT_KH);
      if(vt!=-1)
      {
        self.checkSdt=true;
      $('#errorSDT_KH').removeClass('d-none');

      }
      else
      {
      $('#errorSDT_KH').addClass('d-none');
      self.checkSdt=false;
      }
    });
    $('#khachhang tbody').on('click', '.thongtinxe', function () {
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
        }
        else
        {
          console.log(res.message);
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
    $('#btn_AddData').click(function(){
    var hideId=  $('#hideId').val();
    var maXe=$('#maXe').text();
    var bienSo=$('#bienSo').val();
    if(bienSo=='')
    {
    self.PNotify('Vui lòng nhập biển số xe','error');
    return;
    }
    if(self.checkSdt)
    {
      self.PNotify('Số điện thoại này đã tồn tại','error');
      return;
    }
    if(self.checkBienSo)
    {
      self.PNotify('Biển số xe này đã tồn tại','error');
      return;
    }

    var SOVIN=$('#SOVIN').val();
    var SOKHUNG=$('#SOKHUNG').val();
    var SOMAY=$('#SOMAY').val();
    var SO_KILOMET=$('#SO_KILOMET').val();
    var MAUXE=$('#MAUXE').val();
    var MAHANGXE=$('#MAHANGXE').val();
    var MADONGXE=$('#MADONGXE').val();
    if(MADONGXE=='')
    {
    self.PNotify('Vui lòng chọn dòng xe','error');
    return;
    }
    if(hideId=='0')
    {
      var MAKHACHHANG=$('#MAKHACHHANG').text();
      var TENKHACHHANG=$('#TENKHACHHANG').val();
      if(TENKHACHHANG=='')
      {
        self.PNotify('Vui lòng nhập tên khách hàng','error');
        return;
      }
      var kq= $('#NGAYSINH').val();
      var k= moment(kq,"DD-MM-YYYY");
      var NGAYSINH=moment(k).format("YYYY-MM-DD");
      var GIOITINH=$('#GIOITINH').val();
      var EMAIL_KH=$('#EMAIL_KH').val();
      var SDT_KH=$('#SDT_KH').val();
      if(SDT_KH=='')
      {
        self.PNotify('Vui lòng nhập số điện thoại khách hàng','error');
        return;
      }
      var DIACHI_KH=$('#DIACHI_KH').val();
      var dataKH={"MAKHACHHANG":MAKHACHHANG,"TENKHACHHANG":TENKHACHHANG,"NGAYSINH":NGAYSINH,"SDT_KH":SDT_KH,"EMAIL_KH":EMAIL_KH,"DIACHI_KH":DIACHI_KH,"GIOITINH":GIOITINH};
      console.log(dataKH);
      self.khachhangService.add(dataKH).subscribe(res=>{
        if(res.errorCode==0)
        {

          console.log(res);
          var dataXeKH={"maXe":maXe,"MADONGXE":MADONGXE,"bienSo":bienSo,"SOVIN":SOVIN,"SOKHUNG":SOKHUNG,"SOMAY":SOMAY,"SO_KILOMET":SO_KILOMET,"MAUXE":MAUXE,"MAKHACHHANG":MAKHACHHANG};
          console.log(dataXeKH);
          self.xeService.add(dataXeKH).subscribe(respone => {
            if(respone.errorCode==0)
            {
              self.firebaseService.database.ref().child('SDT').child(dataKH.SDT_KH).update({
                mes_baogiamoi:'',
                mes_baotri:'',
                mes_suachua:'',
                mes_congno:'',
                mes_nhanbaotri:'',
                mes_xacnhanxe:''
               });
              $('#exampleModal').modal('hide');
              self.PNotify('Thêm thông tin thành công !','success');
              self.loadTable();

            }
            else
            {
              $('#exampleModal').modal('hide');
              self.PNotify('Thêm thông tin không thành công !','error');
            }
           });
        }
        else
        console.log(res);
      });
    }
    else
    {
      var dataXeKH={"maXe":maXe,"MADONGXE":MADONGXE,"bienSo":bienSo,"SOVIN":SOVIN,"SOKHUNG":SOKHUNG,"SOMAY":SOMAY,"SO_KILOMET":SO_KILOMET,"MAUXE":MAUXE,"MAKHACHHANG":hideId};

        self.xeService.add(dataXeKH).subscribe(res => {
        if(res.errorCode==0)
        {
          $('#exampleModal').modal('hide');
          self.PNotify('Thêm Xe thành công !','success');
          var tr = td.closest('tr');
          var row = tbl.row( tr );
          child(hideId,row,tr);
        }
        else
        {
          $('#exampleModal').modal('hide');
          self.PNotify('Thêm Xe không thành công !','error');
        }
       });
    }
    });
   
    
    $('#thong_tin_khach_hang').select2();
    $('#id_dong_xe').select2();
    $('#ma_hang_xe').select2({
      placeholder: "Choose Automaker",
    });
    $('#MAHANGXE_ADD_DX').select2({
      placeholder: "Choose Automaker",
      allowClear: true
    });
    $('#ma_dong_xe').select2({
      placeholder: "Choose Vehicle",
      allowClear: true
      });
    $('#gioi_tinh').select2({
        placeholder: "Choose Gender",
        allowClear: true
    });
    $('select[name=ma_don_vi]').select2({
      placeholder: "Choose Unit Of Work",
      allowClear: true
    });
    $('select[name=nhan_vien]').select2({
      placeholder: "Choose Staff",
      allowClear: true
    });
    $('select[name=loai_phieu_kham]').select2({
      placeholder: "Choose Style Of Checklist",
      allowClear: true
    });
    $('#ngay_sinh').daterangepicker({
      singleDatePicker: true,
      startDate: new Date(),
      showDropdowns: true,
      autoUpdateInput: true,
      locale: {
        format: 'DD-MM-YYYY'
      }
    });
    $('#NGAYLAPPHIEU').daterangepicker({
      singleDatePicker: true,
      startDate: new Date(),
      showDropdowns: true,
      timePicker: true,
      timePicker24Hour: true,
      timePickerIncrement: 10,
      autoUpdateInput: true,
      locale: {
        format: 'DD-MM-YYYY HH:mm'
      }
    // startDate: '20-02-2018',
    // endDate: '27-02-2018'
    });
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
    self.createMaKhachHang();
    self.createMaXe();
      $('#exampleModal').modal('show');
    });

    /**
     * fn append data car by id_khach_hang
     * @param d 
     * @param id_khach_hang 
     * @returns table
     */
    function format( d, id_khach_hang ) {
      if( d.length != 0 ) {
        var s = '', j = 0;
        for(var i of d) {
          j++;
          s += '<tr id="' + i.id + '">' +
          '<td width="30px" style="text-align: center">' + j + '</td>' +
          '<td style="text-align: center">Liscense Plates: </td>' +
          '<td>' + i.bien_so + '</td>' +
          '<td width="30px" style="text-align: center"><i class="fa fa-eye thongtinxe pointer"title="View History Checklist"></i></td>'+
          '<td width="30px" style="text-align: center"><i class="fa fa-wrench lapphieukiemtra pointer"title="Create Checklist"></i></td>'+
          '<td width="30px" style="text-align: center"><i class="fa fa-list-ul lichsu pointer"title="View Car Info"></i></td>'+
          '</tr>';
          }
        var table = '<buton class="btn btn-example add_Xe" id="' + id_khach_hang + '">Add New Car</buton>' +
                    '<table cellpadding="5" cellspacing="0" border="0" style = "margin-top: 8px" class="table-bordered">'+
                    s+'</table>';
        return table;
      } else
        return  '<buton class="btn btn-example add_Xe" id="' + id_khach_hang + '">Add New Car</buton>' +
                '<table cellpadding="5" cellspacing="0" border="0" style = "margin-top: 8px" class="table-bordered">'+
                '<tr><td>Have no car !</td></td>' +
                '</table>';
    }

    /**
     * get thong tin xe cua khach hang
     * @param id_khach_hang 
     * @param row 
     * @param tr 
     */
    function child(id_khach_hang,row,tr) {
      self.xeService.getXe_KH(id_khach_hang).subscribe(res=>{
        if(res.errorCode==0) {
          row.child(format(res.data,id_khach_hang) ).show();
        }
      });
    }
    
    /**
     * click button view car list
     */
    $('#khachhang tbody').on('click', 'a.details-control', function () {
      td = this;
      var tr = td.closest('tr');
      var row = tbl.row( tr );
      var id = $(this).closest('tr').attr('id');
      if ( row.child.isShown() ) {
          // This row is already open - close it
          row.child.hide();
      }
      else {
          // Open this row
          child(id,row,tr);
      }
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
      } else {
        console.log(res.message);
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
      } else {
        console.log(res.errorMessage);
      }
    });
  }
  /**
   * fn get all data customer
   */
  private loadTable() {
    self.khachHangService.getAll().subscribe(res => {
      if (res.errorCode == 0) {
        tbl.clear().draw();
        tbl.rows.add(res.data); 
        tbl.columns.adjust().draw();
      } else {
        console.log(res.errorMessage);
      }
    });


    $('#khachhang tbody').on('click', '.add_Xe', function (e) {
      $('#lblxe').text('THÊM MỚI XE');
      var id_khach_hang = $(this).attr('id');
      //self.createMaXe();
      $('.modalkhachhang').addClass('d-none');
      // $('#hideId').val(id_khach_hang);
      // $('#exampleModal').modal('show');
   });
  }

  /**
   * fn get data lich su sua chua
   */
  private bindTableEvents()
  {
    // click button view history checklist
    $('a[data-group=grpLSSC]').off('click').click(function(){
      self.loadTableLSSC($(this).closest('tr').attr('id'));
    })
  }

  /**
   * fn get data hang xe
   */
  private getHangXe() {
    self.hangXeService.getAll().subscribe(res => {
      if(res.errorCode == 0) {
        self.dataHangXe = res.data;
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

  private getAllDongXe() {
    self.dongXeService.getAll().subscribe(res=> {
      if(res.errorCode == 0 ) {
        self.dataTTDongXe = res.data;
      }
    });
  }

  private getKhachHang() {
    self.khachHangService.getAll().subscribe(res=> {
      if(res.errorCode == 0 ) {
        self.dataKhachHang = res.data;
      }
      else
      console.log(res.message);
    });
  }
  
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
    
  private getDonVi() {
    self.donViLamViecService.getAll().subscribe(res=>{
      if(res.errorCode == 0) {
        self.dataDonVi = res.data;
      }
      else
        console.log(res.message);
    });
  }

  private getXe() {
    self.xeService.getAll().subscribe(res=> {
      if(res.errorCode==0) {
  
        self.dataXe=res.data;
      }
      else
        console.log(res.message);
    });
  }

  private createMaKhachHang() {
      self.khachhangService.createMaKhachHang().subscribe(res => {
        if(res.errorCode==0)
        {
          if(res.data[0].MAKHACHHANG)
          $('#MAKHACHHANG').text('KH'+res.data[0].MAKHACHHANG);
          else
          $('#MAKHACHHANG').text('KH000001');
        }
        else
        {
          $('#MAKHACHHANG').text('');
        }
      });
  }

  // private createMaXe()
  // {
  //     self.xeService.createMaXe().subscribe(res => {
  //       if(res.errorCode==0)
  //       {
  //         if(res.data[0].maXe)
  //         $('#maXe').text('XE'+res.data[0].maXe);
  //         else
  //         $('#maXe').text('XE000001');
  //       }
  //       else
  //       {
  //         $('#maXe').text('');
  //       }
  //     });
  // }

}
