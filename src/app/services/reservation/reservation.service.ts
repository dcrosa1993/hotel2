import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Reservation, Result } from 'src/app/models/exports';
import { reservationInput } from 'src/app/models/reservation/reservation-input';
import { checkInInput } from 'src/app/models/reservation/check-in-input';
@Injectable({
  providedIn: 'root',
})
export class ReservationService {
  constructor(private _http: HttpClient) {}
  private url: string = environment.url;

  getAllReservations(data:string): Observable<Result<Reservation[]>> {
    const headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json; charset=utf-8;');
    headers.append('Access-Control-Allow-Origin', '*');
    return this._http.post(this.url + 'Reservations',{id: data}, { headers: headers }).pipe(
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

  getAllInvalidDates(): Observable<Result<Date[]>> {
    const headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json; charset=utf-8;');
    headers.append('Access-Control-Allow-Origin', '*');
    return this._http.get(this.url + 'Reservations/GetDatesWithOutDisponibility', { headers: headers }).pipe(
      map((data: any) => {
        if (!data.error) {
          return { result: data.success as Date[] };
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
    return this._http
      .get(this.url + 'Reservations/' + id, { headers: headers })
      .pipe(
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

  getPDF(id: string): Observable<Result<boolean>> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      'Access-Control-Allow-Origin': '*',
      Accept: 'application/pdf',
    });

    return this._http
      .get(this.url + 'Reservations/GeneratePDF/' + id, {
        responseType: 'blob',
        headers: headers,
      })
      .pipe(
        map((data: any) => {
          const fileURL = URL.createObjectURL(data);
          const link = document.createElement('a');
          link.href = fileURL;
          link.download = 'reservation.pdf';
          link.click();
          URL.revokeObjectURL(fileURL);
          return { result: true };
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
    return this._http
      .post(this.url + 'Reservations/add', res, { headers: headers })
      .pipe(
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

  addCheckIn(
    data: checkInInput
  ): Observable<Result<Reservation>> {
    
    const headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json; charset=utf-8;');
    headers.append('Access-Control-Allow-Origin', '*');
    return this._http
      .put(this.url + 'Reservations', data, { headers: headers })
      .pipe(
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
