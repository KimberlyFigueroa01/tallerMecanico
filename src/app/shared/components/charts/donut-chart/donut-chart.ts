import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

export interface DonutChartDatum {
  label: string;
  value: number;
  color?: string;
}

@Component({
  selector: 'app-donut-chart',
  imports: [],
  templateUrl: './donut-chart.html',
  styleUrl: './donut-chart.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DonutChart {
  readonly data = input<DonutChartDatum[]>([]);

  private readonly palette = ['#0f172a', '#334155', '#64748b', '#94a3b8', '#cbd5f5'];

  readonly segments = computed(() => {
    const data = this.data();
    const total = data.reduce((acc, item) => acc + item.value, 0);
    let offset = 25;

    return data.map((item, index) => {
      const percentage = total ? (item.value / total) * 100 : 0;
      const dash = `${percentage} ${100 - percentage}`;
      const color = item.color ?? this.palette[index % this.palette.length];
      const segment = { ...item, dash, offset, color };
      offset -= percentage;
      return segment;
    });
  });
}
