import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignOutComponent } from 'src/app/shared/sign-out/sign-out.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, SignOutComponent],
  templateUrl: './header.component.html',
})
export class HeaderComponent {}
