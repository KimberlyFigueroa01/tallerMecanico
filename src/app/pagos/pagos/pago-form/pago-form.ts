import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { OrdenService } from '../../../ordenes/services/orden.service';
import { Orden } from '../../../ordenes/models/orden.model';
import { PagoService } from '../../services/pago.service';

@Component({
  selector: 'app-pago-form',
  imports: [ReactiveFormsModule, DecimalPipe],
  templateUrl: './pago-form.html',
  styleUrl: './pago-form.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PagoForm {
  private readonly ordenService = inject(OrdenService);
  private readonly pagoService = inject(PagoService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  readonly metodo = signal<'efectivo' | 'tarjeta' | 'transferencia'>('efectivo');
  readonly orden = signal<Orden | null>(null);
  readonly isSubmitting = signal(false);

  readonly form = new FormGroup({
    monto: new FormControl(0, { nonNullable: true, validators: [Validators.required] }),
    referencia: new FormControl('', { nonNullable: true })
  });

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (!idParam) {
      return;
    }
    const ordenId = Number(idParam);
    this.ordenService.getById(ordenId).subscribe(orden => {
      this.orden.set(orden);
      this.form.controls.monto.setValue(orden.total);
    });
  }

  setMetodo(value: 'efectivo' | 'tarjeta' | 'transferencia'): void {
    this.metodo.set(value);
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const orden = this.orden();
    if (!orden) {
      return;
    }
    this.isSubmitting.set(true);
    const value = this.form.getRawValue();
    this.pagoService
      .create({
        id: `P-${Math.floor(Math.random() * 900 + 100)}`,
        ordenId: orden.numero,
        metodo: this.metodo(),
        monto: value.monto,
        referencia: value.referencia,
        fecha: new Date().toISOString().slice(0, 10)
      })
      .subscribe({
        next: () => {
          this.isSubmitting.set(false);
          this.router.navigateByUrl('/pagos');
        },
        error: () => this.isSubmitting.set(false)
      });
  }
}
