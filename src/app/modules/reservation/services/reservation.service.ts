import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { Subject, map, switchMap, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { forkJoin } from 'rxjs';
import { formatDate } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private readonly URL = environment.api

  // private booksSource = new BehaviorSubject<BooksModel[]>([]);
  // books$ = this.booksSource.asObservable();

  private _refresh$ = new Subject<void>();

  constructor(private http: HttpClient) { }

  get refresh$(){
    return this._refresh$
  }

  loadReservation() {
    return this.http.get<any>(`${this.URL}/reservation/list`).pipe(
      switchMap(response => {
        const reservationsWithNumber = response.Reservacion.map((reservation: any, index: number) => ({
          ...reservation,
          nro: index + 1
        }));
  
        const requests = reservationsWithNumber.map((reservation: any) => {
          const userRequest = this.http.get<any>(`${this.URL}/user/${reservation.user_id}`);
          const additionalDataRequest = this.http.get<any>(`${this.URL}/book/${reservation.book_id}`); // Adjust the URL accordingly
          
          return forkJoin([userRequest, additionalDataRequest]).pipe(
            map(([userDetail, additionalData]) => ({
              reservation,
              userDetail,
              additionalData
            }))
          );
        });
        
        // Combine the observables using forkJoin
        return forkJoin(requests);
      })
    );
  }

  loadUser(){
    return this.http.get<any>(`${this.URL}/user/list`)
    .pipe(
      map(response => {
        const usersWithNumber = response.users.map((user:any, index:any) => ({
            user_id: user._id,
            username:user.username
        }));
        return usersWithNumber;
      })
    );
  }

  loadBook(){
    return this.http.get<any>(`${this.URL}/book/list`)
    .pipe(
      map(response => {
        const booksWithNumber = response.books.map((book:any) => ({
            book_id: book._id,
            title:book.title
        }));
        return booksWithNumber;
      })
    );
  }

  loadBooks() {
    return this.http.get<any>(`${this.URL}/book/list`)
      .pipe(
        map(response => {
          const booksWithNumber = response.books.map((book:any, index:any) => ({
            ...book,
            nro: index + 1 // Agrega la propiedad 'nro' con el número de índice + 1
          }));
          return booksWithNumber;
        })
      )
  }

  registerReservation(reservationData: any): Observable<any> {
    console.log("data register",reservationData)
    return this.http.post(`${this.URL}/reservation/new`, reservationData).pipe(
      tap(()=>{
        this._refresh$.next();
      }),
      map(response => {
        return response;
      })
    );
  }

  updateDataOnServer(updatedData: any,id:any): Observable<any> {
    console.log("data editttasr",updatedData)
    const currentDateTime = new Date(); // Obtener la fecha y hora actual
    const formattedCurrentDateTime = formatDate(
      currentDateTime,
      'yyyy-MM-dd HH:mm:ss',
      'en-US'
    );

    const dataUpdate = {
      user_id: updatedData.selectedUser,
      book_id: updatedData.selectedBook,
      dateReserved:formattedCurrentDateTime,
      dateDue: formatDate(updatedData.selectedDate, 'yyyy-MM-dd HH:mm:ss', 'en-US')
    }
    // console.log("data editttasr",dataUpdate)
    const apiUrl = `${this.URL}/reservation/${id}`;

    return this.http.put(apiUrl, dataUpdate).pipe(
      tap(()=>{
        this._refresh$.next();
      }),
    );
  }

  deleteReservation(reservationId: number): Observable<any> {
    return this.http.delete(`${this.URL}/reservation/${reservationId}`).pipe(
      tap(() => {
        this._refresh$.next();
      })
    );
  }

}
