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
import { GetOneRoomService } from 'src/app/services/room/get-one-room.service';
import { Room } from 'src/app/models/exports';
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
  templateUrl: './view-room.component.html',
})
export class ViewRoomComponent {
  protected error$!: Observable<string | undefined>;
  protected success$!: Observable<Room | undefined>;
  protected loading$!: Observable<boolean>;

  constructor(
    private _fb: FormBuilder,
    private _getOneService: GetOneRoomService,
    private dialogRef: MatDialogRef<ViewRoomComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string
  ) {}
  ngOnInit(): void {
    this.error$ = this._getOneService.error$;
    this.loading$ = this._getOneService.loading$;
    this.success$ = this._getOneService.success$;

    this._getOneService.getOneServices(this.data);
  }
}
