import { Injectable } from '@angular/core';

import { Usuario } from '../../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';


import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';

@Injectable()
export class UsuarioService {

  usuario: Usuario;
  token: string;

  constructor( public http: HttpClient, public router: Router) {
    this.cargarStorage();
  }

  // FUNCION QUE INVOCA AL SERVICIO PARA CREAR UN USUARIO
  crearUsuario( usuario: Usuario ) {

    let url = URL_SERVICIOS + '/usuario';

    return this.http.post( url, usuario )
              .map( (resp: any) => {

                swal('Usuario creado', usuario.email, 'success' );
                return resp.usuario;

              }).catch( err => {


                swal(err.error.mensaje, err.error.errors.message, 'error');
                return Observable.throw ( err );

              });
  }

  // FUNCION QUE INVOCA AL SERVICIO PARA AUTENTICAR USUARIO
  login( usuario: Usuario, recordar: boolean = false ) {

    // SI SE MARCA LA CASILLA RECORDAR SE GRABA EL EMAIL EN EL LOCALSTORAGE
    if ( recordar ) {
      localStorage.setItem('email', usuario.email );
    }
    // SI NO FUE MARCADA LA CISILLA SE ELIMINA DEL LOCALSTORAGE
    else {
      localStorage.removeItem('email');
    }

    let url = URL_SERVICIOS + '/login';
    return this.http.post( url, usuario )
                .map( (resp: any) => {

                  this.guardarStorage( resp.id, resp.token, resp.usuario );

                  return true;
                }).catch( err => {


                  swal('Error', err.error.mensaje, 'error');
                  return Observable.throw ( err );

                });

  }

  // FUNCION PARA GUARDAR EN EL LOCALSTORAGE
  guardarStorage( id: string, token: string, usuario: Usuario ) {

    localStorage.setItem('id', id );
    localStorage.setItem('token', token );
    localStorage.setItem('usuario', JSON.stringify(usuario) );

    this.usuario = usuario;
    this.token = token;
  }

  // FUNCION QUE INVOCA AL SERVICIO DE AUTENTICACION CON GOOGLE
  loginGoogle( token: string ) {

    let url = URL_SERVICIOS + '/login/google';

    return this.http.post( url, { token } )
                .map( (resp: any) => {
                  this.guardarStorage( resp.id, resp.token, resp.usuario );
                  return true;
                });


  }

  // FUNCION PARA VERIFICAR SI EL USUARIO ESTA LOGEADO
  estaLogueado() {
    return ( this.token.length > 5 ) ? true : false;
  }

  // FUNCION PARA CARGAR DEL STORAGE EL TOKEN Y EL USUARIO
  cargarStorage() {

    if ( localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse( localStorage.getItem('usuario') );
    } else {
      this.token = '';
      this.usuario = null;
    }

  }


  // FUNCION PARA CERRAR LA SESION
  logout() {
    this.usuario = null;
    this.token = '';

    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    localStorage.removeItem('id');

    this.router.navigate(['/login']);
  }


}
