import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

import { HorizontalBarChart, HorizontalBarDatum } from '../../../shared';

@Component({
  selector: 'app-reporte-mecanicos',
  imports: [HorizontalBarChart],
  templateUrl: './reporte-mecanicos.html',
  styleUrl: './reporte-mecanicos.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReporteMecanicos {
  readonly data = signal<HorizontalBarDatum[]>([
    { label: 'Carlos Ruiz', value: 32 },
    { label: 'Laura Perez', value: 26 },
    { label: 'Jorge Diaz', value: 18 },
    { label: 'Camila Soto', value: 12 }
  ]);
}
