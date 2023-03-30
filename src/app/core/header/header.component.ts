import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignOutComponent } from 'src/app/shared/sign-out/sign-out.component';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, SignOutComponent,MatMenuModule, RouterModule, MatButtonModule],
  templateUrl: './header.component.html',
})
export class HeaderComponent {}
