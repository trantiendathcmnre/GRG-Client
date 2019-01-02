import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthenticationService } from '../@services/authentication.service';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(public auth: AuthenticationService, public router: Router) { }

  canActivate(): any {
    if(!this.auth.isAuthenticated()) {
      this.router.navigate(['/dang-nhap']);
      return false;
    }
    return true;
  }
}
