import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../../models/usuario.model';

import { UsuarioService } from '../../../services/service.index';

@Component({
  selector: 'app-image-profile',
  templateUrl: './image-profile.component.html',
  styles: []
})
export class ImageProfileComponent implements OnInit {

  usuario: Usuario;
  imagenSubir: File;
  imagenTemp: string;

  constructor(public _usuarioService: UsuarioService) {
      this.usuario = this._usuarioService.usuario;
  }

  ngOnInit() {
  }

  seleccionImagen( archivo: File, ){

    if ( !archivo ){
      this.imagenSubir = null;
      return;
    }

    if ( archivo.type.indexOf('image') <0 ){
      swal('Error', 'El archivo seleccionado no es una imagen', 'error');
      this.imagenSubir = null;
      return;
    }

    this.imagenSubir = archivo;

    let reader = new FileReader();

    let urlImagen = reader.readAsDataURL( archivo );

    reader.onloadend = ()=> this.imagenTemp = reader.result;
  }

  cambiarImagen(){
    this._usuarioService.cambiarImagen( this.imagenSubir, this.usuario._id );
  }

}
