import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Router } from '@angular/router';

import { UsuarioService } from '../services/service.index';




@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styles: []
})
export class ForgotComponent implements OnInit {

  forma: FormGroup;

  constructor(public router: Router, public _usuarioService: UsuarioService) {
  }

  ngOnInit() {
    this.forma = new FormGroup({
      correo: new FormControl( null , [Validators.required, Validators.email] )
    });
  }

  recuperarPassword(){
    // Se invoca al servicio para enviar el token al correo registrado
    this._usuarioService.forgotPassword(this.forma.value.correo)
      .subscribe( correcto => this.router.navigate(['/login'])  );
  }

  regresarLogin(){
    this.router.navigate(['/login']);
  }
}
