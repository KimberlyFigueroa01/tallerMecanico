import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { ClienteService } from '../../clientes/services/cliente.service';
import { Cliente } from '../../clientes/models/cliente.model';

@Component({
  selector: 'app-vehiculo-form',
  imports: [ReactiveFormsModule],
  templateUrl: './vehiculo-form.html',
  styleUrl: './vehiculo-form.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VehiculoForm {
  private readonly clienteService = inject(ClienteService);

  readonly isSubmitting = signal(false);
  readonly clientes = signal<Cliente[]>([]);

  readonly form = new FormGroup({
    marca: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    modelo: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    ano: new FormControl(2020, { nonNullable: true, validators: [Validators.required] }),
    placa: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    color: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    tipo: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    vin: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    km: new FormControl(0, { nonNullable: true, validators: [Validators.required] }),
    clienteId: new FormControl('', { nonNullable: true, validators: [Validators.required] })
  });

  ngOnInit(): void {
    this.clienteService.getAll().subscribe(items => this.clientes.set(items));
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.isSubmitting.set(true);
    setTimeout(() => this.isSubmitting.set(false), 400);
  }
}
