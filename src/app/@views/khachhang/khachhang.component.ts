import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { KhachHangService } from '../../@services/khachhang.service';
import { XeService } from '../../@services/xe.service';
import { DonHangService } from '../../@services/donhang.service';

declare var $, toastr: any;
var self, tbl, tbl2, tbl3, tbl4, tbl5, tbl6, tbl7, tbl8, inforData, dataKT, result_name, ngay_sinh, gioi_tinh, validator, sendMailValidator, sendSmsValidator, text, message :any;
var id_tinh_thanh, id_quan_huyen, id_phuong_xa = null;
var ten_tinh_thanh , ten_quan_huyen, ten_phuong_xa: string = '';
var rowId: any = 0;
var dataQuanHuyen = [];
import * as moment from 'moment';

@Component({
  selector: 'app-khachhang',
  templateUrl: './khachhang.component.html',
  styleUrls: ['./khachhang.component.css']
})
export class KhachHangComponent implements OnInit {

  public dataTinhThanh:any = [];
  public dataPhuongXa:any = [];
  public dataSend:any = [];
  public dataSendMail:any = [];
  public dataSendSms:any = [];
  public dataTable2:any = [];
  constructor(
    private router:Router,
    private khachHangService: KhachHangService,
    private xeService: XeService,
    private donHangService: DonHangService
  ) { }

