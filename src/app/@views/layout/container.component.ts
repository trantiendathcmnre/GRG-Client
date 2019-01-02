import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-container',
  template: `
  <div class="wrapper">
    <app-header></app-header>
    <app-menu></app-menu>
    <div class="content-wrapper">
      <router-outlet></router-outlet>
    </div>
    <app-footer></app-footer>
  </div>
  `
})
export class ContainerComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
