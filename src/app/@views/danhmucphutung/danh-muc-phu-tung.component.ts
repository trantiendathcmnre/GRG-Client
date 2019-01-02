import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { DonViLamViecService } from '../../@services/donvilamviec.service';
import { DanhMucPhuTungService } from '../../@services/danhmucphutung.service';
import { ApisService } from '../../@services/apis.service';
import { NgxSpinnerService } from 'ngx-spinner';
import * as moment from 'moment';

const ERRORCODE = 1;
const SUCCESSCODE = 0;
declare var $, toastr: any;
let self, inforData, tbl, donVi, id, hiddenId, dataSave, rowId: any;

@Component({
  selector: 'app-danhmucphutung',
  template: `
  <ngx-spinner bdColor="rgba(51, 51, 51, 0.8)" size="medium" color="#fff" type="pacman"></ngx-spinner>
  <section class="content">
    <div class="box">
      <div class="box-header">
        <div class="form-group">
          <div class="col-sm-1 p-l-0">
            <a class="btn btn-primary-action m-r-xs" routerLink="/trang-chu/them-danh-muc-phu-tung"><i class="fa fa-plus"></i></a>
          </div>
          <label class="col-sm-2 control-label no_error">Sắp xếp theo đơn vị làm việc</label>
          <div class="col-sm-3">
            <select class="form-control select2" id="donvi" name="donvi">
              <option></option>
              <option *ngFor="let dv of dataDonVi" [value]=dv.id>{{ dv.ten }}</option>
            </select>
          </div>
          <div class="col-sm-6">
            <i class="fa fa-2x fa-refresh refresh-datatable pull-right" title="Làm mới"></i>
            <i class="fa fa-2x fa-cog show-hide-column pull-right" title="Ẩn/Hiện"></i>
          </div>
        </div>
      </div>
      <div class="box-body">
        <table id="tbl-danh-muc-phu-tung" class="table" style="width:100%">
          <thead>
            <tr>
              <th>Tên danh mục</th>
              <th>Mô tả</th>
              <th>Đơn vị làm việc</th>
              <th>Ngày tạo</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody></tbody>
        </table>
      </div>
    </div>
  </section>
  <div class="modal fade in modal-show-hide-columns">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header custom-header-modal">
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">×</span>
          </button>
          <h4 class="modal-title">Ẩn/Hiện Cột</h4>
        </div>
        <div class="modal-body">
          <form>
            <div class="row">
              <div class="col-md-12 m-l-15">
                <div class="form-group">
                  <label>
                    <input type="checkbox" class="flat-red" value="0" checked>
                    &nbsp;&nbsp;&nbsp;Tên danh mục
                  </label>
                </div>
                <div class="form-group">
                  <label>
                    <input type="checkbox" class="flat-red" value="1" checked>
                    &nbsp;&nbsp;&nbsp;Mô tả
                  </label>
                </div>
                <div class="form-group">
                  <label>
                    <input type="checkbox" class="flat-red" value="2" checked>
                    &nbsp;&nbsp;&nbsp;Đơn vị làm việc
                  </label>
                </div>
                <div class="form-group">
                  <label>
                    <input type="checkbox" class="flat-red" value="3" checked>
                    &nbsp;&nbsp;&nbsp;Ngày tạo
                  </label>
                </div>
                <div class="form-group">
                  <label>
                    <input type="checkbox" class="flat-red" value="4" checked>
                    &nbsp;&nbsp;&nbsp;Thao tác
                  </label>
                </div>
              </div>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default btn-flat" data-dismiss="modal" aria-label="Close">Thoát</button>
        </div>
      </div>
    </div>
  </div>
  `
})
export class DanhMucPhuTungComponent implements OnInit {
  
  dataDonVi: any = [];
  dataExport: any = [];
  data = [];
  modalTitle:string = '';
  tenDanhMuc:string = '';
  moTa:string = '';
  constructor(
    private http: Http,
    private router: Router,
    private title: Title,
    private apisService: ApisService,
    private danhMucPhuTungService: DanhMucPhuTungService,
    private donViLamViecService: DonViLamViecService,
    private spinner: NgxSpinnerService
  ) {
    toastr.options = {
      'positionClass': 'toast-top-center'
    };
  }

