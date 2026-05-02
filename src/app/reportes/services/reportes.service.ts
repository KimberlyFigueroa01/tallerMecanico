import { inject, Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, delay } from 'rxjs/operators';

import { ErrorService } from '../../shared/services/error.service';

export interface DashboardData {
  ordenesActivas: number;
  ingresosMes: number;
  vehiculosEnTaller: number;
  stockBajo: number;
}

@Injectable({
  providedIn: 'root'
})
export class ReportesService {
  private readonly errorService = inject(ErrorService);

  getDashboard(): Observable<DashboardData> {
    return of({
      ordenesActivas: 12,
      ingresosMes: 15200,
      vehiculosEnTaller: 7,
      stockBajo: 4
    }).pipe(
      delay(300),
      catchError(error => {
        this.errorService.showError('No se pudo cargar el dashboard.');
        return throwError(() => error);
      })
    );
  }
}
