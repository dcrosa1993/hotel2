import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-loading-bar',
  standalone: true,
  imports: [CommonModule, MatProgressBarModule],
  templateUrl: './loading-bar.component.html',
})
export class LoadingBarComponent {
  @Input() title: string | undefined;
}
