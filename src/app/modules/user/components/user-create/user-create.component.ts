import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { UserService } from '@modules/user/services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss']
})
export class UserCreateComponent {
  userForm: FormGroup;

  constructor(      
    private formBuilder: FormBuilder,
    private userService: UserService,
    public dialogRef: MatDialogRef<UserCreateComponent>,
    private snackBar: MatSnackBar 
  ){
    this.userForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(5)]],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  get usernameControl() {
    return this.userForm.get('username');
  }

  get emailControl() {
    return this.userForm.get('email');
  }

  onSave(): void {
    if (this.userForm.valid) {
      const userData = this.userForm.value;
      this.userService.registerUser(userData).subscribe(
        (response) => {
          this.dialogRef.close();
          console.log('response',response)
          this.snackBar.open(`Usuario ${response.users.username} creado correctamente`, 'Cerrar', {
            duration: 3000 // Duración en milisegundos del snackbar visible
          });
        }
      );
    }
    else{
      this.userForm.markAllAsTouched();
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
