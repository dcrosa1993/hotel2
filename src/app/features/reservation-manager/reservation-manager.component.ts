import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { Observable, merge } from 'rxjs';
import { Reservation } from 'src/app/models/reservation/reservation';
import { GetAllReservationService } from 'src/app/services/reservation/get-all-reservation.service';
import { ErrorMsgComponent } from 'src/app/shared/error-msg/error-msg.component';
import { LoadingBarComponent } from 'src/app/shared/loading-bar/loading-bar.component';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AddReservationComponent } from './add-reservation/add-reservation.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { AlertDialogComponent } from 'src/app/shared/alert-dialog/alert-dialog.component';
import { RemoveReservationService } from 'src/app/services/reservation/remove-reservation.service';
import { ViewReservationComponent } from './view-reservation/view-reservation.component';
import { GetPDFReservationService } from 'src/app/services/reservation/get-pdf-reservation.service';
import { AccountService } from 'src/app/services/account-service/account.service';
import { LoggedInUser } from 'src/app/models/auth/logged-in-user';
@Component({
  selector: 'app-reservation-manager',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    ErrorMsgComponent,
    LoadingBarComponent,
    MatIconModule,
    AddReservationComponent,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  providers: [
    MatDatepickerModule,
    MatNativeDateModule,
    RemoveReservationService,
    GetAllReservationService,
    GetPDFReservationService,
  ],
  templateUrl: './reservation-manager.component.html',
})
export class ReservationManagerComponent {
  protected displayedColumns: string[] = [
    'id',
    'createdBy',
    'noClients',
    'dateIn',
    'dateOut',
    'totalNights',
    'operations',
  ];
  protected loading$!: Observable<boolean>;
  protected pdfLoading$!: Observable<boolean>;
  protected error$!: Observable<string | undefined>;
  protected success$!: Observable<Reservation[]>;
  protected currentUser: LoggedInUser | null = null;

  constructor(
    private _logic: GetAllReservationService,
    private _getPDF: GetPDFReservationService,
    private _removeReservation: RemoveReservationService,
    private accountLogic: AccountService,
    protected dialog: MatDialog
  ) {
    this.currentUser = accountLogic.currentUser;
  }

  ngOnInit(): void {
    this.success$ = this._logic.success$;
    this.error$ = merge(
      this._logic.error$,
      this._removeReservation.error$,
      this._getPDF.error$
    );
    this.loading$ = merge(
      this._logic.loading$,
      this._removeReservation.loading$
    );
    this.pdfLoading$ = this._getPDF.loading$;
    this._removeReservation.success$.subscribe((_) => _ && this.getData());
    this._getPDF.success$.subscribe((_) => console.log(_));
    this.getData();
  }

  private getData() {
    this._logic.getAllServices();
  }

  addDialog() {
    const dialogRef = this.dialog.open(AddReservationComponent, {
      //height: '400px',
      width: 'auto',
    });

    dialogRef.afterClosed().subscribe((_) => {
      _ && this.getData();
    });
  }

  viewDialog(id: string) {
    this.dialog.open(ViewReservationComponent, {
      //height: '400px',
      width: 'auto',
      data: id,
    });
  }

  downloadPDF(id: string) {
    this._getPDF.getPDF(id);
  }

  delete(id: string) {
    const dialogRef = this.dialog.open(AlertDialogComponent, {
      //height: '400px',
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((_) => {
      _ && this._removeReservation.deleteReservation(id);
    });
  }
}
