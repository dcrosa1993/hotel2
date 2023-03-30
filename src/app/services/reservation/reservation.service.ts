import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Reservation, Result } from 'src/app/models/exports';
import { reservationInput } from 'src/app/models/reservation/reservation-input';
import { reservation, reservations } from 'src/app/mock/moked-reservations';
@Injectable({
  providedIn: 'root',
})
export class ReservationService {
  constructor(private _http: HttpClient) {}
  private url: string = environment.url;

  getAllReservations(): Observable<Result<Reservation[]>> {
    /*
    const headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json; charset=utf-8;');
    headers.append('Access-Control-Allow-Origin', '*');
    return this._http.get(this.url + 'Reservations', { headers: headers }).pipe(
      map((data: any) => {
        if (data.status == 500) {
          return { error: data.detail };
        } else {
          return { result: data as Reservation[] };
        }
      })
    );
    */
   return of({result:reservations})
  }

  getOneReservation(id: string): Observable<Result<Reservation>> {
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
            return { result: data as Reservation };
          }
        })
      );
      */
      return of({result:reservation})
  }

  addReservation(res: reservationInput): Observable<Result<Reservation>> {
    /*
    const headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json; charset=utf-8;');
    headers.append('Access-Control-Allow-Origin', '*');
    return this._http
      .post(this.url + 'reservations', res, { headers: headers })
      .pipe(
        map((data: any) => {
          if (data.status == 500) {
            return { error: data.detail };
          } else {
            return { result: data as Reservation };
          }
        })
      );
      */
      return of({result:reservation})
  }

  editReservation(res: {
    data: reservationInput;
    id: string;
  }): Observable<Result<Reservation>> {
    /*
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
      */
      return of({result:reservation})
  }
}
