import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasicCardComponent } from 'src/app/shared/basic-card/basic-card.component';
import { ErrorMsgComponent } from 'src/app/shared/error-msg/error-msg.component';
import { LoadingBarComponent } from 'src/app/shared/loading-bar/loading-bar.component';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterModule } from '@angular/router';
import { SignInService } from 'src/app/services/sign-in.service';
import { Observable, startWith } from 'rxjs';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [
    CommonModule,
    BasicCardComponent,
    ErrorMsgComponent,
    LoadingBarComponent,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    RouterModule,
    MatButtonModule,
  ],
  providers: [SignInService],
  templateUrl: './sign-in.component.html',
})
export class SignInComponent {
  formGroup!: FormGroup<SignInForm>;

  protected hidePassword = true;

  protected loading$!: Observable<boolean>;
  protected error$!: Observable<string>;

  constructor(
    private _fb: FormBuilder,
    private _router: Router,
    protected signInLogic: SignInService
  ) {}

  ngOnInit(): void {
    this.formGroup = this._fb.nonNullable.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });

    this.loading$ = this.signInLogic.loading$;
    this.error$ = this.signInLogic.error$;
    this.signInLogic.success$.subscribe((data) => {
      console.log(data);
      this._router.navigate(['/store']);
    });
  }

  submit() {
    if (this.formGroup.valid) {
      this.signInLogic.requestSignIn(this.formGroup.getRawValue());
    }
  }
}

type SignInForm = {
  email: FormControl;
  password: FormControl;
};
