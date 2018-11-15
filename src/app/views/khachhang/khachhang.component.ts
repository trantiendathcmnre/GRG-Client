import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { KhachHangService } from '../../services/khachhang.service';
import { TinhThanhPhoService } from '../../services/tinhthanhpho.service';
declare var $: any;
var self,tbl, inforData, dataKT, result_name, ngay_sinh, validator :any;
var id_tinh_thanh, id_quan_huyen = null;
var rowId: any = 0;
import * as moment from 'moment';

@Component({
  selector: 'app-khachhang',
  templateUrl: './khachhang.component.html',
  styleUrls: ['./khachhang.component.css']
})
export class KhachHangComponent implements OnInit {

  public dataTinhThanh:any = [];
  public dataQuanHuyen:any = [];
  public dataPhuongXa:any = [];
  public dataSend:any = [];
  constructor(
    private khachHangService: KhachHangService,
    private tinhThanhPhoService: TinhThanhPhoService 
  ) { }

  ngOnInit() {
    self = this;
    /**
     * loader display
     */
    $("#loader").css("display", "block");
     /* 
     * ***************************************
     *             Select 2                  *
     * ***************************************
     */
    // select 2 tinh thanh pho
    $('.tinhthanh').select2({
      placeholder: "Chọn Tỉnh/Thành phố",
    });
    // when select tinh thanh pho 
    $('.tinhthanh').on('select2:select', function (e) {
      id_tinh_thanh = $(this).val();
      self.dataQuanHuyen = [];
      self.getQuanHuyen(id_tinh_thanh);
    });
    // select 2 quan huyen
    $('.quanhuyen').select2({
      placeholder: "Chọn Quận/Huyện",
    });
    // when select tinh thanh pho 
    $('.quanhuyen').on('select2:select', function (e) {
      id_quan_huyen = $(this).val();
      self.dataPhuongXa = [];
      self.getPhuongXa(id_quan_huyen);
    });
    // selet 2 phuong xa
    $('.phuongxa').select2({
      placeholder: "Chọn Phường/Xã",
    });

    /* 
     * ***************************************
     *             Datetimepicker            *
     * ***************************************
     */
    // datetimepicker ngay sinh 
    $('#ngay_sinh').daterangepicker({
      singleDatePicker: true,
      showDropdowns: true,
      autoUpdateInput: true,
      locale: {
        format: 'DD-MM-YYYY'
      }
    });

    /**
     * radio button icheck
     */
    $('input[type="checkbox"].flat-red, input[type="radio"].flat-red').iCheck({
      checkboxClass: 'icheckbox_flat-green',
      radioClass   : 'iradio_flat-green'
    })
    /**
     * get data tinh thanh pho
     */
    self.getTinhThanh();

    $("#add").validate({
      debug: true,
      focusCleanup: true,
      rules:{
        TENKHACHHANG:
        {
        required:true,
        maxlength:100
        },
        SDT_KH:
        {
        required:true,
        maxlength:100
        }
      },
       messages:
       {
                  TENKHACHHANG:
                  {
                  required:"Tên khách hàng không được trống !",
                  maxlength:"Tên hãng xe chỉ tối đa 100 ký tự !"
                  },
                  SDT_KH:
                  {
                  required:"Số điện thoại khách hàng không được trống !",
                  maxlength:"Tên hãng xe chỉ tối đa 100 ký tự !"
                  }
      },
      highlight : function (element) {
        $(element).closest('.form-control').addClass('has-error');
         $(element).closest('.form-group').addClass('has-error');
      },
      unhighlight : function (element) {
        $(element).closest('.form-control').removeClass('has-error');
         $(element).closest('.form-group').removeClass('has-error');
      }
    });
    $('#add input').bind('keyup blur change', function () {
      var Id=$('#hideId').val();
      if(Id==0)
      {
        if ($('#add').validate().checkForm() ) {  
          name();
          if(self.result_check)
            $('#btn_Luu').removeClass('button_disabled').prop('disabled', false); 
            else
            $('#btn_Luu').removeClass('button_disabled').prop('disabled', true); 
          
        } else {
          $('#btn_Luu').addClass('button_disabled').prop('disabled', true);   
        }
      }
      else
      {
        if ($('#add').validate().checkForm() ) {   
           name();
           if(self.result_check)
            $('#btn_Luu').removeClass('button_disabled').prop('disabled', false); 
            else
            $('#btn_Luu').removeClass('button_disabled').prop('disabled', true);
          }   
          else
          {
            $('#btn_Luu').removeClass('button_disabled').prop('disabled', true); 
          }
        }
      
     });
     var nameOLD;
     function name()
     {
      var Id=$('#hideId').val();
       var input_name_ITK = $("#SDT_KH").val().trim();
       self.result_name = false;
         $("#unname_ITK").show();
         console.log(input_name_ITK);
         console.log(Id);
         console.log(self.dataKT);
       $.each( self.dataKT, function( key, value ) {
        if((input_name_ITK==value.SDT_KH && value.SDT_KH!=nameOLD && Id!='0' )||(input_name_ITK==value.SDT_KH && Id=='0'))
         {    
           self.result_name = true;        
         }
       });
       if(self.result_name)
       {
         $("#unname_ITK").html("<span class='not-exists'>Số điện thoại này đã tồn tại.</span>");
         self.result_check = false;
       }
       else
       {
         $("#unname_ITK").html("");
         self.result_check = true;
       }
     }
     $("#SDT_KH").keyup(function(){
      name();
    });
    //change text without input
    $("#SDT_KH").change(function(){
      name();
    });
    $('#exampleModal').modal({show: false, backdrop: 'static', keyboard: false }).on('show.bs.modal',function(){
      rowId = $('#hideId').val();
      if( rowId == '0') {
        self.createMaKhachHang();
      } else {
        $('.modal-title').html('Cập nhật thông tin ');
        self.setDataKhachHang(
          self.inforData.ma, 
          self.inforData.email, 
          self.inforData.ten, 
          self.inforData.dia_chi, 
          self.inforData.ngay_sinh, 
          self.inforData.sdt, 
          self.inforData.gioi_tinh,
          self.inforData.tinh_thanh,
          self.inforData.quan_huyen,
          self.inforData.phuong_xa
        );
      }
    });
      
    /**
     * table thong tin khach hang
     */
    tbl = $("#khachhang").DataTable({
      "ordering": false,
      "info": false,
      aLengthMenu: [
        [10, 25, 50, 100, -1],
        [10, 25, 50, 100, "Tất cả"]
      ],
      iDisplayLength: 10,
      aaData: null,
      rowId: "id",
      language: 
      {
            "sProcessing":   "Đang xử lý...",
            "sLengthMenu":   "Xem _MENU_ mục",
            "sZeroRecords":  "Không tìm thấy dòng nào phù hợp",
            "sInfo":         "Đang xem _START_ đến _END_ trong tổng số _TOTAL_ mục",
            "sInfoEmpty":    "Đang xem 0 đến 0 trong tổng số 0 mục",
            "sInfoFiltered": "(được lọc từ _MAX_ mục)",
            "sInfoPostFix":  "",
            "sSearch":       "Tìm:",
            "sUrl":          "",
            "oPaginate": {
                "sFirst":    "Đầu",
                "sPrevious": "Trước",
                "sNext":     "Tiếp",
                "sLast":     "Cuối"
            }
      },
      columns: [
        { data: null ,className: "text-center", width: "20px"},
        { data: "ma" ,className: "text-center"}, 
        { data: "ten" },
        { data: "ngay_sinh",render:function(data){
          data = data == null ? 'N/A' : moment(data).format( "YYYY-MM-DD");
          return data;
        }}, 
        {data: "gioi_tinh",render:function(data){
          data = data == '0' ? 'Nữ' : 'Nam'
          return data;
        }},
        { data: "sdt" }, 
        { data: "email" }, 
        { data: "dia_chi" }, 
        {data: null,className: "text-center" ,render: function (data, type, row){
          return '<a class="btn btn-primary-action m-r-xs" data-group="grpEdit" title="Cập nhật thông tin khách hàng" ><i class="fa fa-edit"></i></a>';
        }}
      ],
      initComplete: function (settings, json) {
        self.loadReader();
      },
      drawCallback: function( settings ) {
        self.bindTableEvents();
      }
    });
    tbl.on('order.dt search.dt', function(){
      tbl.column(0, {search: 'applied', order: 'applied'}).nodes().each(function(cell,i){
        cell.innerHTML = i + 1;
      })
    }).draw();


    /***
     * save data 
     */
    $('#save-thong-tin-khach-hang').off('click').click(function() {
      rowId = $('hideId').val();
      self.getDataKhachHang();
      if( rowId == '0') {
        // add khach hang
      } else {
        // update khach hang
      }
    });
  }

