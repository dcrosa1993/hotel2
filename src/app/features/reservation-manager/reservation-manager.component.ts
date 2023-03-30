import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { Observable } from 'rxjs';
import { Reservation } from 'src/app/models/reservation/reservation';
import { GetAllReservationService } from 'src/app/services/reservation/get-all-reservation.service';
import { ErrorMsgComponent } from 'src/app/shared/error-msg/error-msg.component';
import { LoadingBarComponent } from 'src/app/shared/loading-bar/loading-bar.component';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AddReservationComponent } from './add-reservation/add-reservation.component';
import { EditReservationComponent } from './edit-reservation/edit-reservation.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
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
  providers: [MatDatepickerModule, MatNativeDateModule],
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
  protected error$!: Observable<string | undefined>;
  protected success$!: Observable<Reservation[]>;

  constructor(
    private _logic: GetAllReservationService,
    protected dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.success$ = this._logic.success$
    this._logic.success$.subscribe((_)=>{
      console.log(_);
      
    });
    this.error$ = this._logic.error$;
    this.loading$ = this._logic.loading$;
    this.getPetitions();
  }

  private getPetitions() {
    this._logic.getAllServices();
  }

  addDialog() {
    const dialogRef = this.dialog.open(AddReservationComponent, {
      //height: '400px',
      width: 'auto',
    });

    dialogRef.afterClosed().subscribe((_) => {
      _ && this.getPetitions();
    });
  }

  editDialog(id: string) {
    const dialogRef = this.dialog.open(EditReservationComponent, {
      //height: '400px',
      width: '800px',
      data: id,
    });

    dialogRef.afterClosed().subscribe((_) => {
      _ && this.getPetitions();
    });
  }
}
