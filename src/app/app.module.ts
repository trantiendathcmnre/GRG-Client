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

import { ApisService } from './services/apis.service';
import { DanhMucPhuTungService } from './services/danhmucphutung.service';
import { DongXeService } from './services/dongxe.service';
import { DonViLamViecService } from './services/donvilamviec.service';
import { DonViTinhService } from './services/donvitinh.service';
import { HangXeService } from './services/hangxe.service';
import { PnotifyService } from './services/pnotify.service';
import { MenuService } from './services/menu.service';

export const router: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: AuthenticationComponent },
  {
    path: 'admin', component: ContainerComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'danhmucphutung', component: DanhmucphutungComponent },
      { path: 'hangxe', component: HangxeComponent },
    ]
  }
];

@NgModule({
  declarations: [
    AppComponent,
    AuthenticationComponent,
    DashboardComponent,
    DanhmucphutungComponent,
    ContainerComponent,
    HeaderComponent,
    FooterComponent,
    HangxeComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    RouterModule.forRoot(router)
  ],
  providers: [
    ApisService,
    DanhMucPhuTungService,
    DongXeService,
    HangXeService,
    DonViLamViecService,
    DonViTinhService,
    PnotifyService,
    MenuService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
