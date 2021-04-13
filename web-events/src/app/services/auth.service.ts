import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

const url = 'http://localhost:3030/users';
const user_key = 'auth_user'

// const httpOptions = {
//   headers: new HttpHeaders({ 'Content-Type': 'application/json' })
// };

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  headers = new HttpHeaders().set('Content-Type', 'application/json')
  currentUser = {};


  constructor(
    private http: HttpClient,
    public router: Router
  ) { }

  signUp(user: User): Observable<any> {
    return this.http.post(`${url}/sign-up`, user,)
      .pipe(
        catchError(this.handleError)
      )
  }

  // save

  // Sign in
  userLogin(user: User) {
    return this.http.post(`${url}/login`, user)
      .subscribe((res: any) => {
        localStorage.setItem('token', res.token)
        this.router.navigate(['events'])
        const token = res.token;
        if(token) {
          this.currentUser = res.userId
        }
      })
  }

  getUserId() {
    return this.currentUser
  }


  getToken() {
    return localStorage.getItem('token')
  }

  get isLoggedIn(): boolean {
    let authToken = localStorage.getItem('token')
    return (authToken != null) ? true: false
  }


  logOut() {
    let removeToken = localStorage.removeItem('token')
    if(removeToken == null) {
      this.router.navigate(['log-in'])
    }
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
