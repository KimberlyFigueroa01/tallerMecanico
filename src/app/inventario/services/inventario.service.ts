import { inject, Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, delay } from 'rxjs/operators';

import { ErrorService } from '../../shared/services/error.service';
import { Repuesto } from '../models/repuesto.model';

@Injectable({
  providedIn: 'root'
})
export class InventarioService {
  private readonly errorService = inject(ErrorService);

  private repuestos: Repuesto[] = [
    { id: 'R-100', nombre: 'Filtro de aceite', sku: 'FO-001', categoria: 'Motor', stock: 8, minimo: 5, precio: 12 },
    { id: 'R-200', nombre: 'Pastillas de freno', sku: 'PF-002', categoria: 'Frenos', stock: 2, minimo: 5, precio: 45 },
    { id: 'R-300', nombre: 'Bujias', sku: 'BU-003', categoria: 'Motor', stock: 10, minimo: 4, precio: 8 }
  ];

  getRepuestos(): Observable<Repuesto[]> {
    return of(this.repuestos).pipe(
      delay(300),
      catchError(error => {
        this.errorService.showError('No se pudo cargar el inventario.');
        return throwError(() => error);
      })
    );
  }

  getAlertas(): Observable<Repuesto[]> {
    return of(this.repuestos.filter(item => item.stock < item.minimo)).pipe(delay(200));
  }
}
