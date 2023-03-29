import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-error-msg',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './error-msg.component.html',
})
export class ErrorMsgComponent {
  @Input() error!: string;
}
