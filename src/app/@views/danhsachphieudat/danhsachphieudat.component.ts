import { Component, OnInit } from '@angular/core';
import { Http,Headers,Response, RequestOptions } from '@angular/http';
import { LapPhieuDatService } from '../../@services/lapphieudat.service';
import { HangXeService } from '../../@services/hangxe.service';
import { DongXeService } from '../../@services/dongxe.service';
import { DanhMucPhuTungService } from '../../@services/danhmucphutung.service';
import { PhuTungService } from '../../@services/phutung.service';
import { NhaCungCapService } from '../../@services/nhacungcap.service';
import { ApisService } from '../../@services/apis.service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { Router } from '@angular/router';

declare var $, toastr:any;
declare var moment, window: any;
var self : any;
var tbl, tblchitiet: any;
declare var pdfMake:any;

@Component({
  selector: 'app-danhsachphieudat',
  templateUrl: './danhsachphieudat.component.html',
  styleUrls: ['./danhsachphieudat.component.css']
})
export class DanhSachPhieuDatComponent implements OnInit {

  maPhieu:string;
  check = "0";
  message:string;
  dataHangXe:any = [];
  dataDongXe:any = [];
  dataDMPhuTung:any = [];
  dataPhuTung:any = [];
  constructor(
    private router:Router,
    private nhaCungCapService: NhaCungCapService,
    private phuTungService: PhuTungService,
    private lapPhieuDatService: LapPhieuDatService,
    private http: Http,
    private hangXeService: HangXeService,
    private dongXeService: DongXeService,
    private danhMucPhuTungService: DanhMucPhuTungService,
    private apisService: ApisService
  ) {
    toastr.options = {
      "positionClass": "toast-top-center"
    };
  }

