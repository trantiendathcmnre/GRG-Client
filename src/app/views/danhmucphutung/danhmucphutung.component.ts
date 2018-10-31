import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { DonViLamViecService } from '../../services/donvilamviec.service';
import { DanhMucPhuTungService } from '../../services/danhmucphutung.service';
import { ApisService } from '../../services/apis.service';
import * as moment from 'moment';

const ERRORCODE = 1;
const SUCCESSCODE = 0;
const LIMIT = 30;
declare var $, toastr : any;
var self, inforData, tbl : any;
var count: number;
var replace: string;
var nameOLD;
let now = moment().format('MM_DD_YYYY_HH_mm_ss_a');

@Component({
  selector: 'app-danhmucphutung',
  templateUrl: './danhmucphutung.component.html',
  styleUrls: ['./danhmucphutung.component.css']
})
export class DanhmucphutungComponent implements OnInit {

  dataDonVi:any = [ ];
  dataExport: any = [ ];
  pnotify = undefined;
  category_of_accessary = 'Category of Accessary';
  category = 'Category';
  home = 'Home';
  btn_new = 'New Category';
  btn_search = 'Search';
  btn_export = 'Export';
  all_of_unit = 'All of Unit';
  please_select = 'Please Select';
  unit_of_work = 'Unit of Work';
  created_at = 'Created at';
  add_category = 'Add New Category';
  cal_revenue_of_unit = 'Calculate Revenue for Units';
  name_of_category = 'Name of Category';
  description = 'Description';
  action = 'Action';
  save = 'Save';
  reset = 'Reset';
  cancel = 'Cancel';
  constructor(
      private http: Http,
      private router:Router,
      private apisService: ApisService,
      private danhMucPhuTungService: DanhMucPhuTungService,
      private donViLamViecService: DonViLamViecService,
  ) {
    toastr.options = {
      "positionClass": "toast-top-center"
    };
  }

