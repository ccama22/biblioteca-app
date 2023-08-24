import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookRoutingModule } from './book-routing.module';

import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';

import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { BookPageComponent } from './pages/book-page/book-page.component';
import { BookListComponent } from './components/book-list/book-list.component';
import { BookCreateComponent } from './components/book-create/book-create.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BookEditComponent } from './components/book-edit/book-edit.component';


@NgModule({
  declarations: [
    BookPageComponent,
    BookListComponent,
    BookCreateComponent,
    BookEditComponent
  ],
  imports: [
    CommonModule,
    BookRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatIconModule,
    MatSnackBarModule
  ]
})
export class BookModule { }
