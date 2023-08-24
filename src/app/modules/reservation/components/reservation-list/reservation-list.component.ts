import { DatePipe } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ReservationService } from '@modules/reservation/services/reservation.service';
import { Subscription } from 'rxjs';
import { ReservationEditComponent } from '../reservation-edit/reservation-edit.component';

@Component({
  selector: 'app-reservation-list',
  templateUrl: './reservation-list.component.html',
  styleUrls: ['./reservation-list.component.scss']
})
export class ReservationListComponent {
  dataSource: MatTableDataSource<any>;

  displayedColumns: string[] = ['nro','user_id', 'book_id', 'dateReserved','dateDue','actions'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  private booksSubscription!: Subscription;

  suscription!: Subscription;

  constructor(
    private reservationService: ReservationService,
    private matPaginatorIntl: MatPaginatorIntl,
    private snackBar: MatSnackBar,
    public dialog: MatDialog,) 
    {
    this.matPaginatorIntl.itemsPerPageLabel = "Registros por página";
    this.matPaginatorIntl.nextPageLabel="Siguiente página";
    this.matPaginatorIntl.previousPageLabel="Página anterior";
    this.matPaginatorIntl.lastPageLabel = "Última página";
    this.matPaginatorIntl.getRangeLabel = (page: number, pageSize: number, length: number) => {
      if (length === 0 || pageSize === 0) {
        return '0 de 0'; // Texto traducido para "0 of 0"
      }
  
      const startIndex = page * pageSize + 1;
      const endIndex = Math.min(startIndex + pageSize - 1, length);
  
      return `${startIndex} - ${endIndex} de ${length}`;
    };
    this.dataSource = new MatTableDataSource<any>([]);
  }

  ngOnInit() {
    this.getPeriodicTableData(); 
  }
  
  getPeriodicTableData(): void {
    this.getBook()

    this.suscription = this.reservationService.refresh$.subscribe(()=>{
      this.getBook()
  })
  }


  getBook():void{
    this.booksSubscription = this.booksSubscription = this.reservationService.loadReservation().subscribe((combinedResults: any) => {
      const reservations = combinedResults.map((combinedData:any) => {
        const reservation = combinedData.reservation;
        const userDetail = combinedData.userDetail;
        const additionalData = combinedData.additionalData;

        // Apply your mapping logic here
        const mappedReservation = {
          ...reservation,
          user_id: reservation.user_id,
          ...userDetail,
          book: additionalData.book,
          dateReserved: this.formatCreatedAt(reservation.dateReserved),
          dateDue: this.formatCreatedAt(reservation.dateDue),
        };
    
        return mappedReservation;
      });

      console.log("reservvaa",reservations)
    
      this.dataSource.data = reservations;
      this.dataSource.paginator = this.paginator;
    });

    
  }

  private formatCreatedAt(createdAt: string | null): string {
    if (createdAt === null) {
      return '';
    }

    const datePipe = new DatePipe('en-US');

    return datePipe.transform(createdAt, 'yyyy-MM-dd / HH:mm:ss') || '';
  }

  editRow(row: any) {
    const dialogRef = this.dialog.open(ReservationEditComponent, {
      width: '400px', // Ajusta el ancho del modal según tus necesidades
      data: row // Puedes pasar datos al componente del diálogo si es necesario
    });
    dialogRef.afterClosed();
    console.log('Edit clicked for row:', row);
  }

  deleteRow(row: any) {
    this.reservationService.deleteReservation(row._id).subscribe(
        () => {

          this.snackBar.open(`Reserva eliminada correctamente`, 'Cerrar', {
            duration: 3000 // Duración en milisegundos del snackbar visible
          });
        },
    );
  }

}