  ngOnInit() {
    self = this;
    $("#loader").css("display", "block");
    self.getDataHangXe();
    self.getDataDMPhuTung();
    $('#btn_in_phieu').click(function(){
      let dataPRINT = [];
      self.lapPhieuDatService.getPD(self.maPhieu).subscribe(res=>{
        console.log(res);
        let tenncc = res.data[0].ten_ncc;
        let diachi_ncc = res.data[0].DIACHI_NCC;
        let sdt_ncc = res.data[0].SDT_NCC;
        let ghichu = res.data[0].ghi_chu;
        let nguoilap = res.data[0].nguoi_lapDAT;
        var ngaylap = moment(res.data[0].ngay_lap).format("DD-MM-YYYY");
        let ngay = moment(new Date()).format('DD');
        let thang = moment(new Date()).format('MM');
        let nam1 = moment(new Date()).format('YYYY');
        // self.nguoiDungService.thongtin_acc(nguoilap).subscribe(res=>{
        //   if(res.errorCode==0)
        //   {
        //     let nam=res.data.FULLNAME;
        //     self.lapphieudatService.get(self.maPhieu).subscribe(res => {
        //       if(res.errorCode==0)
        //       {
        //         let dem=0;
        //         for(let i of res.data)
        //                 {
        //                   let item={"id_phu_tung":i.id_phu_tung,"TENPHUTUNG":i.TENPHUTUNG,"DVT":i.TENDVT,"so_luong_dat":i.so_luong_dat};
        //                   dataPRINT.push(item);
        //                   dem++;
        //                 }
        //         if(dem==res.data.length)
        //         {
        //           var docDefinition = {
        //             pageSize: 'A4',
        //     content: [
        //     {
        //       columns: [
        //       {
        //         width:'auto',
        //         stack: [
        //             // second column consists of paragraphs
        //             {text:'CÔNG TY GARAGE QUY THÔNG',fontSize:13,bold:true},
        //             'Địa chỉ:140 Lê Trọng Tấn-Tân Phú-Hồ Chí Minh',
        //             'Tell:01694040156'
        //           ],
        //       }
        //       ,
        //       {
        //          image:'data:image/jpeg;base64,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',
        //          fit:[120,100],
        //          alignment:'right'
        //       }
        //       ],
        //       // optional space between columns
        //         columnGap: 100
             
        //     },
        //     {text:'ĐƠN ĐẶT HÀNG',fontSize:22,bold:true,alignment:'center',
        //     margin: [0, 10, 0,10],
        //     color: '#007bff',
        //     },
        //     {
        //       lineHeight: 1.5,
        //       columns: [
        //       {
        //         width:'auto',
        //         stack: [
        //             // second column consists of paragraphs
        //             'Nhà cung cấp:'+tenncc,
        //             'Địa chỉ:'+diachi_ncc,
        //             'Điện thoại:'+sdt_ncc,
        //             'Ghi chú:'+ghichu,
        //           ],
        //           border: [true,true,true,true],
                
        //       }
        //       ,
        //       {
        //         width:'auto',
        //         stack: [
        //             // second column consists of paragraphs
        //             'Người gửi:'+nam,
        //             'Mã phiếu:'+self.maPhieu,
        //             'Ngày lập:'+ngaylap
        //           ],
        //       }
        //       ],
        //       // optional space between columns
        //         columnGap: 100,
        //     },
        //     {
        //         margin: [0, 10, 0,10],
        //         text:'CHI TIẾT HÀNG',fontSize:13,bold:true,alignment:'left'
        //     },
        //     self.table(dataPRINT, ['id_phu_tung', 'TENPHUTUNG','DVT','so_luong_dat']),
        //     {text:'HCM,Ngày '+ngay+' Tháng '+thang+' Năm '+nam1,fontSize:10,alignment:'right',
        //     margin: [0, 10, 0,10]
        //     },
        //     {
        //         columns:[
        //             {
        //                 margin: [0, 10, 0,0],
        //                 text:'Nhà cung cấp',alignment:'left'  
        //             },
        //             {
        //                 margin: [0, 10, 0,0],
        //                 text:'Người lập phiếu',alignment:'right'  
        //             }
        //         ]
        //     },
        //     {
        //         columns:[
        //             {
        //                 margin: [0, 0, 0,0],
        //                 text:'(Kí,họ tên)',alignment:'left'  
        //             },
        //             {
        //                 margin: [0, 0, 0,0],
        //                 text:'(Kí,họ tên)',alignment:'right'  
        //             }
        //         ]
        //     },
        //     {
        //         columns:[
        //             {
        //                 margin: [0, 30, 0,0],
        //                 text:'',alignment:'left'  
        //             },
        //             {
        //                 margin: [0, 30, 0,0],
        //                 text:nam,alignment:'right'  
        //             }
        //         ]
        //     }
        //     ],
            
        //     };
        //     pdfMake.createPdf(docDefinition).print({}, window);
        //         }
        //       }
           
        //     {

        //     }
        //   });
        //   }
        // });
      });
    });
    $('#btn_cap_nhat').click(function(){
      var ma_phieu_dat_hang = $('#ma_phieu_dat_hang').text();
      var ghi_chu = $('#ghi_chu').val();
      var data:any = {
        "data": [],
        "phieu": {}
      };
      data.phieu = {
        "ma_phieu_dat_hang": ma_phieu_dat_hang,
        "ghi_chu": ghi_chu
      };
      tblchitiet.rows().eq(0).each( function ( index ) {
        var id_phu_tung = tblchitiet.cell(index,1).nodes()[0].textContent;
        var so_luong_dat = Number(tblchitiet.cell(index,4).nodes()[0].textContent);
        var item = {
          "id_phu_tung":id_phu_tung,
          "so_luong_dat":so_luong_dat
        };
        data.data.push(item);
      });
      if(data.data.length==0){
        toastr.error('Update fail. Please choose accessary to order.', 'Error!');
        return;
      }
      self.lapPhieuDatService.update(data).subscribe(res=> {
        if( res.errorCode == 0 ) {
          $('#exampleModal').modal('hide');
          toastr.success('Cập nhật thành công', 'Thành công!');
          self.loadTable();
        }
      });
    });

    $(".select2").select2();

    $('#id_phu_tung').on('select2:select', function (e) {
      $('.sl').removeClass('d-none');
    })

    $('#id_hang_xe').on('select2:select', function (e) {
      var id_hang_xe = e.params.data.id;
      if(id_hang_xe == '0') {
        self.dongXeService.getAll().subscribe(res=> {
          if(res.errorCode==0) {
            self.dataDongXe = res.data;
          }
        });
      }
      else {
        self.dongXeService.search(id_hang_xe).subscribe(res=>{
          if(res.errorCode == 0) {
            self.dataDongXe = res.data;
          }
        });
      }
    });

    $('#btn_tim_kiem').click(function(){
      $("#loader").css("display", "block");
      var id_hang_xe = $('#id_hang_xe').val();
      var id_dong_xe = $('#id_dong_xe').val();
      var id_danh_muc_phu_tung = $('#id_danh_muc_phu_tung').val();
      var id_ncc = $('#id_ncc').val();
      self.phuTungService.searchPhuTung(id_hang_xe, id_dong_xe, id_danh_muc_phu_tung, id_ncc).subscribe(res=>{
        if( res.errorCode == 0 ) {
          self.dataPhuTung = res.data;
          $('.sl').addClass('d-none');
        }
        $("#loader").css("display", "none");
      });
    });

    $('#btn_them_phu_tung_dat').click(function(){
      $("#loader").css("display", "block");
      var so_luong_dat = $('#so_luong_dat').val();
      var id_phu_tung = $('#id_phu_tung').val();
      var flag = true;

      if(so_luong_dat=='') {
        $("#loader").css("display", "none");
        toastr.error('Please input amount.', 'Error!');
        return;
      }

      if(Number(so_luong_dat)==0) {
        $("#loader").css("display", "none");
        toastr.error('Amount has more than 0', 'Error!');
        return;
      }

      tblchitiet.rows().eq(0).each( function ( index ) {
        var s = tblchitiet.cell(index,1).data();
        if(s == id_phu_tung)  {
          var so_luong_old = tblchitiet.cell(index,4).nodes()[0].textContent;
          tblchitiet.cell(index,4).nodes()[0].textContent = Number(so_luong_dat) + Number(so_luong_old);
          flag = false;
          return;
        }
      });

      if(flag) {
        self.phuTungService.get(id_phu_tung).subscribe(res=> {
          if(res.errorCode==0)
          {
            tblchitiet.row.add( {
              null:'',
              "id_phu_tung": id_phu_tung,
              "ten_phu_tung": res.data[0].ten_phu_tung,
              "ten_don_vi_tinh":res.data[0].ten_don_vi_tinh,
              "so_luong_dat":so_luong_dat
            } ).draw( false );
          }
        });
      }
        
        $("#loader").css("display", "none");
    });

    tblchitiet = $("#chitiet").DataTable({
      "ordering": false,
      "info": false,
      "searching": false,
      "paging":   false,
      columnDefs: [
          { orderable: false, targets: [0]}
      ],
      iDisplayLength: 10,
      order: [[1, "desc"]],
      aaData: null,
      rowId: "id_phu_tung",
      columns: [
        { data: null, className: "text-center" },
        { data: "id_phu_tung" },
        { data: "ten_phu_tung" },
        { data: "ten_don_vi_tinh" },
        { data: "so_luong_dat" },
        { data: null,className: "text-center",render: function (data, type, row){
          return '<a class="btn btn-primary-action m-r-xs" data-group="grpDelete" title="Remove Accessary" ><i class="fa fa-trash"></i></a>';
        }}
      ],
      initComplete: function (settings, json) {
        //self.loadTableChiTiet();
         $("select[name=tbl_length]").select2({ width: '80px', minimumResultsForSearch: -1 });
      },
      drawCallback: function( settings ) {
        self.bindTableEventsChiTiet();
      },
      rowCallback: function(row, data, index) {
        tblchitiet.cell(index,0).nodes()[0].textContent=index+1;
      }
    });
    //----------------------
    //----------------------
    tbl = $("#phieu-dat-table").DataTable({
      ordering: false,
      searching: false,
      bLengthChange : false,
      iDisplayLength: 10,
      rowId: "id",
      columns: [
        { data: "ma" }, 
        {data: "ngay_lap", className: "text-center",render: function(data){
          var k= moment(data,"YYYY-MM-DD HH:mm");
          return moment(data).format("DD-MM-YYYY HH:mm"); 
        }},          
        { data: "ten" },
        { data: "tong_phu_tung" },
        { data: "ghi_chu"},
        { data: "trang_thai", className: "text-center",render: function(data) {
          if(data == '1')
            return '<span class="badge bg-yellow">Not Approved</span>';
          else if(data == '2')
            return '<span class="badge bg-blue">Pending</span>';
          else if( data == '3')
              return '<span class="badge bg-green">Approved</span>';
          else
              return '<span class="badge bg-red">Canceled</span>';
        }},
        { data: "trang_thai",className: "text-center" ,render: function (data, type, row) {
          if(data!='3') {
            if(data == "0")
              return '<a class="btn btn-primary-action m-r-xs" data-group="grpRecovery" title="Recovery Order" ><i class="fa fa-refresh"></i></a>';
            var detail = '<a class="btn btn-primary-action m-r-xs" data-group="grpDeTail" title="Detail Order" ><i class="fa fa-eye"></i></a>';
            if(data == "1") {
              detail += '<a class="btn btn-primary-action m-r-xs" data-group="grpUnLike" title="Approve Order" ><i class="fa fa-check"></i></a>' +
                        '<a class="btn btn-primary-action m-r-xs" data-group="grpEdit" title="Edit Order" ><i class="fa fa-edit"></i></a>' +
                        '<a class="btn btn-primary-action m-r-xs" data-group="grpDelete" title="Delete Order" ><i class="fa fa-trash"></i></a>';
            }else
              detail += '<a class="btn btn-primary-action m-r-xs" data-group="grpLike" title="Cancel Approvation" ><i class="fa fa-remove"></i></a>';
            return detail;
          }
          else
            return '<a class="btn btn-primary-action m-r-xs" data-group="grpDeTail" title="Detail Order" ><i class="fa fa-eye"></i></a>';
          
          // +
          // '<i data-group="grpDelete" class="fa fa-trash pointer" title="Hủy Phiếu"></i>';
        }}
      ],
      initComplete: function (settings, json) {
        self.loadTable();
        $("select[name=tbl_length]").select2({ width: '80px', minimumResultsForSearch: -1 });
      },
      drawCallback: function( settings ) {
        self.bindTableEvents();
      }
    });

    //su kien click xem cho tiet phieu dat
    $('#phieu-dat-table_wrapper').removeClass("container-fluid");

  }

