import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/service.index';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

declare var swal: any;

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {

  usuarios: Usuario[] = [];
  desde: number = 0;

  totalRegistros: number = 0;
  actual: number = 0;
  cargando: boolean = true;

  public data: any[];
  public filterQuery = "";
  public rowsOnPage = 3;
  public sortBy = "email";
  public sortOrder = "asc";

  constructor(
    public _usuarioService: UsuarioService,
    public _modalUploadService: ModalUploadService
  ) { }

  ngOnInit() {
    this.cargarUsuarios();
    this._modalUploadService.notificacion.subscribe( resp => {
      this.cargarUsuarios();
    });
  }

  cargarUsuarios(){

    this.cargando = true;

    this._usuarioService.cargarUsuarios(this.desde)
    .subscribe( (resp: any) => {
      this.totalRegistros = resp.total;
      this.actual = resp.posicion;
      this.usuarios = resp.usuarios;
      this.data = resp.usuarios;
      this.cargando = false;
    });
  }


  cambiarDesde(valor: number){
      let desde = this.desde + valor;

      console.log(desde);

      if (desde >= this.totalRegistros ){
        return;
      }

      if (desde < 0  ){
        return;
      }

      this.desde += valor;
      this.cargarUsuarios();
  }

  buscarUsuario( termino: string ){

    if (termino.length <=0 ){
      this.cargarUsuarios();
      return;
    }

    this.cargando = true;

    this._usuarioService.buscarUsuarios( termino )
    .subscribe( (resp: any) => {
      this.usuarios = resp.usuarios;
      this.data = resp.usuarios;

      this.cargando = false;
    });
  }

  guardarUsuario(usuario: Usuario){
    this._usuarioService.actualizarUsuario(usuario)
    .subscribe();
  }

  borrarUsuario(usuario: Usuario){

    if ( usuario.pk_usuario === this._usuarioService.usuario.pk_usuario){
      swal('Error', 'No puedes eliminar tu propio usuario', 'error');
      return;
    }
    swal({
      title: "¿Esta seguro?",
      text: "Esta a punto de eliminar a: "+ usuario.nombre,
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then( borrar  => {

      if (borrar) {
        this._usuarioService.borrarUsuario(usuario.pk_usuario)
        .subscribe( borrado =>{
          this.cargarUsuarios();
        });
      }
      else {

      }
    });
  }

  mostrarModal(id: string) {
    this._modalUploadService.mostrarModal('usuarios', id);
  }

}
