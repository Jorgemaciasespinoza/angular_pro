import { Component, OnInit } from '@angular/core';

declare function init_sidebar();

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: []
})
export class PagesComponent implements OnInit {


  constructor() { }

  ngOnInit() {
    init_sidebar();
  }

}