  private loadTable() {
    self.lapPhieuDatService.getAll().subscribe(res => {
      if (res.errorCode == 0) {
        tbl.clear().draw();
        tbl.rows.add(res.data); 
        tbl.columns.adjust().draw();
        $("#loader").css("display", "none");
      } else {
        console.log(res.errorMessage);
        $("#loader").css("display", "none");
      }
    });
  }

  private bindTableEventsChiTiet() {
    $('a[data-group=grpDelete]').off('click').click(function(){
      tblchitiet
        .row( $(this).parents('tr') )
        .remove()
        .draw();
    });
  }

  private loadTableChiTiet(ma_phieu_dat_hang, isUpdate) {
    self.lapPhieuDatService.get(ma_phieu_dat_hang).subscribe(res => {
      if (res.errorCode == 0) {
        tblchitiet.clear().draw();
        tblchitiet.rows.add(res.data); 
        tblchitiet.columns.adjust().draw();
        if(!isUpdate)
          tblchitiet.rows().eq(0).each( function ( index ) {
            tblchitiet.cell(index,5).nodes()[0].textContent='';
          });
        $('#exampleModal').modal('show');
        $("#loader").css("display", "none");
      } else {
        console.log(res.errorMessage);
        $("#loader").css("display", "none");
      }
    });
  }

