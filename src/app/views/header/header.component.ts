import { Component, OnInit } from '@angular/core';
import { ApisService } from '../../services/apis.service';
declare var $:any;
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  
  constructor(private apisService : ApisService) {
  }

  ngOnInit() {
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
  }

}