  ngOnInit() {
    self = this;
    $("#loader").css("display", "block");
    //load data don vi lam viec
    self.DanhSachDonViLamViec();
    //editor 
    //$('.textarea').wysihtml5();
    //jquery validation
    $.validator.addMethod("valueNotEquals", function(value, element, arg){
      return arg !== value;
    }, "Value must not equal arg.");

    $('#frm-danh-muc-phu-tung').validate({
      debug: true,
      rules: {
          ten: { required : true, maxlength : 50 },
          donvi_id: { valueNotEquals: "0" }
      },
      messages: { 
          ten: { required:"Please input name of category.", maxlength:"Parts catalog name is limited to 50 characters." },
          donvi_id: { valueNotEquals:"You have to select at least 1 option"}
      },
      highlight : function (element) {
          $(element).closest('.form-control').addClass('has-error');
          $(element).closest('.form-group').addClass('has-error');
          $('.no_error').removeClass('has-error');
      },
      unhighlight : function (element) {
          $(element).closest('.form-control').removeClass('has-error');
          $(element).closest('.form-group').removeClass('has-error');
      }
    });

    $('#frm-danh-muc-phu-tung').bind('keyup blur change', function () {
      var id = $('input[name=hidden_id]').val();
      if(id == 0) {
        if ($('#frm-danh-muc-phu-tung').validate().checkForm() ) { 
          checkName(); 
          if(self.result_check)
            $('#save-danh-muc-phu-tung').removeClass('button_disabled').prop('disabled', false); 
          else
            $('#save-danh-muc-phu-tung').removeClass('button_disabled').prop('disabled', true); 
          
        } else {
          $('#save-danh-muc-phu-tung').addClass('button_disabled').prop('disabled', true);   
        }
      }
    });

    $("#ten").bind('keyup change blur click', function(){
      checkName();
    });

    function checkName() {
      var id = $('input[name=hidden_id]').val();
      var ten = $("#ten").val().trim();
      self.result_name = false;

      $("#error").show();         
      $.each( self.dataKT, function( key, value ) {
        if(( ten == value.ten && value.ten != nameOLD && id != '0' ) || (ten == value.ten && id=='0')) {    
          self.result_name = true;      
        }
      });
      if(self.result_name) {
        $("#error").html("Parts catalog name is existed.");
        $("#ten").addClass('error');
        self.result_check = false;
      } else {
        $("#error").html("");
        $("#ten").removeClass('error');
        self.result_check = true;
      }
    }

    //datatable
    tbl = $('#tbl-danh-muc-phu-tung').DataTable({
        columnDefs: [
          { orderable: false, targets: [ 0, 2, 4, 5 ] }
        ],
        searching: false,
        bLengthChange : false,
        iDisplayLength: 10,
        //sap xep cot 3 tang dan
        order: [[4, "desc"]],
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
          { data: "ten", width: "200px" , render: function (data, type, row) {
            return self.RutGonChuoi(data, LIMIT);
          }},
          { data: "mo_ta",width: "400px", render: function (data, type, row) {
            return self.RutGonChuoi(data, LIMIT);
          }},
          { data: "ten_donvi", width: "200px"},
          { data: "created_at", className: "hidden" },
          {data: null, width: "100px", className: "text-capitalize",render: function (data, type, row) {
            return  '<a class="btn btn-primary-action m-r-xs" data-group="grpEdit" title="Edit Category" ><i class="fa fa-edit"></i></a>' +
                    '<a class="btn btn-primary-action m-r-xs" data-group="grpDelete" title="Delete Category" ><i class="fa fa-trash"></i></a>';
          }}
        ],
        //load data
        initComplete: function(setting, json){
          self.DanhMucPhuTung();
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

    // click button xuat excel
    $('#btn-export-csv').click(function(){
      self.XuatExcelDanhMucPhuTung();
    });

    // chon don vi va click duyet 
    $('#btn-search').off('click').click(function(){
      $("#loader").css("display", "block");
      let donVi = $('#donvi').val();
      if(donVi == 0) {
        self.DanhMucPhuTung();
      } else {
        self.DuyetDanhMucPhuTung(donVi);
      }
    });

    // hien modal bootstrap 
    $('#modal-default').modal({show: false, backdrop: 'static', keyboard: false }).on('show.bs.modal',function(){
      var id = $('input[name=hidden_id]').val();
      // check add 
      if(id == '0') {
        var validator = $("#frm-danh-muc-phu-tung").validate();
        validator.resetForm();
        $('.modal-title').html('Add New Category');
        $('.form-control').removeClass('has-error');
        $('.form-group').removeClass('has-error');
        $("#save-danh-muc-phu-tung").prop('disabled', false);
        $('#ten').val("");
        $('#ten').prop('disabled', false);
        $('#mo_ta').val("");
        $('select[name=donvi_id]').val("0").change();
        $('select[name=donvi_id]').prop('disabled', false);
      } else { // check update
        var validator = $("#frm-danh-muc-phu-tung").validate();
        validator.resetForm();
        $('.modal-title').html('Update Category');
        $('.form-control').removeClass('has-error');
        $('.form-group').removeClass('has-error');
        $("#error").hide();
        $('#ten').val(inforData.ten);
        $('#ten').prop('disabled', true);
        $('#mo_ta').val(inforData.mo_ta);
        $('select[name=donvi_id]').val(inforData.donvi_id).change();
        $('select[name=donvi_id]').prop('disabled', true);
        nameOLD=$('#ten').val();
      }
    });

    // click luu de them hoac cap nhat
    $("#save-danh-muc-phu-tung").click(function() {
      $("#loader").css("display", "block");
      // check hidden id
      var hiddenId = $('input[name=hidden_id]').val();
      // get data form 
      var data = $('#frm-danh-muc-phu-tung').serializeArray().reduce(function(obj, item) {
        obj[item.name] = item.value;
        return obj;
      }, {});
      if(hiddenId == 0) {
        self.ThemDanhMucPhuTung(data);
      } else {
        self.CapNhatDanhMucPhuTung(data, hiddenId);
      }
    });
  }

  // get danh sach don vi lam viec 
  DanhSachDonViLamViec()
  {
    self.donViLamViecService.getAll().subscribe( res=> {
      if( ERRORCODE <= res.errorCode ) {
        console.log(res);
        // self.router.navigate(['/']);
      }
      else {
        self.dataDonVi = ( SUCCESSCODE == res.errorCode ) ? res.data : console.log(res.message);
      }
    });
  }

  //get danh muc phu tung
  DanhMucPhuTung()
  {
    self.danhMucPhuTungService.getAll().subscribe(res=>{
      if( ERRORCODE <= res.errorCode ) {
        console.log(res);
        $("#loader").css("display", "none");
        //self.router.navigate(['/']);
      } else {
        if( SUCCESSCODE == res.errorCode ) {
          //console.log(res.data);
          self.dataKT=res.data;
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

  // them danh muc phu tung moi
  ThemDanhMucPhuTung(data)
  {
    self.danhMucPhuTungService.add(data).subscribe(res=> {
      if( ERRORCODE <= res.errorCode ) {
        $("#loader").css("display", "none");
        toastr.error(res.message, 'Error!');
        //self.router.navigate(['/']);
      } else {
        if( SUCCESSCODE == res.errorCode ) {
          $('#frm-danh-muc-phu-tung').trigger("reset");
          toastr.success(res.message, 'Done!');
          $('#modal-default').modal('hide');
          self.DanhMucPhuTung();
        } else {
          toastr.error(res.message, 'Error!');
          $("#loader").css("display", "none");
        }
      }
    });
  }

  // cap nhat danh muc phu tung
  CapNhatDanhMucPhuTung(data, id) 
  {
    self.danhMucPhuTungService.update(data , id).subscribe(res=> {
      if( ERRORCODE <= res.errorCode ) {
        $("#loader").css("display", "none");
        toastr.error(res.message, 'Error!');
        //self.router.navigate(['/']);
      } else {
        if( SUCCESSCODE == res.errorCode ) {
          $('#frm-danh-muc-phu-tung').trigger("reset");
          toastr.success(res.message, 'Done!');
          $('#modal-default').modal('hide');
          self.DanhMucPhuTung();
        } else {
          $("#loader").css("display", "none");
          toastr.error(res.message, 'Error!');
        }
      }
    });

  }

  // duyet danh muc phu tung theo don vi lam viec 
  DuyetDanhMucPhuTung(donvi)
  {
    self.danhMucPhuTungService.search(donvi).subscribe(res=> {
      if( ERRORCODE <= res.errorCode ) {
        console.log(res.message);
        $("#loader").css("display", "none");
        //self.router.navigate(['/']);
      } else {
        if( SUCCESSCODE == res.errorCode ) {
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

  XuatExcelDanhMucPhuTung() {
    self.danhMucPhuTungService.export().subscribe(res=> {
      window.open(self.apisService.baseUrl + "uploads/" + res.data, '_blank');
    });
  }

  private bindTableEvents()
  {
    //Xu ly update
    $('a[data-group=grpEdit]').off('click').click(function(){
      var rowId = $(this).closest('tr').attr('id');
      self.danhMucPhuTungService.get(rowId).subscribe(res=> {
        if(ERRORCODE <= res.errorCode) {
          toastr.error(res.message, 'Error!');
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
      var rowId=$(this).closest('tr').attr('id');
      $.confirm({
        title: 'Delete Category',
        content: 'Are you sure to delete the category?',
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
                  self.danhMucPhuTungService.delete(rowId).subscribe(res=> {
                    if( ERRORCODE <= res.errorCode ) {
                      console.log(res);
                      // self.router.navigate(['/']);
                    } else {
                      if( SUCCESSCODE == res.errorCode ) {
                        toastr.success(res.message, 'Done!');
                        self.DanhMucPhuTung();
                      } else {
                        toastr.error(res.message, 'Error!');
                        self.DanhMucPhuTung();
                      }
                    }
                  });       
                }
            }
        }
      });
    });
  }

  /**
	 * rut gon chuoi truyen vao
	 * @param const limit
	 * @param string string
	 * @return string replace
	 */
  RutGonChuoi(string, limit)
  {
    count = string.length;
    replace = count > limit ? string.replace(string.substring(limit, string.length),'...') : string;
    return replace;
  }

}
