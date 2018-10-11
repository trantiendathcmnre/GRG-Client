import { Component, OnInit } from '@angular/core';
import { HangXeService } from '../../services/hangxe.service';
import { NhaCungCapService } from '../../services/nhacungcap.service';
import { Router } from '@angular/router';
import * as moment from 'moment';

const ERRORCODE = 1;
const SUCCESSCODE = 0;
const LIMIT = 30;
declare var $, toastr : any;
var self, inforData, tbl : any;
var count:number;
var replace, path_file:string;
var codeOLD;

let now = moment().format('MM_DD_YYYY_HH_mm_ss_a');

@Component({
  selector: 'app-nhacungcap',
  templateUrl: './nhacungcap.component.html',
  styleUrls: ['./nhacungcap.component.css']
})
export class NhaCungCapComponent implements OnInit {

  dataHangXe:any = [ ];
  pnotify = undefined;
  route = undefined;

  constructor(
      private hangXeService: HangXeService,
      private router:Router
  ) { }

  ngOnInit() {
    
    self = this;
    //editor 
    $('.textarea').wysihtml5();
    //jquery validation
    $.validator.addMethod("valueNotEquals", function(value, element, arg){
      return arg !== value;
    }, "Value must not equal arg.");

    $('#frm-danh-muc-hang-xe').validate({
      debug: true,
      rules: {
          ten: { required:true, maxlength: 50 },
          ma:  { required:true, maxlength: 20 },
      },
      messages: { 
          ten:  { required:"Vui lòng nhập tên hãng xe.", maxlength:"Tên hãng chỉ tối đa 50 ký tự." },
          ma:   { required:"Vui lòng nhập mã hãng xe.", maxlength:"Mã hãng chỉ tối đa 20 ký tự." },
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
      $('#frm-danh-muc-hang-xe').validate().resetForm();
    });

    $('#frm-danh-muc-hang-xe').bind('keyup blur change', function () {
      var id = $('input[name=hidden_id]').val();
      if(id == 0) {
        if ($('#frm-danh-muc-hang-xe').validate().checkForm() ) { 
          checkCode(); 
          if(self.result_check)
            $('#frm-danh-muc-hang-xe').removeClass('button_disabled').prop('disabled', false); 
          else
            $('#frm-danh-muc-hang-xe').removeClass('button_disabled').prop('disabled', true); 
          
        } else {
          $('#frm-danh-muc-hang-xe').addClass('button_disabled').prop('disabled', true);   
        }
      }
    });

    $("#ma").bind('keyup change blur', function(){
      checkCode();
    });

    function checkCode() {
      var id = $('input[name=hidden_id]').val();
      var ma = $("#ma").val().trim();
      self.result_code = false;

      $("#unname_ITK").show();         
      $.each( self.dataKT, function( key, value ) {
        if(( ma == value.ma && value.ma != codeOLD && id != '0' ) || (ma == value.ma && id=='0')) {    
          self.result_code = true;      
        }
      });
      if(self.result_code) {
        $("#unname_ITK").html("<label class='error'>Mã hãng xe này đã tồn tại.</label>");
        $(".form-group form-group-ten").addClass('has-error');
        $(".form-control form-group-ten").addClass('has-error');
        self.result_check = false;
      } else {
        $("#unname_ITK").html("");
        self.result_check = true;
      }
    }

    //datatable
    tbl = $('#tbl-danh-muc-hang-xe').DataTable({
        dom: 'Bfrtip',
        buttons: [
            {
                text: 'Thêm mới',
                className: 'btn btn-default btn-add',
                action: function ( e, dt, node, config ) {
                  $('input[name=hidden_id]').val(0);
                  $('#modal-default').modal('show');
                }
            },
            {
                extend : 'csv',
                text: 'Xuất excel',
                className: 'btn btn-default',
                exportOptions: {
                  columns: [ 1, 2, 3 ]
                },
                title: "Danh_sach_hang_xe_"+now
            }
        ],
        columnDefs: [
          { orderable: false, targets: [ 0, 4 ] }
        ],
        bLengthChange : false,
        iDisplayLength: 10,
        //sap xep cot 3 tang dan
        order: [[1, "asc"]],
        aaData: null,
        language: 
        {
            "sProcessing"   : "Đang xử lý...",
            "sLengthMenu"   : "Xem _MENU_ mục",
            "sZeroRecords"  : "Không tìm thấy dòng nào phù hợp",
            "sInfo"         : "Đang xem _START_ đến _END_ trong tổng số _TOTAL_ mục",
            "sInfoEmpty"    : "Đang xem 0 đến 0 trong tổng số 0 mục",
            "sInfoFiltered" : "(được lọc từ _MAX_ mục)",
            "sInfoPostFix"  : "",
            "sSearch"       : "Tìm:",
            "sUrl"          : "",
            "oPaginate"     : {
                "sFirst"      :   "Đầu",
                "sPrevious"   :   "Trước",
                "sNext"       :   "Tiếp",
                "sLast"       :   "Cuối"
            }
        },
        rowId: "id",
        columns:[
          { data: null, className: "text-center", width: "20px" },
          { data: "ma"},
          { data: "ten"},
          { data: "mo_ta"},
          {data: null,className: "text-center",render: function (data, type, row) {
            return '<i data-group="grpEdit" class="fa fa-edit pointer" title="Sửa"></i>&nbsp;&nbsp;'+
            '<i data-group="grpDelete" class="fa fa-trash pointer" title="Xóa"></i>';
          }}
        ],
        //load data
        initComplete: function(setting, json){
          self.DanhMucHangXe();
        },
        drawCallback: function(settings){
          self.bindTableEvents();
          $('.dt-button').removeClass('dt-button');
        }
    });

    //custom stt datatable
    tbl.on('order.dt search.dt', function(){
      tbl.column(0, {search: 'applied', order: 'applied'}).nodes().each(function(cell,i){
        cell.innerHTML = i + 1;
      })
    }).draw();

    // hien modal bootstrap 
    $('#modal-default').modal({show: false, backdrop: 'static', keyboard: false }).on('show.bs.modal',function(){
      var id = $('input[name=hidden_id]').val();
      // check add 
      if(id == '0') {
        var validator = $("#frm-danh-muc-hang-xe").validate();
        validator.resetForm();
        $('.form-control').removeClass('has-error');
        $('.form-group').removeClass('has-error');
        $("#save-danh-muc-hang-xe").prop('disabled', false);
        $('#ma').val("");
        $('#ma').prop('disabled', false);
        $('#ten').val("");
        $('#mo_ta').val("");
      } else { // check update
        var validator = $("#frm-danh-muc-hang-xe").validate();
        validator.resetForm();
        $('.form-control').removeClass('has-error');
        $('.form-group').removeClass('has-error');
        $('#reset').hide();
        $("#unname_ITK").hide();
        $('#ma').val(inforData.ma);
        $('#ma').prop('disabled', true);
        $('#ten').val(inforData.ten);
        $('iframe').contents().find('.wysihtml5-editor').html(inforData.mo_ta);
        codeOLD=$('#ma').val();
      }
    });

    // them danh muc hang xe
    $('#save-danh-muc-hang-xe').on('click', function () {
      // check hidden id
      var hiddenId = $('input[name=hidden_id]').val();
      // get data form 
      var data = $('#frm-danh-muc-hang-xe').serializeArray().reduce(function(obj, item) {
        obj[item.name] = item.value;
        return obj;
      }, {});
      if(hiddenId == 0 && $('#ten').val() != "" && $('#ma').val() !="" ) {
        self.ThemDanhMucHangXe(data);
      }

    });

  }

  DanhMucHangXe()
  {
    self.hangXeService.getAll().subscribe(res=>{
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

  ThemDanhMucHangXe(data)
  {
    self.hangXeService.add(data).subscribe(res=>{
      if( ERRORCODE <= res.errorCode ) {
        toastr.error(res.message, 'Thất bại!');
        //self.router.navigate(['/']);
      } else {
        if( SUCCESSCODE == res.errorCode ) {
          $('#frm-danh-muc-hang-xe').trigger("reset");
          toastr.success(res.message, 'Thành Công');
          $('#modal-default').modal('hide');
          self.DanhMucHangXe();
        } else {
          toastr.error(res.message, 'Thất bại!');
        }
      }
    });
  }

  // cap nhat danh muc phu tung
  CapNhatHangXe(data, id) 
  {
    self.hangXeService.update(data , id).subscribe(res=> {
      if( ERRORCODE <= res.errorCode ) {
        toastr.error(res.message, 'Thất bại!');
        //self.router.navigate(['/']);
      } else {
        if( SUCCESSCODE == res.errorCode ) {
          $('#frm-danh-muc-hang-xe').trigger("reset");
          toastr.success(res.message, 'Thành Công');
          $('#modal-default').modal('hide');
          self.DanhMucHangXe();
        } else {
          toastr.error(res.message, 'Thất bại');
        }
      }
    });

  }

  private bindTableEvents()
  {
    //Xu ly update
    $('i[data-group=grpEdit]').off('click').click(function(){
      var rowId = $(this).closest('tr').attr('id');
      self.hangXeService.get(rowId).subscribe(res=> {
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

    //Xu lý xóa
    $('i[data-group=grpDelete]').off('click').click(function(){
      var rowId = $(this).closest('tr').attr('id');
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
                  self.hangXeService.delete(rowId).subscribe(res=> {
                    if( ERRORCODE <= res.errorCode ) {
                      console.log(res);
                      // self.router.navigate(['/']);
                    } else {
                      if( SUCCESSCODE == res.errorCode ) {
                        toastr.success(res.message, 'Thành Công');
                        self.DanhMucHangXe();
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
    });
  }

}