  ngOnInit() {
    self = this;

    // loader display
    $("#loader").css("display", "block");
  
    // select2
    $('select[name=tinhthanh]').select2({
      placeholder: "Chọn Tỉnh/Thành phố"
    });

    $("#compose-textarea").wysihtml5();

    // datetimepicker ngay sinh 
    $('#ngay_sinh').daterangepicker({
      singleDatePicker: true,
      showDropdowns: true,
      autoUpdateInput: true,
      locale: {
        format: 'YYYY-MM-DD'
      }
    });

    // datetimepicker ngay thanh toan
    $('#ngaythanhtoan').daterangepicker({
      singleDatePicker: true,
      timePicker: true,
      showDropdowns: true,
      autoUpdateInput: true,
      locale: {
        format: 'YYYY-MM-DD HH:mm:ss'
      }
    });

    // radio button icheck
    $('input[type="checkbox"].flat-red, input[type="radio"].flat-red').iCheck({
      checkboxClass: 'icheckbox_flat-green',
      radioClass   : 'iradio_flat-green'
    })

    // jquery validate
    validator = $('#form-khach-hang').validate();
    sendMailValidator = $('#form-send-mail').validate();
    sendSmsValidator = $('#form-send-sms').validate();
      
    //table thong tin khach hang
    tbl = $("#khachhang").DataTable({
      "ordering": false,
      "info": false,
      aLengthMenu: [
        [10, 25, 50, 100, -1],
        [10, 25, 50, 100, "Tất cả"]
      ],
      iDisplayLength: 10,
      aaData: null,
      rowId: "id",
      language: 
      {
        "sProcessing":   "Đang xử lý...",
        "sLengthMenu":   "Xem _MENU_ mục",
        "sZeroRecords":  "Không tìm thấy dữ liệu",
        "sInfo":         "Đang xem _START_ đến _END_ trong tổng số _TOTAL_ mục",
        "sInfoEmpty":    "Đang xem 0 đến 0 trong tổng số 0 mục",
        "sInfoFiltered": "(được lọc từ _MAX_ mục)",
        "sInfoPostFix":  "",
        "sSearch":       "Tìm:",
        "sUrl":          "",
        "oPaginate": {
            "sFirst":    "Đầu",
            "sPrevious": "Trước",
            "sNext":     "Tiếp",
            "sLast":     "Cuối"
        }
      },
      columns: [
        { data: "ma" ,className: "text-center", render : function (data) {
          return '<a class="chi-tiet-khach-hang">'+ data + '</a>';
        }}, 
        { data: "ten" , render : function (data) {
          return '<a class="chi-tiet-khach-hang">'+ data + '</a>';
        } },
        {data: "gioi_tinh", render:function(data){
          data = data == '0' ? 'Nữ' : 'Nam'
          return data;
        }},
        { data: "ngay_sinh", render:function(data) {
          data = data == null ? 'N/A' : moment(data).format( "DD/MM/YYYY");
          return data;
        }},  
        { data: "dia_chi", render: function(data) {
          return data;
        }},
        { data: null,className: "text-center" , render: function (data, type, row){
          return '<a class="btn btn-primary-action m-r-xs" data-group="grpViewHistory" title="Xem lịch sử thanh toán" ><i class="fa fa-calendar"></i></a>' +
              '<a class="btn btn-primary-action m-r-xs" data-group="grpEdit" title="Cập nhật thông tin khách hàng" ><i class="fa fa-edit"></i></a>';
        }}
      ],
      initComplete: function (settings, json) {
        // load data into table
        self.loadReader();
      },
      drawCallback: function( settings ) {
        // binding data
        self.bindTableEvents();
      }
    });

    // table thong tin khach hang
    tbl2 = $("#tbl-xe").DataTable({
      "ordering": false,
      "info": false,
      "searching": false,
      "paging":   false,
      rowId: "id",
      language: 
      {
        "sProcessing":   "Đang xử lý...",
        "sZeroRecords":  "Không tìm thấy dữ liệu"
      },
      columns: [
        { data: "bien_so" ,className: "text-center", render : function (data) {
          return '<a class="chi-tiet-xe">'+ data + '</a>';
        }}, 
        { data: "ten_hang_xe" , render : function (data) {
          return '<a class="chi-tiet-xe">'+ data + '</a>';
        } },
        {data: "model"},
        { data: "doi_xe"}
      ],
      drawCallback: function( settings ) {
        // load data into tbl2
        self.tbl2CallBack();
      }
    });

    // table lich su sua chua
    tbl3 = $("#dssuachua").DataTable({
      "ordering": false,
      "info": false,
      "searching": false,
      "paging":   false,
      rowId: "id",
      language: 
      {
        "sProcessing":   "Đang xử lý...",
        "sZeroRecords":  "Không tìm thấy dữ liệu"
      },
      columns: [
        { data: "bien_so",className:"font-weight-bold" },  
        {data: "tien_phu_tung",className: "text-center", render: function (data) {
          data = data.toLocaleString('vi', {style : 'currency', currency : 'VND'});
          return data;
        }}, 
        {data: "tien_nhan_cong",className: "text-center", render: function (data){
          data = data.toLocaleString('vi', {style : 'currency', currency : 'VND'});
          return data;
        }},
        {data: "chiet_khau",className: "text-center",render:function(data){
          data = data.toLocaleString('vi', {style : 'currency', currency : 'VND'});
          return data;
        }},
        {data: "giam_tru_khac",className: "text-center",render:function(data){
          data = data.toLocaleString('vi', {style : 'currency', currency : 'VND'});
          return data;
        }},
        {data: "thanh_toan",className: "text-center",render:function(data){
          data = data.toLocaleString('vi', {style : 'currency', currency : 'VND'});
          return data;
        }},
        {data: null},
        {data: 'ghi_chu'}
      ],
      rowCallback: function(row, data, index) { 
        // calculate tien con = tong tien - chiet khau - giam tru khac - thanh toan
        var con_no = (data.tong_tien - data.chiet_khau - data.giam_tru_khac  - data.thanh_toan).toLocaleString('vi', {style : 'currency', currency : 'VND'});
        // append data vao tbl3
        tbl3.cell(index,6).nodes()[0].textContent = con_no;
        // binding data tbl3
        self.tbl3drawCallback(data, con_no);
      }
    });

    // table cong don hang
    tbl4 = $('#table-chi-tiet-nhan-cong').DataTable({
      "ordering": false,
      "info": false,
      "searching": false,
      "paging":   false,
      rowID: "id",
      language: 
      {
        "sProcessing":   "Đang xử lý...",
        "sZeroRecords":  "Không tìm thấy dữ liệu"
      },
      columns: [
        { data: "ten",className:"font-weight-bold" },  
        { data: "so_luong",className: "text-center" }, 
        { data: "don_gia",className: "text-center", render: function (data){
          data = data.toLocaleString('vi', {style : 'currency', currency : 'VND'});
          return data;
        }},
        {data: "giam_tru_cong",className: "text-center",render:function(data){
          data = data.toLocaleString('vi', {style : 'currency', currency : 'VND'});
          return data;
        }},
        {data: "thue_cong",className: "text-center",render:function(data){
          data = data.toLocaleString('vi', {style : 'currency', currency : 'VND'});
          return data;
        }},
        {data: "thanh_tien",className: "text-center",render:function(data){
          data = data.toLocaleString('vi', {style : 'currency', currency : 'VND'});
          return data;
        }}
      ]
    });

    // table chi tiet vat tu
    tbl5 = $('#table-chi-tiet-vat-tu').DataTable({
      "ordering": false,
      "info": false,
      "searching": false,
      "paging":   false,
      rowID: "id",
      language: 
      {
        "sProcessing":   "Đang xử lý...",
        "sZeroRecords":  "Không tìm thấy dữ liệu"
      },
      columns: [
        { data: "ten_phu_tung",className:"font-weight-bold" },  
        { data: "so_luong",className: "text-center" }, 
        { data: "don_gia",className: "text-center", render: function (data){
          data = data.toLocaleString('vi', {style : 'currency', currency : 'VND'});
          return data;
        }},
        {data: "giam_tru_phu_tung",className: "text-center",render:function(data){
          data = data.toLocaleString('vi', {style : 'currency', currency : 'VND'});
          return data;
        }},
        {data: "thue_phu_tung",className: "text-center",render:function(data){
          data = data.toLocaleString('vi', {style : 'currency', currency : 'VND'});
          return data;
        }},
        {data: "thanh_tien_phu_tung",className: "text-center",render:function(data){
          data = data.toLocaleString('vi', {style : 'currency', currency : 'VND'});
          return data;
        }}
      ]
    });

    // table chi tiet thanh toan
    tbl6 = $('#table-chi-tiet-thanh-toan').DataTable({
      "ordering": false,
      "info": false,
      "searching": false,
      "paging":   false,
      rowID: "id",
      language: 
      {
        "sProcessing":   "Đang xử lý...",
        "sZeroRecords":  "Không tìm thấy dữ liệu"
      },
      columns: [
        { data: "ngay_thanh_toan",className:"font-weight-bold", render: function (data) {
          return moment(data).format('DD/MM/YYYY');
        }},  
        { data: "nguoi_thanh_toan" }, 
        { data: "tien_thanh_toan",className: "text-center", render: function (data){
          data = data.toLocaleString('vi', {style : 'currency', currency : 'VND'});
          return data;
        }}
      ]
    });


    // table thong tin chu xe
    tbl7 = $('.table-thong-tin-xe').DataTable({
      "ordering": false,
      "info": false,
      "searching": false,
      "paging":   false,
      rowID: "id",
      language: 
      {
        "sProcessing":   "Đang xử lý...",
        "sZeroRecords":  "Không tìm thấy dữ liệu"
      },
      columns: [
        { data: "ma"},  
        { data: "ten"}, 
        { data: "dia_chi"},
        { data: "sdt",className: "text-center"},
        { data: "email"}
      ]
    });

    // them khach hang
    $('#add-khach-hang').click(function () {
      $("#loader").css("display", "block");
      $('#hideId').val('0');
      $('#exampleModal').modal('show');
    });

    // table lich su sua chua
    tbl8 = $(".dssuachua").DataTable({
      "ordering": false,
      "info": false,
      "searching": false,
      "paging":   false,
      rowId: "id",
      language: 
      {
        "sProcessing":   "Đang xử lý...",
        "sZeroRecords":  "Không tìm thấy dữ liệu"
      },
      columns: [
        { data: "bien_so",className:"font-weight-bold" },  
        {data: "tien_phu_tung",className: "text-center", render: function (data) {
          data = data.toLocaleString('vi', {style : 'currency', currency : 'VND'});
          return data;
        }}, 
        {data: "tien_nhan_cong",className: "text-center", render: function (data){
          data = data.toLocaleString('vi', {style : 'currency', currency : 'VND'});
          return data;
        }},
        {data: "chiet_khau",className: "text-center",render:function(data){
          data = data.toLocaleString('vi', {style : 'currency', currency : 'VND'});
          return data;
        }},
        {data: "giam_tru_khac",className: "text-center",render:function(data){
          data = data.toLocaleString('vi', {style : 'currency', currency : 'VND'});
          return data;
        }},
        {data: "thanh_toan",className: "text-center",render:function(data){
          data = data.toLocaleString('vi', {style : 'currency', currency : 'VND'});
          return data;
        }},
        {data: null},
        {data: 'ghi_chu'}
      ],
      rowCallback: function(row, data, index) { 
        // calculate tien con = tong tien - chiet khau - giam tru khac - thanh toan
        var con_no = (data.tong_tien - data.chiet_khau - data.giam_tru_khac  - data.thanh_toan).toLocaleString('vi', {style : 'currency', currency : 'VND'});
        // append data vao tbl3
        tbl8.cell(index,6).nodes()[0].textContent = con_no;
        // binding data tbl3
        self.tbl8drawCallback(data, con_no);
      }
    });

    // modal show biding data
    $('#exampleModal').modal({show: false, backdrop: 'static', keyboard: false }).on('show.bs.modal',function(){
      validator.resetForm();
      $('input').removeClass('error');
      // get hiden id == 0 ? add : update
      rowId = $('#hideId').val();
      if( rowId == '0') {
        // change title 
        $('.modal-title').html('Thêm thông tin khách hàng');
        // create new customer code 
        self.createMaKhachHang();
        // set default value field
        self.setDataKhachHang();
        
      } else {
        // change title 
        $('.modal-title').html('Cập nhật thông tin'); 
        // readonly customer code
        $('#ma_khach_hang').val(self.inforData.ma).prop('readonly', true);
        // set value data into field
        self.setDataKhachHang(
          self.inforData.email, 
          self.inforData.ten, 
          self.inforData.dia_chi, 
          self.inforData.ngay_sinh, 
          self.inforData.sdt, 
          self.inforData.gioi_tinh
        );
      }
      // turn off loader
      $("#loader").css("display", "none");
    });

    // save data info customer
    $('#save-thong-tin-khach-hang').off('click').click(function() {
      $("#loader").css("display", "block");
      rowId = $('#hideId').val();
      self.getDataKhachHang();
      if( rowId == '0') {
        // add khach hang
        self.addKhachHang(self.dataSend);
      } else {
        // update khach hang
        self.updateKhachHang(self.dataSend, rowId);
      }
    });
  }

