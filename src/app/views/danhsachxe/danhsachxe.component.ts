import { Component, OnInit } from '@angular/core';
import {Http,Headers,Response, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { XeService } from '../../services/xe.service';
import { ApisService } from '../../services/apis.service';
declare var $:any;
var self:any;
var tbl, inforData,dataKT;
var result_name;

@Component({
  selector: 'app-danhsachxe',
  templateUrl: './danhsachxe.component.html',
  styleUrls: ['./danhsachxe.component.css']
})
export class DanhSachXeComponent implements OnInit {

  constructor( private xeService: XeService, private apisService: ApisService ) { }

  ngOnInit() {
    self = this;

    $('#trang_thai').select2();
    $('#trang_thai').on('select2:select', function (e) {
      $("#loader").css("display", "block");
      let trang_thai = $('#trang_thai').val();
      self.loadReader(trang_thai);
      // Do something
    });
    tbl = $('#dsxe').DataTable({
      "ordering": false,
      "info": false,
      "searching": false,
      "paging":   false,
      iDisplayLength: 25,
      //sap xep cot 3 tang dan
      rowId: "id",
      columns:[
        { data: "ten_dong_xe" },
        { data: "ten_khach_hang" },
        { data: "bien_so" },
        { data: "so_vin" },
        { data: "so_khung" },
        { data: "mau_xe" },
        { data: "ngay_cap_nhat" },
        { data: "trang_thai", className: "text-center", render: function (data, type, row) {
          if(data=='1')
            return '<span class="badge bg-green">Active</span>';
          else
            return '<span class="badge bg-red">Not Approve</span>'; 
        }},
        { data:"trang_thai", className: "text-center",render: function (data, type, row) {
          if( data == '0' )
            return '<a class="btn btn-primary-action m-r-xs" data-group="grpEdit" title="Approve" ><i class="fa fa-check"></i></a>';
          else
            return '';
        }}
      ],
      //load data
      initComplete: function(setting, json){
        //self.loadReader();
         $("select[name=tbl_length]").select2({ width: '80px', minimunResultsForSearch: -1});
      },
      drawCallback: function(settings){
           self.bindTableEvents();
      }
    });

    //xac nhan phe duyet xe
      $('#btn_xn').click(function(){
        let data = { 
          "id": $(this).closest('tr').attr('id') 
        };
        self.xeService.pheDuyetXe(data).subscribe(res=> {
          if( res.errorCode == 0 )
          {
            self.xeService.dienThoaiKhachHang(data.id).subscribe(res=> {
              if(res.errorCode==0) {
                self.loadReader('1');
              }
            });
          }
        });
      });
  }

  private loadReader(trang_thai) {
    self.xeService.getTrangThaiXe(trang_thai).subscribe(res=>{
      if( res.errorCode >= 5 ) {
        console.log(res);
        self.router.navigate(['/']);
        $("#loader").css("display", "none");
      } else {
        if(res.errorCode == 0) {
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
private bindTableEvents()
{
  $('a[data-group = grpEdit]').off('click').click(function(){
      let id = $(this).closest('tr').children().eq(1)[0].textContent;
      $('#BS').text(id);
      $('#modelxacnhan').modal('show');
  });
}

}
