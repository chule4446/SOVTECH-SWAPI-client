import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, retry} from 'rxjs/operators';
import {throwError} from 'rxjs';
import {environment} from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class PeopleService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'x-source-system': 'sovtech-swapi-portal',
      'Authorization': `Basic ` + btoa('development:ks%rrR+SJ5&CXP3j'),
      'x-correlation-conversationid': '123'
    })
  };
  url: string = environment.baseUrl;
  constructor(private httpClient: HttpClient) { }
  getPeople(postData: any) {
    return this.httpClient.post(this.url + '/api/v1/swapi', postData, this.httpOptions)
        .pipe(retry(0),
            catchError(this.handleError));
  }
  handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage:${error.message}`;
    }
    return throwError(error);
  }
  getPerson(postData: any) {
    return this.httpClient.post(this.url + '/api/v1/swapi', postData, this.httpOptions)
        .pipe(retry(0),
            catchError(this.handleError));
  }
}
