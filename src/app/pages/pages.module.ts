import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { CommonModule }   from '@angular/common';

// PAGINA PRINCIPAL CONTENEDORA
import { PagesComponent } from './pages.component';

// PAGINAS DEL MODULO
import { DashboardComponent } from './dashboard/dashboard.component';
import { GraficasComponent } from './graficas/graficas.component';

import { ProfileComponent } from './profile/profile.component';
import { SettingsAccountComponent } from './profile/settings-account/settings-account.component';
import { ImageProfileComponent } from './profile/image-profile/image-profile.component';


// MODULOS IMPORTADOS
import { SharedModule } from '../shared/shared.module';

// RUTAS
import { PAGES_ROUTES } from './pages.routes';

// PIPES
import { PipesModule } from '../pipes/pipes.module';



@NgModule({
  declarations: [
    PagesComponent,
    DashboardComponent,
    GraficasComponent,

    ProfileComponent,
    SettingsAccountComponent,
    ImageProfileComponent
  ],
  exports: [
    PagesComponent,
    DashboardComponent,
    GraficasComponent,
    ProfileComponent,
    SettingsAccountComponent,
    ImageProfileComponent
  ],
  imports: [
    // SE DEBE IMPORTAR EL MODULO SHARED POR QUE LA PAGINA CONTIENE PRINCIPAL CONTENEDORA TIENE EL HEADER, SIDEBAR
    SharedModule,
    PAGES_ROUTES,
    PipesModule,
    FormsModule,
    CommonModule
  ]
})
export class PagesModule { }
