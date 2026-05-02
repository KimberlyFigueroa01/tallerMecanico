import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { OrdenService } from '../services/orden.service';

@Component({
  selector: 'app-orden-form',
  imports: [ReactiveFormsModule],
  templateUrl: './orden-form.html',
  styleUrl: './orden-form.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrdenForm {
  private readonly ordenService = inject(OrdenService);
  private readonly router = inject(Router);

  readonly isSubmitting = signal(false);

  readonly form = new FormGroup({
    cliente: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    vehiculo: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    tecnico: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    tipo: new FormControl('', { nonNullable: true, validators: [Validators.required] })
  });

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.isSubmitting.set(true);
    const value = this.form.getRawValue();
    this.ordenService
      .create({
        id: `OT-${Math.floor(Math.random() * 9000 + 1000)}`,
        cliente: value.cliente,
        vehiculo: value.vehiculo,
        tecnico: value.tecnico,
        tipo: value.tipo,
        estado: 'Abierta',
        fecha: new Date().toISOString().slice(0, 10),
        subtotal: 0,
        descuento: 0,
        iva: 0,
        total: 0,
        lineas: []
      })
      .subscribe({
        next: () => {
          this.isSubmitting.set(false);
          this.router.navigateByUrl('/ordenes');
        },
        error: () => {
          this.isSubmitting.set(false);
        }
      });
  }
}
