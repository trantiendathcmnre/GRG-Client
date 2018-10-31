import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import * as moment from 'moment';
import { HangXeService } from "../../services/hangxe.service";
import { MenuService } from '../../services/menu.service';

const ERRORCODE = 1;
const SUCCESSCODE = 0;
const LIMIT = 30;
declare var $, toastr:any;
var self, inforData, tbl :any;
var count:number;
var replace:string;
var codeOLD;
let now = moment().format('MM_DD_YYYY_HH_mm_ss_a');

@Component({
  selector: 'app-hangxe',
  templateUrl: './hangxe.component.html',
  styleUrls: ['./hangxe.component.css']
})
export class HangxeComponent implements OnInit {

  dataHangXe:any = [ ];
  pnotify = undefined;
  route = undefined;
  automaker_list = 'Automaker List';
  home = 'Home';
  categories = 'Categories';
  automaker_code = 'Automaker Code';
  automaker_name = 'Automaker Name';
  description = 'Description';
  action = 'Action';
  cancel = 'Cancel';
  save = 'Save';


  constructor(
      private http: Http,
      private hangXeService: HangXeService,
      private router:Router,
      private menu: MenuService
  ) { 
    toastr.options = {
      "positionClass": "toast-top-center"
    };
  }

  ngOnInit() {
    
    self = this;
    $("#loader").css("display", "block");
    //editor 
    // $('.textarea').wysihtml5();
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
          ten:  { required:"Please input name of automaker.", maxlength:"Name of automaker is limited to 50 characters." },
          ma:   { required:"Please input code of autoamker.", maxlength:"Code of automaker is limited to 50 characters." },
      },
      highlight : function (element) {
          $(element).closest('.form-control').addClass('has-error');
          $(element).closest('.form-group').addClass('has-error');
          $('#error').addClass('error');
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

      $("#error").show();         
      $.each( self.dataKT, function( key, value ) {
        if(( ma == value.ma && value.ma != codeOLD && id != '0' ) || (ma == value.ma && id=='0')) {    
          self.result_code = true;      
        }
      });
      if(self.result_code) {
        $("#error").html("Code of automaker existed.");
        $(".form-group form-group-ten").addClass('has-error');
        $(".form-control form-group-ten").addClass('has-error');
        self.result_check = false;
      } else {
        $("#error").html("");
        self.result_check = true;
      }
    }

