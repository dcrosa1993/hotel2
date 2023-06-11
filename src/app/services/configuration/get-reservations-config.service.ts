import { Injectable } from '@angular/core';
import {
  exhaustMap,
  map,
  merge,
  Observable,
  partition,
  ReplaySubject,
  shareReplay,
  Subject,
  tap,
} from 'rxjs';
import { ReservationConfig } from 'src/app/models/configuration/reservation-config';
import { Result } from 'src/app/models/exports';
import { LoggingService } from '../logging/loggin.service';
import { ReservationsConfigService } from './reservations-config.service';
@Injectable()
export class GetReservationsConfigService {
  public error$: Observable<string>;
  public loading$: Observable<boolean>;
  public result$: Observable<Result<ReservationConfig>>;
  private _submit: ReplaySubject<void> = new ReplaySubject();
  public success$: Observable<ReservationConfig>;

  constructor(
    private _logic: ReservationsConfigService,
    private _logger: LoggingService
  ) {
    this.result$ = this._submit.pipe(
      exhaustMap(() => this._logic.getConfiguration()),
      shareReplay(1)
    );

    const [success$, error$] = partition(
      this.result$,
      (value) => !!value.result
    );

    this.success$ = success$.pipe(
      map((value) => value.result!),
      shareReplay(1)
    );

    this.error$ = error$.pipe(
      map((value) => value.error!),
      tap((value) => this._logger.log(value)),
      shareReplay(1)
    );

    const end$ = merge(this.success$, this.error$);

    this.loading$ = merge(
      this._submit.pipe(
        map((_) => true),
        tap((_) => this._logger.log('start'))
      ),
      end$.pipe(
        map((_) => false),
        tap((_) => this._logger.log('end'))
      )
    ).pipe(shareReplay(1));
  }

  ngOnDestroy(): void {
    this._submit.complete();
  }

  /**
   * This method begins a user's authentication process.
   * @param value SignInCredentials type object, contains email and password data provided by the user.
   */
  getReservationConfig() {
    this._submit.next();
  }
}
