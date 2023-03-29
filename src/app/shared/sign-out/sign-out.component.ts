import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogOutService } from 'src/app/services/log-out/log-out.service';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { Observable } from 'rxjs';
import { AccountService } from 'src/app/services/account-service/account.service';

@Component({
  selector: 'app-sign-out',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './sign-out.component.html',
})
export class SignOutComponent {
  protected logedIn$: Observable<boolean>;
  constructor(private accountLogic: AccountService, private router: Router) {
    this.logedIn$ = accountLogic.isAuthenticated$;
  }

  logOut() {
    this.accountLogic.signOut().subscribe((_) => {
      this.router.navigate(['/auth/login']);
    });
  }
}