  /**
   * fn load data khach hang 
   */
  private loadReader() {
    self.khachHangService.getAll().subscribe(res => {
      if (res.errorCode == 0) {
        tbl.clear().draw();
        tbl.rows.add(res.data);
        self.dataKT = res.data;
        tbl.columns.adjust().draw();
        $("#loader").css("display", "none");
      } else {
        console.log(res.errorMessage);
        $("#loader").css("display", "none");
      }
    });
  }

  /**
   * bind table event
   */
  private bindTableEvents() {
    
    // edit data customer 
    $('a[data-group=grpEdit]').off('click').click(function(){
      // turn on loader 
      $("#loader").css("display", "block");
      // get row id
      rowId = $(this).closest('tr').attr('id');
      // set hiden id by row id
      $('#hideId').val(rowId);
      // get info customer by row id
      self.getKhachHangById(rowId);  
    });
    
    // xem lich su sua chua
    $('a[data-group=grpViewHistory]').off('click').click(function() {
      rowId = $(this).closest('tr').attr('id');
      // get info data customer 
      self.khachHangService.get(rowId).subscribe(res=> {
        if(res.errorCode == 0) {
          $('#lsba_ten_khach_hang').text(res.data[0].ten);
        }
      });
      // get history repair
      self.getLichSuSuaChuaTable8(rowId);
      $('.table-khach-hang').addClass('d-none');
      $('.lich-su-benh-an-khach-hang').removeClass('d-none');
    });

    // come back tab customer list
    $('.btn-come-back-ds-kh').click(function(){
      $('.tab-list').addClass('d-none');
      $('.table-khach-hang').removeClass('d-none');
      $('.lich-su-benh-an-khach-hang').addClass('d-none');
    });

    // click ma khach hang hoac ten khach hang
    $('.chi-tiet-khach-hang').off('click').click(function() {
      $("#loader").css("display", "block");
      // get row id 
      rowId = $(this).closest('tr').attr('id');
      // get info data customer 
      self.getKhachHangChiTiet(rowId);
      // get data car 
      self.getXeTheoKhachHang(rowId);
      // get history repair
      self.getLichSuSuaChua(rowId);
      // reset form tab 4
      $('li.tab-4').click(function(){
        sendMailValidator.resetForm();
        sendSmsValidator.resetForm();
      })

      // click button send mail
      $('.btn-send-mail').off('click').click(function(){
        self.dataSendMail = {
          "to" : $('#to').val(),
          "subject" : $('#subject').val(),
          "html" : $('iframe').contents().find('.wysihtml5-editor').html()
        }
        self.donHangService.sendMail(self.dataSendMail).subscribe( res => {
          if(res.errorCode == 0) {
            toastr.success('Đã gửi email cho khách hàng thành công', 'Thành công!');
          } else {
            toastr.error('Gửi mail thất bại. Vui lòng thử lại sau!', 'Thất bại!');
          }
        });
 
      });

      // click button send sms 
      $('.btn-send-sms').off('click').click(function(){
        self.dataSendSms = {
          "to" : $('#to_sms').val(),
          "text" : $('#text_sms').val()
        }
        self.donHangService.sendSms(self.dataSendSms).subscribe( res => {
          if(res.errorCode == 0) {
            toastr.success('Đã gửi thành công tin nhắn có id '+ res.data , 'Thành công!');
          } else {
            toastr.error('Gửi tin nhắn thất bại. Vui lòng thử lại sau!', 'Thất bại!');
          }
        });
      });

    });

    
    
  }

