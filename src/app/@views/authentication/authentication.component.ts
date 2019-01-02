import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NgForm } from '@angular/forms';
import { AuthenticationService } from '../../@services/authentication.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-authentication',
  template: `
  <ngx-spinner bdColor = "rgba(51, 51, 51, 0.8)" size = "medium" color = "#fff" type = "pacman"></ngx-spinner>
  <div class="container-fluid bg-login">
    <div class="row height-full">
      <div class="register">
        <div class="content">
          <div>
            <img class="logo" alt="" src="assets/dist/img/textdaily.png" />
          </div>
          <form #f="ngForm" (ngSubmit)="login(f)" id="loginForm" class="form-register">
            <h5 class="title-login">{{ message }}</h5>
            <p class="error-register m-b-md"></p>
            <div class="form-group">
              <label for="exampleInputEmail1">Username</label>
              <input type="text" name="account" data-rule-required="true" class="form-control form-control-sm"
                placeholder="Tên đăng nhập" data-msg-required="Vui lòng nhập tên đăng nhập" ngModel/>
            </div>
            <div class="form-group">
              <label for="exampleInputPassword1">Password</label>
              <input type="password" name="password" data-rule-required="true" class="form-control form-control-sm"
                placeholder="Mật khẩu" data-msg-required="Vui lòng nhập mật khẩu" ngModel/>
            </div>

            <button id="btn-register" class="btn btn-register bg-green">Đăng Nhập <i class="fa fa-spinner fa-spin d-none"></i></button>
            <div>
              <span>Best viewed:</span>
              <span>
                <img src="assets/dist/img/IE.png" />
                IE 11
              </span>
              <span>
                <img src="assets/dist/img/firefox.png" />
                Firefox 57
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
  `
})
export class AuthenticationComponent implements OnInit {

  cookieValue = '';
  message = 'Login to your account';
  constructor(
    private title: Title, 
    private authenticationService: AuthenticationService,
    private cookieService: CookieService,
    private router: Router,
    private spinner: NgxSpinnerService
  ) {
    if( !!this.authenticationService.isAuthenticated() ) {
      this.router.navigate(['/trang-chu']);
    }
  }

  ngOnInit() {
    this.spinner.show();
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 1500);
    this.title.setTitle('Login Page');
    $('#loginForm').validate();
    $('#btn-register').on('click', function () {
      $('.fa-spinner').removeClass('d-none');
    });
  }

  /**
   * fn login garage
   * @param f 
   */
  login(f: NgForm) {
    this.authenticationService.login(f.value)
      .subscribe(auth => {
        if(auth.errorCode == 0) {
          this.cookieService.set('user', JSON.stringify(auth.data));
          this.router.navigate(['/trang-chu']);
        } else {
          $('.fa-spinner').addClass('d-none');
          $('.title-login').addClass('error');
          this.message = auth.message;
        }
      });
  }
}
