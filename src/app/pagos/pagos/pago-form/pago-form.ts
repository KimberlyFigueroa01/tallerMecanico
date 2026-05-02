import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-pago-form',
  imports: [ReactiveFormsModule],
  templateUrl: './pago-form.html',
  styleUrl: './pago-form.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PagoForm {
  readonly metodo = signal<'efectivo' | 'tarjeta' | 'transferencia'>('efectivo');

  readonly form = new FormGroup({
    monto: new FormControl(0, { nonNullable: true, validators: [Validators.required] }),
    referencia: new FormControl('', { nonNullable: true })
  });

  setMetodo(value: 'efectivo' | 'tarjeta' | 'transferencia'): void {
    this.metodo.set(value);
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
  }
}
