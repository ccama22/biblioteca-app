import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BookService } from '@modules/book/services/book.service';

@Component({
  selector: 'app-book-create',
  templateUrl: './book-create.component.html',
  styleUrls: ['./book-create.component.scss']
})
export class BookCreateComponent {
  bookForm: FormGroup;

  constructor(      
    private formBuilder: FormBuilder,
    private bookService: BookService,
    public dialogRef: MatDialogRef<BookCreateComponent>,
    private snackBar: MatSnackBar 
  ){
    this.bookForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(5), Validators.pattern('^[a-zA-Z ]+$')]],
      author: ['', [Validators.required, Validators.minLength(5), Validators.pattern('^[a-zA-Z ]+$')]]
    });
  }

  get titleControl() {
    return this.bookForm.get('title');
  }

  get authorControl() {
    return this.bookForm.get('author');
  }


  onSave(): void {
    if (this.bookForm.valid) {
      const bookData = this.bookForm.value;
      const dataFinalBook ={
        ...bookData,
        available:true
      }
      this.bookService.registerBook(dataFinalBook).subscribe(
        (response) => {
          this.dialogRef.close();
          this.snackBar.open(`Libro creado correctamente`, 'Cerrar', {
            duration: 3000 // Duración en milisegundos del snackbar visible
          });
        }
      );
    }
    else{
      this.bookForm.markAllAsTouched();
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