  /**
   * fn table 2 raw call back
   */
  private tbl2CallBack() {

    // click chi tiet xe 
    $('.chi-tiet-xe').click(function() {
      // get row id 
      rowId = $(this).closest('tr').attr('id');
      // loop data table 2 
      self.dataTable2.forEach(data => {
        // if data id == row id
        if(data.id == rowId) {
          $('.thong-tin-xe-bien-so').text(data.bien_so);
          $('.thong-tin-xe-so-khung').text(data.so_khung);
          $('.thong-tin-xe-so-vin').text(data.so_vin);
          $('.thong-tin-xe-loai-xe').text(data.ten_dong_xe);
          $('.thong-tin-xe-hang-xe').text(data.ten_hang_xe);
          $('.thong-tin-xe-so-may').text(data.so_may);
          $('.thong-tin-xe-doi-xe').text(data.doi_xe);
          $('.thong-tin-xe-mau-xe').text(data.mau_xe);
          // get info own car
          self.chiTietKhachHangCuaXe(data.id_khach_hang)
        }
        return;
      });
    });
  }
  
  /**
   * fn table 3 raw call back
   */
  private tbl3drawCallback(data, con_no) {
    // click row data history repair
    $('#dssuachua tbody').off('click').on( 'click', 'tr', function () {
      // get row id
      rowId = $(this).closest('tr').attr('id');
      $('.benh_an_khach_hang').text(data.ten_khach_hang);
      $('.benh_an_tinh_thanh').text(data.dia_chi_khach_hang);
      $('.benh_anh_sdt').text(data.sdt_khach_hang);
      $('.benh_an_bien_so').text(data.bien_so);
      $('.benh_an_model').text(data.model);
      $('.benh_an_doi_xe').text(data.doi_xe);
      $('.benh_an_tong_tien').text((data.tong_tien).toLocaleString('vi', {style : 'currency', currency : 'VND'}));
      $('.benh_an_thanh_toan').text((data.thanh_toan).toLocaleString('vi', {style : 'currency', currency : 'VND'}));
      $('.benh_an_con_no').text(con_no);
      // get data nhan cong
      self.getCongDonHang(rowId);
      // get data phu tung don hang
      self.getPhuTungDonHang(rowId);
      // get lish su thanh toan
      self.getLichSuThanhToan(rowId);
      // show modal chi tiet benh an
      $('#modal-chi-tiet-benh-an').modal('show');
    });
  }

