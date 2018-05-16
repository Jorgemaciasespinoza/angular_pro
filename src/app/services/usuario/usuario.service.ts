// ==================================================
// NOMBRE ARCHIVO: usuario.service.ts
// DESCRIPCION: operaciones con usuarios
// AUTOR: Jorge Macias
// ULTIMA ACTUALIZACION: 18/04/2018
// ==================================================


// ==================================================
// IMPORTS
// ==================================================
import { Injectable } from '@angular/core';

// Modelo usuario
import { Usuario } from '../../models/usuario.model';

// Http para hacer peticiones al backend
import { HttpClient } from '@angular/common/http';

// Url de los servicios
import { URL_SERVICIOS } from '../../config/config';

// Servicio para subir archivos
import { SubirArchivoService } from '../subirArchivo/subir-archivo.service';

// Opreador map, catch, throw
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

// Router para navegar entre rutas
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';

declare function init_sidebar();

@Injectable()
export class UsuarioService {

  // Usuario firmado
  usuario: Usuario;

  // Token del usuario firmado
  token: string;

  // Menu del usuario firmado
  menu = [];

  constructor(
    public http: HttpClient,
    public router: Router,
    public _subirArchivoService: SubirArchivoService) {
    // Para obtener los datos del usuario en caso de que ya este firmado
    this.cargarStorage();
  }

  // ==================================================
  // FUNCION PARA RENOVAR EL TOKEN
  // ==================================================
  renuevaToken(){
    let url = URL_SERVICIOS + '/login/renuevaToken';
    url +=  '?token=' + this.token;
    return this.http.get( url )
    .map( (resp: any) => {

      this.token = resp.token;
      localStorage.setItem('token', this.token);
      console.log('Token renovado');
      return true;

      // swal('Usuario eliminado', 'El usuario se elimino correctamente', 'success');
    })
    .catch( err => {

      this.router.navigate(['/login']);
      swal('No se pudo renovar token', 'No fue posible renovar tus credenciales', 'error');
      return Observable.throw ( err );

    });
  }


  // ==================================================
  // FUNCION PARA LOGEAR USUARIO CON METODO TRADICIONAL
  // ==================================================
  login( usuario: Usuario, recordar: boolean = false ) {

    // Si se marca el check para recordar correo electronico
    if ( recordar ) {
      localStorage.setItem('email', usuario.email ); // calve, valor
    }
    // Si no se marca elimina el correo del localStorage
    else {
      localStorage.removeItem('email');
    }

    // se establece la uri del servicio
    let url = URL_SERVICIOS + '/login';

    return this.http.post( url, usuario )
                    .map( (resp: any) => {

                      this.guardarStorage( resp.id, resp.token, resp.usuario );
                      return true;

                    }).catch( err => {

                      // Se maneja el error, si algo sucede
                      swal('Error', err.error.mensajeUsuario, 'error');
                      return Observable.throw ( err );

                    });
  }


  // ==================================================
  // FUNCION PARA LOGEAR USUARIO A TRAVES DE GOOGLE
  // ==================================================
    loginGoogle( token: string ) {

      let url = URL_SERVICIOS + '/login/google';

      return this.http.post( url, { token } )
                      .map( (resp: any) => {

                        this.guardarStorage( resp.id, resp.token, resp.usuario );
                        return true;
                      }).catch( err => {

                        swal('Error', err.error.mensajeUsuario, 'error');
                        return Observable.throw ( err );

                      });
    }


  // ==================================================
  // FUNCION PARA GUARDAR USUARIO EN localStorage
  // ==================================================
    guardarStorage( id: string, token: string, usuario: Usuario ) {

      localStorage.setItem('token', token );
      localStorage.setItem('name', usuario.nombre);
      // Obtiene los datos del usuario en memoria
      this.usuario = usuario;
      this.token = token;
      if (this.menu.length === 0){
        this.menu = JSON.parse( atob(this.token.split('.')[1])  ).menu;
      }
    }


  // ==================================================
  // FUNCION PARA VERIFICAR SI EL USUARIO ESTA LOGEADO
  // ==================================================
  estaLogueado() {
    return ( this.token.length > 5 ) ? true : false;
  }

  // ==================================================
  // FUNCION PARA CARGAR DEL STORAGE EL TOKEN Y EL USUARIO
  // ==================================================
  cargarStorage() {

    if ( localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse( atob(this.token.split('.')[1])  ).usuario;
      this.usuario.nombre = localStorage.getItem('name');
      console.log(this.usuario);
      this.menu = JSON.parse( atob(this.token.split('.')[1])  ).menu;
    } else {
      this.token = '';
      this.usuario = null;
      this.menu = [];
    }

  }


