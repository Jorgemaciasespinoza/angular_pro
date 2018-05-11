import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { UsuarioService } from '../usuario/usuario.service';

@Injectable()
export class AdminGuard implements CanActivate {

  constructor(public _usuarioService: UsuarioService, public router:Router) {

  }

  canActivate() {

    if (this._usuarioService.usuario.rol === 'ADMIN') {
      return true;
    }
    else{
      console.log('Bloqueado por el Admin Guard');
      this._usuarioService.logout();
      return false;
    }
  }
}
