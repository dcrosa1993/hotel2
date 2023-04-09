import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { ErrorMsgComponent } from 'src/app/shared/error-msg/error-msg.component';
import { LoadingBarComponent } from 'src/app/shared/loading-bar/loading-bar.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { Observable, merge } from 'rxjs';
import { BasicCardComponent } from 'src/app/shared/basic-card/basic-card.component';

import { GetOneUserService } from 'src/app/services/user/get-one-user.service';
import { EditUserService } from 'src/app/services/user/edit-user.service';
import { MatSelectModule } from '@angular/material/select';
@Component({
  selector: 'app-edit-service',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    ErrorMsgComponent,
    LoadingBarComponent,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    BasicCardComponent,
    MatCheckboxModule,
    MatSelectModule,
  ],
  providers: [GetOneUserService, EditUserService],
  templateUrl: './edit-user.component.html',
})
export class EditUserComponent {
  protected error$!: Observable<string | undefined>;
  protected enablePasswordField: boolean = false;
  protected loading$!: Observable<boolean>;
  protected selectElements: {
    value: 'admin' | 'manager';
    viewValue: string;
  }[] = [
    { value: 'admin', viewValue: 'Administrador' },
    { value: 'manager', viewValue: 'Gestor' },
  ];
  public formGroup: FormGroup;
  constructor(
    private _fb: FormBuilder,
    private _logic: EditUserService,
    private _getOneService: GetOneUserService,
    private dialogRef: MatDialogRef<EditUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string
  ) {
    this.formGroup = this._fb.group({
      name: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      baned: [false, [Validators.required]],
      role: [null, [Validators.required]],
      changePassword: [false, [Validators.required]],
      password: [''],
    });
    this.formGroup.disable();
  }
  ngOnInit(): void {
    this.error$ = merge(this._logic.error$, this._getOneService.error$);
    this.loading$ = merge(this._logic.loading$, this._getOneService.loading$);
    this._logic.success$.subscribe((_) => {
      this.dialogRef.close(true);
    });
    this._getOneService.success$.subscribe((_) => {
      this.formGroup.setValue({
        name: _.name,
        phone: _.phone,
        email: _.email,
        baned: _.baned,
        role: _.role,
        changePassword: _.changePassword,
        password: '',
      });
      this.formGroup.enable();
      this.formGroup.get('password')!.disable();
    });
    this._getOneService.getOneServices(this.data);
  }

  submit() {
    if (this.enablePasswordField) {
      this.formGroup.get('password')!.setValidators([Validators.required]);
    } else {
      this.formGroup.get('password')!.removeValidators([Validators.required]);
      this.formGroup.get('password')!.setValue('');
    }
    this.formGroup.get('password')!.updateValueAndValidity();
    if (this.formGroup.valid) {
      this._logic.editService(this.formGroup.value, this.data);
    } else {
      this.formGroup.markAllAsTouched();
    }
  }

  passwordAbility() {
    this.enablePasswordField = !this.enablePasswordField;
    this.enablePasswordField
      ? this.formGroup.get('password')!.enable()
      : this.formGroup.get('password')!.disable();
  }
}
