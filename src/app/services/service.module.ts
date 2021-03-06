import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { SidebarService,
         UsuarioService,
         LoginGuardGuard,
         AdminGuard,
         SubirArchivoService,
         VerificaTokenGuard
        } from './service.index';

import { ModalUploadService } from '../components/modal-upload/modal-upload.service';


@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    SidebarService,
    UsuarioService,
    LoginGuardGuard,
    AdminGuard,
    SubirArchivoService,
    ModalUploadService,
    VerificaTokenGuard
  ],
  declarations: []
})
export class ServiceModule { }
