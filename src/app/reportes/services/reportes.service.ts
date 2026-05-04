import { inject, Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, delay } from 'rxjs/operators';

import { ErrorService } from '../../shared/services/error.service';

export interface DashboardChartDatum {
  label: string;
  value: number;
  color?: string;
}

export interface DashboardRecentOrden {
  numero: string;
  cliente: string;
  estado: string;
}

export interface DashboardData {
  ordenesActivas: number;
  ingresosMes: number;
  vehiculosEnTaller: number;
  stockBajo: number;
  ingresosPorMes: DashboardChartDatum[];
  ordenesPorEstado: DashboardChartDatum[];
  ordenesRecientes: DashboardRecentOrden[];
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
      stockBajo: 4,
      ingresosPorMes: [
        { label: 'Ene', value: 8200 },
        { label: 'Feb', value: 9100 },
        { label: 'Mar', value: 10200 },
        { label: 'Abr', value: 9800 },
        { label: 'May', value: 15200 }
      ],
      ordenesPorEstado: [
        { label: 'Abiertas', value: 6, color: '#0f172a' },
        { label: 'En progreso', value: 4, color: '#334155' },
        { label: 'Listas', value: 2, color: '#64748b' }
      ],
      ordenesRecientes: [
        { numero: '0001', cliente: 'Joaquin Hernandez', estado: 'ABIERTA' },
        { numero: '0002', cliente: 'Maria Lopez', estado: 'EN_PROGRESO' },
        { numero: '0003', cliente: 'Pedro Silva', estado: 'LISTA' }
      ]
    }).pipe(
      delay(300),
      catchError(error => {
        this.errorService.showError('No se pudo cargar el dashboard.');
        return throwError(() => error);
      })
    );
  }
}