  private bindTableEvents() {
    var rowId;
    $('a[data-group=grpLike]').off('click').click(function() {
      $("#loader").css("display", "block");
      rowId = $(this).closest('tr').attr('id');
      self.maPhieu = rowId;
      self.check = "1";
      self.message = 'Are you sure to cancel the approvation?';
      self.confirm(self.message, self.maPhieu, self.check);
    });
    $('a[data-group=grpUnLike]').off('click').click(function() {
      $("#loader").css("display", "block");
      rowId = $(this).closest('tr').attr('id');
      self.maPhieu = rowId;
      self.check = "2";
      self.message = 'Are you sure to approve the order?';
      self.confirm(self.message, self.maPhieu, self.check);
    });
    $('a[data-group=grpDelete]').off('click').click(function(){
      $("#loader").css("display", "block");
      rowId = $(this).closest('tr').attr('id');
      self.maPhieu = rowId;
      self.check = "0";
      self.message = 'Are you sure to cancel the order?';
      self.confirm(self.message, self.maPhieu, self.check);
    });
    $('a[data-group=grpRecovery]').off('click').click(function(){
      $("#loader").css("display", "block");
      rowId = $(this).closest('tr').attr('id');
      self.maPhieu = rowId;
      self.check = "1";
      self.message = 'Are you sure to recovery the order?';
      self.confirm(self.message, self.maPhieu, self.check);
    });
    $('a[data-group=grpDeTail]').off('click').click(function(){
      $("#loader").css("display", "block");
      rowId = $(this).closest('tr').attr('id');
      $('#btn_in_phieu').removeClass('d-none');
      $('#btn_cap_nhat').addClass('d-none');
      self.maPhieu = rowId;
      self.lapPhieuDatService.getPD(rowId).subscribe(res=>{
        if(res.errorCode==0) {
          $('#ma_phieu_dat_hang').val(res.data[0].ma);
          $('#ten_ncc').val(res.data[0].ten);
          $('#id_ncc').val(res.data[0].id_nha_cung_cap);
          $('#ngay_lap').val(moment(res.data[0].ngay_lap).format("DD-MM-YYYY HH:mm"));
          $('#nguoi_lap').val(res.data[0].nguoi_lap);
          $('#tong_so_phu_tung').val(res.data[0].tong_phu_tung);
          $('#ghi_chu').val(res.data[0].ghi_chu);
          self.loadTableChiTiet( rowId, false );
          $('.capnhatDH').hide();
        }
      });
    });
    $('a[data-group=grpEdit]').off('click').click(function(){
      $("#loader").css("display", "block");
      var rowId=$(this).closest('tr').attr('id');
      $('#btn_in_phieu').addClass('d-none');
      $('#btn_cap_nhat').removeClass('d-none');
      self.lapPhieuDatService.getPD(rowId).subscribe(res=>{
        if(res.errorCode==0) {
          $('#ma_phieu_dat_hang').val(res.data[0].ma);
          $('#ten_ncc').val(res.data[0].ten);
          $('#id_ncc').val(res.data[0].id_nha_cung_cap);
          $('#ngay_lap').val(moment(res.data[0].ngay_lap).format("DD-MM-YYYY HH:mm"));
          $('#nguoi_lap').val(res.data[0].nguoi_lap);
          $('#tong_so_phu_tung').val(res.data[0].tong_phu_tung);
          $('#ghi_chu').val(res.data[0].ghi_chu);
          self.loadTableChiTiet(rowId,true);
          $('.capnhatDH').show();
        }
      });
    })

  }
  
