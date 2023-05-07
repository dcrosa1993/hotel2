import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';
import {
  BehaviorSubject,
  catchError,
  delay,
  from,
  map,
  Observable,
  of,
  ReplaySubject,
  throwError,
} from 'rxjs';
import { LoggedInUser } from 'src/app/models/auth/logged-in-user';
import {
  Result,
  SignInCredentials,
  SignUpCredentials,
} from 'src/app/models/exports';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private isAuthenticatedController: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  public isAuthenticated$: Observable<boolean> =
    this.isAuthenticatedController.asObservable();
  private url: string = environment.url;
  public currentUser: LoggedInUser | null = null;

  constructor(private _http: HttpClient) {
    if (localStorage.getItem('id_token')) {
      this.isAuthenticatedController.next(true);
      this.getCurrentUser();
    } else {
      this.isAuthenticatedController.next(false);
    }
  }

  public signUp(data: SignUpCredentials): Observable<Result<string>> {
    const headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json; charset=utf-8;');
    headers.append('Access-Control-Allow-Origin', '*');
    return this._http
      .post(this.url + 'register', data, { headers: headers })
      .pipe(
        map((data: any) => {
          this.signIn({ email: data.email, password: data.password });
          return { result: data as string };
        }),
        catchError((error) => of({ error: error.error.detail }))
      );
  }

  public signIn(data: SignInCredentials): Observable<Result<string>> {
    const headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json; charset=utf-8;');
    headers.append('Access-Control-Allow-Origin', '*');
    return this._http.post(this.url + 'Auth', data, { headers: headers }).pipe(
      map((data: any) => {
        localStorage.setItem('id_token', data as string);
        this.isAuthenticatedController.next(true);
        return { result: data as string };
      }),
      catchError((error) => of({ error: error.error.detail }))
    );

    /*
    return from(
      Auth.signIn(data.email, data.password)
        .then((data: any) => {
          this._pristineCognitoUser = data;
          return { result: data as string };
        })
        .catch((error) => {
          return { error: error.message };
        })
    );
    */
  }

  public getCurrentUser(): Observable<Result<LoggedInUser>> {
    var user = this.getDecodedAccessToken(
      localStorage.getItem('id_token') ?? ''
    );
    var loggedInUser: LoggedInUser = {
      email:
        user[
          'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'
        ],
      name: user[
        'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'
      ],
      role: user[
        'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'
      ],
    };
    this.currentUser = loggedInUser;
    return of({ result: loggedInUser });
  }

  getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch (Error) {
      return null;
    }
  }

  public signOut(): Observable<Result<string>> {
    localStorage.removeItem('id_token');
    this.isAuthenticatedController.next(false);
    return of({ result: 'success' });
  }
  /*
  public changePassword(data: ChangePasswordData): Observable<Result<string>> {
    return from(
      Auth.currentAuthenticatedUser().then((user) => {
        return Auth.changePassword(
          user,
          '' + data.oldPassword,
          '' + data.newPassword
        )
          .then((result) => {
            this.updateUser();
            return { result: 'SUCCESS' };
          })
          .catch((error) => {
            return { error: error.message };
          });
      })
    );
  }
*/
  /**
   * Completes the process of setting a new password and personal details for new admin users.
   *
   * @param accountDetails Personal details and password of the admin account.
   * @returns An observable with the success or error result.
   *
  public completeNewPassword(
    accountDetails: AdminSignUpData
  ): Observable<Result<CognitoUserFacade>> {
    if (!this._pristineCognitoUser) {
      return throwError(() => ({
        message: 'Please sign in first.',
      }));
    }

    // creating a clousure to avoid callback hell, notice this is an Immediately Invoked Function Expression (IIFE)
    const _tmp = (async () => {
      try {
        await Auth.completeNewPassword(
          this._pristineCognitoUser,
          accountDetails.password + '',
          {
            address: '""',
            given_name: accountDetails.firstName,
            family_name: accountDetails.lastName,
          }
        );

        return { result: await Auth.currentAuthenticatedUser() };
      } catch (error: any) {
        return { error: error.message };
      }
    })();

    return from(_tmp);
  }

  public changePersonalDetails(
    data: PersonalDetailsToUpdate
  ): Observable<Result<string>> {
    return from(
      Auth.currentAuthenticatedUser().then((user) => {
        return Auth.updateUserAttributes(user, {
          given_name: data.firstName,
          family_name: data.lastName,
          address: JSON.stringify({
            address: data.address,
            state: data.state,
            aptNumber: data.aptNumber,
            zipCode: data.zipCode,
          }),
        })
          .then((result) => {
            this.updateUser();
            return { result: 'SUCCESS' };
          })
          .catch((error) => {
            return { error: error.message };
          });
      })
    );
  }

  public changeEmail(data: ChangeEmailData): Observable<Result<string>> {
    return from(
      Auth.currentAuthenticatedUser().then((user) => {
        return Auth.updateUserAttributes(user, {
          email: data.email,
        })
          .then((result) => {
            this.updateUser();
            return { result: 'SUCCESS' };
          })
          .catch((error) => {
            return { error: error.message };
          });
      })
    );
  }

  public confirmEmailChange(
    data: ConfirmationCode
  ): Observable<Result<string>> {
    return from(
      Auth.verifyCurrentUserAttributeSubmit('email', data.code)
        .then((result) => {
          this.updateUser();
          return { result: 'SUCCESS' };
        })
        .catch((error) => {
          return { error: error.message };
        })
    );
  }

  public resendSignUp(email: string): Observable<Result<boolean>> {
    return from(
      API.graphql({
        query: requestUserVerificationCodeResend,
        variables: { email },
        authMode: 'AWS_IAM',
      }) as Promise<GraphQLResult<RequestUserVerificationCodeResendMutation>>
    ).pipe(
      map(({ data }) => ({ result: data?.requestUserVerificationCodeResend })),
      catchError((error) => {
        return of({ error: error?.errors[0]?.message });
      })
    );
  }

  public signUpConfirm(
    data: SignUpConfirmationCode
  ): Observable<Result<string>> {
    return from(
      Auth.confirmSignUp(data.username.replace(/[^a-zA-Z0-9]/g, ''), data.code)
        .then((_) => {
          if (this.userInfo) {
            return Auth.signIn(this.userInfo.email, this.userInfo.password)
              .then((data: any) => {
                this._pristineCognitoUser = data;
                this.updateUser();

                return { result: 'SUCCESS' };
              })
              .catch((error) => {
                return { error: error.message };
              });
          } else {
            return { result: 'GO_TO_LOGIN' };
          }
        })
        .catch((error) => {
          return { error: error.message };
        })
    );
  }

  public signOut(): Observable<Result<string>> {
    return from(
      Auth.signOut()
        .then((data) => {
          this.currentUser = undefined;
          return { result: 'SUCCESS' };
        })
        .catch(function (error) {
          return { error: error.message };
        })
    );
  }

  public setNewPassword(data: NewPasswordData): Observable<Result<string>> {
    return from(
      Auth.forgotPasswordSubmit(data.username, data.code, data.newPassword)
        .then((data) => {
          return { result: 'SUCCESS' };
        })
        .catch(function (error) {
          return { error: error.message };
        })
    );
  }

  public forgotPassword(data: RecoverPasswordData): Observable<Result<string>> {
    return from(
      Auth.forgotPassword(data.email)
        .then((data) => {
          return { result: 'SUCCESS' };
        })
        .catch(function (error) {
          return { error: error.message };
        })
    );
  }

  public updateUser() {
    Auth.currentAuthenticatedUser()
      .then((data: CognitoUserFacade) => {
        this.currentUser = data;
      })
      .catch((_) => {
        this.currentUser = undefined;
      });
  }
*/
}
