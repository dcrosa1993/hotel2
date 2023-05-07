import { Injectable } from '@angular/core';
import { ReservationConfig } from 'src/app/models/configuration/reservation-config';
import { Result } from 'src/app/models/exports';
import { catchError, map, Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ReservationConfigInput } from 'src/app/models/configuration/reservation-config-input';
import { configuration } from 'src/app/mock/moked-reservations-config';

@Injectable({
  providedIn: 'root',
})
export class ReservationsConfigService {
  constructor(private _http: HttpClient) {}
  private url: string = environment.url;

  getConfiguration(): Observable<Result<ReservationConfig>> {
    const headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json; charset=utf-8;');
    headers.append('Access-Control-Allow-Origin', '*');
    return this._http
      .get(this.url + 'ReservationConfiguration', { headers: headers })
      .pipe(
        map((data: any) => {
          if (!data.error) {
            return { result: data.success as ReservationConfig };
          } else {
            return { error: data.message };
          }
        }),
        catchError((error) => {
          return of({ error: error.error.title });
        })
      );
  }
  editConfiguration(
    data: ReservationConfigInput
  ): Observable<Result<ReservationConfig>> {
    const headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json; charset=utf-8;');
    headers.append('Access-Control-Allow-Origin', '*');
    return this._http
      .put(this.url + 'ReservationConfiguration', data, { headers: headers })
      .pipe(
        map((data: any) => {
          if (!data.error) {
            return { result: data.success as ReservationConfig };
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
