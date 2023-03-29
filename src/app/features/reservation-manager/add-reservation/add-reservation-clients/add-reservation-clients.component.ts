import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { client, clientInput } from 'src/app/models/exports';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Subject } from 'rxjs';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-add-reservation-clients',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatIconModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatSelectModule,
  ],
  templateUrl: './add-reservation-clients.component.html',
})
export class AddReservationClientsComponent {
  protected formGroup: FormGroup;
  displayedColumns: string[] = [
    'name',
    'passport',
    'phone',
    'email',
    'age',
    'operations',
  ];
  protected selectElements: {
    value: 'younger' | 'adult';
    viewValue: string;
  }[] = [
    { value: 'adult', viewValue: 'Adulto' },
    { value: 'younger', viewValue: 'Niño' },
  ];
  private clients: clientInput[] = [];
  protected ELEMENT_DATA: Subject<clientInput[]> = new Subject();
  @Output() event: EventEmitter<clientInput[]> = new EventEmitter();
  protected error: boolean = false;
  protected errorMessage: string = '';

  constructor(private _fb: FormBuilder) {
    this.formGroup = this._fb.group({
      name: ['', [Validators.required]],
      passport: ['', [Validators.required]],
      email: [''],
      phone: [''],
      age: ['adult', [Validators.required]],
    });
    this.event.emit(this.clients);
  }

  remove(client: client) {
    this.error = false;
    this.clients = this.clients.filter((_) => {
      return _ === client ? false : true;
    });
    this.ELEMENT_DATA.next(this.clients);
    this.event.emit(this.clients);
  }
  add() {
    this.error = false;
    if (this.formGroup.valid && !this.clients.includes(this.formGroup.value)) {
      this.clients.push(this.formGroup.value);
      this.ELEMENT_DATA.next(this.clients);
      this.event.emit(this.clients);
    } else {
      this.error = true;
      this.errorMessage = 'Ya existe el elemento en la tabla';
    }
  }
}
