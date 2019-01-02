import { Component, OnInit } from '@angular/core';
import { ApisService } from '../../@services/apis.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../@services/authentication.service';
let user: any;
declare var $:any;

@Component({
  selector: 'app-header',
  template: `
  <header class="main-header">
    <a href="index2.html" class="logo">
      <span class="logo-mini"><b>PT</b>G</span>
      <span class="logo-lg"><b>P.THONG</b>Garage</span>
    </a>
    <nav class="navbar navbar-static-top">
      <a href="#" class="sidebar-toggle" data-toggle="push-menu" role="button">
        <span class="sr-only">Toggle navigation</span>
      </a>
      <div class="navbar-custom-menu">
        <ul class="nav navbar-nav">
          <li class="dropdown user user-menu">
            <a href="#" class="dropdown-toggle" data-toggle="dropdown">
              <img src="assets/dist/img/user2-160x160.jpg" class="user-image" alt="User Image">
              <span class="hidden-xs">{{ fullname }}</span>
            </a>
            <ul class="dropdown-menu">
              <li class="user-header">
                <img src="assets/dist/img/user2-160x160.jpg" class="img-circle" alt="User Image">
                <p>
                  {{ fullname }}
                  <small>{{ email }}</small>
                </p>
              </li>
              <li class="user-body">
                <div class="row">
                  <div class="col-xs-4 text-center">
                    <a href="#">Followers</a>
                  </div>
                  <div class="col-xs-4 text-center">
                    <a href="#">Sales</a>
                  </div>
                  <div class="col-xs-4 text-center">
                    <a href="#">Friends</a>
                  </div>
                </div>
              </li>
              <li class="user-footer">
                <div class="pull-left">
                  <a href="#" class="btn btn-default btn-flat">Profile</a>
                </div>
                <div class="pull-right">
                  <a class="btn btn-default btn-flat" (click)="logout()">Sign out</a>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </nav>
  </header>
  `,
})
export class HeaderComponent implements OnInit {

  public fullname = 'User';
  public email = 'Email';
  public phone = 'Phone';
  public cookieValue = '';
  constructor(
    private apisService : ApisService, 
    private cookieService: CookieService,
    private router: Router,
    private auth: AuthenticationService
  ) { }

  ngOnInit() {
    if( this.auth.isAuthenticated() ) {
      user = this.auth.getUser();
      this.fullname = user.userData.fullname;
      this.email = user.userData.email;
      this.phone = user.userData.phone;
    }
    switch(window.location.pathname) {
      case '/admin/danhmucphutung' : 
          $('.danhmuc').addClass('active menu-open');
          $('#menu-danhmucphutung').parent().addClass('active');
          break;
      case '/admin/hangxe' : 
          $('.danhmuc').addClass('active menu-open');
          $('#menu-hangxe').parent().addClass('active');
          break;
      case '/admin/dongxe' : 
          $('.danhmuc').addClass('active menu-open');
          $('#menu-dongxe').parent().addClass('active');
          break;
      case '/admin/baogiacong' : 
          $('.danhmuc').addClass('active menu-open');
          $('#menu-baogiacong').parent().addClass('active');
          break;
      case '/admin/donvilamviec' : 
          $('.danhmuc').addClass('active menu-open');
          $('#menu-donvilamviec').parent().addClass('active');
          break;
      case '/admin/donvitinh' : 
          $('.danhmuc').addClass('active menu-open');
          $('#menu-donvitinh').parent().addClass('active');
          break;
      case '/admin/nhacungcap' : 
          $('.danhmuc').addClass('active menu-open');
          $('#menu-nhacungcap').parent().addClass('active');
          break;
      case '/admin/lapphieudat' : 
          $('.danhmuc').addClass('active menu-open');
          $('#menu-lapphieudat').parent().addClass('active');
          break;
      case '/admin/danhsachphieudat' : 
          $('.danhmuc').addClass('active menu-open');
          $('#menu-danhsachphieudat').parent().addClass('active');
          break;
      case '/admin/khachhang' : 
          $('.khachhang').addClass('active menu-open');
          $('#menu-khachhang').parent().addClass('active');
          break;
    }
    $('#menu-danhmucphutung').off('click').click(function(){
      $('.active').removeClass('active');
      $(this).parent().addClass('active');
      $('.danhmuc').addClass('active menu-open');
    });

    $('#menu-hangxe').off('click').click(function(){
      $('.active').removeClass('active');
      $(this).parent().addClass('active');
      $('.danhmuc').addClass('active menu-open');
    });

    $('#menu-dongxe').off('click').click(function(){
      $('.active').removeClass('active');
      $(this).parent().addClass('active');
      $('.danhmuc').addClass('active menu-open');
    });

    $('#menu-baogiacong').off('click').click(function(){
      $('.active').removeClass('active');
      $(this).parent().addClass('active');
      $('.danhmuc').addClass('active menu-open');
    });

    $('#menu-donvilamviec').off('click').click(function(){
      $('.active').removeClass('active');
      $(this).parent().addClass('active');
      $('.danhmuc').addClass('active menu-open');
    });

    $('#menu-nhacungcap').off('click').click(function(){
      $('.active').removeClass('active');
      $(this).parent().addClass('active');
      $('.danhmuc').addClass('active menu-open');
    });

    $('#menu-donvitinh').off('click').click(function(){
      $('.active').removeClass('active');
      $(this).parent().addClass('active');
      $('.danhmuc').addClass('active menu-open');
    });

    $('#menu-lapphieudat').off('click').click(function(){
      $('.active').removeClass('active');
      $(this).parent().addClass('active');
      $('.order').addClass('active menu-open');
    });

    $('#menu-danhsachphieudat').off('click').click(function(){
      $('.active').removeClass('active');
      $(this).parent().addClass('active');
      $('.order').addClass('active menu-open');
    });

    $('#menu-khachhang').off('click').click(function(){
      $('.active').removeClass('active');
      $(this).parent().addClass('active');
      $('.khachhang').addClass('active menu-open');
    });
  }

  public logout() {
    if(!!this.auth.logout()) {
      this.router.navigate(['/dang-nhap']);
    }
  }

}
