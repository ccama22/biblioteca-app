import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReservationRoutingModule } from './reservation-routing.module';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

import { ReservationPageComponent } from './pages/reservation-page/reservation-page.component';
import { ReservationCreateComponent } from './components/reservation-create/reservation-create.component';
import { ReservationListComponent } from './components/reservation-list/reservation-list.component';
import { ReservationEditComponent } from './components/reservation-edit/reservation-edit.component';


@NgModule({
  declarations: [
    ReservationPageComponent,
    ReservationCreateComponent,
    ReservationListComponent,
    ReservationEditComponent
  ],
  imports: [
    CommonModule,
    ReservationRoutingModule,
    MatFormFieldModule,
    MatSnackBarModule,
    MatIconModule,
    MatDialogModule,
    MatTableModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    
  ]
})
export class ReservationModule { }
