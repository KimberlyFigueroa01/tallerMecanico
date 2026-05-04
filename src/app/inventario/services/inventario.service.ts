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
    {
      id: 100,
      nombre: 'Filtro de aceite',
      sku: 'FO-001',
      categoria: 'Motor',
      proveedor: 'Lubricantes Andes',
      ubicacion: 'A-01',
      stock: 8,
      stockMin: 5,
      stockMax: 30,
      precioCompra: 6,
      precioVenta: 12
    },
    {
      id: 200,
      nombre: 'Pastillas de freno',
      sku: 'PF-002',
      categoria: 'Frenos',
      proveedor: 'Frenos Pro',
      ubicacion: 'B-04',
      stock: 2,
      stockMin: 5,
      stockMax: 20,
      precioCompra: 25,
      precioVenta: 45
    },
    {
      id: 300,
      nombre: 'Bujias',
      sku: 'BU-003',
      categoria: 'Motor',
      proveedor: 'AutoPartes Norte',
      ubicacion: 'A-03',
      stock: 10,
      stockMin: 4,
      stockMax: 25,
      precioCompra: 4,
      precioVenta: 8
    }
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
    return of(this.repuestos.filter(item => item.stock < item.stockMin)).pipe(delay(200));
  }

  decrementStock(id: number, cantidad: number): void {
    this.repuestos = this.repuestos.map(item =>
      item.id === id ? { ...item, stock: Math.max(0, item.stock - cantidad) } : item
    );
  }

  incrementStock(id: number, cantidad: number): void {
    this.repuestos = this.repuestos.map(item =>
      item.id === id
        ? { ...item, stock: Math.min(item.stockMax, item.stock + cantidad) }
        : item
    );
  }
}
