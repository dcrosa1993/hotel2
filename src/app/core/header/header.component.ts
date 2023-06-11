import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignOutComponent } from 'src/app/shared/sign-out/sign-out.component';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { AccountService } from 'src/app/services/account-service/account.service';
import { LoggedInUser } from 'src/app/models/auth/logged-in-user';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    SignOutComponent,
    MatMenuModule,
    RouterModule,
    MatButtonModule,
  ],
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  protected currentUser: LoggedInUser | null = null;
  protected logedIn$: Observable<boolean>;

  constructor(private accountLogic: AccountService) {
    this.currentUser = this.accountLogic.currentUser;
    this.logedIn$ = accountLogic.isAuthenticated$;
  }
}