  /**
   * fn load data khach hang 
   */
  private loadReader() {
    self.khachHangService.getAll().subscribe(res => {
      if (res.errorCode == 0) {
        tbl.clear().draw();
        tbl.rows.add(res.data);
        self.dataKT = res.data;
        tbl.columns.adjust().draw();
        $("#loader").css("display", "none");
      } else {
        console.log(res.errorMessage);
        $("#loader").css("display", "none");
      }
    });
  }

  /**
   * bind table event
   */
  private bindTableEvents() {
    //Xu ly update
    $('a[data-group=grpEdit]').off('click').click(function(){
      rowId = $(this).closest('tr').attr('id');
      $('#hideId').val(rowId);
      self.getKhachHangById(rowId);
    })
  }

  /**
   * fn get data khach hang by id
   * @param id_khach_hang 
   */
  private getKhachHangById(id_khach_hang) {
    self.khachHangService.get(id_khach_hang).subscribe(res=> {
      if(res.errorCode >= 5) {
        console.log(res);
        self.router.navigate(['/']);
        $("#loader").css("display", "none");
      }
      else {
        if(res.errorCode == 0) {
          self.inforData = res.data[0];
          $('#exampleModal').modal('show');
          $("#loader").css("display", "none");
        }
      }
    });
  }

