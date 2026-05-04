import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

import { OrdenService } from '../services/orden.service';
import { EstadoOrden, Orden } from '../models/orden.model';
import { StatusBadge } from '../../shared/shared/status-badge/status-badge';

@Component({
  selector: 'app-ordenes-list',
  imports: [RouterLink, StatusBadge],
  templateUrl: './ordenes-list.html',
  styleUrl: './ordenes-list.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrdenesList {
  private readonly ordenService = inject(OrdenService);

  readonly orders = signal<Orden[]>([]);
  readonly isLoading = signal(false);
  readonly estado = signal<EstadoOrden | ''>('');
  readonly tecnico = signal('');
  readonly search = signal('');

  readonly resumen = computed(() => {
    const data = this.orders();
    return {
      abiertas: data.filter(item => item.estado === 'ABIERTA').length,
      progreso: data.filter(item => item.estado === 'EN_PROGRESO').length,
      listas: data.filter(item => item.estado === 'LISTA').length,
      cerradas: data.filter(item => item.estado === 'CERRADA').length
    };
  });

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.isLoading.set(true);
    this.ordenService
      .getAll({
        estado: this.estado() || undefined,
        tecnico: this.tecnico() || undefined,
        search: this.search() || undefined
      })
      .subscribe({
        next: orders => {
          this.orders.set(orders);
          this.isLoading.set(false);
        },
        error: () => {
          this.isLoading.set(false);
        }
      });
  }

  updateEstado(value: string): void {
    this.estado.set(value as EstadoOrden | '');
    this.load();
  }

  updateTecnico(value: string): void {
    this.tecnico.set(value);
    this.load();
  }

  updateSearch(value: string): void {
    this.search.set(value);
    this.load();
  }
}
