import { Component, OnInit } from '@angular/core';

// SERVICIO PARA CARGAR EL MENU DE FORMA DINAMICA
import { SidebarService } from '../../services/service.index';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {

  constructor(public _sidebar: SidebarService) { }

  ngOnInit() {
  }

}
