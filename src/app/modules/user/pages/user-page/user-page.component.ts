import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserCreateComponent } from '@modules/user/components/user-create/user-create.component';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent implements OnInit {

  constructor(private dialog: MatDialog) {}

  ngOnInit() {

  }

  openCreateUserDialog() {
    const dialogRef = this.dialog.open(UserCreateComponent, {
      width: '400px', // Ajusta el ancho según tus necesidades
    });

    dialogRef.afterClosed().subscribe(result => {
      // Aquí puedes manejar acciones después de que se cierre el diálogo
    });
  }
  
}
