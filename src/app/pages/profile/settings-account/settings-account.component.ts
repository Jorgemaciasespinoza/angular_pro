import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Usuario } from '../../../models/usuario.model';

import { UsuarioService } from '../../../services/service.index';

@Component({
  selector: 'app-settings-account',
  templateUrl: './settings-account.component.html',
  styles: []
})
export class SettingsAccountComponent implements OnInit {

  usuario: Usuario;
  forma: FormGroup;

  constructor(
    public _usuarioService: UsuarioService
  ) {
    this.usuario = this._usuarioService.usuario;
  }

  ngOnInit() {
    this.forma = new FormGroup({
      nombre: new FormControl( this.usuario.nombre , Validators.required ),
      email: new FormControl( this.usuario.email , [Validators.required, Validators.email] ),
      password: new FormControl( null ),
      password2: new FormControl( null )
    }, { validators: this.sonIguales( 'password', 'password2' )  } );
  }

  guardarPerfil(){
    this.usuario.nombre = this.forma.value.nombre;

    // Se establece a nulo por que el valor es :)
    // Si el servicio detecta null no lo actualiza
    this.usuario.password = null;

    //Solo si se escribio la contraseña se establece la propiedad
    if (this.forma.value.password != null){
      this.usuario.password = this.forma.value.password;
    }

    if ( !this.usuario.google ){
      this.usuario.email = this.forma.value.email;
    }

    this._usuarioService.actualizarUsuario( this.usuario )
      .subscribe( resp =>{
        let usr: any ={
          nombre: resp.usuario.nombre,
          email: resp.usuario.email,
          password: '',
          password2: ''
        }
        this.forma.setValue(usr);
      });
  }

  sonIguales( campo1: string, campo2: string ) {

    return ( group: FormGroup ) => {

      let pass1 = group.controls[campo1].value;
      let pass2 = group.controls[campo2].value;

      if ( pass1 === pass2 ) {
        return null;
      }

      return {
        sonIguales: true

      };

    }
  }

}