  // ==================================================
  // FUNCION PARA CERRAR LA SESION
  // ==================================================
  logout() {
    this.usuario = null;
    this.token = '';
    this.menu = [];

    localStorage.removeItem('token');
    localStorage.removeItem('name');

    this.router.navigate(['/login']);
  }


  // ==================================================
  // FUNCION PARA REGISTRAR UN USUARIO
  // ==================================================
    crearUsuario( usuario: Usuario ) {

      let url = URL_SERVICIOS + '/usuario';

      return this.http.post( url, usuario )
                      .map( (resp: any) => {

                        swal('Usuario creado', usuario.email, 'success' );
                        return resp.usuario;

                      }).catch( err => {

                        swal('Error', err.error.mensajeUsuario, 'error');
                        return Observable.throw ( err );

                      });
    }



  // ==================================================
  // FUNCION QUE INVOCA AL SERVICIO PARA ENVIAR INSTRUCCIONES PARA RECUPERAR LA CONTRASEÑA
  // ==================================================
  forgotPassword( correo: string) {

    var objeto: any =  { email: correo };

    let url = URL_SERVICIOS + '/login/forgot-password';
    return this.http.post( url, objeto )
                .map( (resp: any) => {
                      swal('Actualizar contraseña',
                      'Se han enviado las instrucciones a su correo para restablecer su contraseña', 'success');
                  return true;
                }).catch( err => {

                  swal('Error', err.error.mensajeUsuario, 'error');
                  return Observable.throw ( err );

                });
  }

  // ==================================================
  // FUNCION QUE INVOCA AL SERVICIO ACTUALIZAR LA CONTRASEÑA
  // ==================================================
  actualizarPassword( password: string, token: string) {

    var objeto: any =  { password: password };

    let url = URL_SERVICIOS + '/login/change-password?token='+token;
    return this.http.post( url, objeto )
                .map( (resp: any) => {
                      swal('Contraseña actualizada', 'Se actualizo correctamente la contraseña', 'success');
                  return true;
                }).catch( err => {
                  swal('Error', err.error.mensajeUsuario, 'error');
                  this.router.navigate(['/login']);
                  return Observable.throw ( err );

                });
  }


  actualizarUsuario( usuario: Usuario ){

      let url = URL_SERVICIOS + '/usuario/'+ usuario.pk_usuario + '?token='+this.token;

      return this.http.put( url, usuario )
      .map( (resp: any) => {

            if ( usuario.pk_usuario === this.usuario.pk_usuario){
              let usuarioLocal: Usuario = resp.usuario;
              console.log(usuarioLocal.pk_usuario);
              console.log(this.token);
              console.log(usuarioLocal);
              this.guardarStorage( usuarioLocal.pk_usuario, this.token, usuarioLocal);
            }

            // init_sidebar();
            swal('Actualizar usuario','Se actualizo el usuario correctamente', 'success');
            return resp;

      }).catch( err => {
        swal('Error', err.error.mensajeUsuario, 'error');
        return Observable.throw ( err );

      });

  }

  cambiarImagen(archivo: File, id: string){
    this._subirArchivoService.subirArchivo(archivo, 'usuarios', id)
    .then( ( resp: any ) =>{

      console.log(this.menu);
      this.usuario.imagen = resp.imagen;
      this.guardarStorage(id, this.token, this.usuario);

      swal('Imagen',
      'Se actualizo correctamente la imagen', 'success');
    }).catch( resp =>{

      swal('Imagen',
      'Ocurrio un error al actualizar la imagen', 'error');

    });
  }

  cargarUsuarios(desde: number =0){
    let url = URL_SERVICIOS + '/usuario?desde='+desde+ '&token='+this.token;
    return this.http.get( url );
  }

  buscarUsuarios(termino: string){

    let url = URL_SERVICIOS + '/usuario/busqueda/'+termino+'?token='+this.token;
    return this.http.get( url );
  }

  borrarUsuario(id: string){
    let url = URL_SERVICIOS + '/usuario/'+id+'?token='+this.token;
    return this.http.delete( url )
    .map( resp => {
      swal('Usuario eliminado', 'El usuario se elimino correctamente', 'success');
      return true;
    });
  }

}
