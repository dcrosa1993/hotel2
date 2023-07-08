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
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { Observable, map, merge, take } from 'rxjs';
import { AddReservationService } from 'src/app/services/reservation/add-reservation.service';
import { BasicCardComponent } from 'src/app/shared/basic-card/basic-card.component';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MatNativeDateModule,
  NativeDateAdapter,
} from '@angular/material/core';
import { AddReservationClientsComponent } from './add-reservation-clients/add-reservation-clients.component';
import { clientInput, reservationInput } from 'src/app/models/exports';
import { GetInvalidDatesReservationService } from 'src/app/services/reservation/get-invalid-dates-reservation.service';
import { CustomDateAdapter } from '../../../models/reservation/custom-date-adapter';
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
  providers: [
    CustomDateAdapter,
    MatDatepickerModule,
    MatNativeDateModule,
    {
      provide: MAT_DATE_FORMATS,
      useValue: { display: { dateInput: 'DD-MM-YY' } },
    },
    { provide: DateAdapter, useClass: CustomDateAdapter },
    AddReservationService,
    GetInvalidDatesReservationService,
  ],

  templateUrl: './add-reservation.component.html',
})
export class AddReservationComponent {
  protected error$!: Observable<string | undefined>;
  protected clients: clientInput[] = [];
  protected loading$!: Observable<boolean>;
  protected error: boolean = false;
  protected errorMessage: string = '';
  protected minDate: Date = new Date();
  private allDisabledDates: Date[] = [];

  public formGroup: FormGroup;
  constructor(
    private _fb: FormBuilder,
    private _logic: AddReservationService,
    private _invalidDates: GetInvalidDatesReservationService,
    private dialogRef: MatDialogRef<AddReservationComponent>
  ) {
    this.formGroup = this._fb.group({
      description: [''],
      dateIn: ['', [Validators.required]],
      dateOut: ['', [Validators.required]],
      timeIn: ['', [Validators.required]],
      timeOut: [''],
      paidNights: ['', [Validators.required]],
      isCharged: [true, [Validators.required]],
    });
  }
  ngOnInit(): void {
    this.error$ = merge(this._logic.error$, this._invalidDates.error$);
    this.loading$ = merge(this._logic.loading$, this._invalidDates.loading$);
    this._logic.success$.pipe(take(1)).subscribe((_) => {
      this.dialogRef.close(true);
    });
    this._invalidDates.success$.pipe(take(1)).subscribe((dates) => {
      this.allDisabledDates = dates;
    });
    this._invalidDates.getAllInvalidDates();
  }

  myFilter = (d: Date | null): boolean => {
    if (d) {
      if (new Date(d).getTime() < new Date().getTime()) return false;

      var arrayTime = this.allDisabledDates.flatMap((x) =>
        new Date(x).getTime()
      );

      return !arrayTime.includes(new Date(d).getTime());
    }

    return true;
  };

  submit() {
    if (this.formGroup.valid) {
      if (!this.datesOverlapValidator()) {
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
      } else {
        this.error = true;
        this.errorMessage =
          'Las fechas seleccionadas se superponen con fechas deshabilitadas.';
      }
    } else {
      this.formGroup.markAllAsTouched();
    }
  }

  private datesOverlapValidator(): boolean {
    const startDate = this.formGroup.value.dateIn;
    const endDate = this.formGroup.value.dateOut;
    if (startDate && endDate) {
      return this.allDisabledDates.some(
        (date) =>
          new Date(startDate).getTime() <= new Date(date).getTime() &&
          new Date(date).getTime() <= new Date(endDate).getTime()
      );
    } else {
      return false;
    }
  }
}
