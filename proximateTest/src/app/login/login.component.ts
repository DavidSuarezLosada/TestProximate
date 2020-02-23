import { Component, OnInit } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';

import { ServicesService } from '../services.service';
import { Login } from '../components/login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public dataReceived: string[];
  message:String="";
  constructor(private service: ServicesService, private _router: Router) { }

  ngOnInit(): void {

  }

  login(UserName: string, Password: string): void {
    UserName = UserName.trim();
    Password = Password.trim();
    if (!UserName) { return; } //se verifica que el input no esté vacío
    else {
      this.service.postLogin({ UserName, Password } as Login)
        .subscribe(res => {
          if (res.codeStatus === 'Ok') {
            localStorage.setItem('UserName', UserName);
            localStorage.setItem('Password', Password);
            this._router.navigate(['/home-page']);
            this.dataReceived = res;
          } //Si la autenticación es satisfactoria redirecciona a la homepage
          else
          {
            this.message="Contraseña y/o usuarios incorrectos";
          }
        });
    }
  } //Realizo logueo consumiendo el servicio 1
  cleanMessage(){
    this.message="";
  }







}
