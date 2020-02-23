import { Component, OnInit } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';

import { ServicesService } from '../services.service';
import { ShareDataService } from '../share-data.service';
import { Login } from '../components/login';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  dataReceived: string[];
  productsReceived: string[];
  UserName = localStorage.getItem('UserName');;
  Password = localStorage.getItem('Password');;
  itemsMenu: String[];
  productsList: String[];

  constructor(private service: ServicesService, private _router: Router, private _shareData: ShareDataService) { }

  ngOnInit(): void {
    if (this.UserName) {
      this.products();
      this.menu(this.UserName, this.Password);
    } //Si no hay variables en el localstorage redirecciona a la login page
    else {
      this._router.navigate([''])
    }
  }

  products(): void {
    this.service.getMenu()
      .subscribe(res => {
        this.productsReceived = res['data'];
        this.productsList = [];
        this.productsReceived.forEach((x) => {
          this.productsList.push(x);
        });
      });
  } //Servicio para capturar productos

  menu(UserName: string, Password: string): void {
    if (!UserName) { return; }
    else {
      this.service.postLogin({ UserName, Password } as Login)
        .subscribe(res => {
          if (res.codeStatus === 'Ok') {
            this.dataReceived = res['data']['Menu'];
            this.itemsMenu = [];
            this.dataReceived.forEach((x) => {
              this.itemsMenu.push(x);
            });
          }
        });
    }
  } //servicio para capturar menú

  logOut() {
    localStorage.clear();
  } //Función para borrar credenciales

}
