import { Injectable } from '@angular/core';

import { map, Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import { user, users } from 'src/app/mock/moked-user';
import { User } from 'src/app/models/user/user';
import { Result, Room } from 'src/app/models/exports';
import { UserInput } from 'src/app/models/user/user-input';
import { room, rooms } from 'src/app/mock/moked-room';
import { RoomInput } from 'src/app/models/room/romm-input';

@Injectable({
  providedIn: 'root',
})
export class RoomServiceService {
  constructor(private _http: HttpClient) {}
  private url: string = environment.url;

  getAllRoom(): Observable<Result<Room[]>> {
    /*
    const headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json; charset=utf-8;');
    headers.append('Access-Control-Allow-Origin', '*');
    return this._http.get(this.url + 'services', { headers: headers }).pipe(
      map((data: any) => {
        if (data.status == 500) {
          return { error: data.detail };
        } else {
          return { result: data as Service[] };
        }
      })
    );*/
    return of({ result: rooms });
  }

  getOneRoom(id: string): Observable<Result<Room>> {
    /*
    const headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json; charset=utf-8;');
    headers.append('Access-Control-Allow-Origin', '*');
    return this._http
      .get(this.url + 'services' + id, { headers: headers })
      .pipe(
        map((data: any) => {
          if (data.status == 500) {
            return { error: data.detail };
          } else {
            return { result: data as Service };
          }
        })
      );
      */
    return of({ result: room });
  }

  addRoom(data: RoomInput): Observable<Result<Room>> {
    /*
    const headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json; charset=utf-8;');
    headers.append('Access-Control-Allow-Origin', '*');
    return this._http
      .post(this.url + 'services', service, { headers: headers })
      .pipe(
        map((data: any) => {
          if (data.status == 500) {
            return { error: data.detail };
          } else {
            return { result: data as Service };
          }
        })
      );
      */
    return of({ result: room });
  }

  editRoom(data: { data: RoomInput; id: string }): Observable<Result<Room>> {
    /*
    const headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json; charset=utf-8;');
    headers.append('Access-Control-Allow-Origin', '*');
    return this._http
      .put(this.url + 'services' + data.id, data.data, { headers: headers })
      .pipe(
        map((data: any) => {
          if (data.status == 500) {
            return { error: data.detail };
          } else {
            return { result: data as Service };
          }
        })
      );
        */
    return of({ result: room });
  }
}
