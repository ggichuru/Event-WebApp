import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const baseUrl = 'http://localhost:3030/events'

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  constructor(
    private http : HttpClient,
  ) { }

  getAllEvents(): Observable<any> {
    return this.http.get(baseUrl);
  }
}
