import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, delay, map } from 'rxjs/operators';

import { ErrorService } from '../../shared/services/error.service';
import { EstadoOrden, LineaOrden, Nota, Orden } from '../models/orden.model';

@Injectable({
  providedIn: 'root'
})
export class OrdenService {
  private readonly errorService = inject(ErrorService);
  private readonly http = inject(HttpClient);
  private readonly useMock = true;

  private orders: Orden[] = [
    {
      id: 1,
      numero: '0001',
      estado: 'ABIERTA',
      tipoServicio: 'MANTENCION',
      descripcion: 'Mantencion de 50.000 kms',
      fechaCreacion: '2026-05-01T10:00:00Z',
      fechaLimite: '2026-05-03T16:00:00Z',
      cliente: { id: 1, nombre: 'Joaquin Hernandez', telefono: '+56 9 1234 5678' },
      vehiculo: { id: 10, marca: 'Ford', modelo: 'Explorer', placa: 'JKPL-81', ano: 2022, color: 'Gris' },
      tecnicoAsignado: { id: 7, nombre: 'Carlos Mendez', rol: 'MECANICO' },
      lineas: [
        { id: 1, descripcion: 'Aceite Mobil 5W30', cantidad: 1, precioUnitario: 120, descuentoPct: 10, total: 108, repuestoId: 100 },
        { id: 2, descripcion: 'Cambio de bujias', cantidad: 1, precioUnitario: 80, descuentoPct: 10, total: 72 }
      ],
      inventarioVehiculo: {
        Antenas: true,
        Gata: false,
        Pisos: true,
        Botiquin: false,
        Herramientas: true,
        'Rueda repuesto': true,
        Documentos: true,
        'Llave 1': true,
        Tag: false,
        Encendedor: false,
        'Llave 2': false,
        'Tapas ruedas': false,
        Extintor: false,
        'Llave rueda': false,
        Triangulos: false
      },
      kilometraje: 51411,
      nivelCombustible: 50,
      estadoVehiculo: 'Raya en puerta derecha',
      notas: [
        { id: 1, autor: 'Admin', fecha: '2026-05-01T12:00:00Z', texto: 'Recibido en buen estado.' }
      ],
      diagnostico: 'Vehiculo en buen estado general.',
      tareas: [
        { id: 1, descripcion: 'Revisar filtros', mecanico: 'Carlos Mendez', completada: true },
        { id: 2, descripcion: 'Rotacion de neumaticos', mecanico: 'Carlos Mendez', completada: false }
      ],
      subtotal: 200,
      descuento: 20,
      iva: 34.2,
      total: 214.2
    },
    {
      id: 2,
      numero: '0002',
      estado: 'EN_PROGRESO',
      tipoServicio: 'REPARACION',
      descripcion: 'Revision de frenos',
      fechaCreacion: '2026-05-02T09:00:00Z',
      fechaLimite: '2026-05-04T12:00:00Z',
      cliente: { id: 2, nombre: 'Maria Lopez', telefono: '+56 9 2222 3333' },
      vehiculo: { id: 20, marca: 'Nissan', modelo: 'Versa', placa: 'ABCD-12', ano: 2019, color: 'Negro' },
      tecnicoAsignado: { id: 8, nombre: 'Laura Perez', rol: 'MECANICO' },
      lineas: [
        { id: 3, descripcion: 'Pastillas de freno', cantidad: 1, precioUnitario: 200, descuentoPct: 0, total: 200 }
      ],
      inventarioVehiculo: {},
      kilometraje: 40500,
      nivelCombustible: 70,
      estadoVehiculo: 'Sin observaciones',
      notas: [],
      diagnostico: '',
      tareas: [],
      subtotal: 200,
      descuento: 0,
      iva: 38,
      total: 238
    }
  ];

  getAll(filters?: { estado?: EstadoOrden; tecnico?: string; search?: string }): Observable<Orden[]> {
    if (this.useMock) {
      return of(this.orders).pipe(
        delay(200),
        map(orders => {
          let result = [...orders];
          if (filters?.estado) {
            result = result.filter(order => order.estado === filters.estado);
          }
          if (filters?.tecnico) {
            result = result.filter(order => order.tecnicoAsignado?.nombre === filters.tecnico);
          }
          if (filters?.search) {
            const term = filters.search.toLowerCase();
            result = result.filter(order =>
              `${order.numero} ${order.cliente.nombre} ${order.vehiculo.placa}`.toLowerCase().includes(term)
            );
          }
          return result;
        })
      );
    }

    return this.http.get<Orden[]>('/ordenes').pipe(
      catchError(error => {
        this.errorService.showError('No se pudieron cargar las ordenes.');
        return throwError(() => error);
      })
    );
  }

