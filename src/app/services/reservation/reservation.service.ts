import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Reservation, Result } from 'src/app/models/exports';
import { reservationInput } from 'src/app/models/reservation/reservation-input';
@Injectable({
  providedIn: 'root',
})
export class ReservationService {
  constructor(private _http: HttpClient) {}
  private url: string = environment.url;

  getAllReservations(): Observable<Result<Reservation[]>> {
    const headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json; charset=utf-8;');
    headers.append('Access-Control-Allow-Origin', '*');
    return this._http.get(this.url + 'Reservations', { headers: headers }).pipe(
      map((data: any) => {
        if (!data.error) {
          return { result: data.success as Reservation[] };
        } else {
          return { error: data.message };
        }
      }),
      catchError((error) => {
        return of({ error: error.error.title });
      })
    );
    
  }

  getOneReservation(id: string): Observable<Result<Reservation>> {
    const headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json; charset=utf-8;');
    headers.append('Access-Control-Allow-Origin', '*');
    return this._http.get(this.url + 'Reservations/' + id, { headers: headers }).pipe(
      map((data: any) => {
        if (!data.error) {
          return { result: data.success as Reservation };
        } else {
          return { error: data.message };
        }
      }),
      catchError((error) => {
        return of({ error: error.error.title });
      })
    );
  }

  addReservation(res: reservationInput): Observable<Result<Reservation>> {
    const headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json; charset=utf-8;');
    headers.append('Access-Control-Allow-Origin', '*');
    return this._http.post(this.url + 'Reservations', res, { headers: headers }).pipe(
      map((data: any) => {
        if (!data.error) {
          return { result: data.success as Reservation };
        } else {
          return { error: data.message };
        }
      }),
      catchError((error) => {
        return of({ error: error.error.title });
      })
    );
  }
/*
  editReservation(res: {
    data: reservationInput;
    id: string;
  }): Observable<Result<Reservation>> {
    
    const headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json; charset=utf-8;');
    headers.append('Access-Control-Allow-Origin', '*');
    return this._http
      .put(this.url + 'services' + res.id, res.data, { headers: headers })
      .pipe(
        map((data: any) => {
          if (data.status == 500) {
            return { error: data.detail };
          } else {
            return { result: data as Reservation };
          }
        })
      );
      
      return of({result:reservation})
  }
*/
  deleteReservation(id: string): Observable<Result<boolean>> {
    const headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json; charset=utf-8;');
    headers.append('Access-Control-Allow-Origin', '*');
    return this._http
      .delete(this.url + 'Reservations/' + id, { headers: headers })
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