  private getDataHangXe() {
    self.hangXeService.getAll().subscribe(res=>{
      if(res.errorCode==0)
      {
      self.dataHangXe=res.data;
      }
    });
  }

  private getDataDMPhuTung() {
    self.danhMucPhuTungService.getAll().subscribe(res=>{
      if(res.errorCode==0)
      {
      self.dataDMPhuTung=res.data;
      }
    });
  }

  private buildTableBody(data, columns) {
    var body = [];
  
    body.push(columns);
  
    data.forEach(function(row) {
        var dataRow = [];
  
        columns.forEach(function(column) {
            dataRow.push(String(row[column]));
        })
  
        body.push(dataRow);
    });
  
    return body;
  }
  
  private table(data, columns) {
    return {
        table: {
            headerRows: 1,
            widths: [ '*', 'auto', 100, '*' ],
            body: self.buildTableBody(data, columns)
        }
    };
  }

  private confirm ( message, maPhieu, check) {
    $.confirm({
      title: 'Delete Category',
      content: message,
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
                var data = {
                  "id": maPhieu,
                  "trang_thai": check
                };
                self.lapPhieuDatService.xacnhanPD(data).subscribe(res => {
                  if(res.errorCode == 0){
                    toastr.success('Đã xác nhận phiếu đặt', 'Thành công!');
                    self.loadTable();
                  }
                  $("#loader").css("display", "none");
                });
              }
          }
      }
    });
  }

}
