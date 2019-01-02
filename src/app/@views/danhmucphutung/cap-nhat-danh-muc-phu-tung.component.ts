import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-updatedanhmucphutung',
  template: `
  <ngx-spinner
    bdColor = "rgba(51, 51, 51, 0.8)"
    size = "medium"
    color = "#fff"
    type = "pacman"
  ></ngx-spinner>
  <section class="content-header" style="height:100%">
    <h1>
      <b>Cập Nhật Danh Mục </b>
    </h1>
    <ol class="breadcrumb">
      <li><a routerLink="/trang-chu/danh-muc-phu-tung"><i class="fa fa-dashboard"></i>Quản Lý Danh Mục</a></li>
      <li class="active">Cập Nhật Danh Mục Phụ Tùng</li>
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
              Cập Nhật
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </section>

  `
})
export class CapNhatDanhMucPhuTungComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