    //datatable
    tbl = $('#tbl-danh-muc-hang-xe').DataTable({
        dom: 'Bfrtip',
        buttons: [
            {
                text: 'New Automaker',
                className: 'btn btn-example btn-add',
                action: function ( e, dt, node, config ) {
                  $('input[name=hidden_id]').val(0);
                  $('#modal-default').modal('show');
                }
            },
            {
                extend : 'csv',
                text: 'Export CSV',
                className: 'btn btn-example',
                exportOptions: {
                  columns: [ 1, 2, 3 ]
                },
                title: "Danh_sach_hang_xe_" + now
            }
        ],
        columnDefs: [
          { orderable: false, targets: [ 0, 3, 4 ] }
        ],
        bLengthChange : false,
        iDisplayLength: 10,
        //sap xep cot 3 tang dan
        order: [[1, "desc"]],
        aaData: null,
        /*language: 
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
        },*/
        rowId: "id",
        columns:[
          { data: null, className: "text-center", width: "20px" },
          { data: "ma", width: "200px"},
          { data: "ten", width: "200px"},
          { data: "mo_ta", className: "text-justify", width: "400px"},
          {data: null, width: "100px", className: "text-center",render: function (data, type, row) {
            return  '<a class="btn btn-primary-action m-r-xs" data-group="grpEdit" title="Edit Automaker" ><i class="fa fa-edit"></i></a>' +
                    '<a class="btn btn-primary-action m-r-xs" data-group="grpDelete" title="Delete Automaker" ><i class="fa fa-trash"></i></a>';
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
        $('.modal-title').html('Add New Automaker');
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
        $('.modal-title').html('Update Automaker');
        $('.form-control').removeClass('has-error');
        $('.form-group').removeClass('has-error');
        $("#error").hide();
        $('#ma').val(inforData.ma);
        $('#ma').prop('disabled', true);
        $('#ten').val(inforData.ten);
        $('#mo_ta').val(inforData.mo_ta);
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
      } else {
        self.CapNhatHangXe(data, hiddenId);
      }

    });

  }

  DanhMucHangXe()
  {
    self.hangXeService.getAll().subscribe(res=>{
      if( ERRORCODE <= res.errorCode ) {
        console.log(res);
        $("#loader").css("display", "none");
        //self.router.navigate(['/']);
      } else {
        if( SUCCESSCODE == res.errorCode ) {
          //console.log(res.data);
          //self.dataKT=res.data;
          tbl.clear().draw();
          tbl.rows.add(res.data);//add new data
          tbl.columns.adjust().draw();// reraw datatable
          $("#loader").css("display", "none");
        } else {
          console.log(res.message);
          $("#loader").css("display", "none");
        }
      }
    });
  }

  ThemDanhMucHangXe(data)
  {
    self.hangXeService.add(data).subscribe(res=>{
      if( ERRORCODE <= res.errorCode ) {
        $("#loader").css("display", "none");
        toastr.error(res.message, 'Error!');
        //self.router.navigate(['/']);
      } else {
        if( SUCCESSCODE == res.errorCode ) {
          $('#frm-danh-muc-hang-xe').trigger("reset");
          $('#modal-default').modal('hide');
          self.DanhMucHangXe();
          toastr.success(res.message, 'Done!');
        } else {
          $("#loader").css("display", "none");
          toastr.error(res.message, 'Error!');
        }
      }
    });
  }

  // cap nhat danh muc phu tung
  CapNhatHangXe(data, id) 
  {
    self.hangXeService.update(data , id).subscribe(res=> {
      if( ERRORCODE <= res.errorCode ) {
        $("#loader").css("display", "none");
        toastr.error(res.message, 'Error!');
        //self.router.navigate(['/']);
      } else {
        if( SUCCESSCODE == res.errorCode ) {
          $('#frm-danh-muc-hang-xe').trigger("reset");
          $('#modal-default').modal('hide');
          self.DanhMucHangXe();
          toastr.success(res.message, 'Done!');
        } else {
          $("#loader").css("display", "none");
          toastr.error(res.message, 'Error!');
        }
      }
    });

  }

  private bindTableEvents()
  {
    //Xu ly update
    $('a[data-group=grpEdit]').off('click').click(function(){
      var rowId = $(this).closest('tr').attr('id');
      self.hangXeService.get(rowId).subscribe(res=> {
        if(ERRORCODE <= res.errorCode) {
          console.log(res.message);
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
    $('a[data-group=grpDelete]').off('click').click(function(){
      var rowId = $(this).closest('tr').attr('id');
      $.confirm({
        title: 'Delete Automaker',
        content: 'Are you sure to delete the automaker?',
        type: 'red',
        typeAnimated: true,
        buttons: {
            close:{
              text: "No",
              btnClass: 'btn-secondary'
            },
            tryAgain: {
                text: 'Yes',
                btnClass: 'btn-example',
                action: function(){
                  $("#loader").css("display", "block");
                  self.hangXeService.delete(rowId).subscribe(res=> {
                    if( ERRORCODE <= res.errorCode ) {
                      $("#loader").css("display", "none");
                      toastr.error(res.message, 'Error!');
                      // self.router.navigate(['/']);
                    } else {
                      if( SUCCESSCODE == res.errorCode ) {
                        self.DanhMucHangXe();
                        toastr.success(res.message, 'Done!');
                      } else {
                        $("#loader").css("display", "none");
                        toastr.error(res.message, 'Error!');
                      }
                    }
                  });       
                }
            }
        }
      });
    });
  }

}
