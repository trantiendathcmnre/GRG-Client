import { Component, OnInit } from '@angular/core';
import { ApisService } from '../../services/apis.service';
declare var $:any;
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  categories = 'Categories';
  quote_lists = 'Quote Lists';
  category_of_accessaries = 'Category of Accessaries';
  vehicles = 'Vehicles';
  automakers = 'Automakers';
  unit_of_works = 'Unit of Works';
  unit_of_calculations = 'Unit of Calculations'; 
  providers = 'Providers';
  order_management = 'Orders Management';
  create_orders = 'Create Orders';

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

}
