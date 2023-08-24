import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BookCreateComponent } from '@modules/book/components/book-create/book-create.component';

@Component({
  selector: 'app-book-page',
  templateUrl: './book-page.component.html',
  styleUrls: ['./book-page.component.scss']
})
export class BookPageComponent implements OnInit {

  constructor(private dialog: MatDialog) {}
  ngOnInit() {

  }

  openCreateBookDialog() {
    const dialogRef = this.dialog.open(BookCreateComponent, {
      width: '400px', // Ajusta el ancho según tus necesidades
    });

    dialogRef.afterClosed();
  }
}
