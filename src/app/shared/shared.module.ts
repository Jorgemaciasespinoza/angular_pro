import { NgModule } from '@angular/core'; // ES REQUERIDO PARA QUE FUNCIONE EL MODULO
import { CommonModule } from '@angular/common'; // ES REQUERIDO PARA EL NGFOR

import { RouterModule } from '@angular/router';  // ES REQUERIDO PARA EL MANEJO DE LAS RUTAS

// PAGINAS
import { NopagesfoundComponent } from './nopagesfound/nopagesfound.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';


// MODULO DE SERVICIOS
import { ServiceModule } from '../services/service.module';

@NgModule({
  imports: [
    RouterModule,
    ServiceModule,
    CommonModule
  ],
  declarations: [
    HeaderComponent,
    SidebarComponent,
    NopagesfoundComponent
  ],
  exports: [
    HeaderComponent,
    SidebarComponent,
    NopagesfoundComponent
  ]
})
export class SharedModule { }
