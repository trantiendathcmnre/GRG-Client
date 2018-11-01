import { Component, OnInit } from '@angular/core';
import {Http,Headers,Response, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { LapPhieuDatService } from '../../services/lapphieudat.service';
import { HangXeService } from '../../services/hangxe.service';
import { DongXeService } from '../../services/dongxe.service';
import { DanhMucPhuTungService } from '../../services/danhmucphutung.service';
import { PhuTungService } from '../../services/phutung.service';
import { NhaCungCapService } from '../../services/nhacungcap.service';
import { ApisService } from '../../services/apis.service';
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
    //Date picker
    $('#datepicker').datepicker({
      autoclose: true,
      todayHighlight: true,
      setDate: 'today'
    });
    self.code_generate = self.apisService.generateID(16);
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
      var check = true;
      var so_luong_dat = $('#so_luong_dat').val();
      var so_luong_ton = $('#so_luong_ton').html();
      // console.log(Number(so_luong_dat.trim()), Number(so_luong_ton));
      if( so_luong_dat.trim() == '' ) {
        toastr.error('Please input amount.', 'Error!');
        return false;
      }
      if( Number(so_luong_dat.trim()) == 0 ) {
        toastr.error('Amount has more than 0', 'Error!');
        return false;
      }
      
      if( Number(so_luong_dat.trim()) > Number(so_luong_ton) ) {
        toastr.error('Amount can not more than inventory', 'Error!');
        return false;
      }
      var rowId = Number($('#id_phu_tung').text());
      tbl1.rows().eq(0).each( function ( index ) {
        var s = tbl1.cell(index,1).data();
        var row = tbl1.row( index );
        if( s == rowId ) {
          var soLuongOLD = tbl1.cell(index, 4).nodes()[0].textContent;
          tbl1.cell(index,4).nodes()[0].textContent = Number(so_luong_dat) + Number(soLuongOLD);
          check = false;
          $('.sh').addClass('d-none');
          return;
        }
        
      });

      if( !!check ) {
        self.phuTungService.get(rowId).subscribe(res=> {
          debugger
          if( res.errorCode >= 5 ) {
            tbl1.row.add(
              [
                '',
                res.data[0].id_phu_tung,
                res.data[0].ten_phu_tung,
                res.data[0].TENDVT,
                Number(so_luong_dat),
                '<button type="button" data-group="grpDelete" class="btn btn-outline-danger" data-dismiss="modal">Xóa</button>'
              ]
            ).draw(false);
            $('.sh').addClass('d-none');
            $('#SOLUONGDAT').val('');
          } else {
            console.log(res);
            self.router.navigate(['/']);
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
      var id_nha_cung_cap = $('#nha_cung_cap').val();
      if( id_nha_cung_cap == '0') {
        toastr.error('Please choose the provider.', 'Error!');
        return false;
      }
      self.loadReader();
      $('#modal-default').modal('show');
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
        $("#loader").css("display", "none");
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

    $('#btn_Luu').click(function(){
      //thong tin phieu dat hang
      self.data = { "data":[], "phieu":{} }
      var id_nha_cung_cap = $('select[name=MANCC]').val();
      if( id_nha_cung_cap == '') {
        self.PNotify('Vui lòng chọn nhà cung cấp','error');
        return false;
      }
      var MAPHIEUDATHANG=$('#MAPHIEUDATHANG').val();
      var GHICHU_PD=$('#GHICHU_PD').val();
      var kq= $('#NgayLapPD').val();
      var k= moment(kq,"DD-MM-YYYY HH:mm");
      var NGAYLAPPD=moment(k).format("YYYY-MM-DD HH:mm");
      self.data.phieu={"MAPHIEUDATHANG":MAPHIEUDATHANG,"NGAYLAPPD":NGAYLAPPD,"id_nha_cung_cap":id_nha_cung_cap,"NGUOILAPPHIEUDAT":self.ACCOUNT,"GHICHU_PD":GHICHU_PD};
      //chi tiet phu tung dat hang
      tbl1.rows().eq(0).each( function ( index ) {
        var id_phu_tung=tbl1.cell(index,1).data();
        var SOLUONGDAT=Number(tbl1.cell(index,4).nodes()[0].textContent);
        var item={"id_phu_tung":id_phu_tung,"SOLUONGDAT":SOLUONGDAT};
        self.data.data.push(item);
        } );
        if(self.data.data.length==0) {
        self.PNotify('Vui lòng chọn phụ tùng để đặt hàng','error');
        return;
        }
        //dua du lieu xuong server
        console.log(self.data);
        self.lapPhieuDatService.add(self.data).subscribe(res => {
          if(res.errorCode>=5)
          {
            console.log(res);
            self.router.navigate(['/']);
          }
          else
          {
            if(res.errorCode==0)
            {
              // self.PNotify('Lập phiếu thành công !\nMã Phiếu:'+res.data.MAPHIEUDATHANG,'success');
              
              $('select[name=MANCC]').val('').change();
              tbl1.clear().draw();
              self.createMaPhieuDat();

            }
            else
            {
              self.PNotify('Lập phiếu không thành công !','error');
            }
          }
      });
      });
    }
  
  private update_STT()
  {
    tbl1.rows().eq(0).each( function ( index ) {
      tbl1
       .cell( index,0 ) // note that you could actually pass in 'this' as the row selector!
       .data(index+1).draw();
    });
  }
  
  private createMaPhieuDat()
  {
    self.lapPhieuDatService.createMaPhieuDat().subscribe(res => {
      if(res.errorCode>=5)
      {
        console.log(res);
        self.router.navigate(['/']);
      }
      else
      {
        if(res.errorCode==0)
        {
          //console.log(res);
          if(res.data[0].MAPHIEUDAT)
          $('#MAPHIEUDATHANG').val('PD'+res.data[0].MAPHIEUDAT);
          else
          $('#MAPHIEUDATHANG').val('PD000001');
        }
        else
        {
          $('#MAPHIEUDATHANG').val('');
        }
      }
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
          $('#id_phu_tung').html(res.data[0].id_danh_muc_phu_tung);
          $('#ten_phu_tung').html(res.data[0].ten);
          $('#so_luong_ton').html(res.data[0].so_luong_ton);
          $('#so_luong_dat').val('');
          $('.sh').removeClass('d-none');
        }
        else
          console.log(res.message);
        $('#modelDSPhuTung').modal('hide');

      });
    });
  }

  private Events() {
    $('button[data-group=grpDelete]').off('click').click(function(){
      tbl1.row( $(this).parents('tr') ).remove().draw();
    });
  }

  private getEnableNhaCungCap() {
    self.nhaCungCapService.getEnable().subscribe(res=>{
      
      if(res.errorCode >= 5) {
        console.log(res);
        // self.router.navigate(['/']);
      } else {
        self.dataNCC = res.data;
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
}
