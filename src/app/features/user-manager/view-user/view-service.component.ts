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
import { User } from 'src/app/models/user/user';
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
  templateUrl: './view-service.component.html',
})
export class ViewServiceComponent {
  protected error$!: Observable<string | undefined>;
  protected success$!: Observable<User | undefined>;
  protected loading$!: Observable<boolean>;

  constructor(
    private _fb: FormBuilder,
    private _getOneService: GetOneUserService,
    private dialogRef: MatDialogRef<ViewServiceComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string
  ) {
    
  }
  ngOnInit(): void {
    this.error$ = this._getOneService.error$;
    this.loading$ = this._getOneService.loading$;
    this.success$ = this._getOneService.success$;

    this._getOneService.getOneServices(this.data);
  }
}
