import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, map,tap,Subject } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly URL = environment.api

  private _refresh$ = new Subject<void>();

  constructor(private http: HttpClient) {}

  get refresh$(){
    return this._refresh$
  }

  loadUsers() {
    return this.http.get<any>(`${this.URL}/user/list`)
      .pipe(
        map(response => {
          const usersWithNumber = response.users.map((user:any, index:any) => ({
            ...user,
            nro: index + 1 // Agrega la propiedad 'nro' con el número de índice + 1
          }));
          return usersWithNumber;
        })
      )
  }

  registerUser(userData: any): Observable<any> {
    console.log("data register",userData)
    return this.http.post(`${this.URL}/user/new`, userData).pipe(
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
      username: updatedData.username,
      email: updatedData.email,
    };
    console.log("data editttasr",updatedModified)
    const apiUrl = `${this.URL}/user/${id}`;

    return this.http.put(apiUrl, updatedModified).pipe(
      tap(()=>{
        this._refresh$.next();
      }),
    );
  }

  deleteUser(userId: number): Observable<any> {
    return this.http.delete(`${this.URL}/user/${userId}`).pipe(
      tap(() => {
        this._refresh$.next();
      })
    );
  }
  
}
