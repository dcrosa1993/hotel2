import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogOutService } from 'src/app/services/log-out/log-out.service';
import { Router, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { Observable } from 'rxjs';
import { AccountService } from 'src/app/services/account-service/account.service';
import { LoggedInUser } from 'src/app/models/auth/logged-in-user';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-sign-out',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatMenuModule, RouterModule],
  templateUrl: './sign-out.component.html',
})
export class SignOutComponent {
  protected logedIn$: Observable<boolean>;
  protected currentUser: LoggedInUser | null = null;
  constructor(private accountLogic: AccountService, private router: Router) {
    this.logedIn$ = accountLogic.isAuthenticated$;
    this.currentUser = accountLogic.currentUser;
  }

  logOut() {
    this.accountLogic.signOut().subscribe((_) => {
      this.router.navigate(['/auth/login']);
    });
  }
}
