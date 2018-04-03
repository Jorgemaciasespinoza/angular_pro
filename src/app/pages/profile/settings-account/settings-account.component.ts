import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Usuario } from '../../../models/usuario.model';

import { UsuarioService } from '../../../services/service.index';

@Component({
  selector: 'app-settings-account',
  templateUrl: './settings-account.component.html',
  styles: []
})
export class SettingsAccountComponent implements OnInit {

  usuario: Usuario;

  constructor(
    public _usuarioService: UsuarioService
  ) {
    this.usuario = this._usuarioService.usuario;
  }

  ngOnInit() {
  }

  guardarPerfil(usuario: Usuario){

    this.usuario.nombre = usuario.nombre;

    if ( !this.usuario.google ){
      this.usuario.email = usuario.email;
    }

    this._usuarioService.actualizarUsuario( this.usuario )
      .subscribe();
  }

}
