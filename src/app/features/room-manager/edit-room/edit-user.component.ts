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
import { GetOneRoomService } from 'src/app/services/room/get-one-room.service';
import { EditRoomService } from 'src/app/services/room/edit-room.service';
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
  templateUrl: './edit-room.component.html',
})
export class EditRoomComponent {
  protected error$!: Observable<string | undefined>;

  protected loading$!: Observable<boolean>;

  public formGroup: FormGroup;
  constructor(
    private _fb: FormBuilder,
    private _logic: EditRoomService,
    private _getOneService: GetOneRoomService,
    private dialogRef: MatDialogRef<EditRoomComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string
  ) {
    this.formGroup = this._fb.group({
      number: ['', [Validators.required]],
      capacity: ['', [Validators.required]],
      availability: [true, [Validators.required]],
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
        number: _.number,
        capacity: _.capacity,
        availability: _.availability,
      });
      this.formGroup.enable();
    });
    this._getOneService.getOneServices(this.data);
  }

  submit() {
    if (this.formGroup.valid) {
      this._logic.editRoom(this.formGroup.value, this.data);
    }
  }
}
