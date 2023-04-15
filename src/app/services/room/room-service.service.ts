import { Injectable } from '@angular/core';

import { catchError, map, Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import { User } from 'src/app/models/user/user';
import { Result, Room } from 'src/app/models/exports';

import { RoomInput } from 'src/app/models/room/romm-input';

@Injectable({
  providedIn: 'root',
})
export class RoomServiceService {
  constructor(private _http: HttpClient) {}
  private url: string = environment.url;

  getAllRoom(): Observable<Result<Room[]>> {
    const headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json; charset=utf-8;');
    headers.append('Access-Control-Allow-Origin', '*');
    return this._http.get(this.url + 'room', { headers: headers }).pipe(
      map((data: any) => {
        if (!data.error) {
          return { result: data.success as Room[] };
        } else {
          return { error: data.message };
        }
      }),
      catchError((error) => {
        return of({ error: error.error.title });
      })
    );
  }

  getOneRoom(id: string): Observable<Result<Room>> {
    const headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json; charset=utf-8;');
    headers.append('Access-Control-Allow-Origin', '*');
    return this._http.get(this.url + 'room/' + id, { headers: headers }).pipe(
      map((data: any) => {
        if (!data.error) {
          return { result: data.success as Room };
        } else {
          return { error: data.message };
        }
      }),
      catchError((error) => {
        return of({ error: error.error.title });
      })
    );
  }

  addRoom(data: RoomInput): Observable<Result<Room>> {
    const headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json; charset=utf-8;');
    headers.append('Access-Control-Allow-Origin', '*');
    return this._http.post(this.url + 'room', data, { headers: headers }).pipe(
      map((data: any) => {
        if (!data.error) {
          return { result: data.success as Room };
        } else {
          return { error: data.message };
        }
      }),
      catchError((error) => {
        return of({ error: error.error.title });
      })
    );
  }

  editRoom(data: { data: RoomInput; id: string }): Observable<Result<Room>> {
    const headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json; charset=utf-8;');
    headers.append('Access-Control-Allow-Origin', '*');
    return this._http
      .put(this.url + 'room/' + data.id, data.data, { headers: headers })
      .pipe(
        map((data: any) => {
          if (!data.error) {
            return { result: data.success as Room };
          } else {
            return { error: data.message };
          }
        }),
        catchError((error) => {
          return of({ error: error.error.title });
        })
      );
  }

  deleteRoom(id: string): Observable<Result<boolean>> {
    const headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json; charset=utf-8;');
    headers.append('Access-Control-Allow-Origin', '*');
    return this._http
      .delete(this.url + 'room/' + id, { headers: headers })
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
