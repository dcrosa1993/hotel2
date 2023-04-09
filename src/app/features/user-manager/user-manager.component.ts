import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { Observable, merge } from 'rxjs';

import { ErrorMsgComponent } from 'src/app/shared/error-msg/error-msg.component';
import { LoadingBarComponent } from 'src/app/shared/loading-bar/loading-bar.component';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { GetAllUsersService } from 'src/app/services/user/get-all-users.service';
import { AddUserComponent } from './add-user/add-user.component';
import { ViewServiceComponent } from './view-user/view-service.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { User } from 'src/app/models/user/user';
import { RemoveUserService } from 'src/app/services/user/remove-user.service';
import { AlertDialogComponent } from 'src/app/shared/alert-dialog/alert-dialog.component';

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
  providers: [GetAllUsersService, RemoveUserService],
  templateUrl: './user-manager.component.html',
})
export class UserManagerComponent {
  protected displayedColumns: string[] = [
    'name',
    'phone',
    'baned',
    'email',
    'role',
    'operations',
  ];
  protected loading$!: Observable<boolean>;
  protected error$!: Observable<string | undefined>;
  protected success$!: Observable<User[]>;

  constructor(
    private _logic: GetAllUsersService,
    private _removeUser: RemoveUserService,
    protected dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.success$ = this._logic.success$;
    this.error$ = merge(this._logic.error$, this._removeUser.error$);
    this.loading$ = merge(this._logic.loading$, this._removeUser.loading$);
    this._removeUser.success$.subscribe((_) => this.getPetitions());
    this.getPetitions();
  }

  private getPetitions() {
    this._logic.getAllServices();
  }

  addDialog() {
    const dialogRef = this.dialog.open(AddUserComponent, {
      //height: '400px',
      width: '800px',
    });

    dialogRef.afterClosed().subscribe((_) => {
      _ && this.getPetitions();
    });
  }

  editDialog(id: string) {
    const dialogRef = this.dialog.open(EditUserComponent, {
      //height: '400px',
      width: '800px',
      data: id,
    });

    dialogRef.afterClosed().subscribe((_) => {
      _ && this.getPetitions();
    });
  }

  viewDialog(id: string) {
    this.dialog.open(ViewServiceComponent, {
      //height: '400px',
      width: '800px',
      data: id,
    });
  }

  delete(id: string) {
    const dialogRef = this.dialog.open(AlertDialogComponent, {
      //height: '400px',
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((_) => {
      _ && this._removeUser.deleteUser(id);
    });
  }
}
