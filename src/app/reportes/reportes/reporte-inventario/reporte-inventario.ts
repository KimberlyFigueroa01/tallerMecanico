import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

import { BarChart, BarChartDatum } from '../../../shared';

@Component({
  selector: 'app-reporte-inventario',
  imports: [BarChart],
  templateUrl: './reporte-inventario.html',
  styleUrl: './reporte-inventario.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReporteInventario {
  readonly data = signal<BarChartDatum[]>([
    { label: 'Motor', value: 24 },
    { label: 'Frenos', value: 12 },
    { label: 'Suspension', value: 8 },
    { label: 'Accesorios', value: 6 }
  ]);
}
