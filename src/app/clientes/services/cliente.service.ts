import { inject, Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, delay, map } from 'rxjs/operators';

import { ErrorService } from '../../shared/services/error.service';
import { Cliente } from '../models/cliente.model';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private readonly errorService = inject(ErrorService);

  private clientes: Cliente[] = [
    {
      id: 'C-1001',
      nombre: 'Ana Ramirez',
      email: 'ana@example.com',
      telefono: '+56 9 1234 5678',
      rut: '12.345.678-9',
      vehiculos: 2,
      ultimaVisita: '2026-04-20',
      estadoOrden: 'Abierta'
    },
    {
      id: 'C-1002',
      nombre: 'Jorge Molina',
      email: 'jorge@example.com',
      telefono: '+56 9 8765 4321',
      rut: '9.876.543-2',
      vehiculos: 1,
      ultimaVisita: '2026-03-28',
      estadoOrden: 'Cerrada'
    }
  ];

  getAll(search?: string): Observable<Cliente[]> {
    return of(this.clientes).pipe(
      delay(300),
      map(items => {
        if (!search) {
          return items;
        }
        const term = search.toLowerCase();
        return items.filter(item =>
          `${item.nombre} ${item.rut} ${item.telefono}`.toLowerCase().includes(term)
        );
      }),
      catchError(error => {
        this.errorService.showError('No se pudieron cargar los clientes.');
        return throwError(() => error);
      })
    );
  }

  getById(id: string): Observable<Cliente | null> {
    return of(this.clientes.find(item => item.id === id) ?? null).pipe(delay(300));
  }
}