  ngOnInit() {
    this.title.setTitle('Danh Muc Phu Tung');
    /** spinner starts on init */
    this.spinner.show();
    setTimeout(() => {
        /** spinner ends after 1 seconds */
        this.spinner.hide();
    }, 1000);
    // select2 don vi
    $('select[name=donvi], select[name=donvi_id]').select2({
      placeholder: 'Chọn đơn vị'
    });
    // iCheck for checkbox and radio inputs
    $('input[type="checkbox"].flat-red, input[type="radio"].flat-red').iCheck({
      checkboxClass: 'icheckbox_flat-green',
      radioClass: 'iradio_flat-blue'
    });

    self = this;
    self.danhSachDonViLamViec();
    self.danhMucPhuTung();
    $('#frm-danh-muc-phu-tung').validate();

    // datatable
    tbl = $('#tbl-danh-muc-phu-tung').DataTable({
      ordering: false,
      'scrollY': '365px',
      'paging': true,
      'info': false,
      "searching": false,
      "bLengthChange": false,
      "processing": true,
      "aaData": null,
      "language": {
        'sProcessing': '',
        'sLengthMenu': 'Xem _MENU_ mục',
        'sZeroRecords': 'Không tìm thấy dữ liệu',
        'sInfoFiltered': '(được lọc từ _MAX_ mục)',
        'sInfoPostFix': '',
        'sSearch': '<i class=\'fa fa-search text-muted\'></i>',
        'sUrl': '',
        'oPaginate': {
          'sFirst': '<i class=\'fa fa-fast-backward\'></i>',
          'sPrevious': '<i class=\'fa fa-step-backward\'></i>',
          'sNext': '<i class=\'fa fa-step-forward\'></i>',
          'sLast': '<i class=\'fa fa-fast-forward\'></i>'
        }
      },
      rowId: 'id',
      columns: [
        {
          data: 'ten_danh_muc', render: function (data) {
            // return self.rutGonChuoi(data, LIMIT);
            return data;
          }
        },
        {
          data: 'mo_ta', render: function (data) {
            // return self.rutGonChuoi(data, LIMIT);
            return data;
          }
        },
        { data: 'ten_don_vi', },
        {
          data: 'ngay_tao', render: function (data) {
            return moment(data).format('DD/MM/YYYY HH:mm:ss');
          }
        },
        {
          data: null, className: 'text-capitalize text-center', render: function (data, type, row) {
            return '<a class="btn btn-primary-action m-r-xs" data-group="grpEdit" title="Edit Category"><i class="fa fa-edit load-edit-'+row.id+'"></i></a>' +
              '<a class="btn btn-primary-action m-r-xs" data-group="grpDelete" title="Delete Category" ><i class="fa fa-trash load-remove"></i></a>';
          }
        }
      ],
      // load data
      initComplete: function (setting, json) {
        self.danhMucPhuTung();
      },
      drawCallback: function (settings) {
        self.bindTableEvents();
      }
    });

    // click button refresh table
    $('.refresh-datatable').click(function () {
      $(this).addClass('fa-spin');
      self.danhMucPhuTung();
    });
    // click show hide column
    $('.show-hide-column').click(function () {
      $('.modal-show-hide-columns').modal('show');
    });

    // click checked checkbox
    $('input[type="checkbox"].flat-red').on('ifClicked', function (e) {
      e.preventDefault();
      // Toggle the visibility
      tbl.column($(this).val()).visible(!tbl.column($(this).val()).visible());
    });

    // click button them moi
    $('#btn-add').off('click').click(function () {
      $('input[name=hidden_id]').val(0);
      $('#modal-default').modal('show');
    });

    // click button xuat excel
    $('#btn-export-csv').click(function () {
      self.xuatExcelDanhMucPhuTung();
    });

    // chon don vi de hien thi
    $('select[name=donvi]').on('change', function () {
      donVi = $('#donvi').val();
      if (donVi === 0) {
        self.danhMucPhuTung();
      } else {
        self.duyetDanhMucPhuTung(donVi);
      }
    });

    // hien modal bootstrap
    $('#modal-default').modal({ show: false, backdrop: 'static', keyboard: false }).on('show.bs.modal', function () {
      id = $('input[name=hidden_id]').val();
      self.loadedEdit('.load-edit-'+ id);
      self.modalTitle = 'Cập nhật danh mục';
      $('.form-control').removeClass('has-error');
      $('.form-group').removeClass('has-error');
      self.tenDanhMuc = inforData.ten;
      self.moTa = inforData.mo_ta;
      $('select[name=donvi_id]').val(inforData.donvi_id).change();
      $('select[name=donvi_id]').prop('disabled', true);
    });

    // click luu de them hoac cap nhat
    $('#save-danh-muc-phu-tung').click(function () {
      hiddenId = $('input[name=hidden_id]').val();
      // get data form
      dataSave = $('#frm-danh-muc-phu-tung').serializeArray().reduce(function (obj, item) {
        obj[item.name] = item.value;
        return obj;
      }, {});
      debugger
      self.capNhatDanhMucPhuTung(dataSave, hiddenId);
    });
  }

