import { Injectable } from '@angular/core';
import { ReservationConfig } from 'src/app/models/configuration/reservation-config';
import { Result } from 'src/app/models/exports';
import { map, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ReservationConfigInput } from 'src/app/models/configuration/reservation-config-input';

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
          if (data.status == 500) {
            return { error: data.detail };
          } else {
            return { result: data as ReservationConfig };
          }
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
      .put(this.url + 'ReservationConfiguration', { headers: headers })
      .pipe(
        map((data: any) => {
          if (data.status == 500) {
            return { error: data.detail };
          } else {
            return { result: data as ReservationConfig };
          }
        })
      );
  }
}
