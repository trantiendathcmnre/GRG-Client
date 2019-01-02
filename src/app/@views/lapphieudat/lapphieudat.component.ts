import { Component, OnInit } from '@angular/core';
import {Http,Headers,Response, RequestOptions} from '@angular/http';
import { LapPhieuDatService } from '../../@services/lapphieudat.service';
import { HangXeService } from '../../@services/hangxe.service';
import { DongXeService } from '../../@services/dongxe.service';
import { DanhMucPhuTungService } from '../../@services/danhmucphutung.service';
import { PhuTungService } from '../../@services/phutung.service';
import { NhaCungCapService } from '../../@services/nhacungcap.service';
import { ApisService } from '../../@services/apis.service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { Router } from '@angular/router';
import * as moment from 'moment';

declare var $, event, toastr: any;
var self: any;
var tbl , tbl1, tbl2: any;
var check = true;
@Component({
  selector: 'app-lapphieudat',
  templateUrl: './lapphieudat.component.html',
  styleUrls: ['./lapphieudat.component.css']
})
export class LapPhieuDatComponent implements OnInit {

  d: any = [ ];
  dataNCC: any = [ ];
  dataPhuTung: any = [ ];
  dataCT_PD: any = [ ];
  data: any = {"data": [ ],"phieu":{}};
  dataHangXe: any = [ ];
  dataDongXe: any = [ ];
  dataDMPhuTung: any = [ ];
  ACCOUNT: string;
  create_order = 'Create Order';
  home = 'Home';
  orders_management = 'Orders Management';
  btn_new = 'Add New Order';
  btn_save = 'Save Order';
  code_order = 'Order Code';
  provider = 'Providers';
  please_select = 'Please Select';
  note_of_order = 'Notes of Order';
  created_at = 'Created at';
  code_accessary = 'Accessary Code';
  name_accessary = 'Accessary Name';
  unit_of_calculations = 'Unit of Calculations';
  amount = 'Amount';
  action = 'Action';
  inventory = 'Inventory';
  choose_accessary = 'Choose Accesary To Order';
  accessary_list = 'Accesary List';
  automaker = 'Automaker';
  vehicle = 'Vehicle';
  category_of_accesary = 'Category of Accessary';
  btn_search = 'Search';
  save = 'Save';
  cancel = 'Cancel';
  origin = 'Origin';
  image = 'Image';
  code_generate: string;

  constructor(
      private router:Router,
      private nhaCungCapService: NhaCungCapService,
      private phuTungService: PhuTungService,
      private lapPhieuDatService: LapPhieuDatService,
      private http: Http,
      private hangXeService: HangXeService,
      private dongXeService: DongXeService,
      private danhMucPhuTungService: DanhMucPhuTungService,
      private apisService: ApisService
  ) {
    toastr.options = {
      "positionClass": "toast-top-center"
    };
   }

