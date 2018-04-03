import { Injectable } from '@angular/core';

@Injectable()
export class SidebarService {

  menu: any = [
    {
      titulo: 'Principal',
      icono: 'icon icon-speedometer',
      submenu: [
        { titulo: 'Dashboard', icono: 'icon icon-target', url: '/dashboard' },
        { titulo: 'Graficas', icono: 'icon icon-target', url: '/graficas' }
      ]
    },
    {
      titulo: 'Mantenimientos',
      icono: 'icon icon-speedometer',
      submenu: [
        { titulo: 'Usuarios', icono: 'icon icon-target', url: '/usuarios' }
      ]
    },
  ];
  constructor() { }

}
