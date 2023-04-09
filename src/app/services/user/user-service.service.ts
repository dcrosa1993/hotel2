import { Injectable } from '@angular/core';

import { catchError, map, Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import { User } from 'src/app/models/user/user';
import { Result } from 'src/app/models/exports';
import { UserInput } from 'src/app/models/user/user-input';

@Injectable({
  providedIn: 'root',
})
export class UserServiceService {
  constructor(private _http: HttpClient) {}
  private url: string = environment.url;

  getAllUsers(): Observable<Result<User[]>> {
    const headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json; charset=utf-8;');
    headers.append('Access-Control-Allow-Origin', '*');
    return this._http.get(this.url + 'user', { headers: headers }).pipe(
      map((data: any) => {
        if (!data.error) {
          return { result: data.success as User[] };
        } else {
          return { error: data.message };
        }
      }),
      catchError((error) => {
        return of({ error: error.error.title });
      })
    );
  }

  getOneUser(id: string): Observable<Result<User>> {
    const headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json; charset=utf-8;');
    headers.append('Access-Control-Allow-Origin', '*');
    return this._http.get(this.url + 'user/' + id, { headers: headers }).pipe(
      map((data: any) => {
        if (!data.error) {
          return { result: data.success as User };
        } else {
          return { error: data.message };
        }
      }),
      catchError((error) => {
        return of({ error: error.error.title });
      })
    );
  }

  addUser(data: UserInput): Observable<Result<User>> {
    const headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json; charset=utf-8;');
    headers.append('Access-Control-Allow-Origin', '*');
    return this._http.post(this.url + 'user', data, { headers: headers }).pipe(
      map((data: any) => {
        if (!data.error) {
          return { result: data.success as User };
        } else {
          return { error: data.message };
        }
      }),
      catchError((error) => {
        return of({ error: error.error.title });
      })
    );
  }

  editUser(data: { data: UserInput; id: string }): Observable<Result<User>> {
    const headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json; charset=utf-8;');
    headers.append('Access-Control-Allow-Origin', '*');
    return this._http
      .put(this.url + 'user/' + data.id, data.data, { headers: headers })
      .pipe(
        map((data: any) => {
          if (!data.error) {
            return { result: data.success as User };
          } else {
            return { error: data.message };
          }
        }),
        catchError((error) => {
          return of({ error: error.error.title });
        })
      );
  }

  deleteUser(id: string): Observable<Result<boolean>> {
    const headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json; charset=utf-8;');
    headers.append('Access-Control-Allow-Origin', '*');
    return this._http
      .delete(this.url + 'user/' + id, { headers: headers })
      .pipe(
        map((data: any) => {
          if (!data.error) {
            return { result: data.success as boolean };
          } else {
            return { error: data.message };
          }
        }),
        catchError((error) => {
          return of({ error: error.error.title });
        })
      );
  }
}
