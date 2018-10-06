import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import { PnotifyService } from '../../services/pnotify.service';
import { HangXeService } from "../../services/hangxe.service";
import { MenuService } from '../../services/menu.service';

const ERRORCODE = 5;
const SUCCESSCODE = 0;
const LIMIT = 30;
declare var $:any;
var self:any;
var tbl:any;
var count:number;
var replace:string;

@Component({
  selector: 'app-hangxe',
  templateUrl: './hangxe.component.html',
  styleUrls: ['./hangxe.component.css']
})
export class HangxeComponent implements OnInit {

  dataHangXe:any = [ ];
  pnotify = undefined;
  route = undefined;

  constructor(
      private http: Http,
      private hangXeService: HangXeService,
      private router:Router,
      private menu: MenuService,
      pnotifyService: PnotifyService
  ) { 
      this.pnotify = pnotifyService.getPNotify();
  }

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

    //datatable
    tbl = $('#tbl-danh-muc-hang-xe').DataTable({
        columnDefs: [
          { orderable: false, targets: [ 0, 4 ] }
        ],
        aLengthMenu: [
          [ 10, 25, 50, 100, -1 ],
          [ 10, 25, 50, 100, "Tất cả" ]
        ],
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
          //self.bindTableEvents();
        }
    });

    //custom stt datatable
    tbl.on('order.dt search.dt', function(){
      tbl.column(0, {search: 'applied', order: 'applied'}).nodes().each(function(cell,i){
        cell.innerHTML = i + 1;
      })
    }).draw();

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
  newMessage() {
    self.menu.changeMessage("Hello from Sibling")
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
        console.log(res);
        //self.router.navigate(['/']);
      } else {
        if( SUCCESSCODE == res.errorCode ) {
          alert("Thêm thành công");
          self.DanhMucHangXe();
          $('#frm-danh-muc-hang-xe').trigger('reset');
        } else {
          console.log(res.message);
        }
      }
    });
  }

 
  /**
	 * pnotify thong bao thanh cong
	 * @param string message
	 * @return unknown message pnotify
	 */
  ThongBaoThanhCong(message) 
  {
    self.pnotify.success({
      title: 'Thành công!',
      text: self.message,
      type: 'success',
      addclass: 'custom',
      nonblock: {
        nonblock: true
      }
    });
  }


}
