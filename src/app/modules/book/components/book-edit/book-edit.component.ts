import { Component,Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BookService } from '@modules/book/services/book.service';

@Component({
  selector: 'app-book-edit',
  templateUrl: './book-edit.component.html',
  styleUrls: ['./book-edit.component.scss']
})
export class BookEditComponent {
  editForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<BookEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private bookService: BookService,
    private snackBar: MatSnackBar 
  ) {
    this.editForm = this.fb.group({
      title: [data.title, Validators.required],
      author: [data.author, Validators.required],
    });
  }

  onSave(): void {
    console.log("ccccc")
    if (this.editForm.valid) {
      console.log("dta edit",this.data)
      const editedData = { ...this.data, ...this.editForm.value };
      // Llamada al método del servicio que utiliza HttpClient
      this.bookService.updateDataOnServer(editedData,this.data._id).subscribe(
          () => {
                this.dialogRef.close();
                this.snackBar.open(`Usuario Editado correctamente`, 'Cerrar', {
                  duration: 3000 // Duración en milisegundos del snackbar visible
                });
          }
      );
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
