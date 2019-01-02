import { Component, OnInit } from '@angular/core';
import { DonViLamViecService } from '../../@services/donvilamviec.service';
import { DanhMucPhuTungService } from '../../@services/danhmucphutung.service';
import { NgxSpinnerService } from 'ngx-spinner';
declare var $, toastr: any;
let self: any;
const ERRORCODE = 1;
const SUCCESSCODE = 0;
const LIMIT = 30;

@Component({
  selector: 'app-themdanhmucphutung',
  template: `
  <ngx-spinner bdColor = "rgba(51, 51, 51, 0.8)" size = "medium" color = "#fff" type = "pacman"></ngx-spinner>
  <section class="content-header" style="height:100%">
    <h1>
      <b>Thêm Danh Mục </b>
    </h1>
    <ol class="breadcrumb">
      <li><a routerLink="/trang-chu/danh-muc-phu-tung"><i class="fa fa-dashboard"></i>Quản Lý Danh Mục</a></li>
      <li class="active">Danh Mục Phụ Tùng</li>
    </ol>
  </section>
  <section class="content">
    <div class="box" >
      <div class="box-header">
        
      </div>
      <div class="box-body">
        <form class="form-horizontal" id="frm-danh-muc-phu-tung">
          <div class="form-group">
            <label class="col-sm-2 control-label no-error">Tên danh mục<span class="required"> *</span></label>
            <div class="col-sm-5">
              <input 
                type="text" 
                id="ten" 
                name="ten" 
                class="form-control" 
                data-rule-required="true"
                data-msg-required="Vui lòng nhập tên danh mục phụ tùng"
              >
            </div>
            <div class="col-sm-1"><i class="fa fa-info-circle" data-toggle="tooltip" title="Nhập tên bất kì để thề hiện tên danh mục phụ tùng"></i></div>
          </div>
          <div class="form-group">
            <label class="col-sm-2 control-label no-error">Đơn vị làm việc<span class="required"> *</span></label>
            <div class="col-sm-5">
              <select id="donvi_id" class="form-control" title="Vui lòng chọn đơn vị làm việc" required="" aria-required="true">
                <option value>Chọn đơn vị làm việc</option>
                <option *ngFor="let dv of dataDonVi" [value]=dv.id>{{dv.ten}}</option>
              </select>
            </div>
            <div class="col-sm-1"><i class="fa fa-info-circle" data-toggle="tooltip" title="Chọn đơn vị làm việc để tính doanh thu"></i></div>
          </div>
          <div class="form-group">
            <label class="col-sm-2 control-label no-error">Mô tả</label>
            <div class="col-sm-5">
              <textarea 
                class="textarea form-control" 
                style="width: 100%; height: 150px; font-size: 14px; line-height: 18px; border: 1px solid #dddddd; padding: 10px;"
                id="mo_ta" 
                name="mo_ta"
                ></textarea>
            </div>
            <div class="col-sm-1"><i class="fa fa-info-circle" data-toggle="tooltip" title="Nhập vào mô tả cho danh mục phụ tùng"></i></div>
          </div>
          <div class="form-group">
            <div class="col-sm-2"></div>
            <div class="col-sm-3">
              <a routerLink="/trang-chu/danh-muc-phu-tung" class="btn btn-default btn-flat" >Thoát</a>
              <button 
                type="submit" 
                class="btn bg-success bg-green btn-flat" 
                id="save-danh-muc-phu-tung"
              >
              Thêm Mới
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </section>
  `
})
export class ThemDanhMucPhuTungComponent implements OnInit {

  dataDonVi: any = [];
  dataSave: any = [];
  constructor(
    private donViLamViecService: DonViLamViecService, 
    private danhMucPhuTungService: DanhMucPhuTungService,
    private spinner: NgxSpinnerService) {
    toastr.options = {
      'positionClass': 'toast-top-center'
    };
  }

  ngOnInit() {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 500);
    self = this;
    self.danhSachDonViLamViec();
    $('#frm-danh-muc-phu-tung').validate();
    $('#save-danh-muc-phu-tung').click(function () {
      self.dataSave = {
        "ten": $('#ten').val(),
        "mo_ta": $('#mo_ta').val(),
        "donvi_id": $('select[id=donvi_id]').val()
      };
      self.themDanhMucPhuTung(self.dataSave);
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

  /**
   * fn them danh muc phu tung moi
   * @param data
   */
  themDanhMucPhuTung(data) {
    self.danhMucPhuTungService.add(data).subscribe(res => {
      if (ERRORCODE <= res.errorCode) {
        toastr.error(res.message, 'Error!');
      } else {
        if (SUCCESSCODE === res.errorCode) {
          $('#frm-danh-muc-phu-tung').trigger('reset');
          toastr.success('Thêm thành công', 'Thành công!');
          $('#modal-default').modal('hide');
        } else {
          toastr.error('Thêm thất bại', 'Thất bại!');
        }
      }
    });
  }
}