  getById(id: number): Observable<Orden> {
    if (this.useMock) {
      return of(this.orders.find(order => order.id === id) ?? this.orders[0]).pipe(delay(200));
    }

    return this.http.get<Orden>(`/ordenes/${id}`).pipe(
      catchError(error => {
        this.errorService.showError('No se pudo cargar la orden.');
        return throwError(() => error);
      })
    );
  }

  create(payload: Partial<Orden>): Observable<Orden> {
    if (this.useMock) {
      const orden = {
        ...this.orders[0],
        id: this.orders.length + 1,
        numero: `${this.orders.length + 1}`.padStart(4, '0'),
        ...payload
      } as Orden;
      this.orders = [orden, ...this.orders];
      return of(orden).pipe(delay(200));
    }

    return this.http.post<Orden>('/ordenes', payload).pipe(
      catchError(error => {
        this.errorService.showError('No se pudo crear la orden.');
        return throwError(() => error);
      })
    );
  }

  updateOrden(id: number, changes: Partial<Orden>): Observable<Orden> {
    if (this.useMock) {
      let updated = this.orders.find(order => order.id === id) ?? this.orders[0];
      updated = { ...updated, ...changes };
      this.orders = this.orders.map(order => (order.id === id ? updated : order));
      return of(updated).pipe(delay(150));
    }

    return this.http.patch<Orden>(`/ordenes/${id}`, changes).pipe(
      catchError(error => {
        this.errorService.showError('No se pudo actualizar la orden.');
        return throwError(() => error);
      })
    );
  }

  updateLinea(ordenId: number, lineaId: number, data: Partial<LineaOrden>): Observable<LineaOrden> {
    if (this.useMock) {
      const orden = this.orders.find(order => order.id === ordenId);
      const lineas = orden?.lineas ?? [];
      const updatedLine = lineas.find(linea => linea.id === lineaId);
      if (!orden || !updatedLine) {
        return throwError(() => new Error('Linea no encontrada'));
      }
      const nextLine = { ...updatedLine, ...data };
      orden.lineas = lineas.map(linea => (linea.id === lineaId ? nextLine : linea));
      return of(nextLine).pipe(delay(120));
    }

    return this.http.patch<LineaOrden>(`/ordenes/${ordenId}/lineas/${lineaId}`, data).pipe(
      catchError(error => {
        this.errorService.showError('No se pudo actualizar la linea.');
        return throwError(() => error);
      })
    );
  }

  addLinea(ordenId: number, linea: LineaOrden): Observable<LineaOrden> {
    if (this.useMock) {
      const orden = this.orders.find(order => order.id === ordenId);
      if (!orden) {
        return throwError(() => new Error('Orden no encontrada'));
      }
      orden.lineas = [...orden.lineas, linea];
      return of(linea).pipe(delay(120));
    }

    return this.http.post<LineaOrden>(`/ordenes/${ordenId}/lineas`, linea).pipe(
      catchError(error => {
        this.errorService.showError('No se pudo agregar la linea.');
        return throwError(() => error);
      })
    );
  }

  removeLinea(ordenId: number, lineaId: number): Observable<void> {
    if (this.useMock) {
      const orden = this.orders.find(order => order.id === ordenId);
      if (!orden) {
        return throwError(() => new Error('Orden no encontrada'));
      }
      orden.lineas = orden.lineas.filter(linea => linea.id !== lineaId);
      return of(void 0).pipe(delay(120));
    }

    return this.http.delete<void>(`/ordenes/${ordenId}/lineas/${lineaId}`).pipe(
      catchError(error => {
        this.errorService.showError('No se pudo eliminar la linea.');
        return throwError(() => error);
      })
    );
  }

  changeStatus(id: number, status: EstadoOrden): Observable<Orden> {
    if (this.useMock) {
      return this.updateOrden(id, { estado: status });
    }

    return this.http.patch<Orden>(`/ordenes/${id}/estado`, { estado: status }).pipe(
      catchError(error => {
        this.errorService.showError('No se pudo cambiar el estado.');
        return throwError(() => error);
      })
    );
  }

  addNota(id: number, nota: Nota): Observable<Nota> {
    if (this.useMock) {
      const orden = this.orders.find(order => order.id === id);
      if (!orden) {
        return throwError(() => new Error('Orden no encontrada'));
      }
      orden.notas = [nota, ...orden.notas];
      return of(nota).pipe(delay(120));
    }

    return this.http.post<Nota>(`/ordenes/${id}/notas`, nota).pipe(
      catchError(error => {
        this.errorService.showError('No se pudo agregar la nota.');
        return throwError(() => error);
      })
    );
  }

  saveDiagnostico(id: number, texto: string): Observable<Orden> {
    if (this.useMock) {
      return this.updateOrden(id, { diagnostico: texto });
    }

    return this.http.patch<Orden>(`/ordenes/${id}/diagnostico`, { diagnostico: texto }).pipe(
      catchError(error => {
        this.errorService.showError('No se pudo guardar el diagnostico.');
        return throwError(() => error);
      })
    );
  }
}