  // get danh sach don vi lam viec
  danhSachDonViLamViec(): any {
    self.donViLamViecService.getAll().subscribe(res => {
      if (ERRORCODE <= res.errorCode) {
        console.log(res);
        // self.router.navigate(['/']);
      } else {
        self.dataDonVi = (SUCCESSCODE === res.errorCode) ? res.data : console.log(res.message);
      }
    });
  }

  // get danh muc phu tung
  danhMucPhuTung() {
    self.danhMucPhuTungService.getAll().subscribe(res => {
      if (ERRORCODE <= res.errorCode) {
        console.log(res);
        // self.router.navigate(['/']);
      } else {
        if (SUCCESSCODE === res.errorCode) {
          self.dataKT = res.data;
          self.data = res.data;
          tbl.clear().draw();
          tbl.rows.add(res.data); // add new data
          tbl.columns.adjust().draw(); // reraw datatable
          // remove class fa-spin
          $('.refresh-datatable').removeClass('fa-spin');
        } else {
          console.log(res.message);
        }
      }
    });
  }

  /**
   * fn duyet danh muc phu tung theo don vi lam viec
   * @param donvi
   */
  duyetDanhMucPhuTung(donvi) {
    self.danhMucPhuTungService.search(donvi).subscribe(res => {
      if (ERRORCODE <= res.errorCode) {
        console.log(res.message);
        // self.router.navigate(['/']);
      } else {
        if (SUCCESSCODE === res.errorCode) {
          tbl.clear().draw();
          tbl.rows.add(res.data); // add new data
          tbl.columns.adjust().draw(); // reraw datatable
        } else {
          console.log(res.message);
        }
      }
    });

  }

  xuatExcelDanhMucPhuTung() {
    self.danhMucPhuTungService.export().subscribe(res => {
      window.open(self.apisService.baseUrl + 'uploads/' + res.data, '_blank');
    });
  }

  capNhatDanhMucPhuTung(dataSave, hiddenId) {
    self.danhMucPhuTungService.update(dataSave, hiddenId).subscribe(res => {
      if (ERRORCODE <= res.errorCode) {
        console.log(res.message);
      } else {
        self.danhMucPhuTung();
        $('#modal-default').modal('hide');
        toastr.success('Cập nhật thành công', 'Thành công!');
      }
    });
  }

  private bindTableEvents() {
    // Xu ly update
    $('a[data-group=grpEdit]').off('click').click(function () {
      rowId = $(this).closest('tr').attr('id');
      self.router.navigate(['/trang-chu/update-danh-muc-phu-tung', rowId]);
      // self.loadEdit('.load-edit-'+ rowId);
      // self.danhMucPhuTungService.get(rowId).subscribe(res => {
      //   if (ERRORCODE <= res.errorCode) {
      //     toastr.error(res.message, 'Error!');
      //   } else {
      //     if (SUCCESSCODE === res.errorCode) {
      //       $('input[name=hidden_id]').val(rowId);
      //       inforData = res.data[0];
      //       $('#modal-default').modal('show');
      //     } else {
      //       console.log(res.message);

      //     }
      //   }
      // });
    });

    // Xu lý xóa
    $('a[data-group=grpDelete]').off('click').click(function () {
      const rowId = $(this).closest('tr').attr('id');
      $.confirm({
        title: 'Xóa danh mục',
        content: 'Bạn có chắc muốn xóa danh mục?',
        type: 'red',
        typeAnimated: true,
        buttons: {
          close: {
            text: 'Thoát',
            btnClass: 'btn-default btn-flat'
          },
          tryAgain: {
            text: 'Xóa',
            btnClass: 'btn-success btn-flat ng-green',
            action: function () {
              self.danhMucPhuTungService.delete(rowId).subscribe(res => {
                if (ERRORCODE <= res.errorCode) {
                  console.log(res);
                  // self.router.navigate(['/']);
                } else {
                  if (SUCCESSCODE === res.errorCode) {
                    self.danhMucPhuTung();
                  } else {
                    toastr.error('Xóa thất bạị. Vui lòng kiểm tra lại!', 'Thất bại!');
                    self.danhMucPhuTung();
                  }
                }
              });
            }
          }
        }
      });
    });
  }

  loadEdit(id) {
    $(id).removeClass('fa-edit');
    $(id).addClass('fa-spinner fa-spin');
  }

  loadedEdit(id) {
    $(id).removeClass('fa-spinner fa-spin');
    $(id).addClass('fa-edit');
  }

}
