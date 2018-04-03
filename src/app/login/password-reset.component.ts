import { Component, OnInit } from '@angular/core';

import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { UsuarioService } from '../services/service.index';



@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styles: []
})

export class PasswordResetComponent implements OnInit {

  forma: FormGroup;
  token: string;

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute, // activatedRoute recuperar el token por path
    public _usuarioService: UsuarioService
  )
  {
    activatedRoute.params.subscribe( params => {
      this.token = params.token;
    });
  }

  ngOnInit() {
    this.forma = new FormGroup({
      password: new FormControl( null , Validators.required ),
      password2: new FormControl( null , Validators.required )
    },  { validators: this.sonIguales( 'password', 'password2' )  });
  }

  actualizarPassword(){
    // Se invoca al servicio para actualizar la contraseña
    if ( this.forma.valid ){
      this._usuarioService.actualizarPassword( this.forma.value.password , this.token )
      .subscribe( correcto => this.router.navigate(['/login'])  );
    }

  }

  regresarLogin(){
    this.router.navigate(['/login']);
  }

  // cambiar a comunes
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
