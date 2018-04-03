import { RouterModule, Routes } from '@angular/router';


import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GraficasComponent } from './graficas/graficas.component';

import { LoginGuardGuard } from '../services/service.index';

import { ProfileComponent } from './profile/profile.component';

import { SettingsAccountComponent } from './profile/settings-account/settings-account.component';
import { ImageProfileComponent } from './profile/image-profile/image-profile.component';
import { UsuariosComponent } from './usuarios/usuarios.component';


const pagesRoutes: Routes = [
  {
    path: '',
    component: PagesComponent,
    canActivate: [ LoginGuardGuard ],
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'graficas', component: GraficasComponent },
      {
        path: 'profile',
        component: ProfileComponent,
        canActivate: [ LoginGuardGuard ],
        children: [
          { path: 'settings-account', component: SettingsAccountComponent },
          { path: 'image-profile', component: ImageProfileComponent },
          { path: '', redirectTo: 'settings-account', pathMatch: 'full' }
        ]
      },
      { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
      // Mantenimientos
      { path: 'usuarios', component: UsuariosComponent }
    ]
  }
];
export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes );
