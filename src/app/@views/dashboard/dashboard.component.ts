import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
declare var $:any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private spinner: NgxSpinnerService) { 
    $.getScript("assets/bower_components/chart.js/Chart.js");
    $.getScript("assets/dist/js/pages/dashboard2.js");
  }

  ngOnInit() {
    this.spinner.show();
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 3000);
  }
}
