import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { Observable, merge, take, Subject } from 'rxjs';
import { Reservation, Room } from 'src/app/models/exports';
import { GetOneReservationService } from 'src/app/services/reservation/get-one-reservation.service';
import { BasicCardComponent } from 'src/app/shared/basic-card/basic-card.component';
import { ErrorMsgComponent } from 'src/app/shared/error-msg/error-msg.component';
import { LoadingBarComponent } from 'src/app/shared/loading-bar/loading-bar.component';
import { ViewReservationComponent } from '../view-reservation/view-reservation.component';
import { GetOneRoomService } from 'src/app/services/room/get-one-room.service';
import { AddReservationService } from 'src/app/services/reservation/add-reservation.service';
import { GetInvalidDatesReservationService } from 'src/app/services/reservation/get-invalid-dates-reservation.service';
import { AddReservationComponent } from '../add-reservation/add-reservation.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { checkInInput } from 'src/app/models/reservation/check-in-input';
import { AddCheckInService } from 'src/app/services/reservation/add-check-in.service';
import { GetAllRoomsService } from 'src/app/services/room/get-all-rooms.service';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-chech-in',
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
    MatTableModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule
  ],
  templateUrl: './chech-in.component.html',
  providers: [GetOneRoomService, GetOneReservationService, GetAllRoomsService, AddCheckInService, GetInvalidDatesReservationService],
})
export class ChechInComponent {
  protected error$!: Observable<string | undefined>;
  private privateError$: Subject<string | undefined> = new Subject()
  protected successReservation$!: Observable<Reservation | undefined>;
  protected successRooms$!: Observable<Room[] | undefined>;
  protected loading$!: Observable<boolean>;
  protected displayedColumns = ['name', 'passport', 'phone', 'email', 'age'];
  public formGroup: FormGroup;
  protected minDate: Date = new Date();
  private allDisabledDates: Date[] = [];
  constructor(
    private _getOneService: GetOneReservationService,
    @Inject(MAT_DIALOG_DATA) public data: string,
    private _fb: FormBuilder,
    private _logic: AddCheckInService,
    private _roomService:GetAllRoomsService,
    private _invalidDates: GetInvalidDatesReservationService,
    private dialogRef: MatDialogRef<ChechInComponent>
  ) {
    this.formGroup = this._fb.group({
      //dateIn: ['', [Validators.required]],
      //dateOut: ['', [Validators.required]],
      roomId: [null, [Validators.required]]
    });
  }
  ngOnInit(): void {
    this.successReservation$ = this._getOneService.success$;
    this.successRooms$ = this._roomService.success$;
    this._getOneService.getOneReservation(this.data);

    this.error$ = merge(this._logic.error$, this._invalidDates.error$, this._getOneService.error$, this.privateError$, this._roomService.error$);
    this.loading$ = merge(this._logic.loading$, this._invalidDates.loading$, this._getOneService.loading$, this._roomService.loading$);
    this._logic.success$.pipe(take(1)).subscribe((_) => {
      this.dialogRef.close(true);
    });
    this._invalidDates.success$.pipe(take(1)).subscribe((dates) => {
      this.allDisabledDates = dates;
    });
    this._invalidDates.getAllInvalidDates();
    this._roomService.getAllRooms();
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

  submit(id:string) {
    if (this.formGroup.valid) {
          var newRes: checkInInput = {
            id: id,
            dateIn: this.formGroup.value.dateIn,
            dateOut: this.formGroup.value.dateOut,
            roomId: this.formGroup.value.roomId,
          };
          this.privateError$.next(undefined);
          this._logic.addCheckIn(newRes);
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

  protected convertDate(date:string){
    return new Date(date)
  }
}
