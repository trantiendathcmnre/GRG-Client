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

import { ApisService } from './services/apis.service';
import { DanhMucPhuTungService } from './services/danhmucphutung.service';
import { DongXeService } from './services/dongxe.service';
import { DonViLamViecService } from './services/donvilamviec.service';
import { DonViTinhService } from './services/donvitinh.service';
import { HangXeService } from './services/hangxe.service';
import { MenuService } from './services/menu.service';
import { NhaCungCapService } from './services/nhacungcap.service';
import { BaoGiaCongService } from './services/baogiacong.service';

export const router: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: AuthenticationComponent },
  {
    path: 'admin', component: ContainerComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'danhmucphutung', component: DanhmucphutungComponent },
      { path: 'hangxe', component: HangxeComponent },
      { path: 'dongxe', component: DongxeComponent },
      { path: 'donvitinh', component: DonViTinhComponent },
      { path: 'baogiacong', component: BaoGiaCongComponent },
      { path: 'nhacungcap', component: NhaCungCapComponent },
    ]
  }
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
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
