import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AccountService } from '../services/account-service/account.service';

@Injectable({
  providedIn: 'root',
})
export class UnauthenticatedGuard implements CanActivate {
  constructor(private _router: Router, private _accountService:AccountService) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (localStorage.getItem('id_token')) {
      if(this._accountService.currentUser==null){
        localStorage.removeItem('id_token')
        return true
      }
      return this._router.parseUrl('/reservations');
    } else {
      return true;
    }
  }
}
