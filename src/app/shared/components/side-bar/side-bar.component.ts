import { Component, Input, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent {
  mainMenu: { defaultOptions: Array<any>,accessLink: Array<any>} =
  { defaultOptions:[],accessLink:[]}

  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;

  constructor() { }

  ngOnInit(): void {
    this.mainMenu.defaultOptions = [
      {
        name: 'Usuarios',
        icon: 'person',
        router: ['/','user']
      },
      {
        name: 'Libros',
        icon: 'book',
        router: ['/','book']
      },
      {
        name: 'Reservación',
        icon:'event',
        router: ['/','reservation']
      }
    ]
  }

}
