import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class MenuService {
  url: string;
  hangXe: boolean;
  constructor(private route: Router) {
  }
  getURL(url) {
    this.url = url;
    if(this.url == '/admin/hangxe') {
      this.hangXe = true;
    }
  }

}
