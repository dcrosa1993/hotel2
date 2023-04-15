import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
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
import { Observable } from 'rxjs';
import { BasicCardComponent } from 'src/app/shared/basic-card/basic-card.component';

import { AddUserService } from 'src/app/services/user/add-user.service';
import { AddRoomService } from 'src/app/services/room/add-room.service';
@Component({
  selector: 'app-add-service',
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
  templateUrl: './add-room.component.html',
  providers:[AddRoomService]
})
export class AddRoomComponent {
  protected error$!: Observable<string | undefined>;

  protected loading$!: Observable<boolean>;

  public formGroup: FormGroup;
  constructor(
    private _fb: FormBuilder,
    private _logic: AddRoomService,
    private dialogRef: MatDialogRef<AddRoomComponent>
  ) {
    this.formGroup = this._fb.group({
      number: ['', [Validators.required]],
      capacity: ['', [Validators.required]],
      availability: ['', [Validators.required]],
    });
  }
  ngOnInit(): void {
    this.error$ = this._logic.error$;
    this.loading$ = this._logic.loading$;
    this._logic.success$.subscribe((_) => {
      this.dialogRef.close(true);
    });
  }

  submit() {
    if (this.formGroup.valid) {
      this._logic.addRoom(this.formGroup.value);
    }
  }
}
