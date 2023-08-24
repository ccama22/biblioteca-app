import { DatePipe } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { BooksModel } from '@core/models/books.model';
import { BookService } from '@modules/book/services/book.service';
import { Subscription } from 'rxjs';
import { BookEditComponent } from '../book-edit/book-edit.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent {
  // users: UsersModel[] = [];
  dataSource: MatTableDataSource<BooksModel>;

  displayedColumns: string[] = ['nro','title', 'author', 'available','startDate','actions'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  private booksSubscription!: Subscription;

  suscription!: Subscription;

  constructor(
    private bookService: BookService,
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
    this.dataSource = new MatTableDataSource<BooksModel>([]);
  }

  ngOnInit() {
    this.getPeriodicTableData(); 
  }
  
  getPeriodicTableData(): void {
    this.getBook()

    this.suscription = this.bookService.refresh$.subscribe(()=>{
      this.getBook()
  })
  }


  getBook():void{
    this.booksSubscription = this.bookService.loadBooks().subscribe((books) => {
      const dataBook = books.map((book: any) => ({
        ...book,
        available: book.available ? "disponible" : "no disponible",
        createdAt: this.formatCreatedAt(book.createdAt)
      }));

      this.dataSource.data = dataBook;
      this.dataSource.paginator = this.paginator;
    });
  }

  ngOnDestroy(): void {
    this.booksSubscription.unsubscribe();
  }
  private formatCreatedAt(createdAt: string | null): string {
    if (createdAt === null) {
      return ''; // O cualquier otro valor predeterminado que desees mostrar para fechas inválidas o nulas
    }

    // Importa DatePipe en el constructor para usarlo aquí
    const datePipe = new DatePipe('en-US'); // Ajusta la configuración de localización si es necesario

    return datePipe.transform(createdAt, 'yyyy-MM-dd / HH:mm:ss') || '';
  }

  editRow(row: any) {
    const dialogRef = this.dialog.open(BookEditComponent, {
      width: '400px', // Ajusta el ancho del modal según tus necesidades
      data: row // Puedes pasar datos al componente del diálogo si es necesario
    });
    dialogRef.afterClosed();
    console.log('Edit clicked for row:', row);
  }

  deleteRow(row: any) {
    this.bookService.deleteBook(row._id).subscribe(
      () => {

        this.snackBar.open(`Libro eliminado correctamente`, 'Cerrar', {
          duration: 3000 // Duración en milisegundos del snackbar visible
        });
      },
   );
  }
}
