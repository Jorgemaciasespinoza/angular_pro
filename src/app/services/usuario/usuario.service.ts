import { Injectable } from '@angular/core';

import { Usuario } from '../../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { SubirArchivoService } from '../subirArchivo/subir-archivo.service';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';

@Injectable()
export class UsuarioService {

  usuario: Usuario;
  token: string;

  constructor(
    public http: HttpClient,
    public router: Router,
    public _subirArchivoService: SubirArchivoService) {
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


  // FUNCION QUE INVOCA AL SERVICIO ACTUALIZAR LA CONTRASEÑA
  actualizarPassword( password: string, token: string) {

    var objeto: any =  { password: password };

    let url = URL_SERVICIOS + '/login/change-password?token='+token;
    return this.http.post( url, objeto )
                .map( (resp: any) => {
                      swal('Contraseña actualizada', 'Se actualizo correctamente la contraseña', 'success');
                  return true;
                }).catch( err => {
                  swal('Error', err.error.mensaje, 'error');
                  this.router.navigate(['/login']);
                  return Observable.throw ( err );

                });
  }

  // FUNCION QUE INVOCA AL SERVICIO PARA ENVIAR INSTRUCCIONES PARA RECUPERAR LA CONTRASEÑA
  forgotPassword( correo: string) {

    var objeto: any =  { email: correo };

    let url = URL_SERVICIOS + '/login/forgot-password';
    return this.http.post( url, objeto )
                .map( (resp: any) => {
                      swal('Actualizar contraseña',
                      'Se han enviado las instrucciones a su correo para restablecer su contraseña', 'success');
                  return true;
                }).catch( err => {
                  swal('Error', err.error.mensaje, 'error');

                  return Observable.throw ( err );

                });
  }


  actualizarUsuario( usuario: Usuario ){
      let url = URL_SERVICIOS + '/usuario/'+ usuario._id + '?token='+this.token;

      return this.http.put( url, usuario )
      .map( (resp: any) => {

            let usuarioLocal: Usuario = resp.usuario;
            this.guardarStorage( usuarioLocal._id, this.token, usuarioLocal);
            swal('Actualizar usuario',
            'Se actualizo el usuario correctamente', 'success');
            return true;

      }).catch( err => {
        swal('Error', err.error.mensaje, 'error');

        return Observable.throw ( err );

      });

  }

  cambiarImagen(archivo: File, id: string){
    this._subirArchivoService.subirArchivo(archivo, 'usuarios', id)
    .then( ( resp: any ) =>{
      this.usuario.img = resp.usuario.img;
      this.guardarStorage(id, this.token, this.usuario);
      swal('Imagen',
      'Se actualizo correctamente la imagen', 'success');
    }).catch( resp =>{
      swal('Imagen',
      'Ocurrio un error al actualizar la imagen', 'error');
    });
  }

}
