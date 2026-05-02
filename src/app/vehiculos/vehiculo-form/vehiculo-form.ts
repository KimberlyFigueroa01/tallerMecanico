import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-vehiculo-form',
  imports: [ReactiveFormsModule],
  templateUrl: './vehiculo-form.html',
  styleUrl: './vehiculo-form.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VehiculoForm {
  readonly isSubmitting = signal(false);

  readonly form = new FormGroup({
    marca: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    modelo: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    ano: new FormControl(2020, { nonNullable: true, validators: [Validators.required] }),
    placa: new FormControl('', { nonNullable: true, validators: [Validators.required] })
  });

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.isSubmitting.set(true);
    setTimeout(() => this.isSubmitting.set(false), 400);
  }
}