  /**
   * fn table 8 raw call back
   */
  private tbl8drawCallback(data, con_no) {
    // click row data history repair
    $('.dssuachua tbody').off('click').on( 'click', 'tr', function () {
      // get row id
      rowId = $(this).closest('tr').attr('id');
      $('.benh_an_khach_hang').text(data.ten_khach_hang);
      $('.benh_an_tinh_thanh').text(data.dia_chi_khach_hang);
      $('.benh_anh_sdt').text(data.sdt_khach_hang);
      $('.benh_an_bien_so').text(data.bien_so);
      $('.benh_an_model').text(data.model);
      $('.benh_an_doi_xe').text(data.doi_xe);
      $('.benh_an_tong_tien').text((data.tong_tien).toLocaleString('vi', {style : 'currency', currency : 'VND'}));
      $('.benh_an_thanh_toan').text((data.thanh_toan).toLocaleString('vi', {style : 'currency', currency : 'VND'}));
      $('.benh_an_con_no').text(con_no);
      // get data nhan cong
      self.getCongDonHang(rowId);
      // get data phu tung don hang
      self.getPhuTungDonHang(rowId);
      // get lish su thanh toan
      self.getLichSuThanhToan(rowId);
      // show modal chi tiet benh an
      $('#modal-chi-tiet-benh-an').modal('show');
    });
  }

