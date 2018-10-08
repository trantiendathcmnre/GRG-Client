import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { DonViLamViecService } from '../../services/donvilamviec.service';
import { DanhMucPhuTungService } from '../../services/danhmucphutung.service';
import { PnotifyService } from '../../services/pnotify.service';
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
  selector: 'app-danhmucphutung',
  templateUrl: './danhmucphutung.component.html',
  styleUrls: ['./danhmucphutung.component.css']
})
export class DanhmucphutungComponent implements OnInit {

  dataDonVi:any = [ ];
  pnotify = undefined;
  constructor(
      private http: Http,
      private router:Router,
      private danhMucPhuTungService: DanhMucPhuTungService,
      private donViLamViecService: DonViLamViecService,
      private menu: MenuService,
      pnotifyService: PnotifyService
  ) { this.pnotify = pnotifyService.getPNotify(); }

  ngOnInit() {
    self = this;
    self.menu.getURL(this.router.url);
    //load data don vi lam viec
    self.DanhSachDonViLamViec();
    //editor 
    $('.textarea').wysihtml5();
    //jquery validation
    $.validator.addMethod("valueNotEquals", function(value, element, arg){
      return arg !== value;
    }, "Value must not equal arg.");

    $('#frm-danh-muc-phu-tung').validate({
      debug: true,
      rules: {
          ten: { required:true, maxlength: 50 },
          donvi_id: { valueNotEquals: "0" }
      },
      messages: { 
          ten: { required:"Vui lòng nhập tên danh mục phụ tùng.", maxlength:"Tên danh mục phụ tùng chỉ tối đa 50 ký tự." },
          donvi_id: { valueNotEquals:"Vui lòng chọn đơn vị tính doanh thu."}
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
      $('#frm-danh-muc-phu-tung').validate().resetForm();
    });

    //datatable
    tbl = $('#tbl-danh-muc-phu-tung').DataTable({
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
          { data: "ten", render: function (data, type, row) {
            return self.RutGonChuoi(data, LIMIT);
          }},
          { data: "mo_ta", render: function (data, type, row) {
            return self.RutGonChuoi(data, LIMIT);
          }},
          { data: "ten_donvi"},
          {data: null,className: "text-center",render: function (data, type, row) {
            return '<i data-group="grpEdit" class="fa fa-edit pointer" title="Sửa"></i>&nbsp;&nbsp;'+
            '<i data-group="grpDelete" class="fa fa-trash pointer" title="Xóa"></i>';
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

    //them danh muc phu tung
    $('#frm-danh-muc-phu-tung').on('submit', function () {
      // check hidden id
      var hiddenId = $('input[name=hidden_id]').val();
      // get data form 
      var data = $('#frm-danh-muc-phu-tung').serializeArray().reduce(function(obj, item) {
        obj[item.name] = item.value;
        return obj;
      }, {});
      if(hiddenId == 0) {
        self.ThemDanhMucPhuTung(data);
      }

      

    });

  }

  DanhSachDonViLamViec()
  {
    self.donViLamViecService.get
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

  DanhMucPhuTung()
  {
    self.danhMucPhuTungService.getAll().subscribe(res=>{
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

  ThemDanhMucPhuTung(data)
  {
    self.danhMucPhuTungService.add(data).subscribe(res=>{
      if( ERRORCODE <= res.errorCode ) {
        console.log(res);
        //self.router.navigate(['/']);
      } else {
        if( SUCCESSCODE == res.errorCode ) {
          self.ThongBaoThanhCong("Thêm thành công");
          self.DanhMucPhuTung();
          $('#frm-danh-muc-phu-tung').validate().resetForm();
        } else {
          console.log(res.message);
        }
      }
    });
  }

  private bindTableEvents()
    {
      // //Xu ly update
      //   $('i[data-group=grpEdit]').off('click').click(function(){

      //     var rowId=$(this).closest('tr').attr('id');
      //     self.danhmucphutungService.get(rowId).subscribe(res=>{
      //       if(res.errorCode>=5)
      //       {
      //         console.log(res);
      //         self.router.navigate(['/']);
      //       }
      //       else
      //       {
      //         if(res.errorCode == 0)
      //         {
      //           $('#hideId').val(rowId);
      //           inforData=res.data;
      //           $('#exampleModal').modal('show');
      //         }
      //         else
      //         {
      //           console.log(res.message);
      //         }
      //       }
      //   });
      //   })
        //Xu lý xóa
        $('i[data-group=grpDelete]').off('click').click(function(){
          var rowId=$(this).closest('tr').attr('id');
          $.confirm({
            title: 'Thông báo !',
            content: 'Bạn có muốn xóa danh mục phụ tùng này không ?',
            type: 'red',
            typeAnimated: true,
            buttons: {
                tryAgain: {
                    text: 'Có',
                    btnClass: 'btn-danger',
                    action: function(){
                      self.danhMucPhuTungService.delete(rowId).subscribe(res=> {
                        if(res.errorCode>=5) {
                          console.log(res);
                          // self.router.navigate(['/']);
                        } else {
                          if(res.errorCode==0) {
                            alert("Thành công");
                            self.DanhMucPhuTung();
                          } else {
                            alert("Thất bại");
                            self.DanhMucPhuTung();
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
