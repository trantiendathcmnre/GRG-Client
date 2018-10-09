import { Component, OnInit } from '@angular/core';
import { MenuService } from '../../services/menu.service';
declare var $:any;
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor(private menu: MenuService) {
  }

  ngOnInit() {
    $('#menu-danhmucphutung').off('click').click(function(){
      $('.active').removeClass('active');
      $(this).parent().addClass('active');
    });

    $('#menu-hangxe').off('click').click(function(){
      $('.active').removeClass('active');
      $(this).parent().addClass('active');
    });
  }

}
