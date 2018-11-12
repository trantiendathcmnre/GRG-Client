import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { AuthenticationComponent } from './views/authentication/authentication.component';
import { ContainerComponent } from './views/container/container.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { DanhmucphutungComponent } from './views/danhmucphutung/danhmucphutung.component';
import { FooterComponent } from './views/footer/footer.component';
import { HangxeComponent } from './views/hangxe/hangxe.component';
import { HeaderComponent } from './views/header/header.component';
import { DongxeComponent } from './views/dongxe/dongxe.component';
import { DonViTinhComponent } from './views/donvitinh/donvitinh.component';
import { BaoGiaCongComponent } from './views/baogiacong/baogiacong.component';
import { NhaCungCapComponent } from './views/nhacungcap/nhacungcap.component';
import { DonViLamViecComponent } from './views/donvilamviec/donvilamviec.component';
import { LapPhieuDatComponent } from './views/lapphieudat/lapphieudat.component';
import { DanhSachPhieuDatComponent } from './views/danhsachphieudat/danhsachphieudat.component';
import { KhachHangComponent } from './views/khachhang/khachhang.component';
import { NotFoundComponent } from './views/notfound/notfound.component';
import { DanhSachXeComponent } from './views/danhsachxe/danhsachxe.component';
import { TiepNhanSuaChuaComponent } from './views/tiepnhansuachua/tiepnhansuachua.component';
import { DonHangComponent } from './views/donhang/donhang.component';

import { ApisService } from './services/apis.service';
import { DanhMucPhuTungService } from './services/danhmucphutung.service';
import { DongXeService } from './services/dongxe.service';
import { DonViLamViecService } from './services/donvilamviec.service';
import { DonViTinhService } from './services/donvitinh.service';
import { HangXeService } from './services/hangxe.service';
import { MenuService } from './services/menu.service';
import { NhaCungCapService } from './services/nhacungcap.service';
import { BaoGiaCongService } from './services/baogiacong.service';
import { LangService } from './services/lang.service';
import { LapPhieuDatService } from './services/lapphieudat.service';
import { PhuTungService } from './services/phutung.service';
import { KhachHangService } from './services/khachhang.service';
import { XeService } from './services/xe.service';
import { DonHangService } from './services/donhang.service';
import { LapPhieuKhamService } from './services/lapphieukham.service';
import { NhanVienService } from './services/nhanvien.service';
import { TinhThanhPhoService } from './services/tinhthanhpho.service';



export const router: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: AuthenticationComponent },
  {
    path: 'admin', component: ContainerComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'danhmucphutung', component: DanhmucphutungComponent },
      { path: 'donvilamviec', component: DonViLamViecComponent },
      { path: 'hangxe', component: HangxeComponent },
      { path: 'dongxe', component: DongxeComponent },
      { path: 'donvitinh', component: DonViTinhComponent },
      { path: 'baogiacong', component: BaoGiaCongComponent },
      { path: 'nhacungcap', component: NhaCungCapComponent },
      { path: 'lapphieudat', component: LapPhieuDatComponent },
      { path: 'danhsachphieudat', component: DanhSachPhieuDatComponent },
      { path: 'khachhang', component: KhachHangComponent },
      { path: 'danhsachxe', component: DanhSachXeComponent },
      { path: 'tiepnhansuachua', component: TiepNhanSuaChuaComponent },
      { path: 'donhang', component: DonHangComponent },
    ]
  },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    AuthenticationComponent,
    DashboardComponent,
    ContainerComponent,
    HeaderComponent,
    FooterComponent,
    DanhmucphutungComponent,
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
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    RouterModule.forRoot(router)
  ],
  providers: [
    ApisService,
    BaoGiaCongService,
    DanhMucPhuTungService,
    DongXeService,
    HangXeService,
    DonViLamViecService,
    DonViTinhService,
    MenuService,
    NhaCungCapService,
    LangService,
    LapPhieuDatService,
    PhuTungService,
    KhachHangService,
    XeService,
    DonHangService,
    LapPhieuKhamService,
    NhanVienService,
    TinhThanhPhoService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
