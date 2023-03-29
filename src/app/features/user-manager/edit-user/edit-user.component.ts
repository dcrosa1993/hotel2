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
  ],
  templateUrl: './edit-user.component.html',
})
export class EditUserComponent {
  protected error$!: Observable<string | undefined>;

  protected loading$!: Observable<boolean>;

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
      email: ['', [Validators.required]],
      baned: [false, [Validators.required]],
      role: ['', [Validators.required]],
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
      });
      this.formGroup.enable();
    });
    this._getOneService.getOneServices(this.data);
  }

  submit() {
    if (this.formGroup.valid) {
      this._logic.editService(this.formGroup.value, this.data);
    }
  }
}
