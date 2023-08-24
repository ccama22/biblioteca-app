import { Component,Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '@modules/user/services/user.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent {
  editForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<UserEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private userService: UserService,
    private snackBar: MatSnackBar 
  ) {
    this.editForm = this.fb.group({
      username: [data.username, [Validators.required, Validators.minLength(5)]],
      email: [data.email, [Validators.required, Validators.email]],
    });
  }

  get usernameControl() {
    return this.editForm.get('username');
  }

  get emailControl() {
    return this.editForm.get('email');
  }

  onSave(): void {
    console.log("ccccc")
    if (this.editForm.valid) {
      console.log("dta edit",this.data)
      const editedData = { ...this.data, ...this.editForm.value };
      // Llamada al método del servicio que utiliza HttpClient
      this.userService.updateDataOnServer(editedData,this.data._id).subscribe(
          () => {
                this.dialogRef.close();
                this.snackBar.open(`Usuario Editado correctamente`, 'Cerrar', {
                  duration: 3000 // Duración en milisegundos del snackbar visible
                });
          }
      );
    }
    else{
      this.editForm.markAllAsTouched();
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
