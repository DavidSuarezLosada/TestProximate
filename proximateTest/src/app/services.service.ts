import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Login } from './components/login';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  
  private colmenaUrl = 'http://45.35.12.211:9595';  // URL para web api
  

  private handleError<T> (operation='operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // // TODO: better job of transforming error for user consumption
      // this.log(`${operation} failed: ${error.message}`);
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

    /** POST: add a new hero to the server */
  postLogin (login: Login): Observable<any> {
  const url =  `${this.colmenaUrl}/Services/authorization/login`
  return this.http.post<Login>(url, login, this.httpOptions).pipe(
    catchError(this.handleError<Login>('postLogin'))
  );
}

getMenu(): Observable<any> {
  const url = `${this.colmenaUrl}/Services/Insurance`;
  return this.http.get(url).pipe(
    
    catchError(this.handleError(`getMenu`))
  );
}
}
