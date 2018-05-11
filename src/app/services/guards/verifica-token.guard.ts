import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { CanActivateChild } from '@angular/router/src/interfaces';
import { Observable } from 'rxjs/Observable';

import { UsuarioService } from '../usuario/usuario.service';
import { Router } from '@angular/router';
@Injectable()
export class VerificaTokenGuard implements CanActivateChild {
  constructor(
    public _usuarioService: UsuarioService
  ){}

  canActivateChild(): Promise<boolean> | boolean {

    let token = this._usuarioService.token;
    let payload = JSON.parse( atob( token.split('.')[1]));

    let expirado = this.expirado(payload.exp);

    if ( expirado ){
      this._usuarioService.logout();
      return false;
    }
    return this.verificaRenovacion( payload.exp);
  }

  expirado(fechaExpiracion: number){
    let ahora = new Date().getTime() / 1000;

    if (fechaExpiracion < ahora){
      return true;
    }
    else{
      return false ;
    }

  }

  verificaRenovacion( fechaExpiracion: number): Promise<boolean>{
    return new Promise( (resolve, reject ) => {
      let tokenExp = new Date( fechaExpiracion * 1000);
      let ahora = new Date();

      // Horas de gracia
      ahora.setTime( ahora.getTime() + (1 * 60 * 60 * 1000) );

      if( tokenExp.getTime() > ahora.getTime()){
        resolve( true );
      }
      else{
        this._usuarioService.renuevaToken()
        .subscribe( () =>{
          resolve( true );
        }, () =>{
          this._usuarioService.logout();
          reject( false );
        })
      }

    });
  }

}
