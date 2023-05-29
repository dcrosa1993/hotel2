import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { ErrorMsgComponent } from 'src/app/shared/error-msg/error-msg.component';
import { LoadingBarComponent } from 'src/app/shared/loading-bar/loading-bar.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {
  MatDatepickerModule,
  MatDateRangePicker,
} from '@angular/material/datepicker';
import {
  AbstractControl,
  AsyncValidatorFn,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { Observable } from 'rxjs';
import { AddReservationService } from 'src/app/services/reservation/add-reservation.service';
import { BasicCardComponent } from 'src/app/shared/basic-card/basic-card.component';
import { MatNativeDateModule } from '@angular/material/core';
import { AddReservationClientsComponent } from './add-reservation-clients/add-reservation-clients.component';
import { clientInput, reservationInput } from 'src/app/models/exports';
@Component({
  selector: 'app-add-reservation',
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
    MatDatepickerModule,
    MatNativeDateModule,
    AddReservationClientsComponent,
  ],
  providers: [MatDatepickerModule, MatNativeDateModule],

  templateUrl: './add-reservation.component.html',
})
export class AddReservationComponent {
  protected error$!: Observable<string | undefined>;
  protected clients: clientInput[] = [];
  protected loading$!: Observable<boolean>;
  protected error: boolean = false;
  protected errorMessage: string = '';
  protected minDate: Date = new Date();

  public formGroup: FormGroup;
  constructor(
    private _fb: FormBuilder,
    private _logic: AddReservationService,
    private dialogRef: MatDialogRef<AddReservationComponent>
  ) {
    this.formGroup = this._fb.group({
      description: [''],
      dateIn: ['', [Validators.required], [this.dateRangeValidator([])]],
      dateOut: ['', [Validators.required], this.dateRangeValidator([])],
      timeIn: ['', [Validators.required]],
      timeOut: [''],
      paidNights: ['', [Validators.required]],
      isCharged: [true, [Validators.required]],
    });
  }
  ngOnInit(): void {
    this.error$ = this._logic.error$;
    this.loading$ = this._logic.loading$;
    this._logic.success$.subscribe((_) => {
      this.dialogRef.close(true);
    });
  }

  disableDates(datesToDisable: Date[]): void {
    this.formGroup.controls['dateIn'].setValidators(
      this.dateRangeValidator(datesToDisable)
    );
    this.formGroup.controls['dateIn'].setValidators(
      this.dateRangeValidator(datesToDisable)
    );
  }

  dateRangeValidator(datesToDisable: Date[] = []): AsyncValidatorFn {
    return (control: AbstractControl) => {
      const startDate = control.value?.start;
      const endDate = control.value?.end;

      if (startDate && endDate) {
        const invalidDates = datesToDisable.filter(
          (date) => date >= startDate && date <= endDate
        );

        if (invalidDates.length > 0) {
          return Promise.resolve({ blockedDates: true });
        }
      }

      return Promise.resolve(null);
    };
  }

  submit() {
    if (this.formGroup.valid) {
      if (this.clients.length > 0) {
        var newRes: reservationInput = {
          description: this.formGroup.value.description,
          dateIn: this.formGroup.value.dateIn,
          dateOut: this.formGroup.value.dateOut,
          timeIn: this.formGroup.value.timeIn,
          timeOut: this.formGroup.value.timeOut,
          paymentNights: this.formGroup.value.paidNights,
          clients: this.clients,
          advanceManagement: this.formGroup.value.isCharged,
        };
        this._logic.addReservation(newRes);
      } else {
        this.error = true;
        this.errorMessage = 'La lista de clientes no puede estar vacia';
      }
    }
  }
}