  ngOnInit() {
    self = this;
    $("#loader").css("display", "block");
    $('#datepicker').daterangepicker({
      singleDatePicker: true,
      // autoApply: false,
      locale: {
        format: 'YYYY-MM-DD HH:mm:ss',   
      },
      timePicker: true,
      timePicker24Hour: true,
      timePickerSeconds:true
    });
    
    
    $(".select2").select2({
      placeholder: {
        id: '0', // the value of the option
        text: 'Please select'
      }
    });
    self.getDataHangXe();
    self.getDataDongXe();
    self.getDataDMPhuTung();
    self.getEnableNhaCungCap();

    $('#nha_cung_cap').on('select2:select', function (e) {
      tbl1.clear().draw();
    });

    $('#btn_phu_tung_dat').click(function(){
      $("#loader").css("display", "block");
      var check = true;
      var so_luong_dat = $('#so_luong_dat').val();
      var so_luong_ton = $('#so_luong_ton').val();
      var rowId = $('#id_phu_tung').val();

      // console.log(Number(so_luong_dat.trim()), Number(so_luong_ton));
      if( so_luong_dat.trim() == '' ) {
        $("#loader").css("display", "none");
        toastr.error('Please input amount.', 'Error!');
        return false;
      }
      if( Number(so_luong_dat) == 0 ) {
        $("#loader").css("display", "none");
        toastr.error('Amount has more than 0', 'Error!');
        return false;
      }
      
      if( Number(so_luong_dat) > Number(so_luong_ton) ) {
        $("#loader").css("display", "none");
        toastr.error('Amount can not more than inventory', 'Error!');
        return false;
      }
      
      tbl1.rows().eq(0).each( function ( index ) {
        var checkRow = tbl1.cell(index,1).data();
        var soLuongOLD = tbl1.cell(index, 4).nodes()[0].textContent;
        var tong = Number(so_luong_dat) + Number(soLuongOLD);
        if( checkRow == rowId ) {
          if( tong > Number(so_luong_ton) ) {
            toastr.error('Amount can not more than inventory', 'Error!');
            check = false;
            $("#loader").css("display", "none");
            return false;
          }
          tbl1.cell(index, 4).nodes()[0].textContent = tong;
          $('.sh').addClass('d-none');
          $('#so_luong_dat').val('');
          check = false;
        }
        $("#loader").css("display", "none");
        return true;
      });

      if( !!check ) {
        self.phuTungService.get(rowId).subscribe(res=> {
          if( res.errorCode == 0 ) {
            tbl1.row.add(
              [
                '',
                res.data[0].id,
                res.data[0].ten,
                res.data[0].ten_don_vi_tinh,
                so_luong_dat,
                '<a class="btn btn-primary-action m-r-xs" data-group="grpDelete" title="Delete Automaker" ><i class="fa fa-trash"></i></a>'
              ]
            ).draw(false);
            $('.sh').addClass('d-none');
            $('#so_luong_dat').val('');
            $("#loader").css("display", "none");
          } else {
            console.log(res);
            $("#loader").css("display", "none");
            //self.router.navigate(['/']);
          }
        });
      }
    });

    $('#btn_search').click(function(){
      self.loadReader();
    });

    // get dong xe thuoc hang xe tren select
    $('#automaker').on('select2:select', function (e) {
      var id_hang_xe = e.params.data.id;
        self.dongXeService.search(id_hang_xe).subscribe(res=>{
          if(res.errorCode == 0) {
            self.dataDongXe = res.data;
          } else {
            console.log(res);
            self.router.navigate(['/']);
          }
        });
    });
  
    $('#choose_accessary').on('click', function () {
      $("#loader").css("display", "block");
      var id_nha_cung_cap = $('#nha_cung_cap').val();
      if( id_nha_cung_cap == '0') {
        toastr.error('Please choose the provider.', 'Error!');
        $("#loader").css("display", "none");
        return false;
      }
      self.loadReader();
      $('#modal-default').modal('show');
      $("#loader").css("display", "none");
    });

    tbl1 = $("#chi_tiet_phieu_dat_table").DataTable({
      "ordering": false,
      "info": false,
      "searching": false,
      "paging":   false,
      language:{
        "sZeroRecords":  "Please choose accessary need order"
      },
      initComplete: function(setting, json){
        //$("#loader").css("display", "none");
      },
      drawCallback: function( settings ) {
        self.Events();
      },
      rowCallback: function(row, data, index) {
        tbl1.cell(index,0).nodes()[0].textContent = index + 1;
      }
    });
    
    tbl2 = $('#phutungthem').DataTable({
      "ordering": false,
      "info": false,
      "searching": true,
      bLengthChange : false,
      language:{
        "sZeroRecords":  "Please choose accessary need order"
      },
      rowId: "id_phu_tung",
      columns:[
        { data: null, className: "text-center" },
        { data: "id_phu_tung" },
        { data: "ten_phu_tung" },
        { data: "ten_danh_muc_phu_tung" },
        { data: "ten_dong_xe" },
        { data: "ten_hang_xe" },
        // {data: "xuat_xu"},
        { data: "anh" },        
        { data: "so_luong_ton" },
        { data: null, className: "text-center",render: function ( data, type, row ){
          return '<btn data-group="grpSelectPhuTung" class="btn btn-example pointer">Choose</btn>';
        }}
      ],
      //load data
      initComplete: function(setting, json){
        self.loadReader();
      },
      drawCallback: function(settings){
        self.bindTableEventsPhuTungThem();
      },
      rowCallback: function(row, data, index) {
        tbl2.cell(index,0).nodes()[0].textContent = index + 1;
      }
    });

    $('#btn_save').click(function(){
      //thong tin phieu dat hang
      self.data = { "data":[], "phieu":{} }
      var id_nha_cung_cap = $('#nha_cung_cap').val();
      if( id_nha_cung_cap == '') {
        return false;
      }
      var ma = $('#ma').val();
      var mo_ta  = $('#mo_ta').val();
      var created_at = $('#datepicker').val();
      self.data.phieu = {
          "ma": ma,
          "ngay_lap": created_at,
          "id_nha_cung_cap": id_nha_cung_cap,
          "nguoi_lap": "",
          "ghi_chu": mo_ta
      };
      //chi tiet phu tung dat hang
      tbl1.rows().eq(0).each( function ( index ) {
        var id_phu_tung = tbl1.cell(index,1).data();
        var so_luong_dat = Number(tbl1.cell(index,4).nodes()[0].textContent);
        var item = {
            "id_phu_tung": id_phu_tung,
            "so_luong_dat": so_luong_dat
        };
        self.data.data.push(item);
      });

      if(self.data.data.length==0) {
        toastr.error('Please choose the accessary to order.', 'Error!');
        return;
      }
  
      self.lapPhieuDatService.add(self.data).subscribe(res => {
          if( res.errorCode != 0 ) {
            console.log(res);
            toastr.error('Create order failed.', 'Error!');
            // self.router.navigate(['/']);
          }
          else {
            $('#nha_cung_cap').val('').change();
            tbl1.clear().draw();
            self.createCode();
            toastr.success('Thêm thành công', 'Thành công!');
          }
      });
    });

    self.createCode();
  }
  
