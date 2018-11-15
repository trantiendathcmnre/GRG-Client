import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { KhachHangService } from '../../services/khachhang.service';
declare var $: any;
var self,tbl, inforData, dataKT, result_name, ngay_sinh, validator :any;
var rowId: any = 0;
import * as moment from 'moment';

@Component({
  selector: 'app-khachhang',
  templateUrl: './khachhang.component.html',
  styleUrls: ['./khachhang.component.css']
})
export class KhachHangComponent implements OnInit {

  constructor(private khachHangService: KhachHangService ) { }

  ngOnInit() {
    self = this;
    $("#loader").css("display", "block");
    $('.select2').select2();
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
      if(rowId == '0') {
        validator = $("#add").validate();
        validator.resetForm();
        $('.form-control').removeClass('has-error');
        $('.form-group').removeClass('has-error');
        $("#unname_ITK").hide();
  
       // $('#MAKHACHHANG').val("");
        $("#MAKHACHHANG").prop('disabled', false);
        $('#TENKHACHHANG').val("");
        $('#SDT_KH').val("");
        $('#DIACHI_KH').val("");
        $('#EMAIL_KH').val("");
      }
       else
        {
          var validator = $("#add").validate();
          validator.resetForm();
          console.log(self.inforData);
          $('.form-control').removeClass('has-error');
           $('.form-group').removeClass('has-error');
           $("#unname_ITK").hide();
          $('#MAKHACHHANG').text(self.inforData.MAKHACHHANG);
          $("#MAKHACHHANG").prop('disabled', true);
          $('#TENKHACHHANG').val(self.inforData.TENKHACHHANG);
          $('#DIACHI_KH').val(self.inforData.DIACHI_KH);
          $('#GIOITINH').val(self.inforData.GIOITINH).change();
          $('#EMAIL_KH').val(self.inforData.EMAIL_KH);
          $('#SDT_KH').val(self.inforData.SDT_KH);
          nameOLD=$('#SDT_KH').val();
        }
    });
    $('#btn_Add').click(function(){
      $('#hideId').val('0');
      self.createMaKhachHang();
      $('#btn_Luu').addClass('button_disabled').prop('disabled', true);
    });
    //btn-Luu
    $('#btn_Luu').click(function(){
     var MAKHACHHANG =$('#MAKHACHHANG').text();
     var TENKHACHHANG=$('#TENKHACHHANG').val();
     var GIOITINH=$('#GIOITINH').val();
     var kq= $('#NGAYSINH').val();
     var k= moment(kq,"DD-MM-YYYY");
     var NGAYSINH=moment(k).format("YYYY-MM-DD");
     var DIACHI_KH=$('#DIACHI_KH').val();
     var SDT_KH=$('#SDT_KH').val();
     var EMAIL_KH=$('#EMAIL_KH').val();
     var Id=$('#hideId').val();
     //Xu Ly Du Lieu
     var data={
      "MAKHACHHANG":MAKHACHHANG,
      "TENKHACHHANG":TENKHACHHANG,
      "GIOITINH":GIOITINH,
      "NGAYSINH":NGAYSINH,
      "DIACHI_KH":DIACHI_KH,
      "EMAIL_KH":EMAIL_KH,
      "SDT_KH":SDT_KH
     }
     if(Id=='0')
     {
        self.khachhangService.add(data).subscribe(res=>{
          if(res.errorCode>=5)
          {
            console.log(res);
            self.router.navigate(['/']);
          }
          else
          {
                if(res.errorCode == 0)
              {
                  self.PNotify('Thêm Thành Công','success');
                  self.loadReader();
              }
              else
              {
                self.PNotify('Thêm Không Thành Công','error');
                self.loadReader();
              }
              $('#exampleModal').modal('hide');
        }
          });
    }
    else
    {
      self.khachhangService.update(data).subscribe(res=>{
        if(res.errorCode>=5)
        {
          console.log(res);
          self.router.navigate(['/']);
        }
        else
        {
            if(res.errorCode == 0)
            {
              $('#exampleModal').modal('hide');
                self.PNotify('Sửa Thành Công','success');
                self.loadReader();
            }
            else
            {
              $('#exampleModal').modal('hide');
                self.PNotify('Sửa Không Thành Công','error');
                self.loadReader();
            }
          }
      });    
    }
    });
    $('#NGAYSINH').daterangepicker({
      singleDatePicker: true,
      startDate: new Date(),
      showDropdowns: true,
      autoUpdateInput: true,
      locale: {
        format: 'DD-MM-YYYY'
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
          data = data == null ? 'N/A' : moment(data, "YYYY-MM-DD");
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
  }
  private loadReader()
  {
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
  private createMaKhachHang()
{
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
      $('#exampleModal').modal('show');
    });
  }
  private bindTableEvents()
    {
      //Xu ly update
        $('a[data-group=grpEdit]').off('click').click(function(){
          rowId = $(this).closest('tr').attr('id');
          $('#hideId').val(rowId);
            self.khachHangService.get(rowId).subscribe(res=>{
              if(res.errorCode >= 5) {
                console.log(res);
                self.router.navigate(['/']);
                $("#loader").css("display", "none");
              }
              else {
                if(res.errorCode == 0) {
                  self.inforData = res.data;
                  $('#exampleModal').modal('show');
                  $("#loader").css("display", "none");
                }
              }
            });
        })
        //Xu lý xóa
        // $('i[data-group=grpDelete]').off('click').click(function(){
        //   var rowId=$(this).closest('tr').attr('id');
        //   $.confirm({
        //     title: 'Thông báo !',
        //     content: 'Bạn có muốn xóa nhà khách hàng này không ?',
        //     type: 'red',
        //     typeAnimated: true,
        //     buttons: {
        //         tryAgain: {
        //             text: 'Có',
        //             btnClass: 'btn-danger',
        //             action: function(){
        //               self.hangxeService.delete(rowId).subscribe(res=>{
        //                 console.log(res);
        //                 if(res.errorCode>=5)
        //                 {
        //                   console.log(res);
        //                   self.router.navigate(['/']);
        //                 }
        //                 else
        //                 {
        //                     if(res.errorCode==0)
        //                     {
        //                       self.loadReader();
        //                       self.PNotify('Xóa Thành Công','success');
        //                     }
        //                     else
        //                     {
        //                       self.PNotify('Hãng xe đang sử dụng không thể xóa !','error');
        //                     }
        //                 }
        //               });        
        //             }
        //         },
        //         close:{
        //           text: "Không",
        //           btnClass: 'btn-primary'
        //         }
        //     }
      //   });
      // });
    }
   
    private createMaHangXe()
    {
      self.hangxeService.createMaHangXe().subscribe(res => {
        if(res.errorCode>=5)
        {
          console.log(res);
          self.router.navigate(['/']);
        }
        else
        {
          console.log('alo');
          if(res.errorCode==0)
          {
            if(res.data[0].MAKHACHHANG)
            $('#MAKHACHHANG').val('HX'+res.data[0].MAKHACHHANG);
            else
            $('#MAKHACHHANG').val('HX000001');
            $('#exampleModal').modal('show');
          }
        }
      });
    }

}
