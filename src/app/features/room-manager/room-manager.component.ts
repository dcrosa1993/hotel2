import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { Observable } from 'rxjs';

import { ErrorMsgComponent } from 'src/app/shared/error-msg/error-msg.component';
import { LoadingBarComponent } from 'src/app/shared/loading-bar/loading-bar.component';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { GetAllUsersService } from 'src/app/services/user/get-all-users.service';
import { AddRoomComponent } from './add-room/add-room.component';
import { ViewRoomComponent } from './view-room/view-service.component';
import { EditRoomComponent } from './edit-room/edit-user.component';
import { User } from 'src/app/models/user/user';
import { Room } from 'src/app/models/exports';
import { GetAllRoomsService } from 'src/app/services/room/get-all-rooms.service';

@Component({
  selector: 'app-store-manager',
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
  templateUrl: './room-manager.component.html',
})
export class RoomManagerComponent {
  protected displayedColumns: string[] = [
    'number',
    'capacity',
    'availability',
    'reserved',
    'operations',
  ];
  protected loading$!: Observable<boolean>;
  protected error$!: Observable<string | undefined>;
  protected success$!: Observable<Room[]>;

  constructor(
    private _logic: GetAllRoomsService,
    protected dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.success$ = this._logic.success$;
    this.error$ = this._logic.error$;
    this.loading$ = this._logic.loading$;
    this.getRooms();
  }

  private getRooms() {
    this._logic.getAllRooms();
  }

  addDialog() {
    const dialogRef = this.dialog.open(AddRoomComponent, {
      //height: '400px',
      width: '800px',
    });

    dialogRef.afterClosed().subscribe((_) => {
      _ && this.getRooms();
    });
  }

  editDialog(id: string) {
    const dialogRef = this.dialog.open(EditRoomComponent, {
      //height: '400px',
      width: '800px',
      data: id,
    });

    dialogRef.afterClosed().subscribe((_) => {
      _ && this.getRooms();
    });
  }

  viewDialog(id: string) {
    this.dialog.open(ViewRoomComponent, {
      //height: '400px',
      width: '800px',
      data: id,
    });
  }
}
