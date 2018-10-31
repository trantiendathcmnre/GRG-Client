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
  providers = 'Providers List';
  home = 'Home'; 
  categories = 'Categories';
  delete = 'Delete';
  enable = 'Enable';
  disable = 'Disable';
  new_provider = 'New Provider';
  edit_provider = 'Edit Provider Information';
  name = 'Provider Name';
  address = 'Provider Address';
  email = 'Provider Email';
  phone = 'Provider Phone';
  website = 'Provider Website';
  fax = 'Provider Fax';
  cancel = 'Cancel';
  save = 'Save';

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
    // loader
    $("#loader").css("display", "block");
    // load danh sach nha cung cap
    self.DanhSachNhaCungCap();
    //editor 
    // $('.textarea').wysihtml5();

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
          ten:  { required:"Please input name of provider.", maxlength:"Name of provider is limited to 200 characters." },
          email:   { required:"Please input email of provider.", maxlength:"Email of provider is limited to 255 characters." },
          dia_chi:   { required:"Please input address of provider.", maxlength:"Address of provider is limited to 255 characters." },
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
      $("#loader").css("display", "block");
      if(self.dataRowId.length == 0) {
        $("#loader").css("display", "none");
        toastr.error('Please choose provider need enable!', 'Error!');
      } else {
        self.EnableNhaCungCap(self.dataRowId);
      }
    });

    $('#disableClient').on('click', function() {
      $("#loader").css("display", "block");
      if(self.dataRowId.length == 0) {
        $("#loader").css("display", "none");
        toastr.error('Please choose provider need disable!', 'Error!');
      } else {
        self.DisableNhaCungCap(self.dataRowId);
      }
    });

    $('#deleteClient').on('click', function() {
      if(self.dataRowId.length == 0) {
        toastr.error('Please choose provider need delete!', 'Error!');
      } else {
        $.confirm({
          title: 'Delete Provider',
          content: 'Are you sure to delete the provider?',
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
                    self.nhaCungCapService.delete(self.dataRowId).subscribe(res=> {
                      if( ERRORCODE <= res.errorCode ) {
                        $("#loader").css("display", "none");
                        toastr.error(res.message, 'Error!');
                        // self.router.navigate(['/']);
                      } else {
                        if( SUCCESSCODE == res.errorCode ) {
                          toastr.success(res.message, 'Done!');
                          self.DanhSachNhaCungCap();
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
      }
    });

    // hien modal bootstrap 
    $('#modal-default').modal({show: false, backdrop: 'static', keyboard: false }).on('show.bs.modal',function(){
      var id = $('input[name=hidden_id]').val();
      // check add 
      if(id == '0') {
        var validator = $("#frm-nha-cung-cap").validate();
        validator.resetForm();
        $('.modal-title').html('Add New Provider');
        $('.form-control').removeClass('has-error');
        $('.form-group').removeClass('has-error');
        $("#save-danh-muc-nha-cung-cap").prop('disabled', false);
        $('#ten').val("");
        $('#ten').prop('disabled', false);
        $('#dia_chi').val("");
        $('#dien_thoai').val("");
        $('#email').val("");
        $('#website').val("");
        $('#fax').val("");
      } else { // check update
        var validator = $("#frm-nha-cung-cap").validate();
        validator.resetForm();
        $('.modal-title').html('Update Provider');
        $('.form-control').removeClass('has-error');
        $('.form-group').removeClass('has-error');
        $('#reset').hide();
        $("#error").hide();
        $('#ten').val(inforData.ten);
        $('#ten').prop('disabled', true);
        $('#dien_thoai').val(inforData.dien_thoai);
        $('#email').val(inforData.email);
        $('#website').val(inforData.website);
        $('#fax').val(inforData.fax);
        $('#dia_chi').val(inforData.dia_chi);
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

  DanhSachNhaCungCap()
  {
    self.nhaCungCapService.getAll().subscribe(res=>{
      if( ERRORCODE <= res.errorCode ) {
        console.log(res);
        $("#loader").css("display", "none");
        //self.router.navigate(['/']);
      } else {
        if( SUCCESSCODE == res.errorCode ) {
          self.dataNhaCungCap=res.data;
          $("#loader").css("display", "none");
        } else {
          console.log(res.message);
          $("#loader").css("display", "none");
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
          self.DanhSachNhaCungCap();
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
        $("#loader").css("display", "none");
        toastr.error(res.message, 'Error!');
        //self.router.navigate(['/']);
      } else {
        if( SUCCESSCODE == res.errorCode ) {
          $('#frm-danh-muc-hang-xe').trigger("reset");
          toastr.success(res.message, 'Done!');
          $('#modal-default').modal('hide');
          self.DanhSachNhaCungCap();
        } else {
          $("#loader").css("display", "none");
          toastr.error(res.message, 'Error!');
        }
      }
    });
  }

  GetNhaCungCapById(id) {
    self.nhaCungCapService.get(id).subscribe(res=> {
      if(ERRORCODE <= res.errorCode) {
        $("#loader").css("display", "none");
        console.log(res.message);
        //self.router.navigate(['/']);
      } else {
        if( SUCCESSCODE == res.errorCode ) {
          $('input[name=hidden_id]').val(rowId);
          inforData = res.data[0];
          $("#loader").css("display", "none");
          $('#modal-default').modal('show');
        }
        else {
          console.log(res.message);
          $("#loader").css("display", "none");
        }
      }
    });
  }

  EnableNhaCungCap(id) {
    self.nhaCungCapService.enable(id).subscribe(res=> {
      if( ERRORCODE <= res.errorCode ) {
        $("#loader").css("display", "none");
        toastr.error(res.message, 'Error!');
        //self.router.navigate(['/']);
      } else {
        if( SUCCESSCODE == res.errorCode ) {
          toastr.success(res.message, 'Done!');
          self.DanhSachNhaCungCap();
        } else {
          $("#loader").css("display", "none");
          toastr.error(res.message, 'Error!');
        }
      }
    });
    self.dataRowId = [];
  }

  DisableNhaCungCap(id) {
    self.nhaCungCapService.disable(id).subscribe(res=> {
      if( ERRORCODE <= res.errorCode ) {
        $("#loader").css("display", "none");
        toastr.error(res.message, 'Error!');
        //self.router.navigate(['/']);
      } else {
        if( SUCCESSCODE == res.errorCode ) {
          toastr.success(res.message, 'Done!');
          self.DanhSachNhaCungCap();
        } else {
          $("#loader").css("display", "none");
          toastr.error(res.message, 'Error!');
        }
      }
    });
    self.dataRowId = [];
  }

  private bindTableEvents()
  {
    //Xu ly update
    $('i[data-group=grpEdit]').off('click').click(function(){
      self.nhaCungCapService.get(rowId).subscribe(res=> {
        if(ERRORCODE <= res.errorCode) {
          $("#loader").css("display", "none");
          console.log(res.message);
          //self.router.navigate(['/']);
        } else {
          if( SUCCESSCODE == res.errorCode ) {
            $('input[name=hidden_id]').val(rowId);
            inforData = res.data[0];
            $("#loader").css("display", "none");
            $('#modal-default').modal('show');
          }
          else {
            $("#loader").css("display", "none");
            console.log(res.message);
          }
        }
      });
    });
    
  }

}
