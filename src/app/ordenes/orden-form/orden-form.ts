import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

import { OrdenService } from '../services/orden.service';
import { ClienteService } from '../../clientes/services/cliente.service';
import { VehiculoService } from '../../vehiculos/services/vehiculo.service';
import { Cliente } from '../../clientes/models/cliente.model';
import { Vehiculo } from '../../vehiculos/models/vehiculo.model';
import { EstadoOrden, TipoServicio } from '../models/orden.model';

@Component({
  selector: 'app-orden-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './orden-form.html',
  styleUrl: './orden-form.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrdenForm {
  private readonly ordenService = inject(OrdenService);
  private readonly clienteService = inject(ClienteService);
  private readonly vehiculoService = inject(VehiculoService);
  private readonly router = inject(Router);

  readonly isSubmitting = signal(false);
  readonly clienteResultados = signal<Cliente[]>([]);
  readonly vehiculos = signal<Vehiculo[]>([]);
  readonly selectedCliente = signal<Cliente | null>(null);
  readonly selectedVehiculo = signal<Vehiculo | null>(null);
  readonly today = new Date().toISOString().slice(0, 10);

  readonly form = new FormGroup({
    clienteSearch: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    clienteId: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    vehiculoId: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    tipoServicio: new FormControl<TipoServicio>('MANTENCION', { nonNullable: true, validators: [Validators.required] }),
    prioridad: new FormControl('MEDIA', { nonNullable: true, validators: [Validators.required] }),
    fechaIngreso: new FormControl(this.today, { nonNullable: true, validators: [Validators.required] }),
    fechaEntrega: new FormControl(this.today, { nonNullable: true, validators: [Validators.required] }),
    kilometraje: new FormControl(0, { nonNullable: true, validators: [Validators.required] }),
    nivelCombustible: new FormControl(50, { nonNullable: true, validators: [Validators.required] }),
    observaciones: new FormControl('', { nonNullable: true })
  });

  ngOnInit(): void {
    this.form.controls.clienteSearch.valueChanges
      .pipe(debounceTime(250), distinctUntilChanged())
      .subscribe(value => {
        const term = value.trim();
        if (!term) {
          this.clienteResultados.set([]);
          return;
        }
        this.clienteService.getAll(term).subscribe(items => this.clienteResultados.set(items));
      });
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.isSubmitting.set(true);
    const value = this.form.getRawValue();
    const cliente = this.selectedCliente();
    const vehiculo = this.selectedVehiculo();
    if (!cliente || !vehiculo) {
      this.isSubmitting.set(false);
      return;
    }
    this.ordenService
      .create({
        numero: `${Math.floor(Math.random() * 9000 + 1000)}`,
        estado: 'ABIERTA' as EstadoOrden,
        tipoServicio: value.tipoServicio,
        descripcion: value.observaciones,
        fechaCreacion: value.fechaIngreso,
        fechaLimite: value.fechaEntrega,
        cliente: {
          id: this.toNumericId(cliente.id),
          nombre: cliente.nombre,
          telefono: cliente.telefono
        },
        vehiculo: {
          id: this.toNumericId(vehiculo.id),
          marca: vehiculo.marca,
          modelo: vehiculo.modelo,
          placa: vehiculo.placa,
          ano: vehiculo.ano,
          color: vehiculo.color
        },
        lineas: [],
        inventarioVehiculo: {},
        kilometraje: value.kilometraje,
        nivelCombustible: value.nivelCombustible,
        estadoVehiculo: 'Sin observaciones',
        notas: [],
        diagnostico: '',
        tareas: [],
        subtotal: 0,
        descuento: 0,
        iva: 0,
        total: 0
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

  selectCliente(cliente: Cliente): void {
    this.selectedCliente.set(cliente);
    this.form.controls.clienteId.setValue(cliente.id);
    this.form.controls.clienteSearch.setValue(cliente.nombre, { emitEvent: false });
    this.clienteResultados.set([]);
    this.vehiculoService.getByCliente(cliente.id).subscribe(items => {
      this.vehiculos.set(items);
      this.selectedVehiculo.set(null);
      this.form.controls.vehiculoId.setValue('');
    });
  }

  selectVehiculo(value: string): void {
    const vehiculo = this.vehiculos().find(item => item.id === value) ?? null;
    this.selectedVehiculo.set(vehiculo);
  }

  private toNumericId(value: string): number {
    const digits = Number(value.replace(/\D/g, ''));
    return Number.isNaN(digits) ? 0 : digits;
  }
}