  /**
   * fn get data khach hang by id
   * @param id_khach_hang 
   */
  private getKhachHangById(id_khach_hang) {
    self.khachHangService.get(id_khach_hang).subscribe(res=> {
        if(res.errorCode == 0) {
          self.inforData = res.data[0];
          $('#exampleModal').modal('show');
          $("#loader").css("display", "none");
        }
    });
  }

  /**
   * fn det khach hang theo id
   * @param id_khach_hang 
   */
  private chiTietKhachHangCuaXe(id_khach_hang) {
    self.khachHangService.get(id_khach_hang).subscribe(res=> {
        if(res.errorCode == 0) {
          tbl7.clear().draw();
          tbl7.rows.add(res.data[0]);
          tbl7.columns.adjust().draw(); 
          $('#modal-thong-tin-xe').modal('show');
        }
    });
  }

  /**
   * chi tiet khach hang
   * @param id_khach_hang 
   */
  private getKhachHangChiTiet(id_khach_hang) {
    self.khachHangService.get(id_khach_hang).subscribe(res=> {
      if(res.errorCode == 0) {
        gioi_tinh = res.data[0].gioi_tinh == 1 ? 'Nam' : 'Nữ';
        message = '<h1><u>Phú Thông Garage</u></h1>' + 
                  '<h4>Kính chào '+ res.data[0].ten +'!</h4>' +
                  '<p>Xe mang biển số : XXX-XXX.XX đã được sửa chữa xong. Kính mời quý khách đến garage để nhận xe. </p>' +
                  '<p>Trân trọng cảm ơn và chúc sức khỏe !</p>' +
                  '<p>Phú Thông Garage</p>';
        text = 'Garage Phú Thông xin kính chào anh/chị '+ res.data[0].ten + 
                '. Xe mang biển số : XXX-XXX.XX đã được sửa chữa xong.' +
                ' Quý khách vui lòng đến garage để nhận xe. Trân trọng cảm ơn!';
        $('#dd_ma').text(res.data[0].ma);
        $('#dd_ten').text(res.data[0].ten);
        $('#dd_dia_chi').text(res.data[0].dia_chi);
        // $('#dd_tinh_thanh').text(res.data[0].tinh_thanh);
        $('#dd_sdt').text(res.data[0].sdt);
        $('#dd_email').text(res.data[0].email);
        $('#dd_gioi_tinh').text(gioi_tinh);
        $('#dd_ngay_sinh').text(moment(res.data[0].ngay_sinh).format('DD/MM/YYYY'));
        $('#to').val(res.data[0].email);
        $('#subject').val('Thông báo sửa chữa thành công');
        $('iframe').contents().find('.wysihtml5-editor').html(message);
        $('#to_sms').val(res.data[0].sdt);
        $('#text_sms').val(text);
        $('.table-khach-hang').addClass('d-none');
        $('.tab-list').removeClass('d-none');
        $('#activity').addClass('active');
        $('.tab-1').addClass('active');
      }
    });
  }

  /**
   * fn get xe theo id khach hang
   * @param id_khach_hang 
   */
  private getXeTheoKhachHang(id_khach_hang) {
    self.xeService.getXe_KH(id_khach_hang).subscribe(res=>{
      if( res.errorCode == 0 ) {
        self.dataTable2 = res.data;
        tbl2.clear().draw();
        tbl2.rows.add(res.data);
        tbl2.columns.adjust().draw(); 
      }
    });
  }

  /**
   * fn get lich su sua chua theo id khach hang
   * @param id_khach_hang 
   */
  private getLichSuSuaChua(id_khach_hang) {
    self.donHangService.lichSuSuaChua(id_khach_hang).subscribe(res => {
      if (res.errorCode == 0) {
        tbl3.clear().draw();
        tbl3.rows.add(res.data); 
        tbl3.columns.adjust().draw();
        $("#loader").css("display", "none");
      } else {
        console.log(res.errorMessage);
        $("#loader").css("display", "none");
      }
    });
  }

