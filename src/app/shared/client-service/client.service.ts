import { Injectable } from '@angular/core';
import {
  catchError,
  map,
  merge,
  Observable,
  of,
  partition,
  shareReplay,
  ReplaySubject,
  switchMap,
  tap,
} from 'rxjs';
import { Result } from 'src/app/models/exports';
import { LoggingService } from '../../services/logging/loggin.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { InputRequest } from 'src/app/models/common/input-request';

@Injectable()
export class ClientService<T, Q> {
  public error$: Observable<string | undefined>;
  public success$: Observable<Q | undefined>;
  public loading$: Observable<boolean>;
  public result$: Observable<Result<Q>>;
  private submit$: ReplaySubject<InputRequest<T>> = new ReplaySubject();

  constructor(
    private _loggingService: LoggingService,
    private _http: HttpClient
  ) {
    this.result$ = this.submit$.pipe(
      switchMap((data) => this.getData(data)),
      shareReplay(1)
    );
    const [success$, error$] = partition(this.result$, (value) =>
      value.result ? true : false
    );

    this.success$ = success$.pipe(
      map((value) => value.result),
      tap((value) => {
        this._loggingService.log(value);
      }),
      shareReplay(1)
    );

    this.error$ = error$.pipe(
      map((value) => value.error),
      tap((value) => this._loggingService.log(value)),
      shareReplay(1)
    );

    const end$ = merge(this.success$, this.error$);

    this.loading$ = merge(
      this.submit$.pipe(
        map((v) => true),
        tap(() => this._loggingService.log('start'))
      ),
      end$.pipe(
        map((v) => false),
        tap(() => this._loggingService.log('end'))
      )
    ).pipe(shareReplay(1));
  }
  ngOnDestroy(): void {
    this.submit$.complete();
  }

  submit(value:InputRequest<T>) {
    this.submit$.next(value);
  }

  private getData(value: InputRequest<T>): Observable<Result<Q>> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      'Access-Control-Allow-Origin': '*'
    });
    
    let result: Observable<Result<Q>>;
  
    switch (value.method) {
      case 'GET':
        result = this._http.get(value.url, { headers });
        break;
      case 'POST':
        result = this._http.post(value.url, value.data, { headers }).pipe(shareReplay(1));
        break;
      case 'PUT':
        result = this._http.put(value.url, value.data, { headers });
        break;
      case 'DELETE':
        result = this._http.delete(value.url, { headers });
        break;
      default:
        throw new Error('Invalid method specified.');
    }
  
    return result.pipe(
      map(({$id, $values}: any) => {
        console.log($id, $values);
          return { result: $values as Q};
      }),
      catchError((error) => {
        return of({ error: error });
      })
    );
  }
}
