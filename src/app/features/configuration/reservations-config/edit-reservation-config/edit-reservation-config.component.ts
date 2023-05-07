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
import { GetOneReservationService } from 'src/app/services/reservation/get-one-reservation.service';
import { GetReservationsConfigService } from 'src/app/services/configuration/get-reservations-config.service';
import { EditReservationConfigService } from 'src/app/services/configuration/edit-reservation-config.service';
@Component({
  selector: 'app-edit-reservation',
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
  templateUrl: './edit-reservation-config.component.html',
  providers: [EditReservationConfigService],
})
export class EditReservationConfigComponent {
  protected error$!: Observable<string | undefined>;

  protected loading$!: Observable<boolean>;

  public formGroup: FormGroup;
  constructor(
    private _fb: FormBuilder,
    private _logic: EditReservationConfigService,
    private _getLogic: GetReservationsConfigService,
    private dialogRef: MatDialogRef<EditReservationConfigComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string
  ) {
    this.formGroup = this._fb.group({
      advanceRequieredNigth: ['', [Validators.required]],
      managerPartPerClient: ['', [Validators.required]],
      maxRoomClients: ['', [Validators.required]],
      nigthCostFor3Client: ['', [Validators.required]],
      nigthCostMost4Client: ['', [Validators.required]],
      nigthCostUnder2Client: ['', [Validators.required]],
      nigthDiscountFor3Client: ['', [Validators.required]],
      nigthDiscountMost4Client: ['', [Validators.required]],
      nigthDiscountUnder2Client: ['', [Validators.required]],
      transportCost: ['', [Validators.required]],
    });
    this.formGroup.disable();
  }
  ngOnInit(): void {
    this.error$ = merge(this._logic.error$, this._getLogic.error$);
    this.loading$ = merge(this._logic.loading$, this._getLogic.loading$);
    this._logic.success$.subscribe((_) => {
      this.dialogRef.close(true);
    });
    this._getLogic.success$.subscribe((_) => {
      this.formGroup.setValue({
        advanceRequieredNigth: _.advanceRequieredNigth,
        managerPartPerClient: _.managerPartPerClient,
        maxRoomClients: _.maxRoomClients,
        nigthCostFor3Client: _.nigthCostFor3Client,
        nigthCostMost4Client: _.nigthCostMost4Client,
        nigthCostUnder2Client: _.nigthCostUnder2Client,
        nigthDiscountFor3Client: _.nigthDiscountFor3Client,
        nigthDiscountMost4Client: _.nigthDiscountMost4Client,
        nigthDiscountUnder2Client: _.nigthDiscountUnder2Client,
        transportCost: _.transportCost,
      });
      this.formGroup.enable();
    });
    this._getLogic.getReservationConfig();
  }

  submit() {
    if (this.formGroup.valid) {
      this._logic.editConfig(this.formGroup.value);
    }
  }
}
