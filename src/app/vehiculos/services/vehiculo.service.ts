import { inject, Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, delay } from 'rxjs/operators';

import { ErrorService } from '../../shared/services/error.service';
import { Vehiculo } from '../models/vehiculo.model';

@Injectable({
  providedIn: 'root'
})
export class VehiculoService {
  private readonly errorService = inject(ErrorService);

  private vehiculos: Vehiculo[] = [
    {
      id: 'V-1001',
      marca: 'Toyota',
      modelo: 'Corolla',
      ano: 2018,
      color: 'Blanco',
      placa: 'ABCD-12',
      vin: '1HGBH41JXMN109186',
      km: 42000,
      cliente: 'Ana Ramirez'
    },
    {
      id: 'V-1002',
      marca: 'Nissan',
      modelo: 'Versa',
      ano: 2019,
      color: 'Gris',
      placa: 'EFGH-34',
      vin: '2HGBH41JXMN109999',
      km: 30000,
      cliente: 'Jorge Molina'
    }
  ];

  getAll(): Observable<Vehiculo[]> {
    return of(this.vehiculos).pipe(
      delay(300),
      catchError(error => {
        this.errorService.showError('No se pudieron cargar los vehiculos.');
        return throwError(() => error);
      })
    );
  }

  getById(id: string): Observable<Vehiculo | null> {
    return of(this.vehiculos.find(item => item.id === id) ?? null).pipe(delay(300));
  }
}
