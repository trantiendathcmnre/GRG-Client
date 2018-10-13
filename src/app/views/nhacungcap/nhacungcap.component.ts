import { AfterViewInit, Component, OnInit } from '@angular/core';
import { NhaCungCapService } from '../../services/nhacungcap.service';
import { Router } from '@angular/router';
import * as moment from 'moment';

const ERRORCODE = 1;
const SUCCESSCODE = 0;
const LIMIT = 30;
declare var $, toastr : any;
var self, inforData, tbl : any;
var count, rowId, index :number;
var replace, path_file:string;
let now = moment().format('MM_DD_YYYY_HH_mm_ss_a');

@Component({
  selector: 'app-nhacungcap',
  templateUrl: './nhacungcap.component.html',
  styleUrls: ['./nhacungcap.component.css']
})
export class NhaCungCapComponent implements OnInit,AfterViewInit {

  dataNhaCungCap:any = [ ];
  dataRowId:any = [ ];
  route = undefined;
  public isChecked: boolean;
  constructor(
      private nhaCungCapService: NhaCungCapService,
      private router:Router
  ) { 
    toastr.options = {
      "positionClass": "toast-top-center"
    };
  }
  
  ngOnInit() {
    
    self = this;
    self.DanhSachNhaCungCap();
    //editor 
    $('.textarea').wysihtml5();

    //jquery validation
    $.validator.addMethod("valueNotEquals", function(value, element, arg){
      return arg !== value;
    }, "Value must not equal arg.");

    $('#frm-nha-cung-cap').validate({
      debug: true,
      rules: {
          ten:  { required:true, maxlength: 200 },
          email:{ required:true, maxlength: 255 },
          dia_chi:{ required:true, maxlength: 255 },
      },
      messages: { 
          ten:  { required:"Vui lòng nhập tên nhà cung cấp", maxlength:"Tên nhà cung cấp chỉ tối đa 200 ký tự." },
          email:   { required:"Vui lòng nhập email nhà cung cấp", maxlength:"Email nhà cung cấp chỉ tối đa 255 ký tự." },
          dia_chi:   { required:"Vui lòng nhập mã hãng xe.", maxlength:"Địa chỉ nhà cung cấp tối đa 255 ký tự." },
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

    $('#reset').on('click', function() {
      $('#frm-nha-cung-cap').validate().resetForm();
    });

    $('#frm-nha-cung-cap').bind('keyup blur change', function () {
      var id = $('input[name=hidden_id]').val();
      if(id == 0) {
        if ($('#frm-nha-cung-cap').validate().checkForm() ) { 
          if(self.result_check)
            $('#frm-nha-cung-cap').removeClass('button_disabled').prop('disabled', false); 
          else
            $('#frm-nha-cung-cap').removeClass('button_disabled').prop('disabled', true); 
          
        } else {
          $('#frm-nha-cung-cap').addClass('button_disabled').prop('disabled', true);   
        }
      }
    });

    $('#btn-add').off('click').click(function() {
      $('input[name=hidden_id]').val(0);
      $('#modal-default').modal('show');
    });

    $('#enableClient').on('click', function() {
      toastr.error('Please choose provider need enable!', 'Thất bại');
    });

    $('#disableClient').on('click', function() {
      if(self.dataRowId.length == 0) {
        toastr.error('Please choose provider need disable!', 'Thất bại');
      } else {
      }
    });

    $('#deleteClient').on('click', function() {
      if(self.dataRowId.length == 0) {
        toastr.error('Vui lòng chọn nhà cung cấp cần xóa!', 'Thất bại');
      } else {
        $.confirm({
          title: 'Thông báo !',
          content: 'Bạn có muốn xóa hãng xe này không ?',
          type: 'red',
          typeAnimated: true,
          buttons: {
              tryAgain: {
                  text: 'Có',
                  btnClass: 'btn-danger',
                  action: function(){
                    self.nhaCungCapService.delete(self.dataRowId).subscribe(res=> {
                      
                      if( ERRORCODE <= res.errorCode ) {
                        console.log(res);
                        // self.router.navigate(['/']);
                      } else {
                        if( SUCCESSCODE == res.errorCode ) {
                          toastr.success(res.message, 'Thành Công');
                          self.DanhMucNhaCungCap();
                        } else {
                          toastr.error(res.message, 'Thất bại');
                        }
                      }
                    });       
                  }
              },
              close:{
                text: "Không",
                btnClass: 'btn-default'
              }
          }
        });
      }
    });

    //datatable
    // tbl = $('#tbl-nha-cung-cap').DataTable({
    //     dom: 'Bfrtip',
    //     buttons: [
    //         {
    //             text: 'Thêm mới',
    //             className: 'btn btn-default btn-add',
    //             action: function ( e, dt, node, config ) {
    //               $('input[name=hidden_id]').val(0);
    //               $('#modal-default').modal('show');
    //             }
    //         },
    //         {
    //           text: 'Xóa',
    //           className: 'btn btn-default grpDelete',
    //           action: function ( e, dt, node, config ) {

    //             if(self.dataRowId.length == 0) {
    //               toastr.error('Vui lòng chọn nhà cung cấp cần xóa!', 'Thất bại');
    //             } else {
                  
    //               $.confirm({
    //                 title: 'Thông báo !',
    //                 content: 'Bạn có muốn xóa hãng xe này không ?',
    //                 type: 'red',
    //                 typeAnimated: true,
    //                 buttons: {
    //                     tryAgain: {
    //                         text: 'Có',
    //                         btnClass: 'btn-danger',
    //                         action: function(){
    //                           self.nhaCungCapService.delete(self.dataRowId).subscribe(res=> {
                                
    //                             if( ERRORCODE <= res.errorCode ) {
    //                               console.log(res);
    //                               // self.router.navigate(['/']);
    //                             } else {
    //                               if( SUCCESSCODE == res.errorCode ) {
    //                                 toastr.success(res.message, 'Thành Công');
    //                                 self.DanhMucNhaCungCap();
    //                               } else {
    //                                 toastr.error(res.message, 'Thất bại');
    //                               }
    //                             }
    //                           });       
    //                         }
    //                     },
    //                     close:{
    //                       text: "Không",
    //                       btnClass: 'btn-default'
    //                     }
    //                 }
    //               });
    //             }
    //           }
    //         },
    //         {
    //             extend : 'csv',
    //             text: 'Xuất excel',
    //             className: 'btn btn-default',
    //             exportOptions: {
    //               columns: [ 1, 2, 3, 4, 5, 6 ]
    //             },
    //             title: "Danh_sach_nha_cung_cap_"+now
    //         }
    //     ],
    //     columnDefs: [
    //       { orderable: false, targets: [ 4, 5, 6, 7 ] },
    //       {
    //         orderable: false,
    //         className: 'select-checkbox',
    //         targets:   0
    //       }
    //     ],
    //     select: {
    //       style:    'os',
    //       selector: 'td:first-child'
    //     },
    //     bLengthChange : false,
    //     iDisplayLength: 10,
    //     //sap xep cot 3 tang dan
    //     order: [[1, "asc"]],
    //     aaData: null,
    //     language: 
    //     {
    //         "sProcessing"   : "Đang xử lý...",
    //         "sLengthMenu"   : "Xem _MENU_ mục",
    //         "sZeroRecords"  : "Không tìm thấy dòng nào phù hợp",
    //         "sInfo"         : "Đang xem _START_ đến _END_ trong tổng số _TOTAL_ mục",
    //         "sInfoEmpty"    : "Đang xem 0 đến 0 trong tổng số 0 mục",
    //         "sInfoFiltered" : "(được lọc từ _MAX_ mục)",
    //         "sInfoPostFix"  : "",
    //         "sSearch"       : "Tìm:",
    //         "sUrl"          : "",
    //         "oPaginate"     : {
    //             "sFirst"      :   "Đầu",
    //             "sPrevious"   :   "Trước",
    //             "sNext"       :   "Tiếp",
    //             "sLast"       :   "Cuối"
    //         }
    //     },
    //     rowId: "id",
    //     columns:[
    //       { data: null, className: "text-center", width: "15px", render: function () {
    //         return '<div class="form-group"><label><input data-group="grpCheckbox" type="checkbox" class="flat-red"></label></div>';
    //       }},
    //       { data: "ten", width: "150px"},
    //       { data: "dia_chi",  width: "150px"},
    //       { data: "email", width: "150px"},
    //       { data: "website", render: function (data, type, row){
    //         if( data == null) {
    //           return 'N/A';
    //         } else {
    //           return '<a href="'+ data +'">'+ data + '</a>';
    //         }
    //       }},
    //       { data: "dien_thoai"},
    //       { data: "fax"},
    //       {data: null,className: "text-center",render: function (data, type, row) {
    //         return '<i data-group="grpEdit" class="fa fa-edit pointer" title="Sửa"></i>&nbsp;&nbsp;';
    //       }}
    //     ],
    //     //load data
    //     initComplete: function(setting, json){
    //       self.DanhMucNhaCungCap();
    //     },
    //     drawCallback: function(settings){
    //       // self.bindTableEvents();
    //       // $('.dt-button').removeClass('dt-button');
    //       // $('input[type="checkbox"].flat-red, input[type="radio"].flat-red').iCheck({
    //       //   checkboxClass: 'icheckbox_flat-green',
    //       //   radioClass   : 'iradio_flat-green'
    //       // });

    //       // $('#check-all').on('ifChecked', function(){
    //       //   $('input[data-group=grpCheckbox]').iCheck('check');
    //       // });

    //       // $('#check-all').on('ifUnchecked', function () {
    //       //   $('input[data-group=grpCheckbox]').iCheck('uncheck');
    //       // });

    //       // $('input[data-group=grpCheckbox]').on('ifChecked', function(){
    //       //   rowId = $(this).closest('tr').attr('id');
    //       //   self.dataRowId.push(rowId);
    //       // });

    //       // $('input[data-group=grpCheckbox]').on('ifUnchecked', function(){
    //       //   rowId = $(this).closest('tr').attr('id');
    //       //   index = self.dataRowId.indexOf(rowId);
    //       //   if(index > -1) {
    //       //     self.dataRowId.splice(index, 1);
    //       //   }
    //       // });
          
    //     }
    // });
    
    //custom stt datatable
    // tbl.on('order.dt search.dt', function(){
    //   tbl.column(0, {search: 'applied', order: 'applied'}).nodes().each(function(cell,i){
    //     cell.innerHTML = i + 1;
    //   })
    // }).draw();

    // hien modal bootstrap 
    $('#modal-default').modal({show: false, backdrop: 'static', keyboard: false }).on('show.bs.modal',function(){
      var id = $('input[name=hidden_id]').val();
      // check add 
      if(id == '0') {
        var validator = $("#frm-nha-cung-cap").validate();
        validator.resetForm();
        $('.form-control').removeClass('has-error');
        $('.form-group').removeClass('has-error');
        $("#save-danh-muc-nha-cung-cap").prop('disabled', false);
        $('#ten').val("");
        $('#ten').prop('disabled', false);
        $('iframe').contents().find('.wysihtml5-editor').html("");
        $('#dien_thoai').val("");
        $('#email').val("");
        $('#website').val("");
        $('#fax').val("");
      } else { // check update
        var validator = $("#frm-nha-cung-cap").validate();
        validator.resetForm();
        $('.form-control').removeClass('has-error');
        $('.form-group').removeClass('has-error');
        $('#reset').hide();
        $("#unname_ITK").hide();
        $('#ten').val(inforData.ten);
        $('#ten').prop('disabled', true);
        $('#dien_thoai').val(inforData.dien_thoai);
        $('#email').val(inforData.email);
        $('#website').val(inforData.website);
        $('#fax').val(inforData.fax);
        $('iframe').contents().find('.wysihtml5-editor').html(inforData.dia_chi);
      }
    });

    // them danh muc hang xe
    $('#save-danh-muc-nha-cung-cap').on('click', function () {
      // check hidden id
      var hiddenId = $('input[name=hidden_id]').val();
      // get data form 
      var data = $('#frm-nha-cung-cap').serializeArray().reduce(function(obj, item) {
        obj[item.name] = item.value;
        return obj;
      }, {});
      if(hiddenId == 0 && $('#ten').val() != "" && $('#dia_chi').val() !="" && $('#email').val() !="" ) {
        self.ThemDanhMucNhaCungCap(data);
      } else {
        self.CapNhatNhaCungCap(data, hiddenId);
      }

    });

    // $('input[type="checkbox"].flat-red, input[type="radio"].flat-red').iCheck({
    //   checkboxClass: 'icheckbox_flat-green',
    //   radioClass   : 'iradio_flat-green'
    // });

  }

  ngAfterViewInit() {
    //icheck
    $('input[type="checkbox"].flat-red').iCheck({
      checkboxClass: 'icheckbox_flat-green',
      radioClass   : 'iradio_flat-green'
    });

    $('#check-all').on('ifChecked', function(){
      $('input[data-group=grpCheckbox]').iCheck('check');
    });

    $('#check-all').on('ifUnchecked', function () {
      $('input[data-group=grpCheckbox]').iCheck('uncheck');
    });

  }

  checkValue(id: number, event){
    if(!!event.target.checked) {
      self.dataRowId.push(id);
    } else {
      index = self.dataRowId.indexOf(id);
      if(index > -1) {
        self.dataRowId.splice(index, 1);
      }
    }
  }


  DanhMucNhaCungCap()
  {
    self.nhaCungCapService.getAll().subscribe(res=>{
      if( ERRORCODE <= res.errorCode ) {
        console.log(res);
        //self.router.navigate(['/']);
      } else {
        if( SUCCESSCODE == res.errorCode ) {
          //console.log(res.data);
          //self.dataKT=res.data;
          tbl.clear().draw();
          tbl.rows.add(res.data);//add new data
          tbl.columns.adjust().draw();// reraw datatable
        } else {
          console.log(res.message);
        }
      }
    });
  }

  DanhSachNhaCungCap()
  {
    self.nhaCungCapService.getAll().subscribe(res=>{
      if( ERRORCODE <= res.errorCode ) {
        console.log(res);
        //self.router.navigate(['/']);
      } else {
        if( SUCCESSCODE == res.errorCode ) {
          self.dataNhaCungCap=res.data;
        } else {
          console.log(res.message);
        }
      }
    });
  }

  ThemDanhMucNhaCungCap(data)
  {
    self.nhaCungCapService.add(data).subscribe(res=>{
      if( ERRORCODE <= res.errorCode ) {
        toastr.error(res.message, 'Thất bại!');
        //self.router.navigate(['/']);
      } else {
        if( SUCCESSCODE == res.errorCode ) {
          $('#frm-danh-muc-hang-xe').trigger("reset");
          toastr.success(res.message, 'Thành Công');
          $('#modal-default').modal('hide');
          self.DanhMucNhaCungCap();
        } else {
          toastr.error(res.message, 'Thất bại!');
        }
      }
    });
  }

  // cap nhat danh muc phu tung
  CapNhatNhaCungCap(data, id) 
  {
    self.nhaCungCapService.update(data , id).subscribe(res=> {
      if( ERRORCODE <= res.errorCode ) {
        toastr.error(res.message, 'Thất bại!');
        //self.router.navigate(['/']);
      } else {
        if( SUCCESSCODE == res.errorCode ) {
          $('#frm-danh-muc-hang-xe').trigger("reset");
          toastr.success(res.message, 'Thành Công');
          $('#modal-default').modal('hide');
          self.DanhMucNhaCungCap();
        } else {
          toastr.error(res.message, 'Thất bại');
        }
      }
    });

  }

  GetNhaCungCapById(id) {
    self.nhaCungCapService.get(id).subscribe(res=> {
      if(ERRORCODE <= res.errorCode) {
        toastr.error(res.message, 'Thất bại!');
        //self.router.navigate(['/']);
      } else {
        if( SUCCESSCODE == res.errorCode ) {
          $('input[name=hidden_id]').val(rowId);
          inforData = res.data[0];
          $('#modal-default').modal('show');
        }
        else {
          console.log(res.message);
        }
      }
    });
  }

  private bindTableEvents()
  {
    //Xu ly update
    $('i[data-group=grpEdit]').off('click').click(function(){
      self.nhaCungCapService.get(rowId).subscribe(res=> {
        if(ERRORCODE <= res.errorCode) {
          toastr.error(res.message, 'Thất bại!');
          //self.router.navigate(['/']);
        } else {
          if( SUCCESSCODE == res.errorCode ) {
            $('input[name=hidden_id]').val(rowId);
            inforData = res.data[0];
            $('#modal-default').modal('show');
          }
          else {
            console.log(res.message);
          }
        }
      });
    });
    
  }

}
