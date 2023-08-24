import { Component, OnInit } from '@angular/core';
import { formatDate } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ReservationService } from '@modules/reservation/services/reservation.service';

@Component({
  selector: 'app-reservation-create',
  templateUrl: './reservation-create.component.html',
  styleUrls: ['./reservation-create.component.scss']
})
export class ReservationCreateComponent implements OnInit {
  reservationForm: FormGroup;
  minDate: Date;
  datReservation:any;
  users!: any[]; 
  books!: any[];

  constructor(      
    private formBuilder: FormBuilder,
    private reservationService: ReservationService,
    public dialogRef: MatDialogRef<ReservationCreateComponent>,
    private snackBar: MatSnackBar 
  ){
    this.minDate = new Date();
    this.reservationForm = this.formBuilder.group({
      // title: ['', Validators.required],
      // author: ['', [Validators.required]],
      selectedUser: [null,Validators.required],
      selectedBook: [null,Validators.required],
      selectedDate: [null,Validators.required]
    });
  }

  get userControl() {
    return this.reservationForm.get('selectedUser');
  }

  get bookControl() {
    return this.reservationForm.get('selectedBook');
  }

  get dateControl() {
    return this.reservationForm.get('selectedDate');
  }



  ngOnInit(): void {
    this.getUser();
    this.getBook();
  }

  getUser():void{
    console.log("ccarro")
    this.reservationService.loadUser().subscribe((users) => {
      console.log("llorar",users)
      this.users = users
    });
  }

  getBook(): void{
    this.reservationService.loadBook().subscribe((books)=>{
      console.log("pens",books)
      this.books = books
    })
  }

  onSave(): void {
    const formData = this.reservationForm.value;
    const selectedDate = formData.selectedDate;
    if(selectedDate){
      selectedDate.setHours(18);
      selectedDate.setMinutes(0);
      selectedDate.setSeconds(0);
  
    }


    const formattedDate = formatDate(selectedDate, 'yyyy-MM-dd HH:mm:ss', 'en-US');
    console.log("formData",formattedDate)

    const currentDateTime = new Date(); // Obtener la fecha y hora actual
    const formattedCurrentDateTime = formatDate(
      currentDateTime,
      'yyyy-MM-dd HH:mm:ss',
      'en-US'
    );

    this.datReservation = {
      user_id: formData.selectedUser,
      book_id: formData.selectedBook,
      dateReserved:formattedCurrentDateTime,
      dateDue: formattedDate
    }

    if(this.reservationForm.valid){
      this.reservationService.registerReservation(this.datReservation).subscribe(
        (response) => {
          this.dialogRef.close();
          console.log('response',response)
          this.snackBar.open(`Reservacion creada correctamente`, 'Cerrar', {
            duration: 3000 // Duración en milisegundos del snackbar visible
          });
        }
      );
    }
    else{
      this.reservationForm.markAllAsTouched();
    }
    console.log("cholo",this.datReservation)

  }
  onCancel(): void {
    this.dialogRef.close();
  }
}
