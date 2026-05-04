import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

import { DonutChart, DonutChartDatum } from '../../../shared';

@Component({
  selector: 'app-reporte-ordenes',
  imports: [DonutChart],
  templateUrl: './reporte-ordenes.html',
  styleUrl: './reporte-ordenes.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReporteOrdenes {
  readonly data = signal<DonutChartDatum[]>([
    { label: 'Abiertas', value: 12, color: '#0f172a' },
    { label: 'En progreso', value: 7, color: '#334155' },
    { label: 'Listas', value: 4, color: '#64748b' },
    { label: 'Cerradas', value: 9, color: '#94a3b8' }
  ]);
}
