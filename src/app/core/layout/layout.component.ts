import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatMenuModule } from '@angular/material/menu';
import { HeaderComponent } from '../header/header.component';
import { SideMenuComponent } from '../side-menu/side-menu.component';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    CommonModule,
    MatSidenavModule,
    HeaderComponent,
    SideMenuComponent,
    RouterModule,
    MatMenuModule,
  ],
  templateUrl: './layout.component.html',
})
export class LayoutComponent implements OnInit {
  protected showMenu: boolean = false;
  protected showDemo: boolean = false;
  constructor(private _activatedRoute: ActivatedRoute) {}
  ngOnInit(): void {
    this.showMenu = this._activatedRoute.snapshot.data['showMenu'];
    this.showDemo = this._activatedRoute.snapshot.data['showDemo'];
  }
}
