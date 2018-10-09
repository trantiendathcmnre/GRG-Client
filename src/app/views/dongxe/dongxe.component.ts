import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { DongXeService } from '../../services/dongxe.service';
import { HangXeService } from '../../services/hangxe.service';

const ERRORCODE = 1;
const SUCCESSCODE = 0;
const LIMIT = 30;
declare var $, toastr : any;
var self, inforData, tbl : any;
var count:number;
var replace:string;
var nameOLD;

@Component({
  selector: 'app-dongxe',
  templateUrl: './dongxe.component.html',
  styleUrls: ['./dongxe.component.css']
})
export class DongxeComponent implements OnInit {

  dataHangXe:any = [ ];
  constructor(
      private http: Http,
      private router:Router,
      private hangXeService: HangXeService,
      private dongXeService: DongXeService,
  ) { }

  ngOnInit() {
    self = this;
    //load data hang xe
    self.DanhMucHangXe();
    //editor 
    $('.textarea').wysihtml5();
    //jquery validation
    $.validator.addMethod("valueNotEquals", function(value, element, arg){
      return arg !== value;
    }, "Value must not equal arg.");

    $('#frm-danh-muc-dong-xe').validate({
      debug: true,
      rules: {
          ten: { required : true, maxlength : 50 },
          hangxe_id: { valueNotEquals: "0" }
      },
      messages: { 
          ten: { required:"Vui lòng nhập tên dòng xe.", maxlength:"Tên dòng xe chỉ tối đa 50 ký tự." },
          hangxe_id: { valueNotEquals:"Vui lòng chọn hãng xe."}
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

    $('#frm-danh-muc-dong-xe').bind('keyup blur change', function () {
      var id = $('input[name=hidden_id]').val();
      if(id == 0) {
        if ($('#frm-danh-muc-dong-xe').validate().checkForm() ) { 
          checkName(); 
          if(self.result_check)
            $('#save-danh-muc-dong-xe').removeClass('button_disabled').prop('disabled', false); 
          else
            $('#save-danh-muc-dong-xe').removeClass('button_disabled').prop('disabled', true); 
          
        } else {
          $('#save-danh-muc-dong-xe').addClass('button_disabled').prop('disabled', true);   
        }
      }
    });

    $("#ten").bind('keyup change blur', function(){
      checkName();
    });

    function checkName() {
      var id = $('input[name=hidden_id]').val();
      var ten = $("#ten").val().trim();
      self.result_name = false;

      $("#unname_ITK").show();         
      $.each( self.dataKT, function( key, value ) {
        if(( ten == value.ten && value.ten != nameOLD && id != '0' ) || (ten == value.ten && id=='0')) {    
          self.result_name = true;      
        }
      });
      if(self.result_name) {
        $("#unname_ITK").html("<label class='error'>Tên dòng xe này đã tồn tại.</label>");
        $(".form-group form-group-ten").addClass('has-error');
        $(".form-control form-group-ten").addClass('has-error');
        self.result_check = false;
      } else {
        $("#unname_ITK").html("");
        self.result_check = true;
      }
    }

    //datatable
    tbl = $('#tbl-danh-muc-dong-xe').DataTable({
        columnDefs: [
          { orderable: false, targets: [ 0, 4 ] }
        ],
        searching: false,
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
          { data: "ten", render: function (data, type, row) {
            // return self.RutGonChuoi(data, LIMIT);
            return data;
          }},
          { data: "mo_ta", render: function (data, type, row) {
            // return self.RutGonChuoi(data, LIMIT);
            return data;
          }},
          { data: "ten_hangxe"},
          {data: null,className: "text-center",render: function (data, type, row) {
            return '<i data-group="grpEdit" class="fa fa-edit pointer" title="Sửa"></i>&nbsp;&nbsp;'+
            '<i data-group="grpDelete" class="fa fa-trash pointer" title="Xóa"></i>';
          }}
        ],
        //load data
        initComplete: function(setting, json){
          self.DanhMucDongXe();
        },
        drawCallback: function(settings){
          self.bindTableEvents();
        }
    });

    //custom stt datatable
    tbl.on('order.dt search.dt', function(){
      tbl.column(0, {search: 'applied', order: 'applied'}).nodes().each(function(cell,i){
        cell.innerHTML = i + 1;
      })
    }).draw();

    //click button them moi 
    $('#btn-add').off('click').click(function(){
      $('input[name=hidden_id]').val(0);
      $('#modal-default').modal('show');
    });

    // chon don vi va click duyet 
    $('#btn-search').off('click').click(function(){
      let hangXe = $('#hangxe').val();
      if(hangXe == 0) {
        self.DanhMucDongXe();
      } else {
        self.DuyetDanhMucDongXe(hangXe);
      }
    });

    // hien modal bootstrap 
    $('#modal-default').modal({show: false, backdrop: 'static', keyboard: false }).on('show.bs.modal',function(){
      var id = $('input[name=hidden_id]').val();
      // check add 
      if(id == '0') {
        var validator = $("#frm-danh-muc-dong-xe").validate();
        validator.resetForm();
        $('.form-control').removeClass('has-error');
        $('.form-group').removeClass('has-error');
        $("#save-danh-muc-dong-xe").prop('disabled', false);
        $('#ten').val("");
        $('#ten').prop('disabled', false);
        $('#mo_ta').val("");
        $('select[name=hangxe_id]').val("0").change();
        $('select[name=hangxe_id]').prop('disabled', false);
      } else { // check update
        var validator = $("#frm-danh-muc-dong-xe").validate();
        validator.resetForm();
        $('.form-control').removeClass('has-error');
        $('.form-group').removeClass('has-error');
        $('#reset').hide();
        $("#unname_ITK").hide();
        $('#ten').val(inforData.ten);
        $('#ten').prop('disabled', true);
        $('iframe').contents().find('.wysihtml5-editor').html(inforData.mo_ta);
        $('select[name=hangxe_id]').val(inforData.donvi_id).change();
        $('select[name=hangxe_id]').prop('disabled', true);
        nameOLD=$('#ten').val();
      }
    });

    // click luu de them hoac cap nhat
    $("#save-danh-muc-dong-xe").click(function() {
      // check hidden id
      var hiddenId = $('input[name=hidden_id]').val();
      // get data form 
      var data = $('#frm-danh-muc-dong-xe').serializeArray().reduce(function(obj, item) {
        obj[item.name] = item.value;
        return obj;
      }, {});
      if(hiddenId == 0) {
        self.ThemDongXe(data);
      } else {
        self.CapNhatDongXe(data, hiddenId);
      }
    });
  }

  //get danh muc hang xe
  DanhMucHangXe()
  {
    self.hangXeService.getAll().subscribe(res=>{
      if( ERRORCODE <= res.errorCode ) {
        console.log(res);
        //self.router.navigate(['/']);
      } else {
        self.dataHangXe = ( SUCCESSCODE == res.errorCode ) ? res.data : console.log(res.message);
      }
    });
  }

  //get danh muc dong xe
  DanhMucDongXe()
  {
    self.dongXeService.getAll().subscribe(res=>{
      if( ERRORCODE <= res.errorCode ) {
        console.log(res);
        //self.router.navigate(['/']);
      } else {
        if( SUCCESSCODE == res.errorCode ) {
          //console.log(res.data);
          self.dataKT=res.data;
          tbl.clear().draw();
          tbl.rows.add(res.data);//add new data
          tbl.columns.adjust().draw();// reraw datatable
        } else {
          console.log(res.message);
        }
      }
    });
  }

  // them danh muc dong xe
  ThemDongXe(data)
  {
    self.dongXeService.add(data).subscribe(res=> {
      if( ERRORCODE <= res.errorCode ) {
        toastr.error(res.message, 'Thất bại!');
        //self.router.navigate(['/']);
      } else {
        if( SUCCESSCODE == res.errorCode ) {
          $('#frm-danh-muc-dong-xe').trigger("reset");
          toastr.success(res.message, 'Thành Công');
          $('#modal-default').modal('hide');
          self.DanhMucDongXe();
        } else {
          toastr.error(res.message, 'Thất bại');
        }
      }
    });
  }

  // cap nhat danh muc dong xe
  CapNhatDongXe(data, id) 
  {
    self.dongXeService.update(data , id).subscribe(res=> {
      if( ERRORCODE <= res.errorCode ) {
        toastr.error(res.message, 'Thất bại!');
        //self.router.navigate(['/']);
      } else {
        if( SUCCESSCODE == res.errorCode ) {
          $('#frm-danh-muc-dong-xe').trigger("reset");
          toastr.success(res.message, 'Thành Công');
          $('#modal-default').modal('hide');
          self.DanhMucDongXe();
        } else {
          toastr.error(res.message, 'Thất bại');
        }
      }
    });

  }

  // duyet danh muc dong xe theo hang xe 
  DuyetDanhMucDongXe(hangxe)
  {
    self.dongXeService.search(hangxe).subscribe(res=> {
      if( ERRORCODE <= res.errorCode ) {
        console.log(res.message);
        //self.router.navigate(['/']);
      } else {
        if( SUCCESSCODE == res.errorCode ) {
          tbl.clear().draw();
          tbl.rows.add(res.data);//add new data
          tbl.columns.adjust().draw();// reraw datatable
        } else {
          console.log(res.message);
        }
      }
    });

  }

  private bindTableEvents()
  {
    //Xu ly update
    $('i[data-group=grpEdit]').off('click').click(function(){
      var rowId = $(this).closest('tr').attr('id');
      self.dongXeService.get(rowId).subscribe(res=> {
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
      var rowId=$(this).closest('tr').attr('id');
      $.confirm({
        title: 'Thông báo !',
        content: 'Bạn có muốn xóa dòng xe này không ?',
        type: 'red',
        typeAnimated: true,
        buttons: {
            tryAgain: {
                text: 'Có',
                btnClass: 'btn-danger',
                action: function(){
                  self.dongXeService.delete(rowId).subscribe(res=> {
                    if( ERRORCODE <= res.errorCode ) {
                      console.log(res);
                      // self.router.navigate(['/']);
                    } else {
                      if( SUCCESSCODE == res.errorCode ) {
                        toastr.success(res.message, 'Thành Công');
                        self.DanhMucDongXe();
                      } else {
                        toastr.error(res.message, 'Thất bại');
                        self.DanhMucDongXe();
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

  // /**
	//  * rut gon chuoi truyen vao
	//  * @param const limit
	//  * @param string string
	//  * @return string replace
	//  */
  // RutGonChuoi(string, limit)
  // {
  //   count = string.length;
  //   replace = count > limit ? string.replace(string.substring(limit, string.length),'...') : string;
  //   return replace;
  // }

}