import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmPasswordValidator } from './password-match';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { SignUpService } from 'src/app/services/sign-up/sign-up.service';
import { Observable } from 'rxjs';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { LoadingBarComponent } from 'src/app/shared/loading-bar/loading-bar.component';
import { ErrorMsgComponent } from 'src/app/shared/error-msg/error-msg.component';
import { BasicCardComponent } from 'src/app/shared/basic-card/basic-card.component';
import { SignUpCredentials } from 'src/app/models/exports';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [
    CommonModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
    RouterModule,
    LoadingBarComponent,
    ErrorMsgComponent,
    BasicCardComponent,
  ],
  templateUrl: './sign-up.component.html',
})
export class SignUpComponent {
  protected hidePassword = true;
  protected hidecPassword = true;

  protected error$!: Observable<string | undefined>;

  protected loading$!: Observable<boolean>;

  public formGroup: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _signUpLogic: SignUpService,
    private _router: Router
  ) {
    this.formGroup = this._fb.group(
      {
        name: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required]],
        cpassword: ['', [Validators.required]],
      },
      {
        validator: ConfirmPasswordValidator('password', 'cpassword'),
      }
    );
  }
  ngOnInit(): void {
    this.error$ = this._signUpLogic.error$;
    this.loading$ = this._signUpLogic.loading$;
  }

  submit() {
    if (this.formGroup.valid) {
      let _signUpCredentials: SignUpCredentials = {
        name: this.formGroup.value.name,
        email: this.formGroup.value.email,
        phone: '00000000',
        password: this.formGroup.value.password,
      };
      this._signUpLogic.signUpCredentials(_signUpCredentials);
    }
  }
}