  /**
   * fn create new customer code
   */
  private createMaKhachHang() {
    self.khachHangService.generate().subscribe(res => {
      if(res.errorCode == 0 ) {
        $('#ma_khach_hang').val(res.data).prop('readonly', true);
      }
      else {
        $('#ma_khach_hang').val('').prop('readonly', false);
      }
    });
  }

  /**
   * fn get all data tinh thanh pho viet nam
   */
  private getTinhThanh() {
    self.tinhThanhPhoService.getTinhThanhJson().subscribe(res => {
      self.dataTinhThanh = res.data;
    });
  }

  /**
   * fn get quan huyen theo tinh thanh 
   * @param id_tinh_thanh 
   */
  private getQuanHuyen(id_tinh_thanh) {
    self.tinhThanhPhoService.getQuanHuyenJson(id_tinh_thanh).subscribe(res => {
      res.data.forEach(element => {
        if(element.parent_code == id_tinh_thanh ){
          self.dataQuanHuyen.push(element)
        } else 
          return;
      });
    });
    $('select[name=quanhuyen]').prop('disabled', false);
  }

  /**
   * fn get data phuong xa theo quan huyen 
   * @param id_quan_huyen 
   */
  private getPhuongXa(id_quan_huyen) {
    self.tinhThanhPhoService.getQuanHuyenJson(id_quan_huyen).subscribe(res => {
      res.data.forEach(element => {
        if(element.parent_code == id_quan_huyen ){
          self.dataPhuongXa.push(element)
        } else 
          return;
      });
    });
    $('select[name=phuongxa]').prop('disabled', false);
  }

  /**
   * fn append data khach hang
   * @param ma 
   * @param email 
   * @param ten 
   * @param dia_chi 
   * @param ngay_sinh 
   * @param sdt 
   * @param gt
   */
  private setDataKhachHang(ma, email, ten, dia_chi, ngay_sinh, sdt, gt, tinh, quan, xa) {
    $('#ma_khach_hang').val(ma);
    $('#email').val(email);
    $('#ten_khach_hang').val(ten);
    $('#dia_chi').val(dia_chi);
    $('#ngay_sinh').val(ngay_sinh);
    $('#sdt').val(sdt);
    if( gt = 0) {
      $('#radio_nu').iCheck('check');
    } else {
      $('#radio_nu').iCheck('check');
    }
    $('select[name=tinhthanh]').val(tinh).trigger('change');
    $('select[name=quanhuyen]').val(quan).trigger('change');
    $('select[name=phuongxa]').val(xa).trigger('change');
  }

  /**
   * fn get data khach hang
   */
  private getDataKhachHang() {
    self.dataSend = {
      "ma": $('#ma_khach_hang').val(),
      "ten" : $('#ten_khach_hang').val(),
      "gioi_tinh" : $('input[name=gioi_tinh]').val(),
      "ngay_sinh" : $('#ngay_sinh').val(),
      "dia_chi" : $('#dia_chi').val(),
      "sdt" : $('#sdt').val(),
      "email" : $('#email').val(),
      "tinh_thanh" : $('.tinhthanh').val(),
      "quan_huyen" : $('.quanhuyen').val(),
      "phuong_xa" : $('.phuongxa').val()
    };
    debugger
    return self.dataSend;
  }


}
