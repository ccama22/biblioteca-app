import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ReservationCreateComponent } from '@modules/reservation/components/reservation-create/reservation-create.component';

@Component({
  selector: 'app-reservation-page',
  templateUrl: './reservation-page.component.html',
  styleUrls: ['./reservation-page.component.scss']
})
export class ReservationPageComponent {
  constructor(private dialog: MatDialog) {}
  ngOnInit() {

  }

  openCreateReservationDialog() {
    const dialogRef = this.dialog.open(ReservationCreateComponent, {
      width: '450px', // Ajusta el ancho según tus necesidades
    });

    dialogRef.afterClosed();
  }
}
