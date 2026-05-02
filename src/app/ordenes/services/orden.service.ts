import { inject, Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, delay, map } from 'rxjs/operators';

import { ErrorService } from '../../shared/services/error.service';
import { EstadoOrden, LineaOrden, Orden } from '../models/orden.model';

@Injectable({
  providedIn: 'root'
})
export class OrdenService {
  private readonly errorService = inject(ErrorService);

  private orders: Orden[] = [
    {
      id: 'OT-1001',
      cliente: 'Maria Lopez',
      vehiculo: 'Toyota Corolla 2018',
      tecnico: 'Carlos Ruiz',
      tipo: 'Mecanica',
      estado: 'Abierta',
      fecha: '2026-05-01',
      subtotal: 120,
      descuento: 0,
      iva: 22.8,
      total: 142.8,
      lineas: [
        { id: 'L1', descripcion: 'Diagnostico', cantidad: 1, precio: 60, descuento: 0, total: 60 },
        { id: 'L2', descripcion: 'Cambio de aceite', cantidad: 1, precio: 60, descuento: 0, total: 60 }
      ]
    },
    {
      id: 'OT-1002',
      cliente: 'Pedro Sanchez',
      vehiculo: 'Nissan Versa 2019',
      tecnico: 'Laura Perez',
      tipo: 'Frenos',
      estado: 'En progreso',
      fecha: '2026-05-02',
      subtotal: 220,
      descuento: 20,
      iva: 38,
      total: 238,
      lineas: [
        { id: 'L1', descripcion: 'Pastillas de freno', cantidad: 1, precio: 200, descuento: 20, total: 180 },
        { id: 'L2', descripcion: 'Revision general', cantidad: 1, precio: 40, descuento: 0, total: 40 }
      ]
    }
  ];

  getAll(filters?: { estado?: EstadoOrden; tecnico?: string; search?: string }): Observable<Orden[]> {
    return of(this.orders).pipe(
      delay(300),
      map(orders => {
        let result = [...orders];
        if (filters?.estado) {
          result = result.filter(order => order.estado === filters.estado);
        }
        if (filters?.tecnico) {
          result = result.filter(order => order.tecnico === filters.tecnico);
        }
        if (filters?.search) {
          const term = filters.search.toLowerCase();
          result = result.filter(order =>
            `${order.id} ${order.cliente} ${order.vehiculo}`.toLowerCase().includes(term)
          );
        }
        return result;
      }),
      catchError(error => {
        this.errorService.showError('No se pudieron cargar las ordenes.');
        return throwError(() => error);
      })
    );
  }

  getById(id: string): Observable<Orden | null> {
    return of(this.orders.find(order => order.id === id) ?? null).pipe(
      delay(300),
      catchError(error => {
        this.errorService.showError('No se pudo cargar la orden.');
        return throwError(() => error);
      })
    );
  }

  create(orden: Orden): Observable<Orden> {
    this.orders = [orden, ...this.orders];
    return of(orden).pipe(delay(300));
  }

  update(id: string, changes: Partial<Orden>): Observable<Orden | null> {
    let updated: Orden | null = null;
    this.orders = this.orders.map(order => {
      if (order.id === id) {
        updated = { ...order, ...changes };
        return updated;
      }
      return order;
    });
    return of(updated).pipe(delay(300));
  }

  changeStatus(id: string, status: EstadoOrden): Observable<Orden | null> {
    return this.update(id, { estado: status });
  }

  addLinea(ordenId: string, linea: LineaOrden): Observable<Orden | null> {
    return this.update(ordenId, {
      lineas: [
        ...(this.orders.find(order => order.id === ordenId)?.lineas ?? []),
        linea
      ]
    });
  }

  removeLinea(ordenId: string, lineaId: string): Observable<Orden | null> {
    const order = this.orders.find(item => item.id === ordenId);
    if (!order) {
      return of(null).pipe(delay(200));
    }
    const updated = { ...order, lineas: order.lineas.filter(linea => linea.id !== lineaId) };
    return this.update(ordenId, updated);
  }
}