  private update_STT()
  {
    tbl1.rows().eq(0).each( function ( index ) {
      tbl1
       .cell( index,0 ) // note that you could actually pass in 'this' as the row selector!
       .data(index+1).draw();
    });
  }

  private getDataHangXe()
  {
    self.hangXeService.getAll().subscribe(res=>{
      if(res.errorCode>=5)
      {
        console.log(res);
        self.router.navigate(['/']);
      }
      else
      {
        if(res.errorCode==0)
        {
        self.dataHangXe=res.data;
        }
      }
    });
  }

  private getDataDongXe() {
    self.dongXeService.getAll().subscribe(res=>{
      if(res.errorCode == 0) {
        self.dataDongXe = res.data;
      } else {
        console.log(res);
        self.router.navigate(['/']);
      }
    });
  }

  private getDataDMPhuTung()
  {
    self.danhMucPhuTungService.getAll().subscribe(res=>{
      if(res.errorCode>=5)
      {
        console.log(res);
        self.router.navigate(['/']);
      }
      else
      {
        if(res.errorCode==0)
        {
        self.dataDMPhuTung=res.data;
        }
      }
    });
  }

  private loadReader() {
    var id_hang_xe = $('#automaker').val();
    var id_dong_xe = $('#vehicle').val();
    var id_danh_muc_phu_tung = $('#category_of_accesary').val();
    var id_nha_cung_cap = $('#nha_cung_cap').val();
    
    self.phuTungService.searchPhuTung(id_hang_xe, id_dong_xe, id_danh_muc_phu_tung, id_nha_cung_cap).subscribe(res=>{
      if( res.errorCode >= 5 ) {
        console.log(res);
        self.router.navigate(['/']);
      }
      else {
        if(res.errorCode==0) {
          tbl2.clear().draw();
          tbl2.rows.add(res.data); 
          tbl2.columns.adjust().draw();
        }
      }
    });
  }

  private bindTableEventsPhuTungThem() {
    $('btn[data-group=grpSelectPhuTung]').off('click').click(function(){
      var rowId = $(this).closest('tr').attr('id');
      self.phuTungService.get(rowId).subscribe( res=> {
        if(res.errorCode == 0 ) {
          $('#id_phu_tung').val(res.data[0].id);
          $('#ten_phu_tung').val(res.data[0].ten);
          $('#so_luong_ton').val(res.data[0].so_luong_ton);
          $('#so_luong_dat').val('');
          
          $('.sh').removeClass('d-none');
        }
        else
          console.log(res.message);
        $('#modal-default').modal('hide');

      });
    });
  }

  private Events() {
    $('a[data-group=grpDelete]').off('click').click(function(){
      tbl1.row( $(this).parents('tr') ).remove().draw();
    });
  }

  private getEnableNhaCungCap() {
    self.nhaCungCapService.getEnable().subscribe(res=> {
      
      if(res.errorCode >= 5) {
        console.log(res);
        // self.router.navigate(['/']);
      } else {
        self.dataNCC = res.data;
        $("#loader").css("display", "none");
      }
    });
  }
  
  private isNumberKey(evt) {
    var charCode = (evt.which) ? evt.which : event.keyCode
    if (charCode > 31 && (charCode < 48 || charCode > 57))
      return false;
    else
      return true;
  }

  private createCode() {
    self.lapPhieuDatService.generate().subscribe(res=> {
      if(res.errorCode >= 5) {
        console.log(res);
        // self.router.navigate(['/']);
      } else {
        self.code_generate = res.data;
      }
    });
  }
}
