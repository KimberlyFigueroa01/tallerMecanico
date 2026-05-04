import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

import { LineChart, LineChartDatum } from '../../../shared';

@Component({
  selector: 'app-resumen-financiero',
  imports: [LineChart],
  templateUrl: './resumen-financiero.html',
  styleUrl: './resumen-financiero.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResumenFinanciero {
  readonly data = signal<LineChartDatum[]>([
    { label: 'Ene', value: 8200 },
    { label: 'Feb', value: 9100 },
    { label: 'Mar', value: 10200 },
    { label: 'Abr', value: 9800 },
    { label: 'May', value: 15200 }
  ]);
}
