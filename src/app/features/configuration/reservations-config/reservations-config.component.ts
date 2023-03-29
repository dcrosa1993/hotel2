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
import { GetReservationsConfigService } from 'src/app/services/configuration/get-reservations-config.service';
import { ReservationConfig } from 'src/app/models/configuration/reservation-config';
import { EditReservationConfigComponent } from './edit-reservation-config/edit-reservation-config.component';

@Component({
  selector: 'app-reservations-config',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    ErrorMsgComponent,
    LoadingBarComponent,
    MatIconModule,
    MatDialogModule,
  ],
  templateUrl: './reservations-config.component.html',
})
export class ReservationsConfigComponent {
  protected loading$!: Observable<boolean>;
  protected error$!: Observable<string | undefined>;
  protected success$!: Observable<ReservationConfig>;

  constructor(
    private _logic: GetReservationsConfigService,
    protected dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.success$ = this._logic.success$;
    this.error$ = this._logic.error$;
    this.loading$ = this._logic.loading$;
    this.getPetitions();
  }

  private getPetitions() {
    this._logic.getReservationConfig();
  }
  
  editDialog() {
    const dialogRef = this.dialog.open(EditReservationConfigComponent, {
      //height: '400px',
      width: '800px',
    });

    dialogRef.afterClosed().subscribe((_) => {
      _ && this.getPetitions();
    });
  }
  
}
