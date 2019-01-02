import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  template:`
  <aside class="main-sidebar">
    <section class="sidebar">
      <ul class="sidebar-menu" data-widget="tree">
        <li class="treeview danhmuc">
          <a>
            <i class="fa fa-file-text"></i><span>Danh Mục</span>
            <span class="pull-right-container">
              <i class="fa fa-angle-left pull-right"></i>
            </span>
          </a>
          <ul class="treeview-menu">
            <li><a routerLink="/trang-chu/bao-gia-cong" id="menu-baogiacong"><i class="fa fa-caret-right"></i>Danh mục
                chi phí</a></li>
            <li><a routerLink="/trang-chu/danh-muc-phu-tung" id="menu-danhmucphutung"><i class="fa fa-caret-right"></i>Danh
                mục phụ tùng</a></li>
            <li><a routerLink="/trang-chu/dong-xe" id="menu-dongxe"><i class="fa fa-caret-right"></i>Quản lý dòng xe</a></li>
            <li><a routerLink="/trang-chu/hang-xe" id="menu-hangxe"><i class="fa fa-caret-right"></i>Quản lý hãng xe</a></li>
            <li><a routerLink="/trang-chu/don-vi-lam-viec" id="menu-donvilamviec"><i class="fa fa-caret-right"></i>Quản
                lý đơn vị làm việc</a></li>
            <li><a routerLink="/trang-chu/don-vi-tinh" id="menu-donvitinh"><i class="fa fa-caret-right"></i>Quản lý đơn
                vị tính</a></li>
            <li><a routerLink="/trang-chu/nha-cung-cap" id="menu-nhacungcap"><i class="fa fa-caret-right"></i>Quản lý nhà
                cung cấp</a></li>
          </ul>
        </li>
        <li class="treeview order">
          <a>
            <i class="fa fa-credit-card"></i>
            <span>Đặt Hàng</span>
            <span class="pull-right-container">
              <i class="fa fa-angle-left pull-right"></i>
            </span>
          </a>
          <ul class="treeview-menu">
            <li><a routerLink="/trang-chu/lap-phieu-dat" id="menu-lapphieudat"><i class="fa fa-caret-right"></i>Lập phiếu
                đặt</a></li>
            <li><a routerLink="/trang-chu/danh-sach-phieu-dat" id="menu-danhsachphieudat"><i class="fa fa-caret-right"></i>Danh
                sách phiếu đặt</a></li>
          </ul>
        </li>
        <li class="treeview">
          <a>
            <i class="fa fa-money"></i>
            <span>Kế Toán</span>
            <span class="pull-right-container">
              <i class="fa fa-angle-left pull-right"></i>
            </span>
          </a>
          <ul class="treeview-menu">
            <li><a><i class="fa fa-caret-right"></i> Công nợ nhà cung cấp</a></li>
            <li><a><i class="fa fa-caret-right"></i> Quản lý chi phí</a></li>
            <li><a><i class="fa fa-caret-right"></i> Quản lý bảo hiểm</a></li>
            <li><a><i class="fa fa-caret-right"></i> Quản lý công nợ</a></li>
          </ul>
        </li>
        <li class="treeview">
          <a>
            <i class="fa fa-industry"></i> <span>Kho Vật Tư</span>
            <span class="pull-right-container">
              <i class="fa fa-angle-left pull-right"></i>
            </span>
          </a>
          <ul class="treeview-menu">
            <li><a><i class="fa fa-caret-right"></i> Kiểm kê vật tư</a></li>
            <li><a><i class="fa fa-caret-right"></i> Cập nhật vật tư</a></li>
            <li><a><i class="fa fa-caret-right"></i> Quản lý nhập kho</a></li>
            <li><a><i class="fa fa-caret-right"></i> Quản lý xuất kho</a></li>
          </ul>
        </li>
        <li class="treeview khachhang">
          <a>
            <i class="fa fa-group"></i> <span>Khách Hàng</span>
            <span class="pull-right-container">
              <i class="fa fa-angle-left pull-right"></i>
            </span>
          </a>
          <ul class="treeview-menu">
            <li><a routerLink="/trang-chu/khach-hang" id="menu-khachhang"><i class="fa fa-caret-right"></i>Thông tin
                khách
                hàng</a></li>
          </ul>
        </li>
        <li class="treeview repair">
          <a>
            <i class="fa fa-wrench"></i>
            <span>Sửa Chữa</span>
            <span class="pull-right-container">
              <i class="fa fa-angle-left pull-right"></i>
            </span>
          </a>
          <ul class="treeview-menu">
            <li><a routerLink="/trang-chu/danh-sach-xe" id="menu-danhsachxe"><i class="fa fa-caret-right"></i>Danh sách
                xe</a></li>
            <li><a routerLink="/trang-chu/tiep-nhan-sua-chua" id="menu-tiepnhansuachua"><i class="fa fa-caret-right"></i>Tiếp
                nhận sửa chữa</a></li>
            <li><a><i class="fa fa-caret-right"></i>Lịch sử sửa chữa</a></li>
            <li><a routerLink="/trang-chu/don-hang" id="menu-donhang"><i class="fa fa-caret-right"></i>Quản lý báo giá
                sửa
                chữa</a></li>
          </ul>
        </li>
      </ul>
    </section>
  </aside>
  `
})
export class MenuComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
