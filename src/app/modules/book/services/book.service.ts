import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BooksModel } from '@core/models/books.model';
import { BehaviorSubject, map, Observable, tap, Subject } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private readonly URL = environment.api

  private _refresh$ = new Subject<void>();

  constructor(private http: HttpClient) { }

  get refresh$(){
    return this._refresh$
  }

  loadBooks() {
    return this.http.get<any>(`${this.URL}/book/list`)
      .pipe(
        map(response => {
          const booksWithNumber = response.books.map((book:any, index:any) => ({
            ...book,
            nro: index + 1
          }));
          return booksWithNumber;
        })
      )
  }

  registerBook(bookData: any): Observable<any> {
    console.log("roquiee",bookData)
    return this.http.post(`${this.URL}/book/new`, bookData).pipe(
      tap(()=>{
        this._refresh$.next();
      }),
      map(response => {
        return response;
      })
    );
  }

  updateDataOnServer(updatedData: any,id:any): Observable<any> {
    const updatedModified = {
      title: updatedData.title,
      author: updatedData.author,
    };
    console.log("data editttasr",updatedModified)
    const apiUrl = `${this.URL}/book/${id}`;

    return this.http.put(apiUrl, updatedModified).pipe(
      tap(()=>{
        this._refresh$.next();
      }),
    );
  }

  deleteBook(bookId: number): Observable<any> {
    return this.http.delete(`${this.URL}/book/${bookId}`).pipe(
      tap(() => {
        this._refresh$.next();
      })
    );
  }
}
