import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  exhaustMap,
  map,
  merge,
  Observable,
  partition,
  shareReplay,
  Subject,
  tap,
} from 'rxjs';
import { Result } from 'src/app/models/exports';
import { Reservation } from 'src/app/models/reservation/reservation';
import { reservationInput } from 'src/app/models/reservation/reservation-input';

import { AccountService } from '../account-service/account.service';
import { LoggingService } from '../logging/loggin.service';
import { ReservationService } from './reservation.service';
import { checkInInput } from 'src/app/models/reservation/check-in-input';

@Injectable()
export class AddCheckInService {
  public error$: Observable<string | undefined>;
  public success$: Observable<Reservation | undefined>;
  public loading$: Observable<boolean>;
  public result$: Observable<Result<Reservation>>;
  private submit$: Subject<checkInInput> = new Subject();

  constructor(
    private service: ReservationService,
    private _loggingService: LoggingService,
  ) {
    this.result$ = this.submit$.pipe(
      exhaustMap((data) => this.service.addCheckIn(data)),
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

  /** This method begins the registration process of a new committee user
  @param value: SignUpCredials type object, contains the necessary registration data to register a new committee user
  */
  addCheckIn(value: checkInInput) {
    this.submit$.next(value);
  }
}
