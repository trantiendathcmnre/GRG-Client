import { Component, OnInit } from '@angular/core';
import { DonViTinhService } from '../../services/donvitinh.service';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import * as moment from 'moment';

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
  selector: 'app-donvitinh',
  templateUrl: './donvitinh.component.html',
  styleUrls: ['./donvitinh.component.css']
})
export class DonViTinhComponent implements OnInit {

  constructor(
    private http: Http,
    private router:Router,
    private donViTinhService: DonViTinhService,
  ) { 
    toastr.options = {
      "positionClass": "toast-top-center"
    };
  }

  ngOnInit() {
    self = this;
    $("#loader").css("display", "block");
    self.detectAddOrUpdate();
    //jquery validation
    $.validator.addMethod("valueNotEquals", function(value, element, arg){
      return arg !== value;
    }, "Value must not equal arg.");

    $('#frm-don-vi-tinh').validate({
      debug: true,
      rules: {
          ten: { required:true, maxlength: 50 }
      },
      messages: { 
          ten:  { required:"Please input name.", maxlength:"Name is limited to 50 characters." },
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
      $('#frm-don-vi-tinh').validate().resetForm();
    });

    $('#frm-don-vi-tinh').bind('keyup blur change', function () {
      var id = $('input[name=hidden_id]').val();
      if(id == 0) {
        if ($('#frm-don-vi-tinh').validate().checkForm() ) { 
          checkCode(); 
          if(self.result_check)
            $('#frm-don-vi-tinh').removeClass('button_disabled').prop('disabled', false); 
          else
            $('#frm-don-vi-tinh').removeClass('button_disabled').prop('disabled', true); 
          
        } else {
          $('#frm-don-vi-tinh').addClass('button_disabled').prop('disabled', true);   
        }
      }
    });

    $("#ten").bind('keyup change blur', function(){
      checkCode();
    });

    function checkCode() {
      var id = $('input[name=hidden_id]').val();
      var ten = $("#ten").val().trim();
      self.result_code = false;

      $("#error").show();         
      $.each( self.dataKT, function( key, value ) {
        if( ten == value.ten && id=='0' ) {    
          self.result_code = true;      
        }
      });
      if(self.result_code) {
        $("#error").html("Name existed. Please check again.");
        $(".form-group form-group-ten").addClass('has-error');
        $(".form-control form-group-ten").addClass('has-error');
        self.result_check = false;
      } else {
        $("#error").html("");
        self.result_check = true;
      }
    }

    //datatable
    tbl = $('#tbl-don-vi-tinh').DataTable({
        columnDefs: [
          { orderable: false, targets: [ 0, 2, 3 ] }
        ],
        bLengthChange : false,
        iDisplayLength: 10,
        //sap xep cot 3 tang dan
        order: [[1, "desc"]],
        aaData: null,
        rowId: "id",
        columns:[
          { data: null, className: "text-center", width: "20px" },
          { data: "ten", width: "200px"},
          { data: "ghi_chu", className: "text-justify", width: "400px"},
          {data: null, width: "100px", className: "text-center",render: function (data, type, row) {
            return  '<a class="btn btn-primary-action m-r-xs" data-group="grpEdit" title="Edit Automaker" ><i class="fa fa-edit"></i></a>' +
                    '<a class="btn btn-primary-action m-r-xs" data-group="grpDelete" title="Delete Automaker" ><i class="fa fa-trash"></i></a>';
          }}
        ],
        //load data
        initComplete: function(setting, json){
          self.danhSachDonViTinh();
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

    // them danh muc hang xe
    $('#save-don-vi-tinh').on('click', function () {
      // loader run
      $("#loader").css("display", "block");
      // check hidden id
      var hiddenId = $('input[name=hidden_id]').val();
      // get data form 
      var data = $('#frm-don-vi-tinh').serializeArray().reduce(function(obj, item) {
        obj[item.name] = item.value;
        return obj;
      }, {});
      if( hiddenId == 0 ) {
        self.themDonViTinh(data);
      } else {
        self.capNhatDonViTinh(data, hiddenId);
      }

    });
  }

  detectAddOrUpdate() {
    var id = $('input[name=hidden_id]').val();
      // check add 
    if(id == '0') {
      var validator = $("#frm-don-vi-tinh").validate();
      $('.title-detect').html('Add Unit Of Calculation');
      $('.form-control').removeClass('has-error');
      $('.form-group').removeClass('has-error');
      $("#save-don-vi-tinh").prop('readonly', false);
      $('#ten').prop('disabled', false);
      $('#ten').val("");
      $('#ghi_chu').val("");
    }
  }

  danhSachDonViTinh()
  {
    self.donViTinhService.getAll().subscribe(res=>{
      if( ERRORCODE <= res.errorCode ) {
        console.log(res);
        $("#loader").css("display", "none");
      } else {
        if( SUCCESSCODE == res.errorCode ) {
          self.dataKT = res.data;
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

  themDonViTinh(data)
  {
    self.donViTinhService.add(data).subscribe(res=>{
      if( ERRORCODE <= res.errorCode ) {
        $("#loader").css("display", "none");
        toastr.error(res.message, 'Error!');
        //self.router.navigate(['/']);
      } else {
        if( SUCCESSCODE == res.errorCode ) {
          $('#ten').val("");
          $('#ghi_chu').val("");
          self.danhSachDonViTinh();
          toastr.success(res.message, 'Done!');
        } else {
          $("#loader").css("display", "none");
          toastr.error(res.message, 'Error!');
        }
      }
    });
  }

  // cap nhat danh muc don vi tinh
  capNhatDonViTinh(data, id) 
  {
    self.donViTinhService.update(data , id).subscribe(res=> {
      if( ERRORCODE <= res.errorCode ) {
        $("#loader").css("display", "none");
        toastr.error(res.message, 'Error!');
        //self.router.navigate(['/']);
      } else {
        if( SUCCESSCODE == res.errorCode ) {
          $('#ten').prop('readonly', false);
          $('#ten').val("");
          $('#ghi_chu').val("");
          $('input[name=hidden_id]').val('0');
          $('.title-detect').html('Add Unit Of Calculation');
          self.danhSachDonViTinh();
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
      self.donViTinhService.get(rowId).subscribe(res=> {
        if(ERRORCODE <= res.errorCode) {
          console.log(res.message);
          //self.router.navigate(['/']);
        } else {
          if( SUCCESSCODE == res.errorCode ) {
            $('input[name=hidden_id]').val(rowId);
            $('.title-detect').html('Update Unit Of Calculation');
            $('.form-control').removeClass('has-error');
            $('.form-group').removeClass('has-error');
            $("#error").hide();
            $('#ten').prop('readonly', true);
            $('#ten').val(res.data[0].ten);
            $('#ghi_chu').val(res.data[0].ghi_chu);
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
        title: 'Delete Unit Of Calculation',
        content: 'Are you sure to delete the unit of calculation?',
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
                  self.donViTinhService.delete(rowId).subscribe(res=> {
                    if( ERRORCODE <= res.errorCode ) {
                      $("#loader").css("display", "none");
                      toastr.error(res.message, 'Error!');
                      // self.router.navigate(['/']);
                    } else {
                      if( SUCCESSCODE == res.errorCode ) {
                        self.danhSachDonViTinh();
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
