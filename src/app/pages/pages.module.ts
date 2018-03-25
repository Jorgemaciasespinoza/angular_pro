import { NgModule } from '@angular/core';

// PAGINA PRINCIPAL CONTENEDORA
import { PagesComponent } from './pages.component';

// PAGINAS DEL MODULO
import { DashboardComponent } from './dashboard/dashboard.component';
import { GraficasComponent } from './graficas/graficas.component';

// MODULOS IMPORTADOS
import { SharedModule } from '../shared/shared.module'

// RUTAS
import { PAGES_ROUTES } from './pages.routes';

@NgModule({
  declarations: [
    PagesComponent,
    DashboardComponent,
    GraficasComponent
  ],
  exports: [
    PagesComponent,
    DashboardComponent,
    GraficasComponent
  ],
  imports: [
    // SE DEBE IMPORTAR EL MODULO SHARED POR QUE LA PAGINA CONTIENE PRINCIPAL CONTENEDORA TIENE EL HEADER, SIDEBAR
    SharedModule,
    PAGES_ROUTES 
  ]
})
export class PagesModule { }
