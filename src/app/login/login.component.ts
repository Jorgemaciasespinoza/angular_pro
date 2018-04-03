import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { Usuario } from '../models/usuario.model';
import { UsuarioService } from '../services/service.index';


declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {

  recuerdame: Boolean = false;
  email: string;

  auth2: any;

  constructor(
    public router: Router,
    public _usuarioService: UsuarioService
  ){ }

  ngOnInit() {

    this.googleInit();

    // AL CARGAR LA PAGINA RECUPERA EL EMAIL DEL LOCALSTORAGE
    // SI NO EXISTE NADA RETORNA undefined , SI ES ASI MANDA '' VACIO
    this.email = localStorage.getItem('email') || '';

    // SI EXISTE ALGO EN EL STORAGE MARCA LA CASILLA REECUERDAME
    if ( this.email.length > 1 ) {
      this.recuerdame = true;
    }


  }

  // INICIALIZAR LOS PARAMETROS NECESARIOS PARA LA AUTENTICACION CON GOOGLE
  googleInit() {

    gapi.load('auth2', () => {

      this.auth2 = gapi.auth2.init({
        client_id: '442737206823-dilej5tevnrv61sovd7bocf5qeafmjs3.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });

      this.attachSignin( document.getElementById('btnGoogle') );

    });

  }


  attachSignin( element ) {

    this.auth2.attachClickHandler( element, {}, (googleUser) => {

      // let profile = googleUser.getBasicProfile();
      let token = googleUser.getAuthResponse().id_token;

      this._usuarioService.loginGoogle( token )
              .subscribe( () => window.location.href = '#/dashboard'  );

    });

  }

  // REDIRIGE A LA PAGINA DE REGISTRO
  registrar(){
    this.router.navigate(['/register']);
  }

  // INGRESAR DE FORMA TRADICIONAL
  ingresar( forma: NgForm) {

    // SI LA FORMA NO ES VALIDA NO SE HACE NADA
    if ( forma.invalid ) {
      return;
    }

    // CREAMOS UN OBJETO TIPO USUARIO
    let usuario = new Usuario(null, forma.value.email, forma.value.password );

    // SE INVOCA AL SERVICIO LOGIN Y REDIRECCIONA AL dashboard
    this._usuarioService.login( usuario, forma.value.recuerdame )
                  .subscribe( correcto => this.router.navigate(['/dashboard'])  );
  }

  forgot(){
    this.router.navigate(['/forgot']);
  }

}
