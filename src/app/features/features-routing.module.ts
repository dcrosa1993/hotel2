import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SignInComponent } from './auth/sign-in/sign-in.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { ReservationsConfigComponent } from './configuration/reservations-config/reservations-config.component';
import { ReservationManagerComponent } from './reservation-manager/reservation-manager.component';
import { RoomManagerComponent } from './room-manager/room-manager.component';
import { UserManagerComponent } from './user-manager/user-manager.component';
import { UnauthenticatedGuard } from '../guards/unauthenticated.guard';
import { AdminGuard } from '../guards/admin.guard';
import { ManagerGuard } from '../guards/manager.guard';

const routes: Routes = [
  { path: '', redirectTo: 'reservations', pathMatch: 'full' },
  {
    path: 'reservations',
    data: { showMenu: false, showDemo: true },
    canActivate: [AdminGuard, ManagerGuard],
    component: ReservationManagerComponent,
  },
  {
    path: 'config',
    data: { showMenu: false, showDemo: true },
    canActivate: [AdminGuard],
    children: [
      {
        path: 'reservation-configuration',
        component: ReservationsConfigComponent,
      },
    ],
  },
  {
    path: 'auth',
    canActivate: [UnauthenticatedGuard],
    data: { showMenu: false, showDemo: true },
    children: [
      {
        path: 'login',
        component: SignInComponent,
      },
    ],
  },
  {
    path: 'admin',
    canActivate: [AdminGuard],
    data: { showMenu: true, showDemo: true },
    children: [
      {
        path: 'users',
        component: UserManagerComponent,
      },
      {
        path: 'rooms',
        component: RoomManagerComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FeaturesRoutingModule {}
