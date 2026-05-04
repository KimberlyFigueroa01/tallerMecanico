import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

import { LineChart, LineChartDatum } from '../../../shared';

@Component({
  selector: 'app-reporte-ingresos',
  imports: [LineChart],
  templateUrl: './reporte-ingresos.html',
  styleUrl: './reporte-ingresos.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReporteIngresos {
  readonly periodo = signal('Mes');

  readonly data = signal<LineChartDatum[]>([
    { label: 'Ene', value: 8200 },
    { label: 'Feb', value: 9100 },
    { label: 'Mar', value: 10200 },
    { label: 'Abr', value: 9800 },
    { label: 'May', value: 15200 }
  ]);
}
