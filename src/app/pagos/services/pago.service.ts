import { inject, Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, delay } from 'rxjs/operators';

import { ErrorService } from '../../shared/services/error.service';
import { Pago } from '../models/pago.model';

@Injectable({
  providedIn: 'root'
})
export class PagoService {
  private readonly errorService = inject(ErrorService);

  private pagos: Pago[] = [
    { id: 'P-100', ordenId: 'OT-1001', metodo: 'tarjeta', monto: 142.8, referencia: 'TRX-001', fecha: '2026-05-01' },
    { id: 'P-101', ordenId: 'OT-1002', metodo: 'efectivo', monto: 238, referencia: 'EF-021', fecha: '2026-05-02' }
  ];

  getAll(): Observable<Pago[]> {
    return of(this.pagos).pipe(
      delay(300),
      catchError(error => {
        this.errorService.showError('No se pudieron cargar los pagos.');
        return throwError(() => error);
      })
    );
  }

  create(pago: Pago): Observable<Pago> {
    this.pagos = [pago, ...this.pagos];
    return of(pago).pipe(delay(300));
  }
}
