import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ReservationService } from '@modules/reservation/services/reservation.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-reservation-edit',
  templateUrl: './reservation-edit.component.html',
  styleUrls: ['./reservation-edit.component.scss']
})
export class ReservationEditComponent {
  reservationForm: FormGroup;
  minDate: Date;
  datReservation:any;
  users!: any[]; 
  books!: any[];

  constructor( 
    @Inject(MAT_DIALOG_DATA) public data: any,     
    private formBuilder: FormBuilder,
    private reservationService: ReservationService,
    public dialogRef: MatDialogRef<ReservationEditComponent>,
    private snackBar: MatSnackBar 
  ){
    this.minDate = new Date();
    this.reservationForm = this.formBuilder.group({
      // title: ['', Validators.required],
      // author: ['', [Validators.required]],
      selectedUser: [data.user_id,Validators.required],
      selectedBook: [data.book_id,Validators.required],
      selectedDate: ['',Validators.required]
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
    console.log("pisano",this.data)
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
      const editedData = { ...this.data, ...this.reservationForm.value };
      // Llamada al método del servicio que utiliza HttpClient
      this.reservationService.updateDataOnServer(editedData,this.data._id).subscribe(
          () => {
                this.dialogRef.close();
                this.snackBar.open(`Reservacion Editada correctamente`, 'Cerrar', {
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
