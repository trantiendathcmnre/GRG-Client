import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  template: '<footer class="main-footer"><div class="pull-right hidden-xs"><b>Version</b> 2.4.0</div><strong>Copyright &copy; 2018 <a>Dat Tran</a>.</strong> All rights reserved.</footer>'
})
export class FooterComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
