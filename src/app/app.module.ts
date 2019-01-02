import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { NgxSpinnerModule } from 'ngx-spinner';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { AppComponent } from './app.component';
import { AuthenticationComponent } from './@views/authentication/authentication.component';
import { HeaderComponent } from './@views/layout/header.component';
import { MenuComponent } from './@views/layout/menu.component';
import { FooterComponent } from './@views/layout/footer.component';
import { ContainerComponent } from './@views/layout/container.component';
import { DashboardComponent } from './@views/dashboard/dashboard.component';
import { DanhMucPhuTungComponent } from './@views/danhmucphutung/danh-muc-phu-tung.component';
import { ThemDanhMucPhuTungComponent } from './@views/danhmucphutung/them-danh-muc-phutung.component';
import { CapNhatDanhMucPhuTungComponent } from './@views/danhmucphutung/cap-nhat-danh-muc-phu-tung.component';
import { HangxeComponent } from './@views/hangxe/hangxe.component';
import { DongxeComponent } from './@views/dongxe/dongxe.component';
import { DonViTinhComponent } from './@views/donvitinh/donvitinh.component';
import { BaoGiaCongComponent } from './@views/baogiacong/baogiacong.component';
import { NhaCungCapComponent } from './@views/nhacungcap/nhacungcap.component';
import { DonViLamViecComponent } from './@views/donvilamviec/donvilamviec.component';
import { LapPhieuDatComponent } from './@views/lapphieudat/lapphieudat.component';
import { DanhSachPhieuDatComponent } from './@views/danhsachphieudat/danhsachphieudat.component';
import { KhachHangComponent } from './@views/khachhang/khachhang.component';
import { NotFoundComponent } from './@views/notfound/notfound.component';
import { DanhSachXeComponent } from './@views/danhsachxe/danhsachxe.component';
import { TiepNhanSuaChuaComponent } from './@views/tiepnhansuachua/tiepnhansuachua.component';
import { DonHangComponent } from './@views/donhang/donhang.component';
import { LichSuSuaChuaComponent } from './@views/lichsusuachua/lichsusuachua.component';

import { AuthGuardService } from './@services/authguard.service';
import { ApisService } from './@services/apis.service';
import { DanhMucPhuTungService } from './@services/danhmucphutung.service';
import { DongXeService } from './@services/dongxe.service';
import { DonViLamViecService } from './@services/donvilamviec.service';
import { DonViTinhService } from './@services/donvitinh.service';
import { HangXeService } from './@services/hangxe.service';
import { MenuService } from './@services/menu.service';
import { NhaCungCapService } from './@services/nhacungcap.service';
import { BaoGiaCongService } from './@services/baogiacong.service';
import { LangService } from './@services/lang.service';
import { LapPhieuDatService } from './@services/lapphieudat.service';
import { PhuTungService } from './@services/phutung.service';
import { KhachHangService } from './@services/khachhang.service';
import { XeService } from './@services/xe.service';
import { DonHangService } from './@services/donhang.service';
import { LapPhieuKhamService } from './@services/lapphieukham.service';
import { NhanVienService } from './@services/nhanvien.service';
import { AuthenticationService } from './@services/authentication.service';
import { CookieService } from 'ngx-cookie-service';

export const router: Routes = [
  { path: '', redirectTo: 'dang-nhap', pathMatch: 'full' },
  { path: 'dang-nhap', component: AuthenticationComponent },
  {
    path: 'trang-chu', component: ContainerComponent, canActivate: [AuthGuardService],
    children: [
      { path: '', component: DashboardComponent, canActivate: [AuthGuardService] },
      { path: 'danh-muc-phu-tung', component: DanhMucPhuTungComponent, canActivate: [AuthGuardService],
        children: [
          { path: '', component: DanhMucPhuTungComponent, canActivate: [AuthGuardService], }
        ]
      },
      { path: 'them-danh-muc-phu-tung', component: ThemDanhMucPhuTungComponent, canActivate: [AuthGuardService] },
      { path: 'update-danh-muc-phu-tung/:id', component: CapNhatDanhMucPhuTungComponent, canActivate: [AuthGuardService] },
      { path: 'don-vi-lam-viec', component: DonViLamViecComponent, canActivate: [AuthGuardService] },
      { path: 'hang-xe', component: HangxeComponent, canActivate: [AuthGuardService] },
      { path: 'dong-xe', component: DongxeComponent, canActivate: [AuthGuardService] },
      { path: 'don-vi-tinh', component: DonViTinhComponent, canActivate: [AuthGuardService] },
      { path: 'bao-gia-cong', component: BaoGiaCongComponent, canActivate: [AuthGuardService] },
      { path: 'nha-cung-cap', component: NhaCungCapComponent, canActivate: [AuthGuardService] },
      { path: 'lap-phieu-dat', component: LapPhieuDatComponent, canActivate: [AuthGuardService] },
      { path: 'danh-sach-phieu-dat', component: DanhSachPhieuDatComponent, canActivate: [AuthGuardService] },
      { path: 'khach-hang', component: KhachHangComponent, canActivate: [AuthGuardService] },
      { path: 'danh-sach-xe', component: DanhSachXeComponent, canActivate: [AuthGuardService] },
      { path: 'tiep-nhan-sua-chua', component: TiepNhanSuaChuaComponent, canActivate: [AuthGuardService] },
      { path: 'don-hang', component: DonHangComponent, canActivate: [AuthGuardService] },
      { path: 'lich-su-sua-chua', component: LichSuSuaChuaComponent, canActivate: [AuthGuardService] },
      
    ]
  },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    AuthenticationComponent,
    DashboardComponent, ContainerComponent, HeaderComponent, FooterComponent,
    DanhMucPhuTungComponent, ThemDanhMucPhuTungComponent, CapNhatDanhMucPhuTungComponent,
    HangxeComponent,
    DongxeComponent,
    DonViTinhComponent,
    BaoGiaCongComponent,
    NhaCungCapComponent,
    DonViLamViecComponent,
    LapPhieuDatComponent,
    DanhSachPhieuDatComponent,
    KhachHangComponent,
    NotFoundComponent,
    DanhSachXeComponent,
    TiepNhanSuaChuaComponent,
    DonHangComponent,
    LichSuSuaChuaComponent,
    MenuComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    NgxSpinnerModule,
    Ng2SmartTableModule,
    RouterModule.forRoot(router)
  ],
  providers: [
    ApisService,
    AuthenticationService,
    BaoGiaCongService,
    CookieService,
    DanhMucPhuTungService,
    DongXeService,
    DonViLamViecService,
    DonViTinhService,
    DonHangService,
    HangXeService,
    KhachHangService,
    MenuService,
    NhaCungCapService,
    NhanVienService,
    PhuTungService,
    LangService,
    LapPhieuDatService,
    LapPhieuKhamService,
    XeService,
    AuthGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
