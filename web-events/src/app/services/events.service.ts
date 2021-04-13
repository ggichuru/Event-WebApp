import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AuthService } from './auth.service';

const baseUrl = 'http://localhost:3030/events';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};



@Injectable({
  providedIn: 'root'
})
export class EventsService {
  authToken = localStorage.getItem('token');
  header = {Authorization: this.authToken}

  constructor(
    private http : HttpClient,
    private authService: AuthService
  ) { }

  getToken() {
    return localStorage.getItem('token')
  }

  getAllEvents(): Observable<any> {
    return this.http.get(baseUrl);
  }

  getOneEvent(id: any): Observable<any> {
    let url = `${baseUrl}/${id}`;
    return this.http.get(url, httpOptions)
      .pipe(map((res:any) => {
        return res || {}
      }),
      catchError(this.handleError)
      )
  }

  getUserEvent(id: any): Observable<any> {
    let uid = this.authService.getUserId()
    let url = `${baseUrl}/user/${id}`;
    return this.http.get(url, httpOptions)
      .pipe(map((res:any) => {
        return res || {}
      }),
      catchError(this.handleError)
      )
  }

  addEvent(event: Event): Observable<any> {
    let url = `${baseUrl}`;
    return this.http.post(url, event)
      .pipe(
        catchError(this.handleError)
      )
  }

  updateEvent(id: any, event: Event){
    let url = `${baseUrl}/${id}`;
    return this.http.patch(url, event, httpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }

  deleteEvent(id: any){
    let url = `${baseUrl}/${id}`;
    return this.http.delete(url, httpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }

    // Error
    handleError(error: HttpErrorResponse) {
      let msg = '';
      if (error.error instanceof ErrorEvent) {
        // client-side error
        msg = error.error.message;
      } else {
        // server-side error
        msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
      }
      return throwError(msg);
    }
}