  /**
   * fn get lich su sua chua theo id khach hang table 8
   * @param id_khach_hang 
   */
  private getLichSuSuaChuaTable8(id_khach_hang) {
    self.donHangService.lichSuSuaChua(id_khach_hang).subscribe(res => {
      if (res.errorCode == 0) {
        tbl8.clear().draw();
        tbl8.rows.add(res.data); 
        tbl8.columns.adjust().draw();
      } else {
        console.log(res.errorMessage);
      }
    });
  }

  /**
   * fn get cong don hang by id don hang
   * @param id 
   */
  private getCongDonHang(id) {
    self.donHangService.getDonHangCong(id).subscribe(res=>{
      if( res.errorCode == 0 ) {
        if(res.data.length > 0) {
          tbl4.clear().draw();
          tbl4.rows.add(res.data);
          tbl4.columns.adjust().draw(); 
        }
      }
    });
  }

  /**
   * fn get phu tung don hang by id don hang 
   * @param id 
   */
  private getPhuTungDonHang(id) {
    self.donHangService.getDonHangPhuTung(id).subscribe(res=>{
      if( res.errorCode == 0 ) {
        if(res.data.length > 0) {
          tbl5.clear().draw();
          tbl5.rows.add(res.data);
          tbl5.columns.adjust().draw(); 
        }
      }
    });
  }


  /**
   * fn get lich su thanh toan by id don hang
   * @param id 
   */
  private getLichSuThanhToan(id) {
    self.donHangService.getChiTietThanhToan(id).subscribe(res=>{
      if( res.errorCode == 0 ) {
        if(res.data.length > 0) {
          tbl6.clear().draw();
          tbl6.rows.add(res.data);//add new data
          tbl6.columns.adjust().draw();// reraw datatable
        }
      }
    });
  }

  /**
   * fn create new customer code
   */
  private createMaKhachHang() {
    self.khachHangService.generate().subscribe(res => {
      if(res.errorCode == 0 ) {
        $('#ma_khach_hang').val(res.data).prop('readonly', true);
      }
      else {
        $('#ma_khach_hang').val('').prop('readonly', false);
      }
    });
  }

  /**
   * fn append data khach hang
   * @param ma 
   * @param email 
   * @param ten 
   * @param dia_chi 
   * @param ngay_sinh 
   * @param sdt 
   * @param gt
   */
  private setDataKhachHang(email = null, ten = null, dia_chi = null, ngay_sinh = null, sdt = null, gioi_tinh) {
    $('#email').val(email);
    $('#ten_khach_hang').val(ten);
    $('#dia_chi').val(dia_chi);
    $('#ngay_sinh').val( ngay_sinh == null ? '' : moment(ngay_sinh).format('YYYY-MM-DD') );
    $('#sdt').val(sdt);
    if( gioi_tinh == 0) {
      $('#radio_nu').iCheck('check');
    } else {
      $('#radio_nam').iCheck('check');
    }
  }

  /**
   * fn get data khach hang
   */
  private getDataKhachHang() {
    self.dataSend = {
      "ma": $('#ma_khach_hang').val(),
      "ten" : $('#ten_khach_hang').val(),
      "gioi_tinh" : $('input[name=gioi_tinh]:checked').val(),
      "ngay_sinh" : $('#ngay_sinh').val(),
      "dia_chi" : $('#dia_chi').val(),
      "sdt" : $('#sdt').val() ,
      "email" : $('#email').val()
    };
    return self.dataSend;
  }

  /**
   * fn them khach hang
   * @param data 
   */
  private addKhachHang(data) {
    self.khachHangService.add(data).subscribe(res => {
      if(res.errorCode == 0 ) {
        self.loadReader();
        $('#exampleModal').modal('hide');
        $("#loader").css("display", "none");
        toastr.success('Thêm thành công', 'Thành công!');
      } else {
        console.log(res.message);
        $("#loader").css("display", "none");
      }
    });
  }

  private updateKhachHang( data, id) {
    self.khachHangService.update(data, id).subscribe(res => {
      if(res.errorCode == 0) {
        self.loadReader();
        $('#exampleModal').modal('hide');
        $("#loader").css("display", "none");
        toastr.success('Cập nhật thành công', 'Thành công!');
      } else {
        console.log(res.message);
        $("#loader").css("display", "none");
      }
    });
  }
}
