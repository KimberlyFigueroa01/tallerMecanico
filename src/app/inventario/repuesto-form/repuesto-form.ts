import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-repuesto-form',
  imports: [ReactiveFormsModule],
  templateUrl: './repuesto-form.html',
  styleUrl: './repuesto-form.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RepuestoForm {
  readonly isSubmitting = signal(false);

  readonly form = new FormGroup({
    nombre: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    sku: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    categoria: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    stock: new FormControl(0, { nonNullable: true, validators: [Validators.required] }),
    precio: new FormControl(0, { nonNullable: true, validators: [Validators.required] })
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
