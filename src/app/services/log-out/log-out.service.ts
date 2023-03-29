import { Injectable } from '@angular/core';
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

import { AccountService } from '../account-service/account.service';
import { LoggingService } from '../logging/loggin.service';

@Injectable({
  providedIn: 'root',
})
export class LogOutService {
  public error$: Observable<string>;
  public loading$: Observable<boolean>;
  public result$: Observable<Result<string>>;
  private _submit: Subject<void> = new Subject();
  public success$: Observable<string>;

  constructor(
    private _accountService: AccountService,
    private _logger: LoggingService
  ) {
    this.result$ = this._submit.pipe(
      exhaustMap(() => this._accountService.signOut()),
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
  requestSignOut() {
    this._submit.next();
  }
}
