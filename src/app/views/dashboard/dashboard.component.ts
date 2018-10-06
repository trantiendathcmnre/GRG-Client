import { Component, OnInit } from '@angular/core';
declare var $:any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor() { 
    //ChartJS
    $.getScript("assets/bower_components/chart.js/Chart.js");
    //AdminLTE dashboard demo (This is only for demo purposes)
    $.getScript("assets/dist/js/pages/dashboard2.js");
  }

  ngOnInit() {
  }

}
